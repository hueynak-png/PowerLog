import type { PowerLogDatabase } from '@/src/db/types';

import { archetypePrograms } from './archetypePrograms';
import { bradExcelProgram } from './bradExcelProgram';
import { getExerciseIdMap, resolveExerciseId } from './exerciseResolver';
import type { ProgramDaySeed, ProgramSeed, ProgramWeekSeed } from './types';

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
    if (existing) continue;

    await db.runAsync(
      `INSERT INTO programs (id, name, type, goal, source, duration_weeks, includes_deload, description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        program.id,
        program.name,
        program.type,
        program.goal,
        program.source,
        program.durationWeeks,
        program.includesDeload ? 1 : 0,
        program.description,
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
          await db.runAsync(
            `INSERT INTO planned_exercises (
              id, program_day_id, exercise_id, order_index, target_sets, target_reps,
              target_load, target_rpe, target_percent, accessory_category, notes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              exerciseId(program.id, week.weekNumber, day.dayNumber, exercise.orderIndex),
              savedDayId,
              resolveExerciseId(exerciseMap, exercise.exerciseName),
              exercise.orderIndex,
              exercise.targetSets ?? null,
              exercise.targetReps ?? null,
              exercise.targetLoad ?? null,
              exercise.targetRpe ?? null,
              exercise.targetPercent ?? null,
              exercise.accessoryCategory ?? null,
              exercise.notes ?? null,
            ],
          );
        }
      }
    }
  }
};
