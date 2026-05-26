import { describe, expect, it } from '@jest/globals';

import type { Exercise, WorkoutExercise, WorkoutSet } from '@/src/domain/types';
import { calculateWorkoutSummary } from '@/src/lib/workoutSummary';

const buildSet = (overrides: Partial<WorkoutSet>): WorkoutSet => ({
  id: 'set-1',
  workoutExerciseId: 'we-1',
  setNumber: 1,
  completed: true,
  isWarmup: false,
  ...overrides,
});

const buildExercise = (overrides: Partial<Exercise>): Exercise => ({
  id: 'ex-1',
  nameEn: 'Squat',
  nameZh: '深蹲',
  category: 'barbell',
  liftFamily: 'squat',
  role: 'competition',
  muscleGroups: ['quads'],
  isCustom: false,
  ...overrides,
});

const buildWorkoutExercise = (overrides: Partial<WorkoutExercise>): WorkoutExercise => ({
  id: 'we-1',
  workoutSessionId: 'ws-1',
  exerciseId: 'ex-1',
  orderIndex: 0,
  ...overrides,
});

describe('workoutSummary', () => {
  it('returns zero values for an empty workout', () => {
    const summary = calculateWorkoutSummary([], 0);

    expect(summary).toEqual({
      durationSeconds: 0,
      completionRate: 0,
      totalVolume: 0,
      setsCompleted: 0,
      setsTotal: 0,
      mainLiftPerformance: [],
      rpeDistribution: { low: 0, medium: 0, high: 0 },
      suggestions: [],
    });
  });

  it('calculates volume and completion rate for a single exercise with three sets', () => {
    const exercises = [
      {
        workoutExercise: buildWorkoutExercise({}),
        exercise: buildExercise({ role: 'accessory' }),
        sets: [
          buildSet({ id: '1', actualWeight: 100, actualReps: 5, completed: true }),
          buildSet({ id: '2', actualWeight: 80, actualReps: 8, completed: true }),
          buildSet({ id: '3', actualWeight: 60, actualReps: 10, completed: false }),
        ],
      },
    ];

    const summary = calculateWorkoutSummary(exercises, 1800);

    expect(summary.totalVolume).toBe(1140);
    expect(summary.completionRate).toBeCloseTo(2 / 3);
    expect(summary.setsCompleted).toBe(2);
    expect(summary.setsTotal).toBe(3);
  });

  it('extracts main lift performance for competition lifts', () => {
    const exercises = [
      {
        workoutExercise: buildWorkoutExercise({ id: 'we-1', exerciseId: 'ex-1' }),
        exercise: buildExercise({ id: 'ex-1', nameEn: 'Squat', nameZh: '深蹲', role: 'competition' }),
        sets: [
          buildSet({ id: '1', actualWeight: 100, actualReps: 5, actualRpe: 8, completed: true }),
          buildSet({ id: '2', actualWeight: 110, actualReps: 3, actualRpe: 8.5, completed: true }),
          buildSet({ id: '3', actualWeight: 105, actualReps: 4, actualRpe: 8, completed: false }),
        ],
      },
    ];

    const summary = calculateWorkoutSummary(exercises, 1200);

    expect(summary.mainLiftPerformance).toEqual([
      {
        exerciseId: 'ex-1',
        exerciseNameEn: 'Squat',
        exerciseNameZh: '深蹲',
        topWeight: 110,
        topReps: 5,
        avgRpe: 8.25,
        allSetsCompleted: false,
      },
    ]);
  });

  it('counts RPE distribution by band', () => {
    const exercises = [
      {
        workoutExercise: buildWorkoutExercise({ id: 'we-1' }),
        exercise: buildExercise({ role: 'accessory' }),
        sets: [
          buildSet({ id: '1', actualRpe: 6, completed: true }),
          buildSet({ id: '2', actualRpe: 7.5, completed: true }),
          buildSet({ id: '3', actualRpe: 9.5, completed: true }),
          buildSet({ id: '4', actualRpe: undefined, completed: true }),
        ],
      },
    ];

    const summary = calculateWorkoutSummary(exercises, 600);

    expect(summary.rpeDistribution).toEqual({ low: 1, medium: 1, high: 1 });
  });

  it('handles mixed completed and incomplete sets in summary totals', () => {
    const exercises = [
      {
        workoutExercise: buildWorkoutExercise({ id: 'we-1', exerciseId: 'ex-1' }),
        exercise: buildExercise({ id: 'ex-1', role: 'competition' }),
        sets: [
          buildSet({ id: '1', actualWeight: 100, actualReps: 5, actualRpe: 8, completed: true }),
          buildSet({ id: '2', actualWeight: 110, actualReps: 3, actualRpe: 9, completed: false }),
        ],
      },
      {
        workoutExercise: buildWorkoutExercise({ id: 'we-2', exerciseId: 'ex-2' }),
        exercise: buildExercise({ id: 'ex-2', role: 'variation', nameEn: 'Paused Squat', nameZh: '暂停深蹲' }),
        sets: [
          buildSet({ id: '3', workoutExerciseId: 'we-2', actualWeight: 80, actualReps: 5, actualRpe: 8, completed: true }),
        ],
      },
    ];

    const summary = calculateWorkoutSummary(exercises, 900);

    expect(summary.totalVolume).toBe(900);
    expect(summary.setsCompleted).toBe(2);
    expect(summary.setsTotal).toBe(3);
    expect(summary.completionRate).toBeCloseTo(2 / 3);
    expect(summary.suggestions.length).toBeGreaterThanOrEqual(0);
  });
});
