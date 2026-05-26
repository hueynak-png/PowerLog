import { openDatabaseAsync, type SQLiteBindParams } from 'expo-sqlite';

import type { PowerLogDatabase } from './types';

const DATABASE_NAME = 'powerlog.db';

let databasePromise: Promise<PowerLogDatabase> | null = null;

/**
 * Native database implementation using expo-sqlite.
 */
const createNativeDatabase = async (): Promise<PowerLogDatabase> => {
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

export const getDatabase = async (): Promise<PowerLogDatabase> => {
  databasePromise ??= createNativeDatabase();
  return databasePromise;
};
