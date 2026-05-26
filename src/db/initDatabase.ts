import { getDatabase } from './database';
import { runMigrations } from './migrations';

export const initDatabase = async (): Promise<void> => {
  const db = await getDatabase();

  await runMigrations(db);
};
