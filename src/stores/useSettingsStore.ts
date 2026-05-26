import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/database';
import { create } from 'zustand';

import type { LiftType, Max, Profile } from '@/src/domain/types';
import { createDefaultProfile, getMaxes, getProfile, updateProfile as saveProfile, upsertMax } from '@/src/repositories';

interface SettingsState {
  profile: Profile | null;
  maxes: Max[];
  isLoaded: boolean;
  loadSettings: (db: SQLiteDatabase) => Promise<void>;
  updateMax: (db: SQLiteDatabase, liftType: LiftType, oneRm: number) => Promise<void>;
  updateProfile: (db: SQLiteDatabase, updates: Partial<Profile>) => Promise<void>;
  getMaxForLift: (liftType: LiftType) => Max | null;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  profile: null,
  maxes: [],
  isLoaded: false,

  loadSettings: async (db) => {
    const existingProfile = await getProfile(db);
    const profile = existingProfile ?? (await createDefaultProfile(db));
    const maxes = await getMaxes(db);

    set({ profile, maxes, isLoaded: true });
  },

  updateMax: async (db, liftType, oneRm) => {
    const existingMax = get().maxes.find((max) => max.liftType === liftType);
    const savedMax = await upsertMax(db, {
      id: existingMax?.id,
      liftType,
      oneRm,
      source: 'manual',
      date: new Date().toISOString(),
      notes: existingMax?.notes,
    });

    set((state) => ({
      maxes: [savedMax, ...state.maxes.filter((max) => max.id !== savedMax.id)],
    }));
  },

  updateProfile: async (db, updates) => {
    await saveProfile(db, updates);

    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates, id: state.profile.id } : state.profile,
    }));
  },

  getMaxForLift: (liftType) => get().maxes.find((max) => max.liftType === liftType) ?? null,
}));

export type { SettingsState };
