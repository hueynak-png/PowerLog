export interface Profile {
  id: string;
  name: string;
  preferredUnit: 'kg';
  defaultSessionDuration: number;
  preferredTrainingDaysPerWeek: number;
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
