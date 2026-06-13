import type { PowerLogDatabase } from './types';

export const createTables = async (db: PowerLogDatabase): Promise<void> => {
  await db.execAsync(`
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS profile (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Athlete',
  preferred_unit TEXT NOT NULL DEFAULT 'kg',
  default_session_duration INTEGER NOT NULL DEFAULT 90,
  preferred_training_days_per_week INTEGER NOT NULL DEFAULT 4,
  last_settings_saved_at TEXT
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
  ai_summary_status TEXT NOT NULL DEFAULT 'not_requested',
  ai_summary_json TEXT
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

CREATE TABLE IF NOT EXISTS planned_sets (
  id TEXT PRIMARY KEY NOT NULL,
  planned_exercise_id TEXT NOT NULL,
  set_number INTEGER NOT NULL,
  set_label TEXT,
  target_reps INTEGER,
  target_rep_range TEXT,
  target_load REAL,
  target_rpe REAL,
  target_percent REAL,
  base_target_load REAL,
  adjustment_factor REAL,
  adjustment_reason TEXT,
  adjustment_source TEXT,
  adjustment_created_at TEXT,
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT,
  FOREIGN KEY (planned_exercise_id) REFERENCES planned_exercises(id)
);

CREATE INDEX IF NOT EXISTS idx_ps_exercise ON planned_sets(planned_exercise_id);
CREATE INDEX IF NOT EXISTS idx_ps_exercise_set ON planned_sets(planned_exercise_id, set_number);

CREATE TABLE IF NOT EXISTS workout_sets (
  id TEXT PRIMARY KEY,
  workout_exercise_id TEXT NOT NULL,
  set_number INTEGER NOT NULL,
  set_label TEXT,
  planned_weight REAL,
  actual_weight REAL,
  planned_reps INTEGER,
  actual_reps INTEGER,
  planned_rep_range TEXT,
  planned_rpe REAL,
  actual_rpe REAL,
  planned_percent REAL,
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

CREATE TABLE IF NOT EXISTS weekly_reviews (
  id TEXT PRIMARY KEY,
  period_start TEXT NOT NULL,
  period_end TEXT NOT NULL,
  generated_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'generated',
  review_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS programs (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  goal TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual',
  duration_weeks INTEGER NOT NULL,
  includes_deload INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  template_key TEXT,
  instantiation_strategy TEXT,
  requires_instantiation INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS program_weeks (
  id TEXT PRIMARY KEY NOT NULL,
  program_id TEXT NOT NULL,
  week_number INTEGER NOT NULL,
  phase TEXT NOT NULL,
  focus TEXT,
  notes TEXT,
  FOREIGN KEY (program_id) REFERENCES programs(id)
);

CREATE TABLE IF NOT EXISTS program_days (
  id TEXT PRIMARY KEY NOT NULL,
  program_week_id TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  main_focus TEXT,
  estimated_duration INTEGER,
  scheduled_date TEXT,
  FOREIGN KEY (program_week_id) REFERENCES program_weeks(id)
);

CREATE TABLE IF NOT EXISTS planned_exercises (
  id TEXT PRIMARY KEY NOT NULL,
  program_day_id TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  target_sets INTEGER,
  target_reps INTEGER,
  target_rep_range TEXT,
  target_load REAL,
  target_rpe REAL,
  target_percent REAL,
  accessory_category TEXT,
  notes TEXT,
  FOREIGN KEY (program_day_id) REFERENCES program_days(id),
  FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

CREATE TABLE IF NOT EXISTS current_cycle (
  id TEXT PRIMARY KEY NOT NULL,
  program_id TEXT NOT NULL,
  goal TEXT NOT NULL,
  current_week INTEGER NOT NULL DEFAULT 1,
  current_day INTEGER NOT NULL DEFAULT 1,
  current_phase TEXT NOT NULL DEFAULT 'entry',
  training_days_per_week INTEGER NOT NULL DEFAULT 4,
  started_at TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (program_id) REFERENCES programs(id)
);
`);
};
