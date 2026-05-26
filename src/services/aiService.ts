/**
 * AI Service - Frontend client for the PowerLog AI backend.
 * Handles all AI-related API calls with graceful degradation.
 */

import { Platform } from 'react-native';

const STORAGE_KEY = 'powerlog-ai-config';

interface AIConfig {
  baseUrl: string;
  authToken: string;
}

/**
 * Load config from localStorage (web) on startup.
 */
const loadConfig = (): AIConfig => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored) as AIConfig;
    } catch { /* ignore */ }
  }
  return { baseUrl: '', authToken: '' };
};

let config: AIConfig = loadConfig();

export const configureAI = (baseUrl: string, authToken: string) => {
  config = { baseUrl, authToken };
  // Persist to localStorage on web
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch { /* ignore */ }
  }
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
  const timeout = setTimeout(
    () => controller.abort(),
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

// --- API Functions ---

/**
 * Generate AI summary for a completed workout session.
 */
export const requestSessionSummary = (data: {
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
}): Promise<SessionSummaryResponse> =>
  aiRequest('/session-summary', data);

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
