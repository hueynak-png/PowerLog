import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/database';

import type { BodyweightEntry } from '@/src/domain/types';
import generateId from '@/src/lib/uuid';

interface BodyweightEntryRow {
  id: string;
  date: string;
  bodyweight: number;
  notes: string | null;
}

const toOptional = <T>(value: T | null | undefined): T | undefined => value ?? undefined;

const toBodyweightEntry = (row: BodyweightEntryRow): BodyweightEntry => ({
  id: row.id,
  date: row.date,
  bodyweight: row.bodyweight,
  notes: toOptional(row.notes),
});

export const addBodyweightEntry = async (
  db: SQLiteDatabase,
  entry: Omit<BodyweightEntry, 'id'>,
): Promise<BodyweightEntry> => {
  const savedEntry: BodyweightEntry = {
    ...entry,
    id: generateId(),
  };

  await db.runAsync('INSERT INTO bodyweight_entries (id, date, bodyweight, notes) VALUES (?, ?, ?, ?)', [
    savedEntry.id,
    savedEntry.date,
    savedEntry.bodyweight,
    savedEntry.notes ?? null,
  ]);

  return savedEntry;
};

export const getLatestBodyweight = async (db: SQLiteDatabase): Promise<BodyweightEntry | null> => {
  const row = await db.getFirstAsync<BodyweightEntryRow>('SELECT * FROM bodyweight_entries ORDER BY date DESC LIMIT 1');

  return row ? toBodyweightEntry(row) : null;
};

export const getBodyweightHistory = async (db: SQLiteDatabase, limit = 30): Promise<BodyweightEntry[]> => {
  const rows = await db.getAllAsync<BodyweightEntryRow>(
    'SELECT * FROM bodyweight_entries ORDER BY date DESC LIMIT ?',
    [limit],
  );

  return rows.map(toBodyweightEntry);
};

export const getBodyweightByDate = async (db: SQLiteDatabase, date: string): Promise<BodyweightEntry | null> => {
  const row = await db.getFirstAsync<BodyweightEntryRow>(
    'SELECT * FROM bodyweight_entries WHERE date = ? LIMIT 1',
    [date],
  );

  return row ? toBodyweightEntry(row) : null;
};

export const updateBodyweightEntry = async (
  db: SQLiteDatabase,
  id: string,
  updates: Partial<BodyweightEntry>,
): Promise<void> => {
  const existingRow = await db.getFirstAsync<BodyweightEntryRow>('SELECT * FROM bodyweight_entries WHERE id = ? LIMIT 1', [id]);

  if (!existingRow) {
    return;
  }

  const next: BodyweightEntry = {
    ...toBodyweightEntry(existingRow),
    ...updates,
    id,
  };

  await db.runAsync('UPDATE bodyweight_entries SET date = ?, bodyweight = ?, notes = ? WHERE id = ?', [
    next.date,
    next.bodyweight,
    next.notes ?? null,
    id,
  ]);
};

export const deleteBodyweightEntry = async (db: SQLiteDatabase, id: string): Promise<void> => {
  await db.runAsync('DELETE FROM bodyweight_entries WHERE id = ?', [id]);
};
