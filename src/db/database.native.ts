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
    withBatchAsync: async <T>(fn: () => Promise<T>) => fn(),
  };
};

export const getDatabase = async (): Promise<PowerLogDatabase> => {
  databasePromise ??= createNativeDatabase();
  return databasePromise;
};

export const exportDatabaseSnapshot = async (): Promise<Uint8Array> => {
  throw new Error('Cloud Sync V1 snapshot export is currently supported on web only.');
};

export const createDatabaseSnapshotBackup = async (): Promise<{ backupId: string; createdAt: string }> => {
  throw new Error('Cloud Sync V1 snapshot backup is currently supported on web only.');
};

export const replaceDatabaseSnapshot = async (_data: Uint8Array): Promise<void> => {
  throw new Error('Cloud Sync V1 snapshot restore is currently supported on web only.');
};
