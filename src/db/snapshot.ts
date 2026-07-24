import {
  createDatabaseSnapshotBackup,
  exportDatabaseSnapshot,
  getDatabase,
  replaceDatabaseSnapshot,
} from './database';
import initSqlJs, { type Database } from 'sql.js';

import type { PowerLogDatabase } from './types';

const REQUIRED_SNAPSHOT_TABLES = new Set(['schema_version', 'profile', 'workout_sessions']);

export interface SnapshotValidationResult {
  schemaVersion: number;
}

const toHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

export const sha256Hex = async (bytes: Uint8Array): Promise<string> =>
  toHex(await crypto.subtle.digest('SHA-256', bytes));

export const exportLocalSnapshot = async (): Promise<Uint8Array> => exportDatabaseSnapshot();

export const createPreRestoreBackup = async (snapshot?: Uint8Array): Promise<{ backupId: string; createdAt: string }> =>
  createDatabaseSnapshotBackup(snapshot);

export const replaceLocalSnapshot = async (bytes: Uint8Array): Promise<void> => {
  await replaceDatabaseSnapshot(bytes);
};

const assertRequiredTables = (tableNames: Iterable<string>): void => {
  const actualTables = new Set(tableNames);
  const missingTables = [...REQUIRED_SNAPSHOT_TABLES].filter((tableName) => !actualTables.has(tableName));
  if (missingTables.length > 0) {
    throw new Error(`Database snapshot is missing required table(s): ${missingTables.join(', ')}.`);
  }
};

const assertSupportedSchemaVersion = (value: unknown, supportedSchemaVersion: number): number => {
  const schemaVersion = typeof value === 'number' ? value : Number(value);
  if (!Number.isSafeInteger(schemaVersion) || schemaVersion <= 0) {
    throw new Error('Database snapshot schema version is missing or invalid.');
  }
  if (schemaVersion > supportedSchemaVersion) {
    throw new Error('Cloud snapshot uses a newer database schema. Update the app before restoring it.');
  }
  return schemaVersion;
};

/**
 * Opens a downloaded snapshot only in SQL.js memory and verifies that it is a
 * database the current application can safely restore. This deliberately does
 * not touch IndexedDB.
 */
export const validateDatabaseSnapshot = async (
  bytes: Uint8Array,
  supportedSchemaVersion: number,
): Promise<SnapshotValidationResult> => {
  let snapshotDb: Database | null = null;

  try {
    const SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
    });
    snapshotDb = new SQL.Database(bytes);
    snapshotDb.exec('SELECT 1');

    const tables = snapshotDb.exec("SELECT name FROM sqlite_master WHERE type = 'table'");
    const tableNames = tables.flatMap((result) => result.values.map((row) => String(row[0])));
    assertRequiredTables(tableNames);

    const versionResult = snapshotDb.exec('SELECT version FROM schema_version ORDER BY version DESC LIMIT 1');
    const version = versionResult[0]?.values[0]?.[0];
    const schemaVersion = assertSupportedSchemaVersion(version, supportedSchemaVersion);

    // These read-only queries ensure the required tables are queryable, not
    // merely listed in sqlite_master.
    snapshotDb.exec('SELECT COUNT(*) FROM profile');
    snapshotDb.exec('SELECT COUNT(*) FROM workout_sessions');

    return { schemaVersion };
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Database snapshot')) throw error;
    if (error instanceof Error && error.message.startsWith('Cloud snapshot')) throw error;
    throw new Error(`Database snapshot validation failed: ${error instanceof Error ? error.message : 'unknown error'}`);
  } finally {
    snapshotDb?.close();
  }
};

/** Verifies the database that is currently open after a replacement. */
export const validateLocalDatabaseSnapshot = async (
  supportedSchemaVersion: number,
): Promise<SnapshotValidationResult> => {
  const db: PowerLogDatabase = await getDatabase();
  const coreTables = await db.getAllAsync<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('schema_version', 'profile', 'workout_sessions')",
  );
  assertRequiredTables(coreTables.map((table) => table.name));

  const versionRow = await db.getFirstAsync<{ version: unknown }>(
    'SELECT version FROM schema_version ORDER BY version DESC LIMIT 1',
  );
  const schemaVersion = assertSupportedSchemaVersion(versionRow?.version, supportedSchemaVersion);

  await db.getFirstAsync('SELECT COUNT(*) AS count FROM profile');
  await db.getFirstAsync('SELECT COUNT(*) AS count FROM workout_sessions');

  return { schemaVersion };
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
