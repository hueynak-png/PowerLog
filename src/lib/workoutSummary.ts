import type {
  Exercise,
  MainLiftPerformance,
  RpeDistribution,
  WorkoutExercise,
  WorkoutSet,
  WorkoutSummary,
} from '@/src/domain/types';
import { calculateCompletionRate, calculateTotalVolume } from '@/src/lib/volume';
import { generateSuggestions } from '@/src/lib/localRulesEngine';
import { isMainLift } from '@/src/lib/rpe';

interface WorkoutExerciseWithDetails {
  workoutExercise: WorkoutExercise;
  exercise: Exercise;
  sets: WorkoutSet[];
}

const createEmptyRpeDistribution = (): RpeDistribution => ({
  low: 0,
  medium: 0,
  high: 0,
});

const calculateAverage = (values: number[]): number => {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const isInLowRpeBand = (rpe: number): boolean => rpe >= 6 && rpe <= 7;
const isInMediumRpeBand = (rpe: number): boolean => rpe >= 7.5 && rpe <= 8.5;
const isInHighRpeBand = (rpe: number): boolean => rpe >= 9 && rpe <= 10;

export function calculateWorkoutSummary(
  exercises: WorkoutExerciseWithDetails[],
  durationSeconds: number,
): WorkoutSummary {
  const allSets = exercises.flatMap((entry) => entry.sets);
  const setsTotal = allSets.length;
  const setsCompleted = allSets.filter((set) => set.completed).length;

  const totalVolume = calculateTotalVolume(allSets);
  const completionRate = calculateCompletionRate(allSets);

  const mainLiftPerformance: MainLiftPerformance[] = exercises
    .filter((entry) => isMainLift(entry.exercise))
    .map((entry) => {
      const completedSets = entry.sets.filter((set) => set.completed);
      const weightValues = completedSets.map((set) => set.actualWeight).filter((value): value is number => typeof value === 'number');
      const repValues = completedSets.map((set) => set.actualReps).filter((value): value is number => typeof value === 'number');
      const rpeValues = completedSets.map((set) => set.actualRpe).filter((value): value is number => typeof value === 'number');

      return {
        exerciseId: entry.exercise.id,
        exerciseNameEn: entry.exercise.nameEn,
        exerciseNameZh: entry.exercise.nameZh,
        topWeight: weightValues.length > 0 ? Math.max(...weightValues) : 0,
        topReps: repValues.length > 0 ? Math.max(...repValues) : 0,
        avgRpe: calculateAverage(rpeValues),
        allSetsCompleted: entry.sets.length > 0 && entry.sets.every((set) => set.completed),
      };
    });

  const rpeDistribution = exercises.reduce<RpeDistribution>((distribution, entry) => {
    for (const set of entry.sets) {
      if (typeof set.actualRpe !== 'number') {
        continue;
      }

      if (isInLowRpeBand(set.actualRpe)) {
        distribution.low += 1;
      } else if (isInMediumRpeBand(set.actualRpe)) {
        distribution.medium += 1;
      } else if (isInHighRpeBand(set.actualRpe)) {
        distribution.high += 1;
      }
    }

    return distribution;
  }, createEmptyRpeDistribution());

  const suggestions = exercises.flatMap((entry) => generateSuggestions(entry.sets, entry.exercise));

  return {
    durationSeconds,
    completionRate,
    totalVolume,
    setsCompleted,
    setsTotal,
    mainLiftPerformance,
    rpeDistribution,
    suggestions,
  };
}

export type { WorkoutExerciseWithDetails };
