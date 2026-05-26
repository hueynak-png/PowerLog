import { useEffect, useState } from 'react';

import type { PowerLogDatabase } from '@/src/db/types';
import { getDatabase, initDatabase } from '@/src/db';

export function useDatabase(): PowerLogDatabase | null {
  const [db, setDb] = useState<PowerLogDatabase | null>(null);
  useEffect(() => {
    let isMounted = true;
    initDatabase()
      .then(getDatabase)
      .then((database) => {
        if (isMounted) setDb(database);
      });

    return () => {
      isMounted = false;
    };
  }, []);
  return db;
}
