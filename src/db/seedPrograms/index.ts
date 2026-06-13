import type { PowerLogDatabase } from '@/src/db/types';

import { archetypePrograms } from './archetypePrograms';
import { bradExcelProgram } from './bradExcelProgram';
import { getExerciseIdMap, resolveExerciseId } from './exerciseResolver';
import type { PlannedExerciseSeed, PlannedSetSeed, ProgramDaySeed, ProgramSeed, ProgramWeekSeed } from './types';

export { archetypePrograms } from './archetypePrograms';
export { bradExcelProgram } from './bradExcelProgram';
export { normalizeExerciseName, resolveExerciseId } from './exerciseResolver';
export type { PlannedExerciseSeed, ProgramDaySeed, ProgramSeed, ProgramWeekSeed } from './types';

const PROGRAM_SEEDS: ProgramSeed[] = [bradExcelProgram, ...archetypePrograms];

const weekId = (programId: string, weekNumber: number): string => `${programId}-week-${String(weekNumber).padStart(2, '0')}`;
const dayId = (programId: string, weekNumber: number, dayNumber: number): string =>
  `${weekId(programId, weekNumber)}-day-${String(dayNumber).padStart(2, '0')}`;
const exerciseId = (programId: string, weekNumber: number, dayNumber: number, orderIndex: number): string =>
  `${dayId(programId, weekNumber, dayNumber)}-exercise-${String(orderIndex).padStart(2, '0')}`;

const countRows = async (db: PowerLogDatabase, sql: string, params: (string | number)[]): Promise<number> => {
  const row = await db.getFirstAsync<{ count: number }>(sql, params);
  return row?.count ?? 0;
};

const expectedDayCount = (program: ProgramSeed): number => program.weeks.reduce((total, week) => total + week.days.length, 0);

const expectedExerciseCount = (program: ProgramSeed): number =>
  program.weeks.reduce((weekTotal, week) => weekTotal + week.days.reduce((dayTotal, day) => dayTotal + day.exercises.length, 0), 0);

const expectedPlannedSetCount = (program: ProgramSeed): number =>
  program.weeks.reduce((weekTotal, week) => weekTotal + week.days.reduce((dayTotal, day) => dayTotal + day.exercises.reduce((exTotal, ex) => exTotal + (ex.sets?.length ?? 0), 0), 0), 0);

const isExistingSeedComplete = async (db: PowerLogDatabase, program: ProgramSeed): Promise<boolean> => {
  const weekCount = await countRows(db, 'SELECT COUNT(*) as count FROM program_weeks WHERE program_id = ?', [program.id]);
  const dayCount = await countRows(
    db,
    `SELECT COUNT(*) as count
     FROM program_days pd
     INNER JOIN program_weeks pw ON pw.id = pd.program_week_id
     WHERE pw.program_id = ?`,
    [program.id],
  );
  const exerciseCount = await countRows(
    db,
    `SELECT COUNT(*) as count
     FROM planned_exercises pe
     INNER JOIN program_days pd ON pd.id = pe.program_day_id
     INNER JOIN program_weeks pw ON pw.id = pd.program_week_id
     WHERE pw.program_id = ?`,
    [program.id],
  );
  const plannedSetCount = await countRows(
    db,
    `SELECT COUNT(*) as count
     FROM planned_sets ps
     INNER JOIN planned_exercises pe ON pe.id = ps.planned_exercise_id
     INNER JOIN program_days pd ON pd.id = pe.program_day_id
     INNER JOIN program_weeks pw ON pw.id = pd.program_week_id
     WHERE pw.program_id = ?`,
    [program.id],
  );

  return weekCount === program.weeks.length
    && dayCount === expectedDayCount(program)
    && exerciseCount === expectedExerciseCount(program)
    && plannedSetCount === expectedPlannedSetCount(program);
};

const deleteSeedProgramRows = async (db: PowerLogDatabase, programId: string): Promise<void> => {
  await db.runAsync(
    `DELETE FROM planned_sets
     WHERE planned_exercise_id IN (
       SELECT pe.id FROM planned_exercises pe
       INNER JOIN program_days pd ON pd.id = pe.program_day_id
       INNER JOIN program_weeks pw ON pw.id = pd.program_week_id
       WHERE pw.program_id = ?
     )`,
    [programId],
  );

  await db.runAsync(
    `DELETE FROM planned_exercises
     WHERE program_day_id IN (
       SELECT pd.id
       FROM program_days pd
       INNER JOIN program_weeks pw ON pw.id = pd.program_week_id
       WHERE pw.program_id = ?
     )`,
    [programId],
  );

  await db.runAsync(
    `DELETE FROM program_days
     WHERE program_week_id IN (
       SELECT id FROM program_weeks WHERE program_id = ?
     )`,
    [programId],
  );

  await db.runAsync('DELETE FROM program_weeks WHERE program_id = ?', [programId]);
  await db.runAsync('DELETE FROM programs WHERE id = ?', [programId]);
};

const validateDay = (program: ProgramSeed, week: ProgramWeekSeed, day: ProgramDaySeed) => {
  if (day.exercises.length === 0) {
    throw new Error(`Seed day has no exercises: ${program.id} week ${week.weekNumber} day ${day.dayNumber}`);
  }
  const seenOrder = new Set<number>();
  for (const exercise of day.exercises) {
    if (seenOrder.has(exercise.orderIndex)) {
      throw new Error(`Duplicate exercise orderIndex in ${program.id} week ${week.weekNumber} day ${day.dayNumber}`);
    }
    seenOrder.add(exercise.orderIndex);
  }
};

const validateProgram = (program: ProgramSeed) => {
  if (program.durationWeeks !== program.weeks.length) {
    throw new Error(`Program ${program.id} durationWeeks=${program.durationWeeks} but has ${program.weeks.length} weeks`);
  }
  if (program.id !== bradExcelProgram.id && (program.durationWeeks < 8 || program.durationWeeks > 12)) {
    throw new Error(`Generated template must be 8-12 weeks: ${program.id}`);
  }
  const seenWeeks = new Set<number>();
  for (const week of program.weeks) {
    if (seenWeeks.has(week.weekNumber)) throw new Error(`Duplicate week ${week.weekNumber} in ${program.id}`);
    seenWeeks.add(week.weekNumber);
    const seenDays = new Set<number>();
    for (const day of week.days) {
      if (seenDays.has(day.dayNumber)) throw new Error(`Duplicate day ${day.dayNumber} in ${program.id} week ${week.weekNumber}`);
      seenDays.add(day.dayNumber);
      validateDay(program, week, day);
    }
  }
};

export const getProgramSeeds = (): ProgramSeed[] => PROGRAM_SEEDS;

export const seedPrograms = async (db: PowerLogDatabase): Promise<void> => {
  const exerciseMap = await getExerciseIdMap(db);

  for (const program of PROGRAM_SEEDS) {
    validateProgram(program);

    const existing = await db.getFirstAsync<{ id: string }>('SELECT id FROM programs WHERE id = ? LIMIT 1', [program.id]);
    if (existing) {
      if (await isExistingSeedComplete(db, program)) continue;
      await deleteSeedProgramRows(db, program.id);
    }

    await db.runAsync(
      `INSERT INTO programs (id, name, type, goal, source, duration_weeks, includes_deload, description, template_key, instantiation_strategy, requires_instantiation, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        program.id,
        program.name,
        program.type,
        program.goal,
        program.source,
        program.durationWeeks,
        program.includesDeload ? 1 : 0,
        program.description,
        program.templateKey ?? null,
        program.instantiationStrategy ?? null,
        program.requiresInstantiation ? 1 : 0,
        program.createdAt,
      ],
    );

    for (const week of program.weeks) {
      const savedWeekId = weekId(program.id, week.weekNumber);
      await db.runAsync(
        `INSERT INTO program_weeks (id, program_id, week_number, phase, focus, notes)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [savedWeekId, program.id, week.weekNumber, week.phase, week.focus ?? null, week.notes ?? null],
      );

      for (const day of week.days) {
        const savedDayId = dayId(program.id, week.weekNumber, day.dayNumber);
        await db.runAsync(
          `INSERT INTO program_days (id, program_week_id, day_number, title, main_focus, estimated_duration, scheduled_date)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [savedDayId, savedWeekId, day.dayNumber, day.title, day.mainFocus ?? null, day.estimatedDuration ?? null, null],
        );

        for (const exercise of day.exercises) {
          // Guard: reject implausible rep counts (Excel date serials, data corruption)
          if (typeof exercise.targetReps === 'number' && exercise.targetReps > 100) {
            throw new Error(
              `Invalid targetReps=${exercise.targetReps} for "${exercise.exerciseName}" ` +
              `in ${program.id} week ${week.weekNumber} day ${day.dayNumber}. ` +
              `Expected ≤ 100. This may be an Excel date serial number that needs fixing.`,
            );
          }

          const savedExerciseId = exerciseId(program.id, week.weekNumber, day.dayNumber, exercise.orderIndex);
          await db.runAsync(
            `INSERT INTO planned_exercises (
              id, program_day_id, exercise_id, order_index, target_sets, target_reps,
              target_rep_range, target_load, target_rpe, target_percent, accessory_category, notes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              savedExerciseId,
              savedDayId,
              resolveExerciseId(exerciseMap, exercise.exerciseName),
              exercise.orderIndex,
              exercise.targetSets ?? null,
              exercise.targetReps ?? null,
              exercise.targetRepRange ?? null,
              exercise.targetLoad ?? null,
              exercise.targetRpe ?? null,
              exercise.targetPercent ?? null,
              exercise.accessoryCategory ?? null,
              exercise.notes ?? null,
            ],
          );

          // Insert planned_sets if the exercise has structured set-level data
          const setsToInsert = exercise.sets ?? [];
          if (setsToInsert.length > 0) {
            for (const ps of setsToInsert) {
              if (typeof ps.targetReps === 'number' && ps.targetReps > 100) {
                throw new Error(
                  `Invalid targetReps=${ps.targetReps} in planned_set #${ps.setNumber} ` +
                  `for "${exercise.exerciseName}" in ${program.id} week ${week.weekNumber} day ${day.dayNumber}. ` +
                  `Expected ≤ 100. This may be an Excel date serial number that needs fixing.`,
                );
              }
              await db.runAsync(
                `INSERT INTO planned_sets (
                  id, planned_exercise_id, set_number, set_label,
                  target_reps, target_rep_range, target_load, target_rpe,
                  target_percent, notes, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  `${savedExerciseId}-set-${String(ps.setNumber).padStart(2, '0')}`,
                  savedExerciseId,
                  ps.setNumber,
                  ps.setLabel ?? null,
                  ps.targetReps ?? null,
                  ps.targetRepRange ?? null,
                  ps.targetLoad ?? null,
                  ps.targetRpe ?? null,
                  ps.targetPercent ?? null,
                  ps.notes ?? null,
                  program.createdAt,
                ],
              );
            }
          }
        }
      }
    }
  }
};
