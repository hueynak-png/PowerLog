import { Platform } from 'react-native';

/**
 * PowerLogDatabase interface - abstracts the database layer.
 * Native uses expo-sqlite, Web uses sql.js with IndexedDB persistence.
 */
export interface PowerLogDatabase {
  execAsync(sql: string): Promise<void>;
  runAsync(sql: string, params?: unknown[]): Promise<{ changes: number; lastInsertRowId: number }>;
  getFirstAsync<T>(sql: string, params?: unknown[]): Promise<T | null>;
  getAllAsync<T>(sql: string, params?: unknown[]): Promise<T[]>;
}

let databasePromise: Promise<PowerLogDatabase> | null = null;

const createDatabase = async (): Promise<PowerLogDatabase> => {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createWebDatabase } = require('./database.web');
    return createWebDatabase();
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createNativeDatabase } = require('./database.native');
  return createNativeDatabase();
};

export const getDatabase = async (): Promise<PowerLogDatabase> => {
  databasePromise ??= createDatabase();
  return databasePromise;
};
