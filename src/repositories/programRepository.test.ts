import { describe, expect, it } from '@jest/globals';

import type { PowerLogDatabase } from '@/src/db/types';
import { scheduleProgramDays } from '@/src/repositories/programRepository';

const weeks = [
  { id: 'week-1', program_id: 'imported-plan', week_number: 1, phase: 'entry', focus: null, notes: null },
  { id: 'week-2', program_id: 'imported-plan', week_number: 2, phase: 'entry', focus: null, notes: null },
];

const daysByWeek: Record<string, Array<Record<string, unknown>>> = {
  'week-1': [1, 2, 3].map((dayNumber) => ({
    id: `week-1-day-${dayNumber}`,
    program_week_id: 'week-1',
    day_number: dayNumber,
    title: `Week 1 Day ${dayNumber}`,
    main_focus: null,
    estimated_duration: null,
    scheduled_date: null,
  })),
  'week-2': [1, 2, 3].map((dayNumber) => ({
    id: `week-2-day-${dayNumber}`,
    program_week_id: 'week-2',
    day_number: dayNumber,
    title: `Week 2 Day ${dayNumber}`,
    main_focus: null,
    estimated_duration: null,
    scheduled_date: null,
  })),
};

const makeScheduleDb = (failOnUpdate?: number) => {
  const updates: Array<{ scheduledDate: string; id: string }> = [];
  let updateCount = 0;

  const db: PowerLogDatabase = {
    execAsync: async () => {},
    runAsync: async (sql, params = []) => {
      if (sql.includes('UPDATE program_days SET scheduled_date')) {
        updateCount += 1;
        if (updateCount === failOnUpdate) throw new Error('simulated schedule write failure');
        updates.push({ scheduledDate: String(params[0]), id: String(params[1]) });
      }
      return { changes: 1, lastInsertRowId: 0 };
    },
    getFirstAsync: async () => null,
    getAllAsync: async <T>(sql: string, params: unknown[] = []): Promise<T[]> => {
      if (sql.includes('FROM program_weeks')) return weeks as T[];
      if (sql.includes('FROM program_days')) return (daysByWeek[String(params[0])] ?? []) as T[];
      return [];
    },
    withBatchAsync: async <T>(fn: () => Promise<T>) => fn(),
  };

  return { db, updates };
};

describe('scheduleProgramDays', () => {
  it('schedules all six days of a two-week imported plan using updates only', async () => {
    const { db, updates } = makeScheduleDb();

    await expect(scheduleProgramDays(db, 'imported-plan', '2026-07-22', [0, 1, 3, 4])).resolves.toBe(6);

    expect(updates).toEqual([
      { id: 'week-1-day-1', scheduledDate: '2026-07-27' },
      { id: 'week-1-day-2', scheduledDate: '2026-07-28' },
      { id: 'week-1-day-3', scheduledDate: '2026-07-30' },
      { id: 'week-2-day-1', scheduledDate: '2026-08-03' },
      { id: 'week-2-day-2', scheduledDate: '2026-08-04' },
      { id: 'week-2-day-3', scheduledDate: '2026-08-06' },
    ]);
  });

  it('rolls back the complete schedule when a date update fails', async () => {
    const { db } = makeScheduleDb(3);

    await expect(scheduleProgramDays(db, 'imported-plan', '2026-07-22', [0, 1, 3, 4]))
      .rejects.toThrow('simulated schedule write failure');

  });
});
