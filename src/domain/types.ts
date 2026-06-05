export interface Profile {
  id: string;
  name: string;
  preferredUnit: 'kg';
  defaultSessionDuration: number;
  preferredTrainingDaysPerWeek: number;
  lastSettingsSavedAt?: string;
}

export type LiftType = 'squat' | 'bench' | 'deadlift' | 'overhead_press';
export type MaxSource = 'manual' | 'imported' | 'estimated';

export interface Max {
  id: string;
  liftType: LiftType;
  oneRm: number;
  source: MaxSource;
  date: string;
  notes?: string;
}

export type ExerciseCategory = 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight';
export type LiftFamily = 'squat' | 'bench' | 'deadlift' | 'upper' | 'lower' | 'accessory';
export type ExerciseRole = 'competition' | 'variation' | 'accessory';

export interface Exercise {
  id: string;
  nameEn: string;
  nameZh: string;
  category: ExerciseCategory;
  liftFamily: LiftFamily;
  role: ExerciseRole;
  muscleGroups: string[];
  equipment?: string;
  isCustom: boolean;
}

export type AiSummaryStatus = 'pending' | 'generated' | 'failed' | 'not_requested';

export interface WorkoutSession {
  id: string;
  programDayId?: string;
  date: string;
  startedAt: string;
  endedAt?: string;
  durationSeconds?: number;
  completionRate?: number;
  totalVolume?: number;
  notes?: string;
  aiSummaryStatus: AiSummaryStatus;
  aiSummaryJson?: string;
}

export interface WorkoutExercise {
  id: string;
  workoutSessionId: string;
  exerciseId: string;
  plannedExerciseId?: string;
  orderIndex: number;
  notes?: string;
}

export interface WorkoutSet {
  id: string;
  workoutExerciseId: string;
  setNumber: number;
  plannedWeight?: number;
  actualWeight?: number;
  plannedReps?: number;
  actualReps?: number;
  plannedRpe?: number;
  actualRpe?: number;
  completed: boolean;
  isWarmup: boolean;
  notes?: string;
}

export interface BodyweightEntry {
  id: string;
  date: string;
  bodyweight: number;
  notes?: string;
}

export interface NutritionEntry {
  id: string;
  date: string;
  statusTags: string[];
  notes?: string;
  aiTags?: string[];
}

export interface WeeklyReview {
  id: string;
  periodStart: string;
  periodEnd: string;
  generatedAt: string;
  status: AiSummaryStatus;
  reviewJson: string;
}

export type RpeValue = 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10;

export interface RuleSuggestion {
  type: 'reduce_weight' | 'increase_weight' | 'stop_adding' | 'main_lift_underperformed';
  message: string;
  severity: 'info' | 'warning' | 'alert';
  suggestedAdjustmentPercent?: number;
}

export interface WorkoutSummary {
  durationSeconds: number;
  completionRate: number;
  totalVolume: number;
  setsCompleted: number;
  setsTotal: number;
  mainLiftPerformance: MainLiftPerformance[];
  rpeDistribution: RpeDistribution;
  suggestions: RuleSuggestion[];
}

export interface MainLiftPerformance {
  exerciseId: string;
  exerciseNameEn: string;
  exerciseNameZh: string;
  topWeight: number;
  topReps: number;
  avgRpe: number;
  allSetsCompleted: boolean;
}

export interface RpeDistribution {
  low: number;
  medium: number;
  high: number;
}

export type ProgramSource = 'ai_generated' | 'imported_excel' | 'manual';
export type CyclePhase = 'entry' | 'accumulation' | 'intensification' | 'deload' | 'peak' | 'test' | 'maintenance';

export interface Program {
  id: string;
  name: string;
  type: string;
  goal: string;
  source: ProgramSource;
  durationWeeks: number;
  includesDeload: boolean;
  description?: string;
  createdAt: string;
}

export interface ProgramWeek {
  id: string;
  programId: string;
  weekNumber: number;
  phase: CyclePhase;
  focus?: string;
  notes?: string;
}

export interface ProgramDay {
  id: string;
  programWeekId: string;
  dayNumber: number;
  title: string;
  mainFocus?: string;
  estimatedDuration?: number;
  scheduledDate?: string;
}

export interface PlannedExercise {
  id: string;
  programDayId: string;
  exerciseId: string;
  orderIndex: number;
  targetSets?: number;
  targetReps?: number;
  targetLoad?: number;
  targetRpe?: number;
  targetPercent?: number;
  accessoryCategory?: string;
  notes?: string;
}

export interface CurrentCycle {
  id: string;
  programId: string;
  goal: string;
  currentWeek: number;
  currentDay: number;
  currentPhase: CyclePhase;
  trainingDaysPerWeek: number;
  startedAt: string;
  isActive: boolean;
}
