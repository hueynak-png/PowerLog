import { describe, expect, it, jest } from '@jest/globals';

jest.mock('@/src/db/database', () => ({
  createDatabaseSnapshotBackup: jest.fn(),
  exportDatabaseSnapshot: jest.fn(),
  getDatabase: jest.fn(),
  replaceDatabaseSnapshot: jest.fn(),
}));
jest.mock('sql.js', () => ({
  __esModule: true,
  default: require('sql.js/dist/sql-asm.js'),
}));

import initSqlJs from 'sql.js';
import { exportDatabaseSnapshot, getDatabase } from './database';
import { exportLocalSnapshot, getLocalSnapshotMeta, validateDatabaseSnapshot } from './snapshot';

const snapshot = new Uint8Array([1, 2, 3, 4]);
const mockExportDatabaseSnapshot = jest.mocked(exportDatabaseSnapshot);
const mockGetDatabase = jest.mocked(getDatabase);

describe('local snapshot metadata', () => {
  beforeEach(() => {
    mockExportDatabaseSnapshot.mockResolvedValue(snapshot);
    mockGetDatabase.mockResolvedValue({
      getFirstAsync: jest.fn().mockResolvedValue({ version: 11 }),
    } as any);
  });

  it('uses the actual schema_version value instead of a fixed value', async () => {
    const meta = await getLocalSnapshotMeta();

    expect(meta.schemaVersion).toBe(11);
    expect(meta.sizeBytes).toBe(snapshot.byteLength);
    expect(meta.sha256).toHaveLength(64);
    expect(mockGetDatabase).toHaveBeenCalledTimes(1);
    expect(await exportLocalSnapshot()).toBe(snapshot);
  });

  it('fails safely when schema_version is missing', async () => {
    mockGetDatabase.mockResolvedValue({
      getFirstAsync: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(getLocalSnapshotMeta()).rejects.toThrow('schema version is missing or invalid');
  });

  it('fails safely when schema_version is invalid', async () => {
    mockGetDatabase.mockResolvedValue({
      getFirstAsync: jest.fn().mockResolvedValue({ version: 'not-a-version' }),
    } as any);

    await expect(getLocalSnapshotMeta()).rejects.toThrow('schema version is missing or invalid');
  });
});

describe('downloaded snapshot validation', () => {
  const createSnapshot = async (tableNames: string[], schemaVersion = 11): Promise<Uint8Array> => {
    const SQL = await initSqlJs();
    const db = new SQL.Database();
    for (const tableName of tableNames) {
      if (tableName === 'schema_version') {
        db.run('CREATE TABLE schema_version (version INTEGER NOT NULL)');
        db.run('INSERT INTO schema_version (version) VALUES (?)', [schemaVersion]);
      } else {
        db.run(`CREATE TABLE ${tableName} (id TEXT)`);
      }
    }
    const bytes = db.export();
    db.close();
    return bytes;
  };

  it('accepts a valid snapshot with the real profile table name', async () => {
    const bytes = await createSnapshot(['schema_version', 'profile', 'workout_sessions']);

    await expect(validateDatabaseSnapshot(bytes, 11)).resolves.toEqual({ schemaVersion: 11 });
  });

  it('rejects profiles when the required profile table is absent', async () => {
    const bytes = await createSnapshot(['schema_version', 'profiles', 'workout_sessions']);

    await expect(validateDatabaseSnapshot(bytes, 11)).rejects.toThrow('missing required table(s): profile');
  });

  it('rejects a snapshot missing any required core table', async () => {
    const bytes = await createSnapshot(['schema_version', 'profile']);

    await expect(validateDatabaseSnapshot(bytes, 11)).rejects.toThrow('missing required table(s): workout_sessions');
  });

  it('rejects a snapshot with a schema newer than this app supports', async () => {
    const bytes = await createSnapshot(['schema_version', 'profile', 'workout_sessions'], 12);

    await expect(validateDatabaseSnapshot(bytes, 11)).rejects.toThrow('newer database schema');
  });
});
