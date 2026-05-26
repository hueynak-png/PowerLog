import { describe, expect, it } from '@jest/globals';

import calculateE1rm, { calculateE1rmBrzycki, calculateE1rmEpley } from '@/src/lib/e1rm';

describe('e1rm', () => {
  it('calculates Epley 1RM for 100kg x 5', () => {
    expect(calculateE1rm(100, 5)).toBeCloseTo(116.67, 2);
    expect(calculateE1rmEpley(100, 5)).toBeCloseTo(116.67, 2);
  });

  it('returns weight for a single rep', () => {
    expect(calculateE1rm(100, 1)).toBe(100);
    expect(calculateE1rmBrzycki(100, 1)).toBe(100);
  });

  it('returns 0 for zero weight', () => {
    expect(calculateE1rm(0, 5)).toBe(0);
  });

  it('returns 0 for zero reps', () => {
    expect(calculateE1rm(100, 0)).toBe(0);
  });

  it('calculates approximate 1RM for 140kg x 3', () => {
    expect(calculateE1rm(140, 3)).toBeCloseTo(154, 0);
  });
});
