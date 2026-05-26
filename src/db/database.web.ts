import initSqlJs, { type Database } from 'sql.js';

import type { PowerLogDatabase } from './database';

const DB_STORAGE_KEY = 'powerlog-db';

/**
 * Load persisted database from IndexedDB.
 */
const loadFromIndexedDB = (): Promise<Uint8Array | null> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open('PowerLogStorage', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('databases');
    };
    request.onsuccess = () => {
      const tx = request.result.transaction('databases', 'readonly');
      const store = tx.objectStore('databases');
      const get = store.get(DB_STORAGE_KEY);
      get.onsuccess = () => resolve(get.result ?? null);
      get.onerror = () => reject(get.error);
    };
    request.onerror = () => reject(request.error);
  });

/**
 * Persist database to IndexedDB.
 */
const saveToIndexedDB = (data: Uint8Array): Promise<void> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open('PowerLogStorage', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('databases');
    };
    request.onsuccess = () => {
      const tx = request.result.transaction('databases', 'readwrite');
      const store = tx.objectStore('databases');
      const put = store.put(data, DB_STORAGE_KEY);
      put.onsuccess = () => resolve();
      put.onerror = () => reject(put.error);
    };
    request.onerror = () => reject(request.error);
  });

/**
 * Auto-persist after every write operation.
 */
const withPersist = (db: Database, fn: () => void): void => {
  fn();
  const data = db.export();
  saveToIndexedDB(data).catch(console.error);
};

/**
 * Convert sql.js row arrays to objects with column names as keys.
 */
const rowsToObjects = <T>(columns: string[], values: unknown[][]): T[] =>
  values.map((row) => {
    const obj: Record<string, unknown> = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj as T;
  });

/**
 * Web database implementation using sql.js (SQLite compiled to WASM).
 * Data is persisted to IndexedDB after every write operation.
 */
export const createWebDatabase = async (): Promise<PowerLogDatabase> => {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  });

  const savedData = await loadFromIndexedDB();
  const db = savedData ? new SQL.Database(savedData) : new SQL.Database();

  return {
    execAsync: async (sql: string) => {
      withPersist(db, () => db.run(sql));
    },

    runAsync: async (sql: string, params?: unknown[]) => {
      withPersist(db, () => db.run(sql, params as never));
      // sql.js doesn't expose changes/lastInsertRowId easily
      const changesResult = db.exec('SELECT changes() as c');
      const changes = changesResult[0]?.values[0]?.[0] as number ?? 0;
      const lastIdResult = db.exec('SELECT last_insert_rowid() as id');
      const lastInsertRowId = lastIdResult[0]?.values[0]?.[0] as number ?? 0;
      return { changes, lastInsertRowId };
    },

    getFirstAsync: async <T>(sql: string, params?: unknown[]): Promise<T | null> => {
      const result = db.exec(sql, params as never);
      if (!result[0] || result[0].values.length === 0) return null;
      return rowsToObjects<T>(result[0].columns, [result[0].values[0]])[0];
    },

    getAllAsync: async <T>(sql: string, params?: unknown[]): Promise<T[]> => {
      const result = db.exec(sql, params as never);
      if (!result[0] || result[0].values.length === 0) return [];
      return rowsToObjects<T>(result[0].columns, result[0].values);
    },
  };
};

