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
  subscribeToSyncStatus: jest.fn(),
  updateCloudBackupStatus: (updates: Partial<SyncStatusMeta>) => { mockStatus = { ...mockStatus, ...updates }; },
  uploadSnapshot: jest.fn(),
}));
jest.mock('@/src/db/persistenceEvents', () => ({
  subscribeToDatabasePersisted: jest.fn(),
}));

import {
  checkSyncState,
  disposeAutoSync,
  flushAutoSync,
  initializeAutoSync,
} from './autoSyncService.web';

const mockCreateSnapshotUploadPayload = (jest.requireMock('./snapshotBackupService') as { createSnapshotUploadPayload: any }).createSnapshotUploadPayload;
const mockGetLatestSnapshotMeta = (jest.requireMock('./syncService') as { getLatestSnapshotMeta: any }).getLatestSnapshotMeta;
const mockUploadSnapshot = (jest.requireMock('./syncService') as { uploadSnapshot: any }).uploadSnapshot;
const mockSubscribeToDatabasePersisted = (jest.requireMock('@/src/db/persistenceEvents') as { subscribeToDatabasePersisted: any }).subscribeToDatabasePersisted;

const tick = async () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('web automatic cloud backup', () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;

  beforeEach(() => {
    mockStatus = { state: 'idle' };
    mockCreateSnapshotUploadPayload.mockReset().mockImplementation(async () => localPayload);
    mockGetLatestSnapshotMeta.mockReset().mockImplementation(async () => null);
    mockUploadSnapshot.mockReset().mockImplementation(async () => ({} as RemoteSnapshotMeta));
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
    Object.defineProperty(globalThis, 'window', { configurable: true, value: originalWindow });
    Object.defineProperty(globalThis, 'document', { configurable: true, value: originalDocument });
  });

  it('turns an initial 401 into a stable error state and rejects the check', async () => {
    mockStatus = { state: 'pending', pending: true, lastSyncedSha256: 'previous-hash' };
    mockGetLatestSnapshotMeta.mockImplementation(async () => { throw new Error('Unauthorized'); });

    await expect(checkSyncState()).rejects.toThrow('访问会话无效，请重新解锁应用。');
    expect(mockStatus).toMatchObject({
      state: 'error',
      pending: true,
      lastSyncedSha256: 'previous-hash',
      lastError: '访问会话无效，请重新解锁应用。',
    });
  });

  it('does not upload when a cloud check fails', async () => {
    mockStatus = { state: 'pending', pending: true };
    mockGetLatestSnapshotMeta.mockImplementation(async () => { throw new Error('Unauthorized'); });

    await expect(flushAutoSync()).resolves.toBe(false);
    expect(mockUploadSnapshot).not.toHaveBeenCalled();
    expect(mockStatus.state).toBe('error');
  });

  it('initializes once and runs an authenticated check into its final pending state', async () => {
    const disposeFirst = initializeAutoSync();
    const disposeSecond = initializeAutoSync();
    await tick();

    expect(mockSubscribeToDatabasePersisted).toHaveBeenCalledTimes(1);
    expect(mockGetLatestSnapshotMeta).toHaveBeenCalledTimes(1);
    expect(mockStatus).toMatchObject({ state: 'pending', pending: true });

    disposeFirst();
    disposeSecond();
  });

  it('enters needs-choice after a successful check with a divergent first cloud snapshot', async () => {
    mockGetLatestSnapshotMeta.mockImplementation(async () => ({ sha256: 'b'.repeat(64) } as RemoteSnapshotMeta));

    await expect(checkSyncState()).resolves.toMatchObject({ state: 'needs-choice', pending: false });
  });
});
