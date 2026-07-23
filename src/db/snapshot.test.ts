import { describe, expect, it, jest } from '@jest/globals';

jest.mock('@/src/db/database', () => ({
  createDatabaseSnapshotBackup: jest.fn(),
  exportDatabaseSnapshot: jest.fn(),
  getDatabase: jest.fn(),
  replaceDatabaseSnapshot: jest.fn(),
}));

import { exportDatabaseSnapshot, getDatabase } from './database';
import { exportLocalSnapshot, getLocalSnapshotMeta } from './snapshot';

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
