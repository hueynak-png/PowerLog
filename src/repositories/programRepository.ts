import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';

import type {
  Program,
  ProgramWeek,
  ProgramDay,
  PlannedExercise,
  CurrentCycle,
  ProgramSource,
  CyclePhase,
} from '@/src/domain/types';
import generateId from '@/src/lib/uuid';

// --- Row types ---

interface ProgramRow {
  id: string;
  name: string;
  type: string;
  goal: string;
  source: string;
  duration_weeks: number;
  includes_deload: number;
  description: string | null;
  created_at: string;
}

interface ProgramWeekRow {
  id: string;
  program_id: string;
  week_number: number;
  phase: string;
  focus: string | null;
  notes: string | null;
}

interface ProgramDayRow {
  id: string;
  program_week_id: string;
  day_number: number;
  title: string;
  main_focus: string | null;
  estimated_duration: number | null;
  scheduled_date: string | null;
}

interface PlannedExerciseRow {
  id: string;
  program_day_id: string;
  exercise_id: string;
  order_index: number;
  target_sets: number | null;
  target_reps: number | null;
  target_load: number | null;
  target_rpe: number | null;
  target_percent: number | null;
  accessory_category: string | null;
  notes: string | null;
}

interface CurrentCycleRow {
  id: string;
  program_id: string;
  goal: string;
  current_week: number;
  current_phase: string;
  training_days_per_week: number;
  started_at: string;
  is_active: number;
}

// --- Mappers ---

const toProgram = (row: ProgramRow): Program => ({
  id: row.id,
  name: row.name,
  type: row.type,
  goal: row.goal,
  source: row.source as ProgramSource,
  durationWeeks: row.duration_weeks,
  includesDeload: row.includes_deload === 1,
  description: row.description ?? undefined,
  createdAt: row.created_at,
});

const toProgramWeek = (row: ProgramWeekRow): ProgramWeek => ({
  id: row.id,
  programId: row.program_id,
  weekNumber: row.week_number,
  phase: row.phase as CyclePhase,
  focus: row.focus ?? undefined,
  notes: row.notes ?? undefined,
});

const toProgramDay = (row: ProgramDayRow): ProgramDay => ({
  id: row.id,
  programWeekId: row.program_week_id,
  dayNumber: row.day_number,
  title: row.title,
  mainFocus: row.main_focus ?? undefined,
  estimatedDuration: row.estimated_duration ?? undefined,
  scheduledDate: row.scheduled_date ?? undefined,
});

const toPlannedExercise = (row: PlannedExerciseRow): PlannedExercise => ({
  id: row.id,
  programDayId: row.program_day_id,
  exerciseId: row.exercise_id,
  orderIndex: row.order_index,
  targetSets: row.target_sets ?? undefined,
  targetReps: row.target_reps ?? undefined,
  targetLoad: row.target_load ?? undefined,
  targetRpe: row.target_rpe ?? undefined,
  targetPercent: row.target_percent ?? undefined,
  accessoryCategory: row.accessory_category ?? undefined,
  notes: row.notes ?? undefined,
});

const toCurrentCycle = (row: CurrentCycleRow): CurrentCycle => ({
  id: row.id,
  programId: row.program_id,
  goal: row.goal,
  currentWeek: row.current_week,
  currentPhase: row.current_phase as CyclePhase,
  trainingDaysPerWeek: row.training_days_per_week,
  startedAt: row.started_at,
  isActive: row.is_active === 1,
});

// --- Programs ---

export const createProgram = async (
  db: SQLiteDatabase,
  program: Omit<Program, 'id'>,
): Promise<Program> => {
  const id = generateId();

  await db.runAsync(
    `INSERT INTO programs (
      id, name, type, goal, source, duration_weeks,
      includes_deload, description, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      program.name,
      program.type,
      program.goal,
      program.source,
      program.durationWeeks,
      program.includesDeload ? 1 : 0,
      program.description ?? null,
      program.createdAt,
    ],
  );

  return { id, ...program };
};

export const getPrograms = async (db: SQLiteDatabase): Promise<Program[]> => {
  const rows = await db.getAllAsync<ProgramRow>(
    'SELECT * FROM programs ORDER BY created_at DESC',
  );
  return rows.map(toProgram);
};

export const getProgram = async (
  db: SQLiteDatabase,
  id: string,
): Promise<Program | null> => {
  const row = await db.getFirstAsync<ProgramRow>(
    'SELECT * FROM programs WHERE id = ?',
    [id],
  );
  return row ? toProgram(row) : null;
};

export const deleteProgram = async (
  db: SQLiteDatabase,
  id: string,
): Promise<void> => {
  const weeks = await getProgramWeeks(db, id);

  for (const week of weeks) {
    const days = await getProgramDays(db, week.id);

    for (const day of days) {
      await db.runAsync(
        'DELETE FROM planned_exercises WHERE program_day_id = ?',
        [day.id],
      );
    }

    await db.runAsync(
      'DELETE FROM program_days WHERE program_week_id = ?',
      [week.id],
    );
  }

  await db.runAsync('DELETE FROM program_weeks WHERE program_id = ?', [id]);
  await db.runAsync('DELETE FROM programs WHERE id = ?', [id]);
};

// --- Program Weeks ---

export const createProgramWeek = async (
  db: SQLiteDatabase,
  week: Omit<ProgramWeek, 'id'>,
): Promise<ProgramWeek> => {
  const id = generateId();

  await db.runAsync(
    `INSERT INTO program_weeks (
      id, program_id, week_number, phase, focus, notes
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      id,
      week.programId,
      week.weekNumber,
      week.phase,
      week.focus ?? null,
      week.notes ?? null,
    ],
  );

  return { id, ...week };
};

export const getProgramWeeks = async (
  db: SQLiteDatabase,
  programId: string,
): Promise<ProgramWeek[]> => {
  const rows = await db.getAllAsync<ProgramWeekRow>(
    'SELECT * FROM program_weeks WHERE program_id = ? ORDER BY week_number',
    [programId],
  );
  return rows.map(toProgramWeek);
};

// --- Program Days ---

export const createProgramDay = async (
  db: SQLiteDatabase,
  day: Omit<ProgramDay, 'id'>,
): Promise<ProgramDay> => {
  const id = generateId();

  await db.runAsync(
    `INSERT INTO program_days (
      id, program_week_id, day_number, title,
      main_focus, estimated_duration, scheduled_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      day.programWeekId,
      day.dayNumber,
      day.title,
      day.mainFocus ?? null,
      day.estimatedDuration ?? null,
      day.scheduledDate ?? null,
    ],
  );

  return { id, ...day };
};

export const getProgramDays = async (
  db: SQLiteDatabase,
  programWeekId: string,
): Promise<ProgramDay[]> => {
  const rows = await db.getAllAsync<ProgramDayRow>(
    'SELECT * FROM program_days WHERE program_week_id = ? ORDER BY day_number',
    [programWeekId],
  );
  return rows.map(toProgramDay);
};

// --- Planned Exercises ---

export const createPlannedExercise = async (
  db: SQLiteDatabase,
  ex: Omit<PlannedExercise, 'id'>,
): Promise<PlannedExercise> => {
  const id = generateId();

  await db.runAsync(
    `INSERT INTO planned_exercises (
      id, program_day_id, exercise_id, order_index,
      target_sets, target_reps, target_load, target_rpe,
      target_percent, accessory_category, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      ex.programDayId,
      ex.exerciseId,
      ex.orderIndex,
      ex.targetSets ?? null,
      ex.targetReps ?? null,
      ex.targetLoad ?? null,
      ex.targetRpe ?? null,
      ex.targetPercent ?? null,
      ex.accessoryCategory ?? null,
      ex.notes ?? null,
    ],
  );

  return { id, ...ex };
};

export const getPlannedExercises = async (
  db: SQLiteDatabase,
  programDayId: string,
): Promise<PlannedExercise[]> => {
  const rows = await db.getAllAsync<PlannedExerciseRow>(
    'SELECT * FROM planned_exercises WHERE program_day_id = ? ORDER BY order_index',
    [programDayId],
  );
  return rows.map(toPlannedExercise);
};

// --- Current Cycle ---

export const getCurrentCycle = async (
  db: SQLiteDatabase,
): Promise<CurrentCycle | null> => {
  const row = await db.getFirstAsync<CurrentCycleRow>(
    'SELECT * FROM current_cycle WHERE is_active = 1 LIMIT 1',
  );
  return row ? toCurrentCycle(row) : null;
};

export const setCurrentCycle = async (
  db: SQLiteDatabase,
  cycle: Omit<CurrentCycle, 'id'>,
): Promise<CurrentCycle> => {
  await deactivateCurrentCycle(db);

  const id = generateId();

  await db.runAsync(
    `INSERT INTO current_cycle (
      id, program_id, goal, current_week, current_phase,
      training_days_per_week, started_at, is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      cycle.programId,
      cycle.goal,
      cycle.currentWeek,
      cycle.currentPhase,
      cycle.trainingDaysPerWeek,
      cycle.startedAt,
      cycle.isActive ? 1 : 0,
    ],
  );

  return { id, ...cycle };
};

export const updateCurrentCycle = async (
  db: SQLiteDatabase,
  id: string,
  updates: Partial<CurrentCycle>,
): Promise<void> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (updates.goal !== undefined) {
    fields.push('goal = ?');
    values.push(updates.goal);
  }
  if (updates.currentWeek !== undefined) {
    fields.push('current_week = ?');
    values.push(updates.currentWeek);
  }
  if (updates.currentPhase !== undefined) {
    fields.push('current_phase = ?');
    values.push(updates.currentPhase);
  }
  if (updates.trainingDaysPerWeek !== undefined) {
    fields.push('training_days_per_week = ?');
    values.push(updates.trainingDaysPerWeek);
  }
  if (updates.isActive !== undefined) {
    fields.push('is_active = ?');
    values.push(updates.isActive ? 1 : 0);
  }

  if (fields.length === 0) return;

  values.push(id);
  await db.runAsync(
    `UPDATE current_cycle SET ${fields.join(', ')} WHERE id = ?`,
    values,
  );
};

export const deactivateCurrentCycle = async (
  db: SQLiteDatabase,
): Promise<void> => {
  await db.runAsync('UPDATE current_cycle SET is_active = 0 WHERE is_active = 1');
};
