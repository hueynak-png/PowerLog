import { Hono } from 'hono';
import { z } from 'zod';

import type { Env } from '../index';
import { buildDailyStrengthAnalysisPrompt } from '../prompts/dailyStrengthAnalysis';
import { buildSessionSummaryPrompt } from '../prompts/sessionSummary';
import { buildWorkoutSuggestionPrompt, buildNutritionTagsPrompt } from '../prompts/workoutSuggestion';
import { buildWeeklyReviewPrompt } from '../prompts/weeklyReview';
import { buildPlanGenerationPrompt } from '../prompts/planGeneration';
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
aiRoutes.post('/session-summary', async (c) => {
  const body = await c.req.json();
  const parsed = sessionSummarySchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: 'Invalid request', details: parsed.error.issues }, 400);
  }

  const provider = createDeepSeekProvider(c.env.DEEPSEEK_API_KEY);
  const messages = buildSessionSummaryPrompt(parsed.data);

  try {
    const response = await provider.chat(messages, { temperature: 0.6 });
    const content = JSON.parse(response.content);
    return c.json({ success: true, data: content, usage: response.usage });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ error: 'AI request failed', message }, 500);
  }
});

aiRoutes.post('/daily-strength-analysis', async (c) => {
  const body = await c.req.json();
  const parsed = dailyStrengthAnalysisSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: 'Invalid request', details: parsed.error.issues }, 400);
  }

  const provider = createDeepSeekProvider(c.env.DEEPSEEK_API_KEY);
  const messages = buildDailyStrengthAnalysisPrompt(parsed.data);

  try {
    const response = await provider.chat(messages, { temperature: 0.45, maxTokens: 3000 });
    const content = JSON.parse(response.content);
    return c.json({ success: true, data: content, usage: response.usage });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ error: 'AI request failed', message }, 500);
  }
});

/**
 * POST /ai/workout-suggestion
 * Get AI suggestion during workout for next set.
 * Provider: DeepSeek
 */
aiRoutes.post('/workout-suggestion', async (c) => {
  const body = await c.req.json();
  const parsed = workoutSuggestionSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: 'Invalid request', details: parsed.error.issues }, 400);
  }

  const provider = createDeepSeekProvider(c.env.DEEPSEEK_API_KEY);
  const messages = buildWorkoutSuggestionPrompt(parsed.data);

  try {
    const response = await provider.chat(messages, { temperature: 0.5, maxTokens: 500 });
    const content = JSON.parse(response.content);
    return c.json({ success: true, data: content, usage: response.usage });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ error: 'AI request failed', message }, 500);
  }
});

/**
 * POST /ai/nutrition-tags
 * Generate AI tags for nutrition entry.
 * Provider: DeepSeek
 */
aiRoutes.post('/nutrition-tags', async (c) => {
  const body = await c.req.json();
  const parsed = nutritionTagsSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: 'Invalid request', details: parsed.error.issues }, 400);
  }

  const provider = createDeepSeekProvider(c.env.DEEPSEEK_API_KEY);
  const messages = buildNutritionTagsPrompt(parsed.data);

  try {
    const response = await provider.chat(messages, { temperature: 0.4, maxTokens: 200 });
    const tags = JSON.parse(response.content);
    return c.json({ success: true, data: { tags }, usage: response.usage });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ error: 'AI request failed', message }, 500);
  }
});

/**
 * POST /ai/weekly-review
 * Generate weekly training review and suggestions.
 * Provider: GPT (advanced coaching)
 */
aiRoutes.post('/weekly-review', async (c) => {
  const body = await c.req.json();
  const parsed = weeklyReviewSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: 'Invalid request', details: parsed.error.issues }, 400);
  }

  const provider = createGPTProvider(c.env.GPT_API_KEY);
  const messages = buildWeeklyReviewPrompt(parsed.data);

  try {
    const response = await provider.chat(messages, { temperature: 0.7, maxTokens: 3000 });
    const content = JSON.parse(response.content);
    return c.json({ success: true, data: content, usage: response.usage });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ error: 'AI request failed', message }, 500);
  }
});

// --- Plan Generation ---

const planGenerationSchema = z.object({
  goal: z.string(),
  goalType: z.enum(['hypertrophy', 'strength', 'maintenance', 'powerbuilding']).optional(),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  trainingDaysPerWeek: z.number(),
  maxSessionDuration: z.number(),
  durationWeeks: z.number(),
  includesDeload: z.boolean(),
  squatMax: z.number(),
  benchMax: z.number(),
  deadliftMax: z.number(),
  weakPoints: z.string().optional(),
  availableEquipment: z.string().optional(),
  limitations: z.string().optional(),
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
aiRoutes.post('/generate-plan', async (c) => {
  const body = await c.req.json();
  const parsed = planGenerationSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: 'Invalid request', details: parsed.error.issues }, 400);
  }

  const provider = createGPTProvider(c.env.GPT_API_KEY);
  const messages = buildPlanGenerationPrompt(parsed.data);

  try {
    const response = await provider.chat(messages, { temperature: 0.7, maxTokens: 8000 });
    const content = JSON.parse(response.content);
    return c.json({ success: true, data: content, usage: response.usage });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ error: 'AI request failed', message }, 500);
  }
});
