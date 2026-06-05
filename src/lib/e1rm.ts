const isValidWeight = (weight: number): boolean => weight > 0;

const isValidReps = (reps: number): boolean => reps > 0;

export const calculateE1rmEpley = (weight: number, reps: number): number => {
  if (!isValidWeight(weight) || !isValidReps(reps)) {
    return 0;
  }

  if (reps === 1) {
    return weight;
  }

  return weight * (1 + reps / 30);
};

export const calculateE1rmBrzycki = (weight: number, reps: number): number => {
  if (!isValidWeight(weight) || !isValidReps(reps)) {
    return 0;
  }

  if (reps === 1) {
    return weight;
  }

  return weight * (36 / (37 - reps));
};

export const calculateE1rmRpe = (weight: number, reps: number, rpe: number | null): number => {
  if (!isValidWeight(weight) || !isValidReps(reps)) {
    return 0;
  }

  if (reps === 1) {
    return weight;
  }

  const rir = rpe != null ? Math.max(0, 10 - rpe) : 0;

  return weight * (1 + (reps + rir) / 30);
};

export default function calculateE1rm(weight: number, reps: number): number {
  return calculateE1rmEpley(weight, reps);
}
