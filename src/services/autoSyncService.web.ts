import { createSnapshotUploadPayload } from './snapshotBackupService';
import {
  getLatestSnapshotMeta,
  getLocalSyncStatus,
  type RemoteSnapshotMeta,
  subscribeToSyncStatus,
  updateCloudBackupStatus,
  uploadSnapshot,
} from './syncService';
import { subscribeToDatabasePersisted } from '@/src/db/persistenceEvents';

const UPLOAD_DELAY_MS = 45_000;
const PENDING_CHECK_MS = 15 * 60_000;
let uploadTimer: ReturnType<typeof setTimeout> | undefined;
let pendingCheckTimer: ReturnType<typeof setInterval> | undefined;
let disposePersistence: (() => void) | undefined;
let uploadInFlight: Promise<boolean> | undefined;

const isOffline = () => typeof navigator !== 'undefined' && navigator.onLine === false;
const normalizedHash = (value: string | undefined) => value?.toLowerCase();
const isBlockedAutoSyncState = (state: ReturnType<typeof getLocalSyncStatus>['state']) =>
  state === 'error' || state === 'unavailable' || state === 'checking';

const safeSyncError = (error: unknown, fallback: string): string => {
  const message = error instanceof Error ? error.message : '';
  if (/\b401\b|unauthori[sz]ed/i.test(message)) return '访问会话无效，请重新解锁应用。';
  if (/\b503\b|service.*unavailable|temporarily unavailable/i.test(message)) return 'Cloud backup service is unavailable';
  if (!message || message.length > 200 || /https?:\/\/|recovery key|token|cookie/i.test(message)) return fallback;
  return message;
};

export const checkSyncState = async (): Promise<ReturnType<typeof getLocalSyncStatus>> => {
  if (isOffline()) {
    updateCloudBackupStatus({ pending: true, state: 'offline' });
    return getLocalSyncStatus();
  }
  updateCloudBackupStatus({ state: 'checking', lastError: undefined });
  try {
    const [payload, remote] = await Promise.all([createSnapshotUploadPayload(), getLatestSnapshotMeta()]);
    const localHash = normalizedHash(payload.meta.sha256)!;
    const remoteHash = normalizedHash(remote?.sha256);
    const lastSyncedHash = normalizedHash(getLocalSyncStatus().lastSyncedSha256);
    const checked = { lastCheckAt: new Date().toISOString(), latestSnapshot: remote };
    if (!remote) updateCloudBackupStatus({ ...checked, pending: true, conflict: false, state: 'pending' });
    else if (localHash === remoteHash) updateCloudBackupStatus({ ...checked, lastSyncedSha256: localHash, lastSyncedAt: new Date().toISOString(), pending: false, conflict: false, state: 'synced' });
    else if (!lastSyncedHash) updateCloudBackupStatus({ ...checked, pending: false, conflict: false, state: 'needs-choice' });
    else if (remoteHash === lastSyncedHash) updateCloudBackupStatus({ ...checked, pending: true, conflict: false, state: 'pending' });
    else if (localHash === lastSyncedHash) updateCloudBackupStatus({ ...checked, pending: false, conflict: false, state: 'remote-update' });
    else updateCloudBackupStatus({ ...checked, pending: false, conflict: true, state: 'conflict' });
  } catch (error) {
    const state = getLocalSyncStatus().state === 'unavailable' ? 'unavailable' : 'error';
    const message = safeSyncError(error, 'Cloud backup check failed');
    updateCloudBackupStatus({ state, lastError: message });
    throw new Error(message);
  }
  return getLocalSyncStatus();
};

export const markSyncDirty = (): void => {
  const current = getLocalSyncStatus();
  if (current.conflict || current.state === 'needs-choice' || current.state === 'remote-update') return;
  if (isBlockedAutoSyncState(current.state)) {
    updateCloudBackupStatus({ pending: true });
    return;
  }
  updateCloudBackupStatus({ pending: true, state: isOffline() ? 'offline' : 'pending' });
  scheduleAutoUpload();
};

export const scheduleAutoUpload = (): void => {
  if (uploadTimer) clearTimeout(uploadTimer);
  if (isOffline() || isBlockedAutoSyncState(getLocalSyncStatus().state)) return;
  uploadTimer = setTimeout(() => { void flushAutoSync(); }, UPLOAD_DELAY_MS);
};

export const flushAutoSync = async (): Promise<boolean> => {
  if (uploadInFlight) return uploadInFlight;
  uploadInFlight = (async () => {
    if (isOffline()) { updateCloudBackupStatus({ pending: true, state: 'offline' }); return false; }
    if (isBlockedAutoSyncState(getLocalSyncStatus().state)) return false;
    let state: ReturnType<typeof getLocalSyncStatus>;
    try {
      state = await checkSyncState();
    } catch {
      return false;
    }
    if (state.state !== 'pending' || !state.pending || !state.lastCheckAt || state.conflict) return false;
    updateCloudBackupStatus({ state: 'uploading', lastError: undefined });
    try {
      const payload = await createSnapshotUploadPayload();
      const remote = state.latestSnapshot;
      if (normalizedHash(remote?.sha256) === normalizedHash(payload.meta.sha256)) {
        updateCloudBackupStatus({ pending: false, conflict: false, state: 'synced', lastSyncedSha256: payload.meta.sha256, lastSyncedAt: new Date().toISOString() });
        return false;
      }
      await uploadSnapshot(payload.bytes, payload.meta, 'auto');
      return true;
    } catch (error) {
      updateCloudBackupStatus({ state: 'error', lastError: safeSyncError(error, 'Cloud backup upload failed') });
      return false;
    }
  })();
  try { return await uploadInFlight; } finally { uploadInFlight = undefined; }
};

export const overwriteCloudWithLocal = async (): Promise<RemoteSnapshotMeta> => {
  const payload = await createSnapshotUploadPayload();
  updateCloudBackupStatus({ state: 'uploading', lastError: undefined });
  return uploadSnapshot(payload.bytes, payload.meta, 'manual');
};

export const initializeAutoSync = (): (() => void) => {
  if (disposePersistence) return disposeAutoSync;
  disposePersistence = subscribeToDatabasePersisted(markSyncDirty);
  void checkSyncState()
    .then((state) => { if (state.state === 'pending' && state.pending) scheduleAutoUpload(); })
    .catch(() => undefined);
  pendingCheckTimer = setInterval(() => { if (getLocalSyncStatus().pending) void flushAutoSync(); }, PENDING_CHECK_MS);
  const onOnline = () => { void flushAutoSync(); };
  const onVisibility = () => { if (document.visibilityState === 'hidden') void flushAutoSync(); };
  window.addEventListener('online', onOnline);
  document.addEventListener('visibilitychange', onVisibility);
  return () => {
    window.removeEventListener('online', onOnline);
    document.removeEventListener('visibilitychange', onVisibility);
    disposeAutoSync();
  };
};

export const disposeAutoSync = (): void => {
  if (uploadTimer) clearTimeout(uploadTimer);
  if (pendingCheckTimer) clearInterval(pendingCheckTimer);
  uploadTimer = undefined; pendingCheckTimer = undefined;
  disposePersistence?.(); disposePersistence = undefined;
};

export const uploadCompletedWorkoutSnapshot = async (): Promise<boolean> => flushAutoSync();
export { subscribeToSyncStatus };
