import { describe, expect, it, jest } from '@jest/globals';

import {
  restoreLatestCloudSnapshot,
  type CloudSnapshotRestoreDependencies,
} from './cloudSnapshotRestoreService';

const downloadedBytes = new Uint8Array([4, 5, 6]);
const originalBytes = new Uint8Array([1, 2, 3]);
const meta = {
  id: 'snapshot-1',
  createdAt: '2026-07-23T00:00:00.000Z',
  sizeBytes: downloadedBytes.byteLength,
  sha256: 'a'.repeat(64),
  schemaVersion: 11,
};

const createDependencies = (): CloudSnapshotRestoreDependencies => ({
  downloadLatestSnapshot: jest.fn(async () => ({ bytes: downloadedBytes, meta })),
  sha256Hex: jest.fn(async (_bytes: Uint8Array) => meta.sha256),
  validateDatabaseSnapshot: jest.fn(async (_bytes: Uint8Array, _supportedSchemaVersion: number) => ({ schemaVersion: 11 })),
  exportLocalSnapshot: jest.fn(async () => originalBytes),
  createPreRestoreBackup: jest.fn(async (_snapshot?: Uint8Array) => ({ backupId: 'pre-restore-backup', createdAt: meta.createdAt })),
  replaceLocalSnapshot: jest.fn(async (_bytes: Uint8Array) => undefined),
  validateLocalDatabaseSnapshot: jest.fn(async (_supportedSchemaVersion: number) => ({ schemaVersion: 11 })),
  markSnapshotRestored: jest.fn(),
  supportedSchemaVersion: 11,
});

describe('cloud snapshot restore', () => {
  it('fails a missing required table before replacing local bytes', async () => {
    const dependencies = createDependencies();
    dependencies.validateDatabaseSnapshot = jest.fn(async () => { throw new Error('missing required table(s): profile'); });

    await expect(restoreLatestCloudSnapshot(dependencies)).rejects.toThrow('missing required table');
    expect(dependencies.replaceLocalSnapshot).not.toHaveBeenCalled();
    expect(dependencies.createPreRestoreBackup).not.toHaveBeenCalled();
    expect(dependencies.markSnapshotRestored).not.toHaveBeenCalled();
  });

  it('does not replace local bytes when the downloaded SHA-256 does not match', async () => {
    const dependencies = createDependencies();
    dependencies.sha256Hex = jest.fn(async () => 'b'.repeat(64));

    await expect(restoreLatestCloudSnapshot(dependencies)).rejects.toThrow('checksum does not match');
    expect(dependencies.validateDatabaseSnapshot).not.toHaveBeenCalled();
    expect(dependencies.replaceLocalSnapshot).not.toHaveBeenCalled();
    expect(dependencies.markSnapshotRestored).not.toHaveBeenCalled();
  });

  it('does not replace local bytes when the cloud schema is newer than supported', async () => {
    const dependencies = createDependencies();
    dependencies.validateDatabaseSnapshot = jest.fn(async () => { throw new Error('newer database schema'); });

    await expect(restoreLatestCloudSnapshot(dependencies)).rejects.toThrow('newer database schema');
    expect(dependencies.replaceLocalSnapshot).not.toHaveBeenCalled();
    expect(dependencies.markSnapshotRestored).not.toHaveBeenCalled();
  });

  it('restores the original bytes when replacement itself fails', async () => {
    const dependencies = createDependencies();
    let replaceCalls = 0;
    dependencies.replaceLocalSnapshot = jest.fn(async () => {
      replaceCalls += 1;
      if (replaceCalls === 1) throw new Error('replacement write failed');
    });

    await expect(restoreLatestCloudSnapshot(dependencies)).rejects.toThrow('replacement write failed');
    expect(dependencies.replaceLocalSnapshot).toHaveBeenNthCalledWith(1, downloadedBytes);
    expect(dependencies.replaceLocalSnapshot).toHaveBeenNthCalledWith(2, originalBytes);
    expect(dependencies.markSnapshotRestored).not.toHaveBeenCalled();
  });

  it('restores the original bytes when post-replacement validation fails', async () => {
    const dependencies = createDependencies();
    let validationCalls = 0;
    dependencies.validateLocalDatabaseSnapshot = jest.fn(async () => {
      validationCalls += 1;
      if (validationCalls === 1) throw new Error('post-restore integrity check failed');
      return { schemaVersion: 11 };
    });

    await expect(restoreLatestCloudSnapshot(dependencies)).rejects.toThrow('post-restore integrity check failed');
    expect(dependencies.replaceLocalSnapshot).toHaveBeenNthCalledWith(1, downloadedBytes);
    expect(dependencies.replaceLocalSnapshot).toHaveBeenNthCalledWith(2, originalBytes);
    expect(dependencies.markSnapshotRestored).not.toHaveBeenCalled();
  });

  it('updates sync status only after a fully successful restore', async () => {
    const dependencies = createDependencies();

    await expect(restoreLatestCloudSnapshot(dependencies)).resolves.toEqual({ meta, backupId: 'pre-restore-backup' });
    expect(dependencies.markSnapshotRestored).toHaveBeenCalledWith(meta);
    expect(dependencies.replaceLocalSnapshot).toHaveBeenCalledTimes(1);
    expect(dependencies.createPreRestoreBackup).toHaveBeenCalledWith(originalBytes);
  });
});
