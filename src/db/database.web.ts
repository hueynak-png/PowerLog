import initSqlJs, { type Database } from 'sql.js';

import { runMigrations } from './migrations';
import type { PowerLogDatabase } from './types';

const DB_STORAGE_KEY = 'powerlog-db';
const loadFromIndexedDB = (key = DB_STORAGE_KEY): Promise<Uint8Array | null> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open('PowerLogStorage', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('databases');
    };
    request.onsuccess = () => {
      const tx = request.result.transaction('databases', 'readonly');
      const store = tx.objectStore('databases');
      const get = store.get(key);
      get.onsuccess = () => resolve(get.result ?? null);
      get.onerror = () => reject(get.error);
    };
    request.onerror = () => reject(request.error);
  });

const saveToIndexedDB = (data: Uint8Array, key = DB_STORAGE_KEY): Promise<void> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open('PowerLogStorage', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('databases');
    };
    request.onsuccess = () => {
      const tx = request.result.transaction('databases', 'readwrite');
      const store = tx.objectStore('databases');
      const put = store.put(data, key);
      put.onsuccess = () => resolve();
      put.onerror = () => reject(put.error);
    };
    request.onerror = () => reject(request.error);
  });

const withPersist = async (db: Database, fn: () => void): Promise<void> => {
  fn();
  const data = db.export();
  await saveToIndexedDB(data);
};

const createWebDatabase = async (): Promise<PowerLogDatabase> => {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  });

  const savedData = await loadFromIndexedDB();
  const db = savedData ? new SQL.Database(savedData) : new SQL.Database();
  let batchDepth = 0;
  let batchDirty = false;

  const persist = async (): Promise<void> => {
    const data = db.export();
    await saveToIndexedDB(data);
  };

  const runWrite = async (fn: () => void): Promise<void> => {
    fn();
    if (batchDepth > 0) {
      batchDirty = true;
      return;
    }
    await persist();
  };

  return {
    execAsync: async (sql: string) => {
      await runWrite(() => db.run(sql));
    },

    runAsync: async (sql: string, params?: unknown[]) => {
      await runWrite(() => {
        const stmt = db.prepare(sql);
        try {
          stmt.bind(params as never[] | undefined);
          stmt.step();
        } finally {
          stmt.free();
        }
      });
      const changesResult = db.exec('SELECT changes() as c');
      const changes = changesResult[0]?.values[0]?.[0] as number ?? 0;
      const lastIdResult = db.exec('SELECT last_insert_rowid() as id');
      const lastInsertRowId = lastIdResult[0]?.values[0]?.[0] as number ?? 0;
      return { changes, lastInsertRowId };
    },

    getFirstAsync: async <T>(sql: string, params?: unknown[]): Promise<T | null> => {
      const stmt = db.prepare(sql);
      if (params && params.length > 0) stmt.bind(params as never[]);
      if (!stmt.step()) { stmt.free(); return null; }
      const columns = stmt.getColumnNames();
      const values = stmt.get();
      stmt.free();
      const obj: Record<string, unknown> = {};
      columns.forEach((col, i) => { obj[col] = values[i]; });
      return obj as T;
    },

    getAllAsync: async <T>(sql: string, params?: unknown[]): Promise<T[]> => {
      const stmt = db.prepare(sql);
      if (params && params.length > 0) stmt.bind(params as never[]);
      const results: T[] = [];
      while (stmt.step()) {
        const columns = stmt.getColumnNames();
        const values = stmt.get();
        const obj: Record<string, unknown> = {};
        columns.forEach((col, i) => { obj[col] = values[i]; });
        results.push(obj as T);
      }
      stmt.free();
      return results;
    },

    withBatchAsync: async <T>(fn: () => Promise<T>): Promise<T> => {
      batchDepth += 1;
      try {
        const result = await fn();
        batchDepth -= 1;
        if (batchDepth === 0 && batchDirty) {
          batchDirty = false;
          await persist();
        }
        return result;
      } catch (error) {
        batchDepth -= 1;
        throw error;
      }
    },
  };
};

let databasePromise: Promise<PowerLogDatabase> | null = null;

export const getDatabase = async (): Promise<PowerLogDatabase> => {
  databasePromise ??= createWebDatabase();
  return databasePromise;
};

export const exportDatabaseSnapshot = async (): Promise<Uint8Array> => {
  await getDatabase();
  const data = await loadFromIndexedDB();
  if (!data) throw new Error('No local database snapshot found.');
  return data;
};

export const createDatabaseSnapshotBackup = async (): Promise<{ backupId: string; createdAt: string }> => {
  const data = await exportDatabaseSnapshot();
  const createdAt = new Date().toISOString();
  const backupId = `powerlog-db-backup-${createdAt}`;
  await saveToIndexedDB(data, backupId);
  return { backupId, createdAt };
};

export const replaceDatabaseSnapshot = async (data: Uint8Array): Promise<void> => {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  });
  const validationDb = new SQL.Database(data);
  validationDb.exec('SELECT 1');
  validationDb.close();

  await saveToIndexedDB(data);
  databasePromise = null;
  await runMigrations(await getDatabase());
};
