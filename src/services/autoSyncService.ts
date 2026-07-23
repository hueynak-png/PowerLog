import { countCompletedWorkouts } from './backupRecoveryService';
import { createSnapshotUploadPayload } from './snapshotBackupService';
import { getLocalSyncStatus, isSyncConfigured, type RemoteSnapshotMeta, type SyncStatusMeta, uploadSnapshot } from './syncService';

export const uploadCompletedWorkoutSnapshot = async (): Promise<boolean> => {
  if (!isSyncConfigured()) return false;

  const completedCount = await countCompletedWorkouts();
  if (completedCount === 0) {
    console.warn(
      '[autoSync] Skipped upload: no completed workouts in local database.',
    );
    return false;
  }

  const payload = await createSnapshotUploadPayload();
  await uploadSnapshot(payload.bytes, payload.meta, 'auto');
  return true;
};

// Web provides the scheduled, conflict-aware implementation in autoSyncService.web.ts.
// Native keeps the existing manual-config path unchanged during this Web-only phase.
export const initializeAutoSync = (): (() => void) => () => undefined;
export const markSyncDirty = (): void => undefined;
export const scheduleAutoUpload = (): void => undefined;
export const flushAutoSync = async (): Promise<boolean> => false;
export const checkSyncState = async (): Promise<SyncStatusMeta> => getLocalSyncStatus();
export const subscribeToSyncStatus = (_listener: () => void): (() => void) => () => undefined;
export const disposeAutoSync = (): void => undefined;
export const overwriteCloudWithLocal = async (): Promise<RemoteSnapshotMeta> => {
  throw new Error('Cloud backup overwrite is available on web only.');
};
