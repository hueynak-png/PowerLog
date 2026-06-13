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
  await ensureColumn(db, 'planned_exercises', 'target_rep_range', 'ALTER TABLE planned_exercises ADD COLUMN target_rep_range TEXT');
  await ensureColumn(db, 'workout_sets', 'set_label', 'ALTER TABLE workout_sets ADD COLUMN set_label TEXT');
  await ensureColumn(db, 'workout_sets', 'planned_rep_range', 'ALTER TABLE workout_sets ADD COLUMN planned_rep_range TEXT');
  await ensureColumn(db, 'workout_sets', 'planned_percent', 'ALTER TABLE workout_sets ADD COLUMN planned_percent REAL');
  await ensureColumn(db, 'programs', 'template_key', 'ALTER TABLE programs ADD COLUMN template_key TEXT');
  await ensureColumn(db, 'programs', 'instantiation_strategy', 'ALTER TABLE programs ADD COLUMN instantiation_strategy TEXT');
  await ensureColumn(db, 'programs', 'requires_instantiation', 'ALTER TABLE programs ADD COLUMN requires_instantiation INTEGER NOT NULL DEFAULT 0');
  await ensureColumn(db, 'planned_sets', 'base_target_load', 'ALTER TABLE planned_sets ADD COLUMN base_target_load REAL');
  await ensureColumn(db, 'planned_sets', 'adjustment_factor', 'ALTER TABLE planned_sets ADD COLUMN adjustment_factor REAL');
  await ensureColumn(db, 'planned_sets', 'adjustment_reason', 'ALTER TABLE planned_sets ADD COLUMN adjustment_reason TEXT');
  await ensureColumn(db, 'planned_sets', 'adjustment_source', 'ALTER TABLE planned_sets ADD COLUMN adjustment_source TEXT');
  await ensureColumn(db, 'planned_sets', 'adjustment_created_at', 'ALTER TABLE planned_sets ADD COLUMN adjustment_created_at TEXT');

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

  // Data migration v8→v9: fix Excel date serial numbers + add target_rep_range
  // Data migration v9→v10: add planned_sets table — re-seed Brad for structured set data
  if ((current?.version ?? 0) === 8 || (current?.version ?? 0) === 9) {
    // Fix planned_exercises
    await db.runAsync(
      `UPDATE planned_exercises SET target_reps = 10 WHERE target_reps = 45879`,
    );
    await db.runAsync(
      `UPDATE planned_exercises SET target_reps = 12 WHERE target_reps = 45942`,
    );
    // Fix workout_sets that inherited the bad planned_reps
    await db.runAsync(
      `UPDATE workout_sets SET planned_reps = 10 WHERE planned_reps = 45879`,
    );
    await db.runAsync(
      `UPDATE workout_sets SET planned_reps = 12 WHERE planned_reps = 45942`,
    );
    // Force re-seed of Brad program to pick up target_rep_range and planned_sets values
    await db.runAsync(
      `DELETE FROM planned_sets WHERE planned_exercise_id IN (
        SELECT pe.id FROM planned_exercises pe
        INNER JOIN program_days pd ON pd.id = pe.program_day_id
        INNER JOIN program_weeks pw ON pw.id = pd.program_week_id
        WHERE pw.program_id = 'seed-program-brad-full-cycle'
      )`,
    );
    await db.runAsync(
      `DELETE FROM planned_exercises WHERE program_day_id IN (
        SELECT pd.id FROM program_days pd
        INNER JOIN program_weeks pw ON pw.id = pd.program_week_id
        WHERE pw.program_id = 'seed-program-brad-full-cycle'
      )`,
    );
    await db.runAsync(
      `DELETE FROM program_days WHERE program_week_id IN (
        SELECT id FROM program_weeks WHERE program_id = 'seed-program-brad-full-cycle'
      )`,
    );
    await db.runAsync(
      `DELETE FROM program_weeks WHERE program_id = 'seed-program-brad-full-cycle'`,
    );
    await db.runAsync(
      `DELETE FROM programs WHERE id = 'seed-program-brad-full-cycle'`,
    );
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

  // v10→v11: Backfill Brad seed template metadata (cols added by ensureColumn above)
  if ((current?.version ?? 0) === 10) {
    await db.runAsync(
      `UPDATE programs SET
        template_key = 'brad_33_week_full_cycle',
        instantiation_strategy = 'preserve_structure_recalculate_loads',
        requires_instantiation = 1
      WHERE id = 'seed-program-brad-full-cycle'
        AND (template_key IS NULL OR requires_instantiation = 0)`,
    );
  }
};
