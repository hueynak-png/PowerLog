import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';
import { getCurrentE1rmForLift } from '@/src/repositories/analyticsRepository';
import { getMaxByLiftType } from '@/src/repositories/maxRepository';

export interface TrainingMaxEntry {
  value: number;
  source: 'analytics_e1rm' | 'manual_1rm' | 'none';
  updatedAt?: string;
  confidence?: 'high' | 'medium' | 'low';
  /** Days since last update; null if unknown */
  staleDays?: number;
}

export interface CurrentTrainingMaxes {
  squat?: TrainingMaxEntry;
  bench?: TrainingMaxEntry;
  deadlift?: TrainingMaxEntry;
}

type LiftType = 'squat' | 'bench' | 'deadlift';
const LIFTS: LiftType[] = ['squat', 'bench', 'deadlift'];

const getConfidence = (daysBack: number): 'high' | 'medium' | 'low' => {
  if (daysBack <= 14) return 'high';
  if (daysBack <= 45) return 'medium';
  return 'low';
};

export const getCurrentTrainingMaxes = async (
  db: SQLiteDatabase,
): Promise<CurrentTrainingMaxes> => {
  const result: CurrentTrainingMaxes = {};

  for (const lift of LIFTS) {
    // Priority 1: analytics e1RM from completed workout sets (last 90 days)
    const e1rm = await getCurrentE1rmForLift(db, lift, 90);

    if (e1rm != null && e1rm > 0) {
      // Check how recent the data is
      const recentRow = await db.getFirstAsync<{ date: string }>(
        `SELECT ws.date FROM workout_sets wset
         JOIN workout_exercises we ON we.id = wset.workout_exercise_id
         JOIN exercises e ON e.id = we.exercise_id
         JOIN workout_sessions ws ON ws.id = we.workout_session_id
         WHERE e.lift_family = ? AND e.role = 'competition'
           AND wset.completed = 1 AND wset.is_warmup = 0
           AND wset.actual_weight IS NOT NULL AND wset.actual_reps IS NOT NULL
         ORDER BY ws.date DESC LIMIT 1`,
        [lift],
      );

      const staleDays = recentRow
        ? Math.floor((Date.now() - new Date(recentRow.date).getTime()) / 86400000)
        : undefined;

      result[lift] = {
        value: e1rm,
        source: 'analytics_e1rm',
        updatedAt: recentRow?.date,
        confidence: getConfidence(staleDays ?? 90),
        staleDays,
      };
      continue;
    }

    // Priority 2: manual 1RM from maxes table
    const manual = await getMaxByLiftType(db, lift);
    if (manual && manual.oneRm > 0) {
      const staleDays = Math.floor(
        (Date.now() - new Date(manual.date).getTime()) / 86400000,
      );
      result[lift] = {
        value: manual.oneRm,
        source: 'manual_1rm',
        updatedAt: manual.date,
        confidence: getConfidence(staleDays),
        staleDays,
      };
      continue;
    }

    // Priority 3: no data
    result[lift] = {
      value: 0,
      source: 'none',
    };
  }

  return result;
};
