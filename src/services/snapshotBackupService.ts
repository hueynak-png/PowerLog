import { Platform } from 'react-native';

import { exportLocalSnapshot, getLocalSnapshotMeta } from '@/src/db/snapshot';
import { getAppVersion } from './versionService';

export interface SnapshotUploadPayload {
  bytes: Uint8Array;
  meta: {
    sha256: string;
    schemaVersion: number;
    appVersion: string;
    platform: string;
  };
}

export const createSnapshotUploadPayload = async (): Promise<SnapshotUploadPayload> => {
  const [bytes, localMeta] = await Promise.all([exportLocalSnapshot(), getLocalSnapshotMeta()]);
  return {
    bytes,
    meta: {
      sha256: localMeta.sha256,
      schemaVersion: localMeta.schemaVersion,
      appVersion: getAppVersion(),
      platform: Platform.OS,
    },
  };
};

export const formatSnapshotSize = (sizeBytes: number): string => {
  if (sizeBytes < 1024 * 1024) return `${Math.max(1, Math.round(sizeBytes / 1024))} KB`;
  return `${Math.round((sizeBytes / 1024 / 1024) * 10) / 10} MB`;
};
