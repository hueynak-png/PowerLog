type DatabasePersistedListener = () => void;

const listeners = new Set<DatabasePersistedListener>();

export const subscribeToDatabasePersisted = (listener: DatabasePersistedListener): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const notifyDatabasePersisted = (): void => {
  for (const listener of listeners) listener();
};
