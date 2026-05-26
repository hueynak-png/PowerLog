import { useEffect, useState } from 'react';

import type { PowerLogDatabase } from '@/src/db/types';
import { getDatabase } from '@/src/db/database';

export function useDatabase(): PowerLogDatabase | null {
  const [db, setDb] = useState<PowerLogDatabase | null>(null);
  useEffect(() => {
    getDatabase().then(setDb);
  }, []);
  return db;
}
