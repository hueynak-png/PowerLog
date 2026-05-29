import type { Exercise, RuleSuggestion, WorkoutSet } from '@/src/domain/types';
import { calculateCompletionRate } from '@/src/lib/volume';
import { getRpeDeviation, isMainLift } from '@/src/lib/rpe';
import i18n from '@/src/i18n';

const RPE_OVERSHOOT_THRESHOLD = 1;
const RPE_UNDERSHOOT_THRESHOLD = 1;
const MAIN_LIFT_COMPLETION_THRESHOLD = 0.8;

const hasRpeData = (set: WorkoutSet): set is WorkoutSet & {
  plannedRpe: number;
  actualRpe: number;
} => typeof set.plannedRpe === 'number' && typeof set.actualRpe === 'number';

export function checkRpeOvershoot(set: WorkoutSet): RuleSuggestion | null {
  if (!hasRpeData(set)) {
    return null;
  }

  const deviation = getRpeDeviation(set.plannedRpe, set.actualRpe);
  if (deviation < RPE_OVERSHOOT_THRESHOLD) {
    return null;
  }

  return {
    type: 'reduce_weight',
    severity: 'warning',
    suggestedAdjustmentPercent: -5,
    message: i18n.t('guidance.overshotRpe', { setNumber: set.setNumber, deviation: deviation.toFixed(1), defaultValue: `Set ${set.setNumber} overshot planned RPE by ${deviation.toFixed(1)}. Consider reducing weight 2.5-5%.` }),
  };
}

export function checkRpeUndershoot(set: WorkoutSet): RuleSuggestion | null {
  if (!hasRpeData(set)) {
    return null;
  }

  const deviation = set.plannedRpe - set.actualRpe;
  if (deviation < RPE_UNDERSHOOT_THRESHOLD) {
    return null;
  }

  return {
    type: 'increase_weight',
    severity: 'info',
    suggestedAdjustmentPercent: 2.5,
    message: i18n.t('guidance.undershotRpe', { setNumber: set.setNumber, deviation: deviation.toFixed(1), defaultValue: `Set ${set.setNumber} undershot planned RPE by ${deviation.toFixed(1)}. Consider a small weight increase.` }),
  };
}

export function checkConsecutiveOvershoot(sets: WorkoutSet[]): RuleSuggestion | null {
  const completedSets = sets
    .filter((set) => set.completed)
    .slice()
    .sort((a, b) => a.setNumber - b.setNumber);

  if (completedSets.length < 2) {
    return null;
  }

  const lastTwoSets = completedSets.slice(-2);
  const bothOvershot = lastTwoSets.every((set) => {
    if (!hasRpeData(set)) {
      return false;
    }

    return getRpeDeviation(set.plannedRpe, set.actualRpe) >= RPE_OVERSHOOT_THRESHOLD;
  });

  if (!bothOvershot) {
    return null;
  }

  return {
    type: 'stop_adding',
    severity: 'alert',
    message: i18n.t('guidance.consecutiveOvershoot', { defaultValue: 'Two consecutive completed sets overshot the planned RPE. Stop adding load or reduce weight.' }),
  };
}

export function checkMainLiftCompletion(sets: WorkoutSet[], exercise: Exercise): RuleSuggestion | null {
  if (!isMainLift(exercise)) {
    return null;
  }

  if (sets.length === 0) {
    return null;
  }

  const completionRate = calculateCompletionRate(sets);
  if (completionRate >= MAIN_LIFT_COMPLETION_THRESHOLD) {
    return null;
  }

  return {
    type: 'main_lift_underperformed',
    severity: 'warning',
    message: i18n.t('guidance.mainLiftCompletionLow', { rate: (completionRate * 100).toFixed(0), defaultValue: `Main lift completion rate is ${(completionRate * 100).toFixed(0)}%, below the 80% target.` }),
  };
}

export function generateSuggestions(sets: WorkoutSet[], exercise?: Exercise): RuleSuggestion[] {
  const suggestions: RuleSuggestion[] = [];

  for (const set of sets) {
    const overshoot = checkRpeOvershoot(set);
    if (overshoot) {
      suggestions.push(overshoot);
    }

    const undershoot = checkRpeUndershoot(set);
    if (undershoot) {
      suggestions.push(undershoot);
    }
  }

  const consecutiveOvershoot = checkConsecutiveOvershoot(sets);
  if (consecutiveOvershoot) {
    suggestions.push(consecutiveOvershoot);
  }

  if (exercise) {
    const mainLiftCompletion = checkMainLiftCompletion(sets, exercise);
    if (mainLiftCompletion) {
      suggestions.push(mainLiftCompletion);
    }
  }

  return suggestions;
}
