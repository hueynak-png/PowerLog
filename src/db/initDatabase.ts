import { getDatabase } from './database';
import { runMigrations } from './migrations';

let initPromise: Promise<void> | null = null;

export const initDatabase = async (): Promise<void> => {
  if (initPromise) return initPromise;

  initPromise = initDatabaseOnce().catch((error) => {
    initPromise = null;
    throw error;
  });

  return initPromise;
};

const initDatabaseOnce = async (): Promise<void> => {
  const db = await getDatabase();

  await runMigrations(db);
};
