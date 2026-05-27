import { createSnapshotUploadPayload } from './snapshotBackupService';
import { isSyncConfigured, uploadSnapshot } from './syncService';

export const uploadCompletedWorkoutSnapshot = async (): Promise<boolean> => {
  if (!isSyncConfigured()) return false;
  const payload = await createSnapshotUploadPayload();
  await uploadSnapshot(payload.bytes, payload.meta, 'auto');
  return true;
};
