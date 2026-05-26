import type { CyclePhase, ProgramSource } from '@/src/domain/types';

export interface PlannedExerciseSeed {
  exerciseName: string;
  orderIndex: number;
  targetSets?: number;
  targetReps?: number;
  targetLoad?: number;
  targetRpe?: number;
  targetPercent?: number;
  accessoryCategory?: string;
  notes?: string;
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
}
