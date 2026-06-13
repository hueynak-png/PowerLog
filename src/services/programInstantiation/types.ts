import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';

import type { CyclePhase } from '@/src/domain/types';

export interface UserMaxes {
  squat?: number;
  bench?: number;
  deadlift?: number;
}

export interface UserState {
  bodyweight?: number;
  recentE1RMs?: Array<{ liftType: string; e1rm: number; date: string }>;
  fatigueSignals?: {
    recentCompletionRate?: number;
    recentRpeDeviation?: number;
    lastDeloadWeeksAgo?: number;
  };
  goal?: string;
  equipment?: string[];
  limitations?: string[];
}

export interface InstantiationOptions {
  templateProgramId: string;
  startDate: string;
  startWeek?: number;
  startDay?: number;
  trainingDaysPerWeek?: number;
  scheduleOffsets?: number[];
  userMaxes?: UserMaxes;
  userState?: UserState;
  mode?: 'deterministic' | 'ai_assisted';
  enableAiFatigueAdjustment?: boolean;
  adjustmentWeeks?: number;
}

export interface ScheduledDay {
  weekNumber: number;
  dayNumber: number;
  scheduledDate: string;
}

export interface InstantiatedWeek {
  week: { programId: string; weekNumber: number; phase: CyclePhase; focus?: string; notes?: string };
  days: InstantiatedDay[];
}

export interface InstantiatedDay {
  day: { programWeekId: string; dayNumber: number; title: string; mainFocus?: string; estimatedDuration?: number; scheduledDate?: string };
  exercises: InstantiatedExercise[];
}

export interface InstantiatedExercise {
  exercise: {
    exerciseId: string;
    orderIndex: number;
    targetSets?: number;
    targetReps?: number;
    targetRepRange?: string;
    targetLoad?: number;
    targetRpe?: number;
    targetPercent?: number;
    accessoryCategory?: string;
    notes?: string;
  };
  sets: InstantiatedSet[];
}

export interface InstantiatedSet {
  setNumber: number;
  setLabel?: string;
  targetReps?: number;
  targetRepRange?: string;
  targetLoad?: number;
  targetRpe?: number;
  targetPercent?: number;
  baseTargetLoad?: number;
  adjustmentFactor?: number;
  adjustmentReason?: string;
  adjustmentSource?: string;
  notes?: string;
}

export interface InstantiationResult {
  program: { name: string; type: string; goal: string; source: string; durationWeeks: number; includesDeload: boolean; description?: string; createdAt: string };
  weeks: InstantiatedWeek[];
  scheduledDays: ScheduledDay[];
}

export interface ProgramInstantiationStrategy {
  /** Unique strategy identifier */
  readonly key: string;

  /** Human-readable label */
  readonly label: string;

  /** Which template keys this strategy handles */
  readonly supportedTemplateKeys: string[];

  /**
   * Execute instantiation. Returns a new Program (not yet persisted)
   * with recalculated loads, plus scheduling information.
   */
  instantiate(
    db: SQLiteDatabase,
    options: InstantiationOptions,
  ): Promise<InstantiationResult>;
}
