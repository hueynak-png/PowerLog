import { describe, expect, it } from '@jest/globals';

import type { Exercise } from '@/src/domain/types';
import { formatRpe, getRpeDeviation, isMainLift, isRpeRequired } from '@/src/lib/rpe';

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

describe('rpe', () => {
  it('identifies main lifts', () => {
    expect(isMainLift(buildExercise('competition'))).toBe(true);
    expect(isMainLift(buildExercise('variation'))).toBe(true);
    expect(isMainLift(buildExercise('accessory'))).toBe(false);
  });

  it('requires RPE for main lifts only', () => {
    expect(isRpeRequired(buildExercise('competition'))).toBe(true);
    expect(isRpeRequired(buildExercise('accessory'))).toBe(false);
  });

  it('calculates RPE deviation', () => {
    expect(getRpeDeviation(8, 8.5)).toBe(0.5);
  });

  it('formats RPE values', () => {
    expect(formatRpe(8)).toBe('8');
    expect(formatRpe(8.5)).toBe('8.5');
  });
});
