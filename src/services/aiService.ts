/**
 * AI Service - Frontend client for the PowerLog AI backend.
 * Handles all AI-related API calls with graceful degradation.
 */

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'powerlog-ai-config';

interface AIConfig {
  baseUrl: string;
  authToken: string;
}

const normalizeAIBaseUrl = (baseUrl: string): string =>
  baseUrl.trim().replace(/\/+$/, '').replace(/\/ai$/i, '');

let config: AIConfig = { baseUrl: '', authToken: '' };

const persist = async (cfg: AIConfig) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch { /* ignore */ }
};

export const initAI = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as AIConfig;
      config = { ...parsed, baseUrl: normalizeAIBaseUrl(parsed.baseUrl) };
    }
  } catch { /* ignore */ }
};

export const configureAI = (baseUrl: string, authToken: string) => {
  config = { baseUrl: normalizeAIBaseUrl(baseUrl), authToken: authToken.trim() };
  persist(config);
};

export const getAIConfig = (): AIConfig => config;

export const isAIConfigured = (): boolean =>
  config.baseUrl.length > 0 && config.authToken.length > 0;

interface AIRequestOptions {
  timeout?: number;
}

const aiRequest = async <T>(
  endpoint: string,
  body: unknown,
  options: AIRequestOptions = {},
): Promise<T> => {
  if (!isAIConfigured()) {
    throw new Error('AI service not configured');
  }

  const controller = new AbortController();
  let didTimeout = false;
  const timeout = setTimeout(
    () => {
      didTimeout = true;
      controller.abort();
    },
    options.timeout ?? 30000,
  );

  try {
    const response = await fetch(`${config.baseUrl}/ai${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.authToken}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error((error as { message?: string }).message ?? `HTTP ${response.status}`);
    }

    return await response.json() as T;
  } catch (error) {
    if (didTimeout) {
      throw new Error('AI request timed out. Please try again.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
};

// --- Response Types ---

export interface SessionSummaryResponse {
  success: boolean;
  data: {
    summary: string;
    highlights: string[];
    concerns: string[];
    suggestions: string[];
    overallRating: 'excellent' | 'good' | 'fair' | 'poor';
  };
}

export interface DailyStrengthAnalysisResponse {
  success: boolean;
  data: {
    oneLineConclusion: string;
    completionAnalysis: string;
    stimulusAnalysis: string;
    intensityAnalysis: string;
    fatigueAndRiskAnalysis: string;
    goalMatchAnalysis: string;
    nextSessionAdjustments: Array<{ exercise: string; recommendation: string; reason: string }>;
    scores: {
      completion: number;
      stimulusEffectiveness: number;
      intensityRationality: number;
      fatigueControl: number;
      exerciseStructure: number;
    };
    structuredSummary: {
      identifiedGoal: 'hypertrophy' | 'strength' | 'powerbuilding' | 'fat_loss_maintenance' | 'technique' | 'recovery' | 'unknown';
      effectiveSets: number;
      mainStimulus: string[];
      keyRisks: string[];
      nextFocus: string;
      libraryNote: string;
    };
  };
}

export interface WorkoutSuggestionResponse {
  success: boolean;
  data: {
    suggestion: string;
    adjustedWeight: number | null;
    adjustedReps: number | null;
    severity: 'info' | 'warning' | 'alert';
    reasoning: string;
  };
}

export interface NutritionTagsResponse {
  success: boolean;
  data: { tags: string[] };
}

export interface WeeklyReviewResponse {
  success: boolean;
  data: {
    weekSummary: string;
    liftAnalysis: Array<{ lift: string; assessment: string; trend: 'up' | 'stable' | 'down' }>;
    volumeTrend: 'increasing' | 'stable' | 'decreasing';
    fatigueSigns: string[];
    suggestions: Array<{ type: string; content: string }>;
    deloadRecommendation: { needed: boolean; reasoning: string };
    nextWeekFocus: string;
  };
}

// --- Response Cache ---

const summaryCache = new Map<string, SessionSummaryResponse>();

// --- API Functions ---

/**
 * Generate AI summary for a completed workout session.
 * Results are cached in-memory by sessionId to avoid redundant API calls.
 */
export const requestSessionSummary = async (
  data: {
    exercises: Array<{
      nameEn: string;
      nameZh: string;
      role: string;
      sets: Array<{
        plannedWeight?: number;
        actualWeight?: number;
        plannedReps?: number;
        actualReps?: number;
        plannedRpe?: number;
        actualRpe?: number;
        completed: boolean;
      }>;
    }>;
    durationSeconds: number;
    totalVolume: number;
    completionRate: number;
  },
  sessionId?: string,
): Promise<SessionSummaryResponse> => {
  if (sessionId && summaryCache.has(sessionId)) {
    return summaryCache.get(sessionId)!;
  }
  const result = await aiRequest<SessionSummaryResponse>('/session-summary', data);
  if (sessionId) {
    summaryCache.set(sessionId, result);
  }
  return result;
};

export const requestDailyStrengthAnalysis = (data: {
  session: {
    durationSeconds: number;
    totalVolume: number;
    completionRate: number;
    perceivedGoal?: 'hypertrophy' | 'strength' | 'powerbuilding' | 'fat_loss_maintenance' | 'technique' | 'recovery' | 'unknown';
    notes?: string;
  };
  exercises: Array<{
    nameEn: string;
    nameZh: string;
    category?: string;
    liftFamily?: string;
    role: string;
    muscleGroups?: string[];
    sets: Array<{
      setNumber: number;
      plannedWeight?: number;
      actualWeight?: number;
      plannedReps?: number;
      actualReps?: number;
      plannedRpe?: number;
      actualRpe?: number;
      rir?: number;
      completed: boolean;
      isWarmup?: boolean;
      notes?: string;
    }>;
  }>;
  history?: Array<{
    date: string;
    exerciseNameEn: string;
    exerciseNameZh: string;
    topWeight?: number;
    topReps?: number;
    avgRpe?: number;
    setsCompleted?: number;
    setsTotal?: number;
    notes?: string;
  }>;
  recovery?: {
    sleepQuality?: string;
    soreness?: string;
    stress?: string;
    painNotes?: string;
  };
}): Promise<DailyStrengthAnalysisResponse> =>
  aiRequest('/daily-strength-analysis', data, { timeout: 120000 });

/**
 * Get AI suggestion for next set during workout.
 */
export const requestWorkoutSuggestion = (data: {
  exerciseNameEn: string;
  exerciseNameZh: string;
  exerciseRole: string;
  completedSets: Array<{
    setNumber: number;
    weight: number;
    reps: number;
    rpe: number;
  }>;
  plannedWeight?: number;
  plannedReps?: number;
  plannedRpe?: number;
  currentPhase?: string;
}): Promise<WorkoutSuggestionResponse> =>
  aiRequest('/workout-suggestion', data, { timeout: 15000 });

/**
 * Generate AI tags for a nutrition entry.
 */
export const requestNutritionTags = (data: {
  notes: string;
  statusTags: string[];
  bodyweight?: number;
}): Promise<NutritionTagsResponse> =>
  aiRequest('/nutrition-tags', data, { timeout: 10000 });

/**
 * Generate weekly training review.
 */
export const requestWeeklyReview = (data: {
  sessions: Array<{
    date: string;
    durationSeconds: number;
    totalVolume: number;
    completionRate: number;
    mainLifts: Array<{
      nameEn: string;
      nameZh: string;
      topWeight: number;
      topReps: number;
      avgRpe: number;
    }>;
  }>;
  bodyweightEntries: Array<{ date: string; bodyweight: number }>;
  currentPhase?: string;
  weekNumber?: number;
}): Promise<WeeklyReviewResponse> =>
  aiRequest('/weekly-review', data, { timeout: 60000 });

// --- Plan Generation ---

export interface PlanGenerationResponse {
  success: boolean;
  data: {
    name: string;
    type: string;
    description: string;
    weeks: Array<{
      weekNumber: number;
      phase: string;
      focus: string;
      days: Array<{
        dayNumber: number;
        title: string;
        mainFocus: string;
        estimatedDuration: number;
        exercises: Array<{
          exerciseNameEn: string;
          role: string;
          targetSets: number;
          targetReps: number;
          targetRpe: number | null;
          targetPercent: number | null;
          notes: string;
        }>;
      }>;
    }>;
  };
}

/**
 * Generate a complete training program via AI.
 */
export const requestPlanGeneration = (data: {
  goalType: 'hypertrophy' | 'strength' | 'maintenance' | 'powerbuilding';
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  trainingDaysPerWeek: number;
  maxSessionDuration: number;
  durationWeeks: number;
  includesDeload: boolean;
  squatMax: number;
  benchMax: number;
  deadliftMax: number;
  weakPoints?: string[];
  availableEquipment?: string[];
  limitations?: string[];
  volumeTolerance?: 'low' | 'medium' | 'high';
  intensityPreference?: 'conservative' | 'moderate' | 'aggressive';
  progressionStyle?: 'rpe' | 'percentage' | 'double_progression';
  currentBodyweight?: number;
  avoidExercises?: string[];
  includeExercises?: string[];
}): Promise<PlanGenerationResponse> =>
  aiRequest('/generate-plan', data, { timeout: 120000 });

export interface FatigueAdjustmentRequest {
  programId: string;
  templateKey?: string;
  strategy: string;
  adjustmentWindow: { startDate: string; endDate: string; startWeek: number; weeksToAdjust: number };
  userMaxes: { squat?: number; bench?: number; deadlift?: number };
  plannedSetsPreview: Array<{
    plannedSetId: string;
    weekNumber: number;
    dayNumber: number;
    scheduledDate: string;
    exerciseName: string;
    liftFamily: string;
    role: string;
    setLabel: string;
    targetReps?: number;
    targetRepRange?: string;
    targetLoad?: number;
    targetRpe?: number;
    targetPercent?: number;
  }>;
}

export interface FatigueAdjustmentResponse {
  adjustments: Array<{
    plannedSetId: string;
    action: 'adjust_load' | 'adjust_rpe' | 'no_change';
    loadMultiplier?: number;
    newTargetLoad?: number;
    rpeDelta?: number;
    reason: string;
  }>;
  summary: {
    overallReadiness: 'normal' | 'fatigued' | 'fresh';
    mainReason: string;
    setsAdjusted: number;
    averageAdjustment: number;
  };
}

export const requestFatigueAdjustment = (
  data: FatigueAdjustmentRequest,
): Promise<FatigueAdjustmentResponse> =>
  aiRequest('/fatigue-adjustment', data, { timeout: 60000 });

/**
 * Parse a free-text training plan (pasted from external AI) into
 * the same structured PlanGenerationResponse used by generate-plan.
 */
export const requestPlanParse = (data: {
  planText: string;
}): Promise<PlanGenerationResponse> =>
  aiRequest('/parse-plan', data, { timeout: 120000 });
