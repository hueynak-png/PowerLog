import type { PowerLogDatabase } from './database';

export const createTables = async (db: PowerLogDatabase): Promise<void> => {
  await db.execAsync(`
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS profile (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Athlete',
  preferred_unit TEXT NOT NULL DEFAULT 'kg',
  default_session_duration INTEGER NOT NULL DEFAULT 90,
  preferred_training_days_per_week INTEGER NOT NULL DEFAULT 4
);

CREATE TABLE IF NOT EXISTS maxes (
  id TEXT PRIMARY KEY,
  lift_type TEXT NOT NULL,
  one_rm REAL NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual',
  date TEXT NOT NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS exercises (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  category TEXT NOT NULL,
  lift_family TEXT NOT NULL,
  role TEXT NOT NULL,
  muscle_groups TEXT NOT NULL,
  equipment TEXT,
  is_custom INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS workout_sessions (
  id TEXT PRIMARY KEY,
  program_day_id TEXT,
  date TEXT NOT NULL,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  duration_seconds INTEGER,
  completion_rate REAL,
  total_volume REAL,
  notes TEXT,
  ai_summary_status TEXT NOT NULL DEFAULT 'not_requested'
);

CREATE TABLE IF NOT EXISTS workout_exercises (
  id TEXT PRIMARY KEY,
  workout_session_id TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  planned_exercise_id TEXT,
  order_index INTEGER NOT NULL,
  notes TEXT,
  FOREIGN KEY (workout_session_id) REFERENCES workout_sessions(id),
  FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

CREATE TABLE IF NOT EXISTS workout_sets (
  id TEXT PRIMARY KEY,
  workout_exercise_id TEXT NOT NULL,
  set_number INTEGER NOT NULL,
  planned_weight REAL,
  actual_weight REAL,
  planned_reps INTEGER,
  actual_reps INTEGER,
  planned_rpe REAL,
  actual_rpe REAL,
  completed INTEGER NOT NULL DEFAULT 0,
  is_warmup INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercises(id)
);

CREATE TABLE IF NOT EXISTS bodyweight_entries (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  bodyweight REAL NOT NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS nutrition_entries (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  status_tags TEXT NOT NULL DEFAULT '[]',
  notes TEXT,
  ai_tags TEXT
);
`);
};
