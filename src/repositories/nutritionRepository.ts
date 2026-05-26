import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/database';

import type { NutritionEntry } from '@/src/domain/types';
import generateId from '@/src/lib/uuid';

interface NutritionEntryRow {
  id: string;
  date: string;
  status_tags: string | null;
  notes: string | null;
  ai_tags: string | null;
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

const toNutritionEntry = (row: NutritionEntryRow): NutritionEntry => ({
  id: row.id,
  date: row.date,
  statusTags: parseStringArray(row.status_tags),
  notes: toOptional(row.notes),
  aiTags: row.ai_tags == null ? undefined : parseStringArray(row.ai_tags),
});

export const addNutritionEntry = async (
  db: SQLiteDatabase,
  entry: Omit<NutritionEntry, 'id'>,
): Promise<NutritionEntry> => {
  const savedEntry: NutritionEntry = {
    ...entry,
    id: generateId(),
  };

  await db.runAsync('INSERT INTO nutrition_entries (id, date, status_tags, notes, ai_tags) VALUES (?, ?, ?, ?, ?)', [
    savedEntry.id,
    savedEntry.date,
    JSON.stringify(savedEntry.statusTags ?? []),
    savedEntry.notes ?? null,
    savedEntry.aiTags == null ? null : JSON.stringify(savedEntry.aiTags),
  ]);

  return savedEntry;
};

export const getNutritionByDate = async (db: SQLiteDatabase, date: string): Promise<NutritionEntry | null> => {
  const row = await db.getFirstAsync<NutritionEntryRow>('SELECT * FROM nutrition_entries WHERE date = ? LIMIT 1', [date]);

  return row ? toNutritionEntry(row) : null;
};

export const getRecentNutrition = async (db: SQLiteDatabase, limit = 30): Promise<NutritionEntry[]> => {
  const rows = await db.getAllAsync<NutritionEntryRow>('SELECT * FROM nutrition_entries ORDER BY date DESC LIMIT ?', [
    limit,
  ]);

  return rows.map(toNutritionEntry);
};

export const updateNutritionEntry = async (
  db: SQLiteDatabase,
  id: string,
  updates: Partial<NutritionEntry>,
): Promise<void> => {
  const existingRow = await db.getFirstAsync<NutritionEntryRow>('SELECT * FROM nutrition_entries WHERE id = ? LIMIT 1', [
    id,
  ]);

  if (!existingRow) {
    return;
  }

  const next: NutritionEntry = { ...toNutritionEntry(existingRow), ...updates, id };

  await db.runAsync('UPDATE nutrition_entries SET date = ?, status_tags = ?, notes = ?, ai_tags = ? WHERE id = ?', [
    next.date,
    JSON.stringify(next.statusTags ?? []),
    next.notes ?? null,
    next.aiTags == null ? null : JSON.stringify(next.aiTags),
    id,
  ]);
};
