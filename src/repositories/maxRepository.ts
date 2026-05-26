import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';

import type { LiftType, Max, MaxSource } from '@/src/domain/types';
import generateId from '@/src/lib/uuid';

interface MaxRow {
  id: string;
  lift_type: LiftType;
  one_rm: number;
  source: MaxSource;
  date: string;
  notes: string | null;
}

const toOptional = <T>(value: T | null | undefined): T | undefined => value ?? undefined;

const toMax = (row: MaxRow): Max => ({
  id: row.id,
  liftType: row.lift_type,
  oneRm: row.one_rm,
  source: row.source,
  date: row.date,
  notes: toOptional(row.notes),
});

export const getMaxes = async (db: SQLiteDatabase): Promise<Max[]> => {
  const rows = await db.getAllAsync<MaxRow>('SELECT * FROM maxes ORDER BY date DESC');

  return rows.map(toMax);
};

export const getMaxByLiftType = async (db: SQLiteDatabase, liftType: LiftType): Promise<Max | null> => {
  const row = await db.getFirstAsync<MaxRow>(
    'SELECT * FROM maxes WHERE lift_type = ? ORDER BY date DESC LIMIT 1',
    [liftType],
  );

  return row ? toMax(row) : null;
};

export const upsertMax = async (db: SQLiteDatabase, max: Omit<Max, 'id'> & { id?: string }): Promise<Max> => {
  const savedMax: Max = {
    ...max,
    id: max.id ?? generateId(),
  };

  await db.runAsync(
    `INSERT OR REPLACE INTO maxes (
      id,
      lift_type,
      one_rm,
      source,
      date,
      notes
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [savedMax.id, savedMax.liftType, savedMax.oneRm, savedMax.source, savedMax.date, savedMax.notes ?? null],
  );

  return savedMax;
};

export const deleteMax = async (db: SQLiteDatabase, id: string): Promise<void> => {
  await db.runAsync('DELETE FROM maxes WHERE id = ?', [id]);
};
