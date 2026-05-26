import { create } from 'zustand';

import { getDatabase, initDatabase } from '@/src/db';

import { useSettingsStore } from './useSettingsStore';

interface AppState {
  isInitialized: boolean;
  isInitializing: boolean;
  error: string | null;
  initialize: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  isInitialized: false,
  isInitializing: false,
  error: null,

  initialize: async () => {
    if (get().isInitialized || get().isInitializing) {
      return;
    }

    set({ isInitializing: true, error: null });

    try {
      await initDatabase();

      const db = await getDatabase();
      await useSettingsStore.getState().loadSettings(db);

      set({ isInitialized: true, isInitializing: false, error: null });
    } catch (error) {
      set({
        isInitialized: false,
        isInitializing: false,
        error: error instanceof Error ? error.message : 'Failed to initialize app.',
      });
    }
  },
}));

export type { AppState };
