import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';

import type { Profile } from '@/src/domain/types';
import generateId from '@/src/lib/uuid';

interface ProfileRow {
  id: string;
  name: string;
  preferred_unit: Profile['preferredUnit'];
  default_session_duration: number;
  preferred_training_days_per_week: number;
}

const toProfile = (row: ProfileRow): Profile => ({
  id: row.id,
  name: row.name,
  preferredUnit: row.preferred_unit,
  defaultSessionDuration: row.default_session_duration,
  preferredTrainingDaysPerWeek: row.preferred_training_days_per_week,
});

export const getProfile = async (db: SQLiteDatabase): Promise<Profile | null> => {
  const row = await db.getFirstAsync<ProfileRow>('SELECT * FROM profile LIMIT 1');

  return row ? toProfile(row) : null;
};

export const createDefaultProfile = async (db: SQLiteDatabase): Promise<Profile> => {
  const profile: Profile = {
    id: generateId(),
    name: 'Athlete',
    preferredUnit: 'kg',
    defaultSessionDuration: 90,
    preferredTrainingDaysPerWeek: 4,
  };

  await db.runAsync(
    `INSERT INTO profile (
      id,
      name,
      preferred_unit,
      default_session_duration,
      preferred_training_days_per_week
    ) VALUES (?, ?, ?, ?, ?)`,
    [
      profile.id,
      profile.name,
      profile.preferredUnit,
      profile.defaultSessionDuration,
      profile.preferredTrainingDaysPerWeek,
    ],
  );

  return profile;
};

export const updateProfile = async (db: SQLiteDatabase, updates: Partial<Profile>): Promise<void> => {
  const existing = await getProfile(db);

  if (!existing) {
    return;
  }

  const next: Profile = {
    ...existing,
    ...updates,
    id: existing.id,
  };

  await db.runAsync(
    `UPDATE profile SET
      name = ?,
      preferred_unit = ?,
      default_session_duration = ?,
      preferred_training_days_per_week = ?
    WHERE id = ?`,
    [
      next.name,
      next.preferredUnit,
      next.defaultSessionDuration,
      next.preferredTrainingDaysPerWeek,
      existing.id,
    ],
  );
};
