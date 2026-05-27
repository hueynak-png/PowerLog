import { Platform } from 'react-native';

import { createPreRestoreBackup, exportLocalSnapshot, replaceLocalSnapshot } from '@/src/db/snapshot';
import { getAppVersion } from './versionService';

const getTimestampForFile = (): string => new Date().toISOString().replace(/[:.]/g, '-');

export const exportBackupFile = async (): Promise<string> => {
  if (Platform.OS !== 'web' || typeof document === 'undefined' || typeof URL === 'undefined') {
    throw new Error('Backup export is available on web only.');
  }

  const bytes = await exportLocalSnapshot();
  const blob = new Blob([bytes], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const filename = `powerlog-backup-v${getAppVersion()}-${getTimestampForFile()}.sqlite`;
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return filename;
};

export const importBackupFile = async (file: File): Promise<{ backupId: string; createdAt: string }> => {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const backup = await createPreRestoreBackup();
  await replaceLocalSnapshot(bytes);
  return backup;
};
