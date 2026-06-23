import { create } from 'zustand';

import { liveActivityService } from '@/src/services/liveActivityService';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';

interface TimerState {
  elapsedSeconds: number;
  isRunning: boolean;
  startTime: number | null;
  intervalId: ReturnType<typeof setInterval> | null;
  start: () => void;
  startFrom: (startedAt: string) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  tick: () => void;
}

const clearTimerInterval = (intervalId: ReturnType<typeof setInterval> | null): void => {
  if (intervalId) {
    clearInterval(intervalId);
  }
};

// ---- visibility listener (module-level, not stored in Zustand state) ----

let _visibilityCleanup: (() => void) | null = null;

const removeVisibilityListener = (): void => {
  _visibilityCleanup?.();
  _visibilityCleanup = null;
};

/**
 * Registers a platform-appropriate visibility listener that calls `onVisible`
 * every time the app/tab becomes visible / active again.
 *
 * - web:     document `visibilitychange` → `visible`
 * - native:  react-native `AppState` → `active`
 */
const addVisibilityListener = (onVisible: () => void): void => {
  removeVisibilityListener();

  if (typeof document !== 'undefined' && 'visibilityState' in document) {
    const recalc = () => {
      if (document.visibilityState === 'visible') {
        onVisible();
      }
    };
    document.addEventListener('visibilitychange', recalc);
    window.addEventListener('pageshow', recalc);
    window.addEventListener('focus', recalc);
    _visibilityCleanup = () => {
      document.removeEventListener('visibilitychange', recalc);
      window.removeEventListener('pageshow', recalc);
      window.removeEventListener('focus', recalc);
    };
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { AppState } = require('react-native');
    const sub = AppState.addEventListener('change', (nextState: string) => {
      if (nextState === 'active') {
        onVisible();
      }
    });
    _visibilityCleanup = () => sub.remove();
  } catch {
    /* no-op: neither web nor native available */
  }
};

// ---- Live Activity listener (module-level) ----

let _liveActivityCleanup: (() => void) | null = null;

const removeLiveActivityListener = (): void => {
  _liveActivityCleanup?.();
  _liveActivityCleanup = null;
};

const setupLiveActivityListener = (): void => {
  removeLiveActivityListener();
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { AppState } = require('react-native');
    const sub = AppState.addEventListener('change', (nextState: string) => {
      if (nextState === 'background') {
        const wStore = useActiveWorkoutStore.getState();
        if (wStore.isActive && wStore.exercises.length > 0) {
          const currentEx = wStore.exercises.find(
            (ex) => ex.sets.some((s) => !s.completed),
          );
          if (currentEx) {
            const incompletedSets = currentEx.sets.filter((s) => !s.completed);
            const completedCount = currentEx.sets.filter((s) => s.completed).length;
            liveActivityService.start({
              exerciseName: currentEx.exercise.nameEn,
              weightKg: incompletedSets[0]?.plannedWeight ?? 0,
              setIndex: completedCount + 1,
              totalSets: currentEx.sets.length,
              restEndsAt: Date.now() + 90000,
              nextWeightKg: incompletedSets[1]?.plannedWeight,
              phase: 'resting',
            });
          }
        }
      } else if (nextState === 'active') {
        liveActivityService.end();
      }
    });
    _liveActivityCleanup = () => sub.remove();
  } catch {
    /* no-op: AppState not available */
  }
};

export const useTimerStore = create<TimerState>((set, get) => ({
  elapsedSeconds: 0,
  isRunning: false,
  startTime: null,
  intervalId: null,

  start: () => {
    clearTimerInterval(get().intervalId);

    const intervalId = setInterval(() => get().tick(), 1000);

    set({
      elapsedSeconds: 0,
      isRunning: true,
      startTime: Date.now(),
      intervalId,
    });

    addVisibilityListener(() => {
      const { startTime: st } = get();
      if (st) {
        set({ elapsedSeconds: Math.floor((Date.now() - st) / 1000) });
      }
    });

    setupLiveActivityListener();
  },

  startFrom: (startedAt) => {
    clearTimerInterval(get().intervalId);

    const startTime = new Date(startedAt).getTime();
    const intervalId = setInterval(() => get().tick(), 1000);

    set({
      elapsedSeconds: Math.max(0, Math.floor((Date.now() - startTime) / 1000)),
      isRunning: true,
      startTime,
      intervalId,
    });

    addVisibilityListener(() => {
      const { startTime: st } = get();
      if (st) {
        set({ elapsedSeconds: Math.floor((Date.now() - st) / 1000) });
      }
    });

    setupLiveActivityListener();
  },

  pause: () => {
    const { intervalId, startTime } = get();

    clearTimerInterval(intervalId);
    removeVisibilityListener();
    removeLiveActivityListener();

    set({
      elapsedSeconds: startTime ? Math.floor((Date.now() - startTime) / 1000) : get().elapsedSeconds,
      isRunning: false,
      startTime: null,
      intervalId: null,
    });
  },

  resume: () => {
    const { elapsedSeconds, intervalId } = get();

    clearTimerInterval(intervalId);

    const nextIntervalId = setInterval(() => get().tick(), 1000);

    set({
      isRunning: true,
      startTime: Date.now() - elapsedSeconds * 1000,
      intervalId: nextIntervalId,
    });

    addVisibilityListener(() => {
      const { startTime: st } = get();
      if (st) {
        set({ elapsedSeconds: Math.floor((Date.now() - st) / 1000) });
      }
    });

    setupLiveActivityListener();
  },

  reset: () => {
    clearTimerInterval(get().intervalId);
    removeVisibilityListener();
    removeLiveActivityListener();

    set({
      elapsedSeconds: 0,
      isRunning: false,
      startTime: null,
      intervalId: null,
    });
  },

  tick: () => {
    const { startTime } = get();

    if (!startTime) {
      return;
    }

    set({ elapsedSeconds: Math.floor((Date.now() - startTime) / 1000) });
  },
}));

export type { TimerState };
