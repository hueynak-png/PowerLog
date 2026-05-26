import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';

import type { AiSummaryStatus, WorkoutExercise, WorkoutSession, WorkoutSet } from '@/src/domain/types';
import generateId from '@/src/lib/uuid';

interface WorkoutSessionRow {
  id: string;
  program_day_id: string | null;
  date: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  completion_rate: number | null;
  total_volume: number | null;
  notes: string | null;
  ai_summary_status: AiSummaryStatus;
}

interface WorkoutExerciseRow {
  id: string;
  workout_session_id: string;
  exercise_id: string;
  planned_exercise_id: string | null;
  order_index: number;
  notes: string | null;
}

interface WorkoutSetRow {
  id: string;
  workout_exercise_id: string;
  set_number: number;
  planned_weight: number | null;
  actual_weight: number | null;
  planned_reps: number | null;
  actual_reps: number | null;
  planned_rpe: number | null;
  actual_rpe: number | null;
  completed: number;
  is_warmup: number;
  notes: string | null;
}

const toOptional = <T>(value: T | null | undefined): T | undefined => value ?? undefined;

const toWorkoutSession = (row: WorkoutSessionRow): WorkoutSession => ({
  id: row.id,
  programDayId: toOptional(row.program_day_id),
  date: row.date,
  startedAt: row.started_at,
  endedAt: toOptional(row.ended_at),
  durationSeconds: toOptional(row.duration_seconds),
  completionRate: toOptional(row.completion_rate),
  totalVolume: toOptional(row.total_volume),
  notes: toOptional(row.notes),
  aiSummaryStatus: row.ai_summary_status,
});

const toWorkoutExercise = (row: WorkoutExerciseRow): WorkoutExercise => ({
  id: row.id,
  workoutSessionId: row.workout_session_id,
  exerciseId: row.exercise_id,
  plannedExerciseId: toOptional(row.planned_exercise_id),
  orderIndex: row.order_index,
  notes: toOptional(row.notes),
});

const toWorkoutSet = (row: WorkoutSetRow): WorkoutSet => ({
  id: row.id,
  workoutExerciseId: row.workout_exercise_id,
  setNumber: row.set_number,
  plannedWeight: toOptional(row.planned_weight),
  actualWeight: toOptional(row.actual_weight),
  plannedReps: toOptional(row.planned_reps),
  actualReps: toOptional(row.actual_reps),
  plannedRpe: toOptional(row.planned_rpe),
  actualRpe: toOptional(row.actual_rpe),
  completed: row.completed === 1,
  isWarmup: row.is_warmup === 1,
  notes: toOptional(row.notes),
});

export const createWorkoutSession = async (
  db: SQLiteDatabase,
  session: Omit<WorkoutSession, 'id'>,
): Promise<WorkoutSession> => {
  const savedSession: WorkoutSession = {
    ...session,
    id: generateId(),
  };

  await db.runAsync(
    `INSERT INTO workout_sessions (
      id,
      program_day_id,
      date,
      started_at,
      ended_at,
      duration_seconds,
      completion_rate,
      total_volume,
      notes,
      ai_summary_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      savedSession.id,
      savedSession.programDayId ?? null,
      savedSession.date,
      savedSession.startedAt,
      savedSession.endedAt ?? null,
      savedSession.durationSeconds ?? null,
      savedSession.completionRate ?? null,
      savedSession.totalVolume ?? null,
      savedSession.notes ?? null,
      savedSession.aiSummaryStatus,
    ],
  );

  return savedSession;
};

export const getWorkoutSession = async (db: SQLiteDatabase, id: string): Promise<WorkoutSession | null> => {
  const row = await db.getFirstAsync<WorkoutSessionRow>('SELECT * FROM workout_sessions WHERE id = ? LIMIT 1', [id]);

  return row ? toWorkoutSession(row) : null;
};

export const getRecentWorkouts = async (db: SQLiteDatabase, limit = 10): Promise<WorkoutSession[]> => {
  const rows = await db.getAllAsync<WorkoutSessionRow>(
    'SELECT * FROM workout_sessions ORDER BY date DESC LIMIT ?',
    [limit],
  );

  return rows.map(toWorkoutSession);
};

export const updateWorkoutSession = async (
  db: SQLiteDatabase,
  id: string,
  updates: Partial<WorkoutSession>,
): Promise<void> => {
  const existing = await getWorkoutSession(db, id);

  if (!existing) {
    return;
  }

  const next: WorkoutSession = { ...existing, ...updates, id };

  await db.runAsync(
    `UPDATE workout_sessions SET
      program_day_id = ?,
      date = ?,
      started_at = ?,
      ended_at = ?,
      duration_seconds = ?,
      completion_rate = ?,
      total_volume = ?,
      notes = ?,
      ai_summary_status = ?
    WHERE id = ?`,
    [
      next.programDayId ?? null,
      next.date,
      next.startedAt,
      next.endedAt ?? null,
      next.durationSeconds ?? null,
      next.completionRate ?? null,
      next.totalVolume ?? null,
      next.notes ?? null,
      next.aiSummaryStatus,
      id,
    ],
  );
};

export const completeWorkoutSession = async (
  db: SQLiteDatabase,
  id: string,
  endedAt: string,
  durationSeconds: number,
  completionRate: number,
  totalVolume: number,
): Promise<void> => {
  await db.runAsync(
    `UPDATE workout_sessions SET
      ended_at = ?,
      duration_seconds = ?,
      completion_rate = ?,
      total_volume = ?
    WHERE id = ?`,
    [endedAt, durationSeconds, completionRate, totalVolume, id],
  );
};

export const addWorkoutExercise = async (
  db: SQLiteDatabase,
  exercise: Omit<WorkoutExercise, 'id'>,
): Promise<WorkoutExercise> => {
  const savedExercise: WorkoutExercise = {
    ...exercise,
    id: generateId(),
  };

  await db.runAsync(
    `INSERT INTO workout_exercises (
      id,
      workout_session_id,
      exercise_id,
      planned_exercise_id,
      order_index,
      notes
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      savedExercise.id,
      savedExercise.workoutSessionId,
      savedExercise.exerciseId,
      savedExercise.plannedExerciseId ?? null,
      savedExercise.orderIndex,
      savedExercise.notes ?? null,
    ],
  );

  return savedExercise;
};

export const getWorkoutExercises = async (db: SQLiteDatabase, sessionId: string): Promise<WorkoutExercise[]> => {
  const rows = await db.getAllAsync<WorkoutExerciseRow>(
    'SELECT * FROM workout_exercises WHERE workout_session_id = ? ORDER BY order_index ASC',
    [sessionId],
  );

  return rows.map(toWorkoutExercise);
};

export const updateWorkoutExercise = async (
  db: SQLiteDatabase,
  id: string,
  updates: Partial<WorkoutExercise>,
): Promise<void> => {
  const existingRow = await db.getFirstAsync<WorkoutExerciseRow>('SELECT * FROM workout_exercises WHERE id = ? LIMIT 1', [id]);

  if (!existingRow) {
    return;
  }

  const next: WorkoutExercise = { ...toWorkoutExercise(existingRow), ...updates, id };

  await db.runAsync(
    `UPDATE workout_exercises SET
      workout_session_id = ?,
      exercise_id = ?,
      planned_exercise_id = ?,
      order_index = ?,
      notes = ?
    WHERE id = ?`,
    [
      next.workoutSessionId,
      next.exerciseId,
      next.plannedExerciseId ?? null,
      next.orderIndex,
      next.notes ?? null,
      id,
    ],
  );
};

export const deleteWorkoutExercise = async (db: SQLiteDatabase, id: string): Promise<void> => {
  await db.runAsync('DELETE FROM workout_sets WHERE workout_exercise_id = ?', [id]);
  await db.runAsync('DELETE FROM workout_exercises WHERE id = ?', [id]);
};

export const addWorkoutSet = async (db: SQLiteDatabase, set: Omit<WorkoutSet, 'id'>): Promise<WorkoutSet> => {
  const savedSet: WorkoutSet = {
    ...set,
    id: generateId(),
  };

  await db.runAsync(
    `INSERT INTO workout_sets (
      id,
      workout_exercise_id,
      set_number,
      planned_weight,
      actual_weight,
      planned_reps,
      actual_reps,
      planned_rpe,
      actual_rpe,
      completed,
      is_warmup,
      notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      savedSet.id,
      savedSet.workoutExerciseId,
      savedSet.setNumber,
      savedSet.plannedWeight ?? null,
      savedSet.actualWeight ?? null,
      savedSet.plannedReps ?? null,
      savedSet.actualReps ?? null,
      savedSet.plannedRpe ?? null,
      savedSet.actualRpe ?? null,
      savedSet.completed ? 1 : 0,
      savedSet.isWarmup ? 1 : 0,
      savedSet.notes ?? null,
    ],
  );

  return savedSet;
};

export const getWorkoutSets = async (db: SQLiteDatabase, workoutExerciseId: string): Promise<WorkoutSet[]> => {
  const rows = await db.getAllAsync<WorkoutSetRow>(
    'SELECT * FROM workout_sets WHERE workout_exercise_id = ? ORDER BY set_number ASC',
    [workoutExerciseId],
  );

  return rows.map(toWorkoutSet);
};

export const updateWorkoutSet = async (
  db: SQLiteDatabase,
  id: string,
  updates: Partial<WorkoutSet>,
): Promise<void> => {
  const existingRow = await db.getFirstAsync<WorkoutSetRow>('SELECT * FROM workout_sets WHERE id = ? LIMIT 1', [id]);

  if (!existingRow) {
    return;
  }

  const next: WorkoutSet = { ...toWorkoutSet(existingRow), ...updates, id };

  await db.runAsync(
    `UPDATE workout_sets SET
      workout_exercise_id = ?,
      set_number = ?,
      planned_weight = ?,
      actual_weight = ?,
      planned_reps = ?,
      actual_reps = ?,
      planned_rpe = ?,
      actual_rpe = ?,
      completed = ?,
      is_warmup = ?,
      notes = ?
    WHERE id = ?`,
    [
      next.workoutExerciseId,
      next.setNumber,
      next.plannedWeight ?? null,
      next.actualWeight ?? null,
      next.plannedReps ?? null,
      next.actualReps ?? null,
      next.plannedRpe ?? null,
      next.actualRpe ?? null,
      next.completed ? 1 : 0,
      next.isWarmup ? 1 : 0,
      next.notes ?? null,
      id,
    ],
  );
};

export const deleteWorkoutSet = async (db: SQLiteDatabase, id: string): Promise<void> => {
  await db.runAsync('DELETE FROM workout_sets WHERE id = ?', [id]);
};

export const getSessionSets = async (db: SQLiteDatabase, sessionId: string): Promise<WorkoutSet[]> => {
  const rows = await db.getAllAsync<WorkoutSetRow>(
    `SELECT workout_sets.*
    FROM workout_sets
    INNER JOIN workout_exercises ON workout_exercises.id = workout_sets.workout_exercise_id
    WHERE workout_exercises.workout_session_id = ?
    ORDER BY workout_exercises.order_index ASC, workout_sets.set_number ASC`,
    [sessionId],
  );

  return rows.map(toWorkoutSet);
};

export const deleteWorkoutSession = async (db: SQLiteDatabase, sessionId: string): Promise<void> => {
  // Delete sets first (foreign key constraint)
  await db.runAsync(
    `DELETE FROM workout_sets WHERE workout_exercise_id IN (
      SELECT id FROM workout_exercises WHERE workout_session_id = ?
    )`,
    [sessionId],
  );
  // Delete exercises
  await db.runAsync('DELETE FROM workout_exercises WHERE workout_session_id = ?', [sessionId]);
  // Delete session
  await db.runAsync('DELETE FROM workout_sessions WHERE id = ?', [sessionId]);
};

export const getWorkoutsByMonth = async (db: SQLiteDatabase, year: number, month: number): Promise<WorkoutSession[]> => {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endMonth = month === 12 ? 1 : month + 1;
  const endYear = month === 12 ? year + 1 : year;
  const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;

  const rows = await db.getAllAsync<WorkoutSessionRow>(
    'SELECT * FROM workout_sessions WHERE date >= ? AND date < ? ORDER BY date ASC',
    [startDate, endDate],
  );

  return rows.map(toWorkoutSession);
};

export const getWorkoutsByDate = async (db: SQLiteDatabase, date: string): Promise<WorkoutSession[]> => {
  const rows = await db.getAllAsync<WorkoutSessionRow>(
    'SELECT * FROM workout_sessions WHERE date = ? ORDER BY started_at DESC',
    [date],
  );

  return rows.map(toWorkoutSession);
};
