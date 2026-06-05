import type { PowerLogDatabase } from './types';
import { createTables } from './schema';
import { seedExercises } from './seedExercises';
import { seedProgramSummaries } from './seedProgramSummaries';

const CURRENT_SCHEMA_VERSION = 11;

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
  await ensureColumn(db, 'workout_sessions', 'ai_summary_json', 'ALTER TABLE workout_sessions ADD COLUMN ai_summary_json TEXT');
  await ensureColumn(db, 'current_cycle', 'current_day', 'ALTER TABLE current_cycle ADD COLUMN current_day INTEGER NOT NULL DEFAULT 1');

  // Performance indexes on frequently-queried FK columns
  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_we_session ON workout_exercises(workout_session_id);
    CREATE INDEX IF NOT EXISTS idx_ws_exercise ON workout_sets(workout_exercise_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_date ON workout_sessions(date);
    CREATE INDEX IF NOT EXISTS idx_exercises_family ON exercises(lift_family);
    CREATE INDEX IF NOT EXISTS idx_exercises_role ON exercises(role);
    CREATE INDEX IF NOT EXISTS idx_bodyweight_date ON bodyweight_entries(date);
  `);

  // Only seed on fresh install (schema version bump), not every startup
  if ((current?.version ?? 0) < CURRENT_SCHEMA_VERSION) {
    await seedExercises(db);
    await seedProgramSummaries(db);
  }

  // Data migration v5→v6: attempted fix for UTC-misdated workout (ran with wrong time pattern)
  // v6→v7: corrected — matches by most recent workout on the wrong date
  if ((current?.version ?? 0) === 6) {
    const row = await db.getFirstAsync<{ id: string }>(
      `SELECT id FROM workout_sessions
       WHERE date = '2026-05-28'
       ORDER BY started_at DESC
       LIMIT 1`,
    );
    if (row) {
      await db.runAsync(
        `UPDATE workout_sessions SET date = '2026-06-04' WHERE id = ?`,
        [row.id],
      );
    }
  }
};
