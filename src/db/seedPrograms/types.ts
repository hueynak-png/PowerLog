import type { CyclePhase, ProgramSource } from '@/src/domain/types';

export interface PlannedSetSeed {
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

export interface PlannedExerciseSeed {
  exerciseName: string;
  orderIndex: number;
  targetSets?: number;
  targetReps?: number;
  targetRepRange?: string;
  targetLoad?: number;
  targetRpe?: number;
  targetPercent?: number;
  accessoryCategory?: string;
  notes?: string;
  sets?: PlannedSetSeed[];
}

export interface ProgramDaySeed {
  dayNumber: number;
  title: string;
  mainFocus?: string;
  estimatedDuration?: number;
  exercises: PlannedExerciseSeed[];
}

export interface ProgramWeekSeed {
  weekNumber: number;
  phase: CyclePhase;
  focus?: string;
  notes?: string;
  days: ProgramDaySeed[];
}

export interface ProgramSeed {
  id: string;
  name: string;
  type: string;
  goal: string;
  source: ProgramSource;
  durationWeeks: number;
  includesDeload: boolean;
  description: string;
  createdAt: string;
  weeks: ProgramWeekSeed[];
  /** Key used for strategy resolution. E.g. "seed-program-brad-full-cycle" */
  templateKey?: string;
  /** Which instantiation strategy handles this template */
  instantiationStrategy?: string;
  /** Whether this is a template that needs instantiation before use */
  requiresInstantiation?: boolean;
}
