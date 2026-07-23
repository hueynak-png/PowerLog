import {
  createDatabaseSnapshotBackup,
  exportDatabaseSnapshot,
  getDatabase,
  replaceDatabaseSnapshot,
} from './database';

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

const getCurrentSchemaVersion = async (): Promise<number> => {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ version: unknown }>(
    'SELECT version FROM schema_version ORDER BY version DESC LIMIT 1',
  );
  const schemaVersion = typeof row?.version === 'number'
    ? row.version
    : Number(row?.version);

  if (!Number.isSafeInteger(schemaVersion) || schemaVersion <= 0) {
    throw new Error('Local database schema version is missing or invalid.');
  }

  return schemaVersion;
};

export const getLocalSnapshotMeta = async (): Promise<{ sizeBytes: number; sha256: string; createdAt: string; schemaVersion: number }> => {
  const [bytes, schemaVersion] = await Promise.all([
    exportLocalSnapshot(),
    getCurrentSchemaVersion(),
  ]);

  return {
    sizeBytes: bytes.byteLength,
    sha256: await sha256Hex(bytes),
    createdAt: new Date().toISOString(),
    schemaVersion,
  };
};
