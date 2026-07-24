import { describe, expect, it, jest } from '@jest/globals';
import { Platform } from 'react-native';

jest.mock('sql.js', () => ({
  __esModule: true,
  default: require('sql.js/dist/sql-asm.js'),
}));

import initSqlJs from 'sql.js';

import { getBackupMeta, getCurrentDbMeta } from './backupRecoveryService';

const CURRENT_DB_KEY = 'powerlog-db';
const backupKey = 'powerlog-db-backup-2026-07-24T00:00:00.000Z';
const storedDatabases = new Map<string, Uint8Array>();

const createIndexedDbMock = () => ({
  open: () => {
    const request: Record<string, unknown> = {};
    queueMicrotask(() => {
      request.result = {
        createObjectStore: () => undefined,
        close: jest.fn(),
        transaction: () => {
          const transaction: Record<string, unknown> = {
            objectStore: () => ({
              get: (key: string) => {
                const getRequest: Record<string, unknown> = {};
                queueMicrotask(() => {
                  getRequest.result = storedDatabases.get(key);
                  (getRequest.onsuccess as (() => void) | undefined)?.();
                });
                return getRequest;
              },
              getAllKeys: () => {
                const getRequest: Record<string, unknown> = {};
                queueMicrotask(() => {
                  getRequest.result = [...storedDatabases.keys()];
                  (getRequest.onsuccess as (() => void) | undefined)?.();
                });
                return getRequest;
              },
            }),
          };
          queueMicrotask(() => {
            (transaction.oncomplete as (() => void) | undefined)?.();
          });
          return transaction;
        },
      };
      (request.onsuccess as (() => void) | undefined)?.();
    });
    return request;
  },
});

const createSnapshot = async (
  programCount: number,
  workoutSessionCount: number,
): Promise<Uint8Array> => {
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  db.exec('CREATE TABLE programs (id TEXT PRIMARY KEY)');
  db.exec('CREATE TABLE workout_sessions (id TEXT PRIMARY KEY)');

  for (let index = 0; index < programCount; index += 1) {
    db.run('INSERT INTO programs (id) VALUES (?)', [`program-${index}`]);
  }
  for (let index = 0; index < workoutSessionCount; index += 1) {
    db.run('INSERT INTO workout_sessions (id) VALUES (?)', [`workout-${index}`]);
  }

  const bytes = db.export();
  db.close();
  return bytes;
};

describe('backup recovery metadata', () => {
  const originalPlatformOS = Platform.OS;

  beforeAll(() => {
    Object.defineProperty(Platform, 'OS', { configurable: true, value: 'web' });
    Object.defineProperty(globalThis, 'indexedDB', {
      configurable: true,
      value: createIndexedDbMock(),
    });
  });

  afterAll(() => {
    Object.defineProperty(Platform, 'OS', { configurable: true, value: originalPlatformOS });
  });

  beforeEach(() => {
    storedDatabases.clear();
  });

  it('reports plans without implying that a database with no workout sessions is empty', async () => {
    const bytes = await createSnapshot(1, 0);
    storedDatabases.set(CURRENT_DB_KEY, bytes);

    await expect(getCurrentDbMeta()).resolves.toEqual({
      sizeBytes: bytes.byteLength,
      programCount: 1,
      workoutSessionCount: 0,
    });
  });

  it('reports workout session counts when they exist', async () => {
    const bytes = await createSnapshot(1, 2);
    storedDatabases.set(CURRENT_DB_KEY, bytes);

    await expect(getCurrentDbMeta()).resolves.toMatchObject({
      programCount: 1,
      workoutSessionCount: 2,
    });
  });

  it('reports plan and workout counts for a pre-restore local backup without changing its bytes', async () => {
    const bytes = await createSnapshot(3, 4);
    const originalBytes = Uint8Array.from(bytes);
    storedDatabases.set(backupKey, bytes);

    await expect(getBackupMeta(backupKey)).resolves.toEqual({
      createdAt: '2026-07-24T00:00:00.000Z',
      sizeBytes: bytes.byteLength,
      programCount: 3,
      workoutSessionCount: 4,
    });
    expect(storedDatabases.get(backupKey)).toEqual(originalBytes);
  });

  it('reports an empty plan and workout count explicitly for a schema-only database', async () => {
    const bytes = await createSnapshot(0, 0);
    storedDatabases.set(CURRENT_DB_KEY, bytes);

    await expect(getCurrentDbMeta()).resolves.toMatchObject({
      programCount: 0,
      workoutSessionCount: 0,
    });
  });
});
