import type { WorkoutSet } from '@/src/domain/types';

export const calculateSetVolume = (weight: number, reps: number): number => weight * reps;

const getCompletedSetVolume = (set: WorkoutSet): number => {
  if (!set.completed) {
    return 0;
  }

  const weight = set.actualWeight ?? set.plannedWeight ?? 0;
  const reps = set.actualReps ?? set.plannedReps ?? 0;

  return calculateSetVolume(weight, reps);
};

export const calculateTotalVolume = (sets: WorkoutSet[]): number =>
  sets.reduce((total, set) => total + getCompletedSetVolume(set), 0);

export const calculateCompletionRate = (sets: WorkoutSet[]): number => {
  if (sets.length === 0) {
    return 0;
  }

  const completed = sets.filter((set) => set.completed).length;
  return completed / sets.length;
};
