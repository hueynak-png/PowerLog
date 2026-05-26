import { describe, expect, it } from '@jest/globals';

import type { Exercise, WorkoutSet } from '@/src/domain/types';
import {
  checkConsecutiveOvershoot,
  checkMainLiftCompletion,
  checkRpeOvershoot,
  checkRpeUndershoot,
  generateSuggestions,
} from '@/src/lib/localRulesEngine';

const buildSet = (overrides: Partial<WorkoutSet>): WorkoutSet => ({
  id: 'set-1',
  workoutExerciseId: 'we-1',
  setNumber: 1,
  completed: true,
  isWarmup: false,
  ...overrides,
});

const buildExercise = (role: Exercise['role']): Exercise => ({
  id: 'ex-1',
  nameEn: 'Squat',
  nameZh: '深蹲',
  category: 'barbell',
  liftFamily: 'squat',
  role,
  muscleGroups: ['quads'],
  isCustom: false,
});

describe('localRulesEngine', () => {
  it('flags RPE overshoot when deviation is at least 1.0', () => {
    const suggestion = checkRpeOvershoot(buildSet({ plannedRpe: 8, actualRpe: 9.5 }));

    expect(suggestion).toMatchObject({
      type: 'reduce_weight',
      severity: 'warning',
      suggestedAdjustmentPercent: -5,
    });
  });

  it('does not flag RPE overshoot when deviation is below threshold', () => {
    expect(checkRpeOvershoot(buildSet({ plannedRpe: 8, actualRpe: 8.5 }))).toBeNull();
  });

  it('flags RPE undershoot when deviation is at least 1.0', () => {
    const suggestion = checkRpeUndershoot(buildSet({ plannedRpe: 8, actualRpe: 6.5 }));

    expect(suggestion).toMatchObject({
      type: 'increase_weight',
      severity: 'info',
      suggestedAdjustmentPercent: 2.5,
    });
  });

  it('flags consecutive overshoot for two completed sets', () => {
    const sets = [
      buildSet({ id: '1', setNumber: 1, plannedRpe: 8, actualRpe: 9.5 }),
      buildSet({ id: '2', setNumber: 2, plannedRpe: 8, actualRpe: 9.0 }),
    ];

    expect(checkConsecutiveOvershoot(sets)).toMatchObject({
      type: 'stop_adding',
      severity: 'alert',
    });
  });

  it('does not flag consecutive overshoot for a single overshooting set', () => {
    const sets = [buildSet({ id: '1', setNumber: 1, plannedRpe: 8, actualRpe: 9.5 })];

    expect(checkConsecutiveOvershoot(sets)).toBeNull();
  });

  it('flags main lift completion below 80 percent', () => {
    const exercise = buildExercise('competition');
    const sets = [
      buildSet({ id: '1', completed: true }),
      buildSet({ id: '2', completed: true }),
      buildSet({ id: '3', completed: false }),
    ];

    expect(checkMainLiftCompletion(sets, exercise)).toMatchObject({
      type: 'main_lift_underperformed',
      severity: 'warning',
    });
  });

  it('does not flag main lift completion at 100 percent', () => {
    const exercise = buildExercise('variation');
    const sets = [
      buildSet({ id: '1', completed: true }),
      buildSet({ id: '2', completed: true }),
      buildSet({ id: '3', completed: true }),
      buildSet({ id: '4', completed: true }),
    ];

    expect(checkMainLiftCompletion(sets, exercise)).toBeNull();
  });

  it('aggregates suggestions across all applicable rules', () => {
    const exercise = buildExercise('accessory');
    const sets = [
      buildSet({ id: '1', setNumber: 1, plannedRpe: 8, actualRpe: 9.5 }),
      buildSet({ id: '2', setNumber: 2, plannedRpe: 8, actualRpe: 9.0 }),
      buildSet({ id: '3', setNumber: 3, completed: false }),
    ];

    const suggestions = generateSuggestions(sets, exercise);

    expect(suggestions).toHaveLength(3);
    expect(suggestions.map((suggestion) => suggestion.type)).toEqual([
      'reduce_weight',
      'reduce_weight',
      'stop_adding',
    ]);
  });
});
