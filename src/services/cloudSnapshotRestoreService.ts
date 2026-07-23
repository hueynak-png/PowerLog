import { CURRENT_SCHEMA_VERSION } from '@/src/db/migrations';
import {
  createPreRestoreBackup,
  exportLocalSnapshot,
  replaceLocalSnapshot,
  sha256Hex,
  validateDatabaseSnapshot,
  validateLocalDatabaseSnapshot,
  type SnapshotValidationResult,
} from '@/src/db/snapshot';

import {
  downloadLatestSnapshot,
  markSnapshotRestored,
  type RemoteSnapshotMeta,
} from './syncService';

type DownloadedSnapshot = { bytes: Uint8Array; meta: RemoteSnapshotMeta };

export interface CloudSnapshotRestoreDependencies {
  downloadLatestSnapshot: () => Promise<DownloadedSnapshot>;
  sha256Hex: (bytes: Uint8Array) => Promise<string>;
  validateDatabaseSnapshot: (bytes: Uint8Array, supportedSchemaVersion: number) => Promise<SnapshotValidationResult>;
  exportLocalSnapshot: () => Promise<Uint8Array>;
  createPreRestoreBackup: (snapshot?: Uint8Array) => Promise<{ backupId: string; createdAt: string }>;
  replaceLocalSnapshot: (bytes: Uint8Array) => Promise<void>;
  validateLocalDatabaseSnapshot: (supportedSchemaVersion: number) => Promise<SnapshotValidationResult>;
  markSnapshotRestored: (meta: RemoteSnapshotMeta) => void;
  supportedSchemaVersion: number;
}

const defaultDependencies: CloudSnapshotRestoreDependencies = {
  downloadLatestSnapshot,
  sha256Hex,
  validateDatabaseSnapshot,
  exportLocalSnapshot,
  createPreRestoreBackup,
  replaceLocalSnapshot,
  validateLocalDatabaseSnapshot,
  markSnapshotRestored,
  supportedSchemaVersion: CURRENT_SCHEMA_VERSION,
};

const assertRemoteMetadata = (meta: RemoteSnapshotMeta): void => {
  if (!Number.isSafeInteger(meta.schemaVersion) || meta.schemaVersion <= 0) {
    throw new Error('Invalid cloud snapshot metadata: schema version is missing or invalid.');
  }
  if (!/^[a-f0-9]{64}$/i.test(meta.sha256)) {
    throw new Error('Invalid cloud snapshot metadata: checksum is missing or invalid.');
  }
};

export const restoreLatestCloudSnapshot = async (
  overrides: Partial<CloudSnapshotRestoreDependencies> = {},
): Promise<{ meta: RemoteSnapshotMeta; backupId: string }> => {
  const dependencies = { ...defaultDependencies, ...overrides };
  const { bytes, meta } = await dependencies.downloadLatestSnapshot();
  assertRemoteMetadata(meta);

  const downloadedHash = await dependencies.sha256Hex(bytes);
  if (downloadedHash.toLowerCase() !== meta.sha256.toLowerCase()) {
    throw new Error('Cloud snapshot checksum does not match its metadata.');
  }

  // This is intentionally before every IndexedDB write or local status update.
  await dependencies.validateDatabaseSnapshot(bytes, dependencies.supportedSchemaVersion);

  // Keep the exact original bytes in memory as the rollback source while also
  // retaining the user-visible pre-restore backup.
  const originalBytes = await dependencies.exportLocalSnapshot();
  const backup = await dependencies.createPreRestoreBackup(originalBytes);

  let replacementStarted = false;
  try {
    replacementStarted = true;
    await dependencies.replaceLocalSnapshot(bytes);
    await dependencies.validateLocalDatabaseSnapshot(dependencies.supportedSchemaVersion);

    // Status is intentionally written only after the post-replacement checks.
    dependencies.markSnapshotRestored(meta);
    return { meta, backupId: backup.backupId };
  } catch (restoreError) {
    if (!replacementStarted) throw restoreError;

    try {
      await dependencies.replaceLocalSnapshot(originalBytes);
      await dependencies.validateLocalDatabaseSnapshot(dependencies.supportedSchemaVersion);
    } catch (rollbackError) {
      throw new Error(
        `恢复失败且本地回滚失败。Restore error: ${restoreError instanceof Error ? restoreError.message : 'unknown error'}. Rollback error: ${rollbackError instanceof Error ? rollbackError.message : 'unknown error'}.`,
      );
    }

    throw restoreError;
  }
};
