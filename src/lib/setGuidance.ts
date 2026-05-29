import type { WorkoutSet } from '@/src/domain/types';
import i18n from '@/src/i18n';

export interface SetLoadGuidance {
  action: 'add' | 'hold' | 'reduce' | 'stop';
  severity: 'info' | 'warning' | 'alert';
  title: string;
  message: string;
  adjustmentPercent: number;
}

const rpeToRir = (rpe: number): number => Math.max(0, 10 - rpe);

export const getSetLoadGuidance = (sets: WorkoutSet[]): SetLoadGuidance | null => {
  const completed = sets
    .filter((set) => set.completed && !set.isWarmup && typeof set.actualRpe === 'number')
    .sort((a, b) => a.setNumber - b.setNumber);

  if (completed.length === 0) return null;

  const last = completed[completed.length - 1];
  const targetRpe = last.plannedRpe ?? 8;
  const actualRir = rpeToRir(last.actualRpe ?? targetRpe);
  const targetRir = rpeToRir(targetRpe);
  const missedReps = typeof last.plannedReps === 'number' && typeof last.actualReps === 'number' && last.actualReps < last.plannedReps;
  const lastTwo = completed.slice(-2);
  const twoHardSets = lastTwo.length === 2 && lastTwo.every((set) => typeof set.actualRpe === 'number' && set.actualRpe >= (set.plannedRpe ?? 8) + 1);

  if (twoHardSets || (last.actualRpe ?? 0) >= 9.5) {
    return {
      action: 'stop',
      severity: 'alert',
      title: i18n.t('guidance.stopAddingLoad'),
      message: i18n.t('guidance.stopAddingLoadMessage', { defaultValue: 'Recent sets are too close to failure. Keep the next set conservative or end this exercise.' }),
      adjustmentPercent: -7.5,
    };
  }

  if (missedReps || actualRir < targetRir - 1) {
    return {
      action: 'reduce',
      severity: 'warning',
      title: i18n.t('guidance.reduceNextSet'),
      message: i18n.t('guidance.reduceNextSetMessage', { defaultValue: 'The last set was harder than target. Drop 2.5–5% to stay in the planned RPE zone.' }),
      adjustmentPercent: -5,
    };
  }

  if (actualRir > targetRir + 1) {
    return {
      action: 'add',
      severity: 'info',
      title: i18n.t('guidance.addALittleWeight'),
      message: i18n.t('guidance.addALittleWeightMessage', { defaultValue: 'The last set was easier than target. Add 2.5–5% if technique felt solid.' }),
      adjustmentPercent: 2.5,
    };
  }

  return {
    action: 'hold',
    severity: 'info',
    title: i18n.t('guidance.holdThisLoad'),
    message: i18n.t('guidance.holdThisLoadMessage', { defaultValue: 'The last set landed near the target RPE. Keep the same weight for the next set.' }),
    adjustmentPercent: 0,
  };
};
