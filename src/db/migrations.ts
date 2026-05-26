import type { PowerLogDatabase } from './types';
import { createTables } from './schema';
import { seedExercises } from './seedExercises';
import { seedPrograms } from './seedPrograms';

const CURRENT_SCHEMA_VERSION = 4;

const ensureColumn = async (db: PowerLogDatabase, tableName: string, columnName: string, alterSql: string): Promise<void> => {
  const columns = await db.getAllAsync<{ name: string }>(`PRAGMA table_info(${tableName})`);
  if (!columns.some((column) => column.name === columnName)) {
    await db.execAsync(alterSql);
  }
};

export const runMigrations = async (db: PowerLogDatabase): Promise<void> => {
  await db.execAsync(`
CREATE TABLE IF NOT EXISTS schema_version (
  version INTEGER NOT NULL
);
`);

  const current = await db.getFirstAsync<{ version: number }>(
    'SELECT version FROM schema_version ORDER BY version DESC LIMIT 1',
  );

  if ((current?.version ?? 0) < CURRENT_SCHEMA_VERSION) {
    await createTables(db);
    await db.runAsync('DELETE FROM schema_version');
    await db.runAsync('INSERT INTO schema_version (version) VALUES (?)', [CURRENT_SCHEMA_VERSION]);
  } else {
    await createTables(db);
  }

  await ensureColumn(db, 'profile', 'last_settings_saved_at', 'ALTER TABLE profile ADD COLUMN last_settings_saved_at TEXT');

  await seedExercises(db);
  await seedPrograms(db);
};
