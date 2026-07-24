import { Platform } from 'react-native';
import initSqlJs from 'sql.js';

import {
  createDatabaseSnapshotBackup,
  replaceDatabaseSnapshot,
} from '@/src/db/database';

const IDB_NAME = 'PowerLogStorage';
const IDB_STORE = 'databases';
const CURRENT_DB_KEY = 'powerlog-db';
const BACKUP_KEY_PREFIX = 'powerlog-db-backup-';

export interface DatabaseSnapshotMeta {
  sizeBytes: number;
  programCount: number;
  workoutSessionCount: number;
}

function assertWeb(): void {
  if (Platform.OS !== 'web') {
    throw new Error('backupRecoveryService is only available on web platform.');
  }
}

function openIndexedDB(mode: 'readonly' | 'readwrite'): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(IDB_STORE);
    };
    request.onsuccess = () => {
      const db = request.result;
      try {
        db.transaction(IDB_STORE, mode);
        resolve(db);
      } catch {
        reject(new Error('Failed to create transaction'));
      }
    };
    request.onerror = () => reject(request.error);
  });
}

function loadFromIndexedDB(key: string): Promise<Uint8Array | null> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(IDB_STORE);
    };
    request.onsuccess = () => {
      const tx = request.result.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const get = store.get(key);
      get.onsuccess = () => resolve(get.result ?? null);
      get.onerror = () => reject(get.error);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function listBackupKeys(): Promise<string[]> {
  assertWeb();
  const idb = await openIndexedDB('readonly');
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readonly');
    const store = tx.objectStore(IDB_STORE);
    const req = store.getAllKeys();
    req.onsuccess = () => {
      const keys = (req.result as string[]).filter((k) =>
        k.startsWith(BACKUP_KEY_PREFIX),
      );
      keys.sort((a, b) => b.localeCompare(a));
      resolve(keys);
    };
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => idb.close();
  });
}

export async function getBackupMeta(
  key: string,
): Promise<(DatabaseSnapshotMeta & { createdAt: string }) | null> {
  assertWeb();
  const bytes = await loadFromIndexedDB(key);
  if (!bytes) return null;

  const createdAt = key.replace(BACKUP_KEY_PREFIX, '');
  return { createdAt, ...(await getSnapshotMeta(bytes)) };
}

export async function restoreFromBackup(
  backupKey: string,
): Promise<{ preRestoreBackupId: string }> {
  assertWeb();
  const bytes = await loadFromIndexedDB(backupKey);
  if (!bytes) {
    throw new Error(`Backup not found: ${backupKey}`);
  }

  const { backupId } = await createDatabaseSnapshotBackup();
  await replaceDatabaseSnapshot(bytes);

  return { preRestoreBackupId: backupId };
}

export async function countCompletedWorkouts(): Promise<number> {
  if (Platform.OS !== 'web') return 0;
  const bytes = await loadFromIndexedDB(CURRENT_DB_KEY);
  if (!bytes) return 0;

  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  });
  const db = new SQL.Database(bytes);
  const result = db.exec(
    'SELECT COUNT(*) as cnt FROM workout_sessions WHERE ended_at IS NOT NULL',
  );
  const count = (result[0]?.values[0]?.[0] as number | undefined) ?? 0;
  db.close();
  return count;
}

export async function getCurrentDbMeta(): Promise<DatabaseSnapshotMeta | null> {
  assertWeb();
  const bytes = await loadFromIndexedDB(CURRENT_DB_KEY);
  if (!bytes) return null;

  return getSnapshotMeta(bytes);
}

async function getSnapshotMeta(bytes: Uint8Array): Promise<DatabaseSnapshotMeta> {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  });
  const db = new SQL.Database(bytes);
  try {
    const programResult = db.exec('SELECT COUNT(*) FROM programs');
    const workoutSessionResult = db.exec('SELECT COUNT(*) FROM workout_sessions');
    const programCount =
      (programResult[0]?.values[0]?.[0] as number | undefined) ?? 0;
    const workoutSessionCount =
      (workoutSessionResult[0]?.values[0]?.[0] as number | undefined) ?? 0;

    return {
      sizeBytes: bytes.byteLength,
      programCount,
      workoutSessionCount,
    };
  } finally {
    db.close();
  }
}
