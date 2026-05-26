import { describe, expect, it } from '@jest/globals';

import type { WorkoutSet } from '@/src/domain/types';
import { calculateCompletionRate, calculateSetVolume, calculateTotalVolume } from '@/src/lib/volume';

const buildSet = (overrides: Partial<WorkoutSet>): WorkoutSet => ({
  id: 'set-1',
  workoutExerciseId: 'we-1',
  setNumber: 1,
  completed: true,
  isWarmup: false,
  ...overrides,
});

describe('volume', () => {
  it('calculates set volume', () => {
    expect(calculateSetVolume(100, 5)).toBe(500);
  });

  it('calculates total volume from completed sets only', () => {
    const sets: WorkoutSet[] = [
      buildSet({ id: '1', actualWeight: 100, actualReps: 5, completed: true }),
      buildSet({ id: '2', actualWeight: 80, actualReps: 8, completed: true }),
      buildSet({ id: '3', actualWeight: 60, actualReps: 10, completed: false }),
    ];

    expect(calculateTotalVolume(sets)).toBe(1140);
  });

  it('calculates completion rate', () => {
    const sets: WorkoutSet[] = [
      buildSet({ id: '1', completed: true }),
      buildSet({ id: '2', completed: false }),
      buildSet({ id: '3', completed: true }),
      buildSet({ id: '4', completed: false }),
    ];

    expect(calculateCompletionRate(sets)).toBe(0.5);
  });

  it('returns 0 completion rate for empty sets', () => {
    expect(calculateCompletionRate([])).toBe(0);
  });
});
