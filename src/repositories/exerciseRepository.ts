import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';

import type { Exercise, ExerciseCategory, ExerciseRole, LiftFamily } from '@/src/domain/types';

interface ExerciseRow {
  id: string;
  name_en: string;
  name_zh: string;
  category: ExerciseCategory;
  lift_family: LiftFamily;
  role: ExerciseRole;
  muscle_groups: string | null;
  equipment: string | null;
  is_custom: number;
}

const parseStringArray = (value: string | null | undefined): string[] => {
  if (!value) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);

    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

const toOptional = <T>(value: T | null | undefined): T | undefined => value ?? undefined;

const toExercise = (row: ExerciseRow): Exercise => ({
  id: row.id,
  nameEn: row.name_en,
  nameZh: row.name_zh,
  category: row.category,
  liftFamily: row.lift_family,
  role: row.role,
  muscleGroups: parseStringArray(row.muscle_groups),
  equipment: toOptional(row.equipment),
  isCustom: row.is_custom === 1,
});

export const getAllExercises = async (db: SQLiteDatabase): Promise<Exercise[]> => {
  const rows = await db.getAllAsync<ExerciseRow>('SELECT * FROM exercises ORDER BY name_en ASC');

  return rows.map(toExercise);
};

export const getExerciseById = async (db: SQLiteDatabase, id: string): Promise<Exercise | null> => {
  const row = await db.getFirstAsync<ExerciseRow>('SELECT * FROM exercises WHERE id = ? LIMIT 1', [id]);

  return row ? toExercise(row) : null;
};

export const getExercisesByFamily = async (db: SQLiteDatabase, family: LiftFamily): Promise<Exercise[]> => {
  const rows = await db.getAllAsync<ExerciseRow>(
    'SELECT * FROM exercises WHERE lift_family = ? ORDER BY name_en ASC',
    [family],
  );

  return rows.map(toExercise);
};

export const getExercisesByRole = async (db: SQLiteDatabase, role: ExerciseRole): Promise<Exercise[]> => {
  const rows = await db.getAllAsync<ExerciseRow>('SELECT * FROM exercises WHERE role = ? ORDER BY name_en ASC', [role]);

  return rows.map(toExercise);
};

export const getMainLifts = async (db: SQLiteDatabase): Promise<Exercise[]> => getExercisesByRole(db, 'competition');

export const searchExercises = async (db: SQLiteDatabase, query: string): Promise<Exercise[]> => {
  const searchTerm = `%${query.trim()}%`;
  const rows = await db.getAllAsync<ExerciseRow>(
    'SELECT * FROM exercises WHERE name_en LIKE ? OR name_zh LIKE ? ORDER BY name_en ASC',
    [searchTerm, searchTerm],
  );

  return rows.map(toExercise);
};
