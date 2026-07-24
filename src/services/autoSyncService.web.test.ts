import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import type { RemoteSnapshotMeta, SyncStatusMeta } from './syncService';

let mockStatus: SyncStatusMeta = {};
const localPayload = {
  bytes: new Uint8Array([1, 2, 3]),
  meta: { sha256: 'a'.repeat(64), schemaVersion: 11, appVersion: '1.5.0', platform: 'web' },
};

jest.mock('./snapshotBackupService', () => ({
  createSnapshotUploadPayload: jest.fn(),
}));
jest.mock('./syncService', () => ({
  getLatestSnapshotMeta: jest.fn(),
  getLocalSyncStatus: () => mockStatus,
  getSyncStatus: jest.fn(),
  subscribeToSyncStatus: jest.fn(),
  updateCloudBackupStatus: (updates: Partial<SyncStatusMeta>) => { mockStatus = { ...mockStatus, ...updates }; },
  uploadSnapshot: jest.fn(),
}));
jest.mock('@/src/db/persistenceEvents', () => ({
  subscribeToDatabasePersisted: jest.fn(),
}));

import {
  checkSyncState,
  createInitialCloudBackup,
  disposeAutoSync,
  flushAutoSync,
  initializeAutoSync,
  markSyncDirty,
  scheduleAutoUpload,
} from './autoSyncService.web';

const mockCreateSnapshotUploadPayload = (jest.requireMock('./snapshotBackupService') as { createSnapshotUploadPayload: any }).createSnapshotUploadPayload;
const syncServiceMock = jest.requireMock('./syncService') as { getLatestSnapshotMeta: any; getSyncStatus: any; uploadSnapshot: any };
const mockGetLatestSnapshotMeta = syncServiceMock.getLatestSnapshotMeta;
const mockGetSyncStatus = syncServiceMock.getSyncStatus;
const mockUploadSnapshot = syncServiceMock.uploadSnapshot;
const mockSubscribeToDatabasePersisted = (jest.requireMock('@/src/db/persistenceEvents') as { subscribeToDatabasePersisted: any }).subscribeToDatabasePersisted;

const tick = async () => new Promise<void>((resolve) => setTimeout(resolve, 0));
const emptyCloudStatus = () => ({ syncId: 'sync-1', createdAt: '2026-07-24T00:00:00.000Z', latestSnapshot: null });
const remoteSnapshot = (sha256: string): RemoteSnapshotMeta => ({
  id: 'snapshot-1', createdAt: '2026-07-24T00:00:00.000Z', sizeBytes: 3, sha256, schemaVersion: 11,
});

describe('web automatic cloud backup', () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;

  beforeEach(() => {
    mockStatus = { state: 'idle' };
    mockCreateSnapshotUploadPayload.mockReset().mockImplementation(async () => localPayload);
    mockGetLatestSnapshotMeta.mockReset();
    mockGetSyncStatus.mockReset().mockImplementation(async () => emptyCloudStatus());
    mockUploadSnapshot.mockReset().mockImplementation(async (_bytes: Uint8Array, meta: typeof localPayload.meta, mode: 'manual' | 'auto') => {
      const uploaded = remoteSnapshot(meta.sha256);
      const now = new Date().toISOString();
      mockStatus = {
        ...mockStatus,
        latestSnapshot: uploaded,
        lastSyncedSha256: uploaded.sha256,
        lastSyncedAt: now,
        pending: false,
        conflict: false,
        state: 'synced',
        ...(mode === 'auto' ? { lastAutoUploadAt: now } : { lastManualUploadAt: now }),
      };
      return uploaded;
    });
    mockSubscribeToDatabasePersisted.mockReset().mockImplementation(() => () => undefined);
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: { addEventListener: jest.fn(), removeEventListener: jest.fn() },
    });
    Object.defineProperty(globalThis, 'document', {
      configurable: true,
      value: { addEventListener: jest.fn(), removeEventListener: jest.fn(), visibilityState: 'visible' },
    });
  });

  afterEach(() => {
    disposeAutoSync();
    jest.restoreAllMocks();
    Object.defineProperty(globalThis, 'window', { configurable: true, value: originalWindow });
    Object.defineProperty(globalThis, 'document', { configurable: true, value: originalDocument });
  });

  it('uses /status and treats latestSnapshot:null as a successful initial-backup-required check', async () => {
    await expect(checkSyncState()).resolves.toMatchObject({
      latestSnapshot: null,
      state: 'initial-backup-required',
      pending: false,
      conflict: false,
    });

    expect(mockGetSyncStatus).toHaveBeenCalledTimes(1);
    expect(mockGetLatestSnapshotMeta).not.toHaveBeenCalled();
  });

  it('turns an initial 401 into a stable error state and rejects the check', async () => {
    mockStatus = { state: 'pending', pending: true, lastSyncedSha256: 'previous-hash' };
    mockGetSyncStatus.mockImplementation(async () => { throw new Error('Unauthorized'); });

    await expect(checkSyncState()).rejects.toThrow('访问会话无效，请重新解锁应用。');
    expect(mockStatus).toMatchObject({
      state: 'error',
      pending: true,
      lastSyncedSha256: 'previous-hash',
      lastError: '访问会话无效，请重新解锁应用。',
    });
  });

  it('does not start the 45-second upload timer while the first backup requires confirmation', () => {
    mockStatus = { state: 'initial-backup-required', latestSnapshot: null, pending: false };
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    markSyncDirty();
    scheduleAutoUpload();

    expect(mockStatus).toMatchObject({ state: 'initial-backup-required', pending: false });
    expect(setTimeoutSpy).not.toHaveBeenCalled();
  });

  it('does not upload when a first cloud backup has not been manually confirmed', async () => {
    mockStatus = { state: 'initial-backup-required', latestSnapshot: null, pending: false };

    await expect(flushAutoSync()).resolves.toBe(false);
    expect(mockGetSyncStatus).not.toHaveBeenCalled();
    expect(mockUploadSnapshot).not.toHaveBeenCalled();
  });

  it('does not upload when the user cancels the first-backup confirmation', async () => {
    const confirm = jest.fn(() => false);

    await expect(createInitialCloudBackup(confirm)).resolves.toBeNull();

    expect(confirm).toHaveBeenCalledTimes(1);
    expect(mockUploadSnapshot).not.toHaveBeenCalled();
    expect(mockStatus).toMatchObject({ state: 'initial-backup-required', pending: false });
  });

  it('uploads once after first-backup confirmation and enters synced', async () => {
    const confirm = jest.fn(() => true);

    await expect(createInitialCloudBackup(confirm)).resolves.toMatchObject({ sha256: localPayload.meta.sha256 });

    expect(confirm).toHaveBeenCalledTimes(1);
    expect(mockUploadSnapshot).toHaveBeenCalledTimes(1);
    expect(mockUploadSnapshot).toHaveBeenCalledWith(localPayload.bytes, localPayload.meta, 'manual');
    expect(mockStatus).toMatchObject({
      state: 'synced',
      pending: false,
      lastSyncedSha256: localPayload.meta.sha256,
      latestSnapshot: { sha256: localPayload.meta.sha256 },
    });
  });

  it('allows later local changes to use the normal automatic upload path', async () => {
    const initialHash = localPayload.meta.sha256;
    const changedHash = 'b'.repeat(64);
    mockStatus = {
      state: 'synced',
      pending: false,
      conflict: false,
      latestSnapshot: remoteSnapshot(initialHash),
      lastSyncedSha256: initialHash,
      lastSyncedAt: '2026-07-24T00:00:00.000Z',
    };
    mockGetSyncStatus.mockImplementation(async () => ({ ...emptyCloudStatus(), latestSnapshot: remoteSnapshot(initialHash) }));
    mockCreateSnapshotUploadPayload.mockImplementation(async () => ({
      ...localPayload,
      meta: { ...localPayload.meta, sha256: changedHash },
    }));

    markSyncDirty();
    await expect(flushAutoSync()).resolves.toBe(true);

    expect(mockUploadSnapshot).toHaveBeenCalledWith(
      localPayload.bytes,
      expect.objectContaining({ sha256: changedHash }),
      'auto',
    );
    expect(mockStatus).toMatchObject({ state: 'synced', pending: false, lastSyncedSha256: changedHash });
  });

  it('initializes once and leaves an empty cloud in the explicit manual-first-backup state', async () => {
    const disposeFirst = initializeAutoSync();
    const disposeSecond = initializeAutoSync();
    await tick();

    expect(mockSubscribeToDatabasePersisted).toHaveBeenCalledTimes(1);
    expect(mockGetSyncStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toMatchObject({ state: 'initial-backup-required', pending: false });

    disposeFirst();
    disposeSecond();
  });

  it('keeps the existing needs-choice protection for a divergent first cloud snapshot', async () => {
    mockGetSyncStatus.mockImplementation(async () => ({ ...emptyCloudStatus(), latestSnapshot: remoteSnapshot('b'.repeat(64)) }));

    await expect(checkSyncState()).resolves.toMatchObject({ state: 'needs-choice', pending: false });
  });
});
