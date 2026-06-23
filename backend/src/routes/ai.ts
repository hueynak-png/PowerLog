import { Hono } from 'hono';
import { z } from 'zod';

import type { Env } from '../index';
import { createAIHandler } from '../lib/aiHandler';
import { buildDailyStrengthAnalysisPrompt } from '../prompts/dailyStrengthAnalysis';
import { buildSessionSummaryPrompt } from '../prompts/sessionSummary';
import { buildWorkoutSuggestionPrompt, buildNutritionTagsPrompt } from '../prompts/workoutSuggestion';
import { buildWeeklyReviewPrompt } from '../prompts/weeklyReview';
import { buildPlanGenerationPrompt } from '../prompts/planGeneration';
import { buildPlanParsePrompt } from '../prompts/planParse';
import { createDeepSeekProvider } from '../services/deepseek';
import { createGPTProvider } from '../services/gpt';

export const aiRoutes = new Hono<{ Bindings: Env }>();

// --- Schemas ---

const sessionSummarySchema = z.object({
  exercises: z.array(z.object({
    nameEn: z.string(),
    nameZh: z.string(),
    role: z.string(),
    sets: z.array(z.object({
      plannedWeight: z.number().optional(),
      actualWeight: z.number().optional(),
      plannedReps: z.number().optional(),
      actualReps: z.number().optional(),
      plannedRpe: z.number().optional(),
      actualRpe: z.number().optional(),
      completed: z.boolean(),
    })),
  })),
  durationSeconds: z.number(),
  totalVolume: z.number(),
  completionRate: z.number(),
});

const dailyStrengthAnalysisSchema = z.object({
  session: z.object({
    durationSeconds: z.number(),
    totalVolume: z.number(),
    completionRate: z.number(),
    perceivedGoal: z.enum(['hypertrophy', 'strength', 'powerbuilding', 'fat_loss_maintenance', 'technique', 'recovery', 'unknown']).optional(),
    notes: z.string().optional(),
  }),
  exercises: z.array(z.object({
    nameEn: z.string(),
    nameZh: z.string(),
    category: z.string().optional(),
    liftFamily: z.string().optional(),
    role: z.string(),
    muscleGroups: z.array(z.string()).optional(),
    sets: z.array(z.object({
      setNumber: z.number(),
      plannedWeight: z.number().optional(),
      actualWeight: z.number().optional(),
      plannedReps: z.number().optional(),
      actualReps: z.number().optional(),
      plannedRpe: z.number().optional(),
      actualRpe: z.number().optional(),
      rir: z.number().optional(),
      completed: z.boolean(),
      isWarmup: z.boolean().optional(),
      notes: z.string().optional(),
    })),
  })),
  history: z.array(z.object({
    date: z.string(),
    exerciseNameEn: z.string(),
    exerciseNameZh: z.string(),
    topWeight: z.number().optional(),
    topReps: z.number().optional(),
    avgRpe: z.number().optional(),
    setsCompleted: z.number().optional(),
    setsTotal: z.number().optional(),
    notes: z.string().optional(),
  })).optional(),
  recovery: z.object({
    sleepQuality: z.string().optional(),
    soreness: z.string().optional(),
    stress: z.string().optional(),
    painNotes: z.string().optional(),
  }).optional(),
});

const workoutSuggestionSchema = z.object({
  exerciseNameEn: z.string(),
  exerciseNameZh: z.string(),
  exerciseRole: z.string(),
  completedSets: z.array(z.object({
    setNumber: z.number(),
    weight: z.number(),
    reps: z.number(),
    rpe: z.number(),
  })),
  plannedWeight: z.number().optional(),
  plannedReps: z.number().optional(),
  plannedRpe: z.number().optional(),
  currentPhase: z.string().optional(),
});

const nutritionTagsSchema = z.object({
  notes: z.string(),
  statusTags: z.array(z.string()),
  bodyweight: z.number().optional(),
});

const weeklyReviewSchema = z.object({
  sessions: z.array(z.object({
    date: z.string(),
    durationSeconds: z.number(),
    totalVolume: z.number(),
    completionRate: z.number(),
    mainLifts: z.array(z.object({
      nameEn: z.string(),
      nameZh: z.string(),
      topWeight: z.number(),
      topReps: z.number(),
      avgRpe: z.number(),
    })),
  })),
  bodyweightEntries: z.array(z.object({
    date: z.string(),
    bodyweight: z.number(),
  })),
  currentPhase: z.string().optional(),
  weekNumber: z.number().optional(),
});

// --- Routes ---

/**
 * POST /ai/session-summary
 * Generate AI summary for a completed workout session.
 * Provider: DeepSeek
 */
aiRoutes.post('/session-summary', createAIHandler({
  schema: sessionSummarySchema,
  createProvider: createDeepSeekProvider,
  buildPrompt: buildSessionSummaryPrompt,
  chatOptions: { temperature: 0.6 },
  envKey: 'DEEPSEEK_API_KEY',
}));

aiRoutes.post('/daily-strength-analysis', createAIHandler({
  schema: dailyStrengthAnalysisSchema,
  createProvider: createDeepSeekProvider,
  buildPrompt: buildDailyStrengthAnalysisPrompt,
  chatOptions: { temperature: 0.45, maxTokens: 3000 },
  envKey: 'DEEPSEEK_API_KEY',
}));

/**
 * POST /ai/workout-suggestion
 * Get AI suggestion during workout for next set.
 * Provider: DeepSeek
 */
aiRoutes.post('/workout-suggestion', createAIHandler({
  schema: workoutSuggestionSchema,
  createProvider: createDeepSeekProvider,
  buildPrompt: buildWorkoutSuggestionPrompt,
  chatOptions: { temperature: 0.5, maxTokens: 500 },
  envKey: 'DEEPSEEK_API_KEY',
}));

/**
 * POST /ai/nutrition-tags
 * Generate AI tags for nutrition entry.
 * Provider: DeepSeek
 */
aiRoutes.post('/nutrition-tags', createAIHandler({
  schema: nutritionTagsSchema,
  createProvider: createDeepSeekProvider,
  buildPrompt: buildNutritionTagsPrompt,
  chatOptions: { temperature: 0.4, maxTokens: 200 },
  transformResponse: (content) => ({ tags: content }),
  envKey: 'DEEPSEEK_API_KEY',
}));

/**
 * POST /ai/weekly-review
 * Generate weekly training review and suggestions.
 * Provider: GPT (advanced coaching)
 */
aiRoutes.post('/weekly-review', createAIHandler({
  schema: weeklyReviewSchema,
  createProvider: createGPTProvider,
  buildPrompt: buildWeeklyReviewPrompt,
  chatOptions: { temperature: 0.7, maxTokens: 3000 },
  envKey: 'GPT_API_KEY',
}));

// --- Plan Generation ---

const planGenerationSchema = z.object({
  goalType: z.enum(['hypertrophy', 'strength', 'maintenance', 'powerbuilding']),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  trainingDaysPerWeek: z.number(),
  maxSessionDuration: z.number(),
  durationWeeks: z.number(),
  includesDeload: z.boolean(),
  squatMax: z.number(),
  benchMax: z.number(),
  deadliftMax: z.number(),
  weakPoints: z.array(z.string()).optional(),
  availableEquipment: z.array(z.string()).optional(),
  limitations: z.array(z.string()).optional(),
  volumeTolerance: z.enum(['low', 'medium', 'high']).optional(),
  intensityPreference: z.enum(['conservative', 'moderate', 'aggressive']).optional(),
  progressionStyle: z.enum(['rpe', 'percentage', 'double_progression']).optional(),
  currentBodyweight: z.number().optional(),
  avoidExercises: z.array(z.string()).optional(),
  includeExercises: z.array(z.string()).optional(),
});

/**
 * POST /ai/generate-plan
 * Generate a complete training program using GPT.
 * Provider: GPT (advanced coaching)
 */
aiRoutes.post('/generate-plan', createAIHandler({
  schema: planGenerationSchema,
  createProvider: createGPTProvider,
  buildPrompt: buildPlanGenerationPrompt,
  chatOptions: { temperature: 0.7, maxTokens: 8000 },
  envKey: 'GPT_API_KEY',
}));

// --- Plan Parsing ---

const planParseSchema = z.object({
  planText: z.string().min(10),
});

/**
 * POST /ai/parse-plan
 * Parse a free-text training plan (pasted from external AI) into structured JSON.
 * Provider: GPT
 */
aiRoutes.post('/parse-plan', createAIHandler({
  schema: planParseSchema,
  createProvider: createGPTProvider,
  buildPrompt: buildPlanParsePrompt,
  chatOptions: { temperature: 0.3, maxTokens: 8000 },
  envKey: 'GPT_API_KEY',
}));
