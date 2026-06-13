import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';

import type {
  Program,
  ProgramWeek,
  ProgramDay,
  PlannedExercise,
  PlannedSet,
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
  template_key: string | null;
  instantiation_strategy: string | null;
  requires_instantiation: number;
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
  target_rep_range: string | null;
  target_load: number | null;
  target_rpe: number | null;
  target_percent: number | null;
  accessory_category: string | null;
  notes: string | null;
}

interface PlannedSetRow {
  id: string;
  planned_exercise_id: string;
  set_number: number;
  set_label: string | null;
  target_reps: number | null;
  target_rep_range: string | null;
  target_load: number | null;
  target_rpe: number | null;
  target_percent: number | null;
  base_target_load: number | null;
  adjustment_factor: number | null;
  adjustment_reason: string | null;
  adjustment_source: string | null;
  adjustment_created_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
}

interface CurrentCycleRow {
  id: string;
  program_id: string;
  goal: string;
  current_week: number;
  current_day: number;
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
  templateKey: row.template_key ?? undefined,
  instantiationStrategy: row.instantiation_strategy ?? undefined,
  requiresInstantiation: row.requires_instantiation === 1,
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
  targetRepRange: row.target_rep_range ?? undefined,
  targetLoad: row.target_load ?? undefined,
  targetRpe: row.target_rpe ?? undefined,
  targetPercent: row.target_percent ?? undefined,
  accessoryCategory: row.accessory_category ?? undefined,
  notes: row.notes ?? undefined,
});

const toPlannedSet = (row: PlannedSetRow): PlannedSet => ({
  id: row.id,
  plannedExerciseId: row.planned_exercise_id,
  setNumber: row.set_number,
  setLabel: row.set_label ?? undefined,
  targetReps: row.target_reps ?? undefined,
  targetRepRange: row.target_rep_range ?? undefined,
  targetLoad: row.target_load ?? undefined,
  targetRpe: row.target_rpe ?? undefined,
  targetPercent: row.target_percent ?? undefined,
  baseTargetLoad: row.base_target_load ?? undefined,
  adjustmentFactor: row.adjustment_factor ?? undefined,
  adjustmentReason: row.adjustment_reason ?? undefined,
  adjustmentSource: row.adjustment_source ?? undefined,
  adjustmentCreatedAt: row.adjustment_created_at ?? undefined,
  notes: row.notes ?? undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at ?? undefined,
});

const toCurrentCycle = (row: CurrentCycleRow): CurrentCycle => ({
  id: row.id,
  programId: row.program_id,
  goal: row.goal,
  currentWeek: row.current_week,
  currentDay: row.current_day,
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
      includes_deload, description, template_key, instantiation_strategy,
      requires_instantiation, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      program.name,
      program.type,
      program.goal,
      program.source,
      program.durationWeeks,
      program.includesDeload ? 1 : 0,
      program.description ?? null,
      program.templateKey ?? null,
      program.instantiationStrategy ?? null,
      program.requiresInstantiation ? 1 : 0,
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
        `DELETE FROM planned_sets WHERE planned_exercise_id IN (
          SELECT id FROM planned_exercises WHERE program_day_id = ?
        )`,
        [day.id],
      );
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
      target_sets, target_reps, target_rep_range, target_load, target_rpe,
      target_percent, accessory_category, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      ex.programDayId,
      ex.exerciseId,
      ex.orderIndex,
      ex.targetSets ?? null,
      ex.targetReps ?? null,
      ex.targetRepRange ?? null,
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

// --- Planned Sets ---

export const createPlannedSets = async (
  db: SQLiteDatabase,
  plannedExerciseId: string,
  sets: Array<Omit<PlannedSet, 'id' | 'plannedExerciseId' | 'createdAt' | 'updatedAt'>>,
): Promise<PlannedSet[]> => {
  const now = new Date().toISOString();
  const results: PlannedSet[] = [];

  for (const set of sets) {
    const id = generateId();
    const plannedSet: PlannedSet = {
      id,
      plannedExerciseId,
      setNumber: set.setNumber,
      setLabel: set.setLabel,
      targetReps: set.targetReps,
      targetRepRange: set.targetRepRange,
      targetLoad: set.targetLoad,
      targetRpe: set.targetRpe,
      targetPercent: set.targetPercent,
      notes: set.notes,
      createdAt: now,
    };

    await db.runAsync(
      `INSERT INTO planned_sets (
        id, planned_exercise_id, set_number, set_label,
        target_reps, target_rep_range, target_load, target_rpe,
        target_percent, base_target_load, adjustment_factor,
        adjustment_reason, adjustment_source, adjustment_created_at,
        notes, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        plannedSet.id,
        plannedSet.plannedExerciseId,
        plannedSet.setNumber,
        plannedSet.setLabel ?? null,
        plannedSet.targetReps ?? null,
        plannedSet.targetRepRange ?? null,
        plannedSet.targetLoad ?? null,
        plannedSet.targetRpe ?? null,
        plannedSet.targetPercent ?? null,
        plannedSet.baseTargetLoad ?? null,
        plannedSet.adjustmentFactor ?? null,
        plannedSet.adjustmentReason ?? null,
        plannedSet.adjustmentSource ?? null,
        plannedSet.adjustmentCreatedAt ?? null,
        plannedSet.notes ?? null,
        plannedSet.createdAt,
      ],
    );

    results.push(plannedSet);
  }

  return results;
};

export const getPlannedSets = async (
  db: SQLiteDatabase,
  plannedExerciseId: string,
): Promise<PlannedSet[]> => {
  const rows = await db.getAllAsync<PlannedSetRow>(
    'SELECT * FROM planned_sets WHERE planned_exercise_id = ? ORDER BY set_number',
    [plannedExerciseId],
  );
  return rows.map(toPlannedSet);
};

export const getPlannedSetsForProgram = async (
  db: SQLiteDatabase,
  programId: string,
  limit?: number,
): Promise<PlannedSet[]> => {
  const limitClause = limit ? `LIMIT ${limit}` : '';
  const rows = await db.getAllAsync<PlannedSetRow>(
    `SELECT ps.* FROM planned_sets ps
     INNER JOIN planned_exercises pe ON pe.id = ps.planned_exercise_id
     INNER JOIN program_days pd ON pd.id = pe.program_day_id
     INNER JOIN program_weeks pw ON pw.id = pd.program_week_id
     WHERE pw.program_id = ?
     ORDER BY pw.week_number, pd.day_number, pe.order_index, ps.set_number
     ${limitClause}`,
    [programId],
  );
  return rows.map(toPlannedSet);
};

export const updatePlannedSetLoad = async (
  db: SQLiteDatabase,
  setId: string,
  targetLoad: number,
  adjustmentFactor: number,
  adjustmentReason: string,
  adjustmentSource: string,
): Promise<void> => {
  const now = new Date().toISOString();
  await db.runAsync(
    `UPDATE planned_sets SET
      target_load = ?,
      adjustment_factor = ?,
      adjustment_reason = ?,
      adjustment_source = ?,
      adjustment_created_at = ?
    WHERE id = ?`,
    [targetLoad, adjustmentFactor, adjustmentReason, adjustmentSource, now, setId],
  );
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
      id, program_id, goal, current_week, current_day, current_phase,
      training_days_per_week, started_at, is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      cycle.programId,
      cycle.goal,
      cycle.currentWeek,
      cycle.currentDay,
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
  if (updates.currentDay !== undefined) {
    fields.push('current_day = ?');
    values.push(updates.currentDay);
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

// --- Cycle Day Navigation ---

export const getProgramWeek = async (
  db: SQLiteDatabase,
  programId: string,
  weekNumber: number,
): Promise<ProgramWeek | null> => {
  const row = await db.getFirstAsync<ProgramWeekRow>(
    'SELECT * FROM program_weeks WHERE program_id = ? AND week_number = ? LIMIT 1',
    [programId, weekNumber],
  );
  return row ? toProgramWeek(row) : null;
};

export const getProgramDayByWeekDay = async (
  db: SQLiteDatabase,
  programId: string,
  weekNumber: number,
  dayNumber: number,
): Promise<ProgramDay | null> => {
  const row = await db.getFirstAsync<ProgramDayRow>(
    `SELECT pd.* FROM program_days pd
     JOIN program_weeks pw ON pw.id = pd.program_week_id
     WHERE pw.program_id = ? AND pw.week_number = ? AND pd.day_number = ?
     LIMIT 1`,
    [programId, weekNumber, dayNumber],
  );
  return row ? toProgramDay(row) : null;
};

export const getAvailableTrainingDays = async (
  db: SQLiteDatabase,
  programId: string,
): Promise<ProgramDay[]> => {
  // Try week 1 first, then fall back to earliest available week
  let days = await getProgramDaysForWeek(db, programId, 1);
  if (days.length > 0) return days;

  // Scan all weeks for the first one with days
  const weeks = await getProgramWeeks(db, programId);
  for (const week of weeks) {
    days = await getProgramDaysForWeek(db, programId, week.weekNumber);
    if (days.length > 0) return days;
  }

  return [];
};

export const scheduleProgramDays = async (
  db: SQLiteDatabase,
  programId: string,
  startDate: string,
  scheduleOffsets: number[] = [0, 1, 3, 4],
): Promise<number> => {
  const startDateObj = new Date(startDate + 'T00:00:00');
  const weeks = await getProgramWeeks(db, programId);
  let updated = 0;

  for (const week of weeks) {
    const days = await getProgramDays(db, week.id);
    const weekOffset = (week.weekNumber - 1) * 7;

    for (const day of days) {
      const dayOffset = scheduleOffsets[(day.dayNumber - 1) % scheduleOffsets.length] ?? (day.dayNumber - 1);
      const scheduledDate = new Date(startDateObj);
      scheduledDate.setDate(scheduledDate.getDate() + weekOffset + dayOffset);
      const dateStr = scheduledDate.toISOString().slice(0, 10);

      await db.runAsync(
        `UPDATE program_days SET scheduled_date = ? WHERE id = ?`,
        [dateStr, day.id],
      );
      updated++;
    }
  }

  return updated;
};

export const getProgramDaysForWeek = async (
  db: SQLiteDatabase,
  programId: string,
  weekNumber: number,
): Promise<ProgramDay[]> => {
  const rows = await db.getAllAsync<ProgramDayRow>(
    `SELECT pd.* FROM program_days pd
     JOIN program_weeks pw ON pw.id = pd.program_week_id
     WHERE pw.program_id = ? AND pw.week_number = ?
     ORDER BY pd.day_number`,
    [programId, weekNumber],
  );
  return rows.map(toProgramDay);
};

export const getScheduledProgramDaysByDate = async (
  db: SQLiteDatabase,
  date: string,
): Promise<Array<ProgramDay & { programName: string; programId: string; weekNumber: number }>> => {
  const rows = await db.getAllAsync<any>(
    `SELECT pd.*, p.name as program_name, p.id as program_id, pw.week_number
     FROM program_days pd
     INNER JOIN program_weeks pw ON pw.id = pd.program_week_id
     INNER JOIN programs p ON p.id = pw.program_id
     WHERE pd.scheduled_date = ?
     ORDER BY pd.day_number`,
    [date],
  );
  return rows.map((row: any) => ({
    ...toProgramDay(row),
    programName: row.program_name,
    programId: row.program_id,
    weekNumber: row.week_number,
  }));
};

export const advanceCycleDay = async (
  db: SQLiteDatabase,
): Promise<void> => {
  const cycle = await getCurrentCycle(db);
  if (!cycle) return;

  // Try next day in current week
  const nextDay = await getProgramDayByWeekDay(db, cycle.programId, cycle.currentWeek, cycle.currentDay + 1);
  if (nextDay) {
    await updateCurrentCycle(db, cycle.id, { currentDay: cycle.currentDay + 1 });
    return;
  }

  // Try first day of next week
  const nextWeekDay = await getProgramDayByWeekDay(db, cycle.programId, cycle.currentWeek + 1, 1);
  if (nextWeekDay) {
    const nextWeek = await getProgramWeek(db, cycle.programId, cycle.currentWeek + 1);
    await updateCurrentCycle(db, cycle.id, {
      currentWeek: cycle.currentWeek + 1,
      currentDay: 1,
      currentPhase: nextWeek?.phase ?? cycle.currentPhase,
    });
    return;
  }

  // Program complete — no more days
  await deactivateCurrentCycle(db);
};
