import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';

interface WeeklyVolumeRow {
  weekStart: string;
  totalVolume: number;
}

interface E1RMRow {
  date: string;
  actual_weight: number;
  actual_reps: number;
}

interface RPERow {
  actual_rpe: number;
}

interface WeeklyCompletionRow {
  weekStart: string;
  rate: number;
}

interface BodyweightRow {
  date: string;
  bodyweight: number;
}

interface MuscleGroupVolumeRow {
  muscle_groups: string;
  actual_weight: number;
  actual_reps: number;
}

export const getWeeklyVolume = async (
  db: SQLiteDatabase,
  weeks: number,
): Promise<{ weekStart: string; totalVolume: number }[]> => {
  const rows = await db.getAllAsync<WeeklyVolumeRow>(
    `SELECT
      date(ws.date, 'weekday 0', '-6 days') AS weekStart,
      COALESCE(SUM(ws.total_volume), 0) AS totalVolume
    FROM workout_sessions ws
    WHERE ws.date >= date('now', ? || ' days')
    GROUP BY weekStart
    ORDER BY weekStart ASC`,
    [String(-weeks * 7)],
  );

  return rows;
};

export const getE1RMHistory = async (
  db: SQLiteDatabase,
  liftFamily: string,
  limit: number,
): Promise<{ date: string; e1rm: number }[]> => {
  const rows = await db.getAllAsync<E1RMRow>(
    `SELECT ws.date, wset.actual_weight, wset.actual_reps
    FROM workout_sets wset
    JOIN workout_exercises we ON we.id = wset.workout_exercise_id
    JOIN exercises e ON e.id = we.exercise_id
    JOIN workout_sessions ws ON ws.id = we.workout_session_id
    WHERE e.lift_family = ?
      AND wset.completed = 1
      AND wset.is_warmup = 0
      AND wset.actual_weight IS NOT NULL
      AND wset.actual_reps IS NOT NULL
    ORDER BY ws.date DESC`,
    [liftFamily],
  );

  const sessionMap = new Map<string, number>();
  for (const row of rows) {
    const e1rm = row.actual_weight * (1 + row.actual_reps / 30);
    const current = sessionMap.get(row.date) ?? 0;
    if (e1rm > current) {
      sessionMap.set(row.date, e1rm);
    }
  }

  return Array.from(sessionMap.entries())
    .map(([date, e1rm]) => ({ date, e1rm: Math.round(e1rm * 10) / 10 }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-limit);
};

export const getRPEDistribution = async (
  db: SQLiteDatabase,
  days: number,
): Promise<{ low: number; medium: number; high: number }> => {
  const rows = await db.getAllAsync<RPERow>(
    `SELECT wset.actual_rpe
    FROM workout_sets wset
    JOIN workout_exercises we ON we.id = wset.workout_exercise_id
    JOIN workout_sessions ws ON ws.id = we.workout_session_id
    WHERE ws.date >= date('now', ? || ' days')
      AND wset.actual_rpe IS NOT NULL
      AND wset.completed = 1`,
    [String(-days)],
  );

  let low = 0;
  let medium = 0;
  let high = 0;

  for (const row of rows) {
    if (row.actual_rpe >= 9) {
      high++;
    } else if (row.actual_rpe >= 7.5) {
      medium++;
    } else if (row.actual_rpe >= 6) {
      low++;
    }
  }

  return { low, medium, high };
};

export const getWeeklyCompletionRate = async (
  db: SQLiteDatabase,
  weeks: number,
): Promise<{ weekStart: string; rate: number }[]> => {
  const rows = await db.getAllAsync<WeeklyCompletionRow>(
    `SELECT
      date(ws.date, 'weekday 0', '-6 days') AS weekStart,
      AVG(ws.completion_rate) AS rate
    FROM workout_sessions ws
    WHERE ws.date >= date('now', ? || ' days')
      AND ws.completion_rate IS NOT NULL
    GROUP BY weekStart
    ORDER BY weekStart ASC`,
    [String(-weeks * 7)],
  );

  return rows.map((r) => ({ weekStart: r.weekStart, rate: Math.round(r.rate * 10) / 10 }));
};

export const getBodyweightTrend = async (
  db: SQLiteDatabase,
  days: number,
): Promise<{ date: string; bodyweight: number }[]> => {
  const rows = await db.getAllAsync<BodyweightRow>(
    `SELECT date, bodyweight
    FROM bodyweight_entries
    WHERE date >= date('now', ? || ' days')
    ORDER BY date ASC`,
    [String(-days)],
  );

  return rows;
};

export const getMuscleGroupVolume = async (
  db: SQLiteDatabase,
  days: number,
): Promise<{ muscleGroup: string; volume: number }[]> => {
  const rows = await db.getAllAsync<MuscleGroupVolumeRow>(
    `SELECT e.muscle_groups, wset.actual_weight, wset.actual_reps
    FROM workout_sets wset
    JOIN workout_exercises we ON we.id = wset.workout_exercise_id
    JOIN exercises e ON e.id = we.exercise_id
    JOIN workout_sessions ws ON ws.id = we.workout_session_id
    WHERE ws.date >= date('now', ? || ' days')
      AND wset.completed = 1
      AND wset.actual_weight IS NOT NULL
      AND wset.actual_reps IS NOT NULL`,
    [String(-days)],
  );

  const volumeMap = new Map<string, number>();

  for (const row of rows) {
    const volume = row.actual_weight * row.actual_reps;
    let muscleGroups: string[];
    try {
      muscleGroups = JSON.parse(row.muscle_groups);
    } catch {
      continue;
    }
    for (const mg of muscleGroups) {
      volumeMap.set(mg, (volumeMap.get(mg) ?? 0) + volume);
    }
  }

  return Array.from(volumeMap.entries())
    .map(([muscleGroup, volume]) => ({ muscleGroup, volume }))
    .sort((a, b) => b.volume - a.volume);
};
