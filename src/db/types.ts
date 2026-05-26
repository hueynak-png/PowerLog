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
