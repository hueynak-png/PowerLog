import { countCompletedWorkouts } from './backupRecoveryService';
import { createSnapshotUploadPayload } from './snapshotBackupService';
import { isSyncConfigured, uploadSnapshot } from './syncService';

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
