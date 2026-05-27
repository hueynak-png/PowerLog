import type { PowerLogDatabase } from './types';

/**
 * Platform-resolved database module.
 *
 * At runtime, Metro/webpack resolves to:
 * - database.web.ts (web platform)
 * - database.native.ts (iOS/Android)
 *
 * This file serves as the TypeScript fallback for type checking.
 * It should never actually execute at runtime.
 */
export const getDatabase = async (): Promise<PowerLogDatabase> => {
  throw new Error('Platform-specific database implementation not resolved. This should not happen.');
};

export const exportDatabaseSnapshot = async (): Promise<Uint8Array> => {
  throw new Error('Platform-specific database implementation not resolved. This should not happen.');
};

export const createDatabaseSnapshotBackup = async (): Promise<{ backupId: string; createdAt: string }> => {
  throw new Error('Platform-specific database implementation not resolved. This should not happen.');
};

export const replaceDatabaseSnapshot = async (_data: Uint8Array): Promise<void> => {
  throw new Error('Platform-specific database implementation not resolved. This should not happen.');
};
