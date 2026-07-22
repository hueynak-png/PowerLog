import { describe, expect, it, jest } from '@jest/globals';

jest.mock('sql.js', () => ({
  __esModule: true,
  default: require('sql.js/dist/sql-asm.js'),
}));

import initSqlJs from 'sql.js';

import { exportDatabaseSnapshot, getDatabase } from '@/src/db/database.web';
import { scheduleProgramDays } from '@/src/repositories/programRepository';

const storedDatabases = new Map<string, Map<string, Uint8Array>>();

const createIndexedDbMock = () => ({
  open: (name: string) => {
    const request: any = {};
    queueMicrotask(() => {
      const stores = storedDatabases.get(name) ?? new Map<string, Uint8Array>();
      storedDatabases.set(name, stores);
      request.result = {
        createObjectStore: () => undefined,
        transaction: () => ({
          objectStore: () => ({
            get: (key: string) => {
              const getRequest: any = {};
              queueMicrotask(() => {
                getRequest.result = stores.get(key);
                getRequest.onsuccess?.();
              });
              return getRequest;
            },
            put: (value: Uint8Array, key: string) => {
              const putRequest: any = {};
              queueMicrotask(() => {
                stores.set(key, value);
                putRequest.onsuccess?.();
              });
              return putRequest;
            },
          }),
        }),
      };
      request.onsuccess?.();
    });
    return request;
  },
});

const seedProgram = async (programId: string, failOnDayId?: string) => {
  const db = await getDatabase();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS program_weeks (
      id TEXT PRIMARY KEY, program_id TEXT, week_number INTEGER, phase TEXT, focus TEXT, notes TEXT
    );
    CREATE TABLE IF NOT EXISTS program_days (
      id TEXT PRIMARY KEY, program_week_id TEXT, day_number INTEGER, title TEXT,
      main_focus TEXT, estimated_duration INTEGER, scheduled_date TEXT
    );
  `);

  for (const weekNumber of [1, 2]) {
    await db.runAsync(
      'INSERT INTO program_weeks (id, program_id, week_number, phase) VALUES (?, ?, ?, ?)',
      [`${programId}-week-${weekNumber}`, programId, weekNumber, 'entry'],
    );
    for (const dayNumber of [1, 2, 3]) {
      await db.runAsync(
        `INSERT INTO program_days (id, program_week_id, day_number, title)
         VALUES (?, ?, ?, ?)`,
        [`${programId}-week-${weekNumber}-day-${dayNumber}`, `${programId}-week-${weekNumber}`, dayNumber, `Day ${dayNumber}`],
      );
    }
  }

  if (failOnDayId) {
    const triggerName = `${programId.replace(/[^a-zA-Z0-9_]/g, '_')}_schedule_failure`;
    await db.execAsync(`
      CREATE TRIGGER ${triggerName}
      BEFORE UPDATE OF scheduled_date ON program_days
      WHEN NEW.id = '${failOnDayId}'
      BEGIN
        SELECT RAISE(ABORT, 'simulated web update failure');
      END;
    `);
  }

  return db;
};

describe('web scheduling transaction', () => {
  it('commits six scheduled dates once and keeps six rows on repeat activation', async () => {
    Object.defineProperty(globalThis, 'indexedDB', { configurable: true, value: createIndexedDbMock() });
    const db = await seedProgram('web-success');

    await expect(scheduleProgramDays(db, 'web-success', '2026-07-22', [0, 1, 3, 4])).resolves.toBe(6);
    await expect(scheduleProgramDays(db, 'web-success', '2026-07-22', [0, 1, 3, 4])).resolves.toBe(6);

    const rows = await db.getAllAsync<{ id: string; scheduled_date: string }>(
      `SELECT pd.id, pd.scheduled_date FROM program_days pd
       JOIN program_weeks pw ON pw.id = pd.program_week_id
       WHERE pw.program_id = ? ORDER BY pw.week_number, pd.day_number`,
      ['web-success'],
    );
    expect(rows).toEqual([
      { id: 'web-success-week-1-day-1', scheduled_date: '2026-07-27' },
      { id: 'web-success-week-1-day-2', scheduled_date: '2026-07-28' },
      { id: 'web-success-week-1-day-3', scheduled_date: '2026-07-30' },
      { id: 'web-success-week-2-day-1', scheduled_date: '2026-08-03' },
      { id: 'web-success-week-2-day-2', scheduled_date: '2026-08-04' },
      { id: 'web-success-week-2-day-3', scheduled_date: '2026-08-06' },
    ]);

    const SQL = await initSqlJs();
    const persistedDb = new SQL.Database(await exportDatabaseSnapshot());
    expect(persistedDb.exec(`SELECT COUNT(*) AS count FROM program_days WHERE scheduled_date IS NOT NULL`)[0]?.values)
      .toEqual([[6]]);
  });

  it('rolls back all dates and preserves the original web error when update three fails', async () => {
    const failOnDayId = 'web-failure-week-1-day-3';
    const db = await seedProgram('web-failure', failOnDayId);

    await expect(scheduleProgramDays(db, 'web-failure', '2026-07-22', [0, 1, 3, 4]))
      .rejects.toThrow('simulated web update failure');

    const rows = await db.getAllAsync<{ scheduled_date: string | null }>(
      `SELECT pd.scheduled_date FROM program_days pd
       JOIN program_weeks pw ON pw.id = pd.program_week_id
       WHERE pw.program_id = ?`,
      ['web-failure'],
    );
    expect(rows).toHaveLength(6);
    expect(rows.every((row) => row.scheduled_date === null)).toBe(true);
  });
});
