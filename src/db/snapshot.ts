import { createDatabaseSnapshotBackup, exportDatabaseSnapshot, replaceDatabaseSnapshot } from './database';

const toHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

export const sha256Hex = async (bytes: Uint8Array): Promise<string> =>
  toHex(await crypto.subtle.digest('SHA-256', bytes));

export const exportLocalSnapshot = async (): Promise<Uint8Array> => exportDatabaseSnapshot();

export const createPreRestoreBackup = async (): Promise<{ backupId: string; createdAt: string }> =>
  createDatabaseSnapshotBackup();

export const replaceLocalSnapshot = async (bytes: Uint8Array): Promise<void> => {
  await replaceDatabaseSnapshot(bytes);
};

export const getLocalSnapshotMeta = async (): Promise<{ sizeBytes: number; sha256: string; createdAt: string; schemaVersion: number }> => {
  const bytes = await exportLocalSnapshot();
  return {
    sizeBytes: bytes.byteLength,
    sha256: await sha256Hex(bytes),
    createdAt: new Date().toISOString(),
    schemaVersion: 1,
  };
};
