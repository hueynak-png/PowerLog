import initSqlJs, { type Database } from 'sql.js';

import type { PowerLogDatabase } from './types';

const DB_STORAGE_KEY = 'powerlog-db';
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
 * Web database implementation using sql.js (SQLite compiled to WASM).
 * Data is persisted to IndexedDB after every write operation.
 */
const createWebDatabase = async (): Promise<PowerLogDatabase> => {
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
      withPersist(db, () => {
        const stmt = db.prepare(sql);
        stmt.bind(params as never[] | undefined);
        stmt.step();
        stmt.free();
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
  };
};

let databasePromise: Promise<PowerLogDatabase> | null = null;

export const getDatabase = async (): Promise<PowerLogDatabase> => {
  databasePromise ??= createWebDatabase();
  return databasePromise;
};

