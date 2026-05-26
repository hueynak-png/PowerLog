import { openDatabaseAsync, type SQLiteBindParams } from 'expo-sqlite';

import type { PowerLogDatabase } from './database';

const DATABASE_NAME = 'powerlog.db';

/**
 * Native database implementation using expo-sqlite.
 * Wraps SQLiteDatabase to match our PowerLogDatabase interface.
 */
export const createNativeDatabase = async (): Promise<PowerLogDatabase> => {
  const db = await openDatabaseAsync(DATABASE_NAME);

  return {
    execAsync: (sql: string) => db.execAsync(sql),
    runAsync: async (sql: string, params?: unknown[]) => {
      const result = await db.runAsync(sql, (params ?? []) as SQLiteBindParams);
      return { changes: result.changes, lastInsertRowId: result.lastInsertRowId };
    },
    getFirstAsync: <T>(sql: string, params?: unknown[]) =>
      db.getFirstAsync<T>(sql, (params ?? []) as SQLiteBindParams),
    getAllAsync: <T>(sql: string, params?: unknown[]) =>
      db.getAllAsync<T>(sql, (params ?? []) as SQLiteBindParams),
  };
};
