import type { Exercise } from '@/src/domain/types';

export const isMainLift = (exercise: Exercise): boolean =>
  exercise.role === 'competition' || exercise.role === 'variation';

export const isRpeRequired = (exercise: Exercise): boolean => isMainLift(exercise);

export const getRpeDeviation = (planned: number, actual: number): number => actual - planned;

export const formatRpe = (rpe: number): string => (Number.isInteger(rpe) ? rpe.toFixed(0) : rpe.toString());
