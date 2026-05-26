import { create } from 'zustand';

interface TimerState {
  elapsedSeconds: number;
  isRunning: boolean;
  startTime: number | null;
  intervalId: ReturnType<typeof setInterval> | null;
  start: () => void;
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
  },

  pause: () => {
    const { intervalId, startTime } = get();

    clearTimerInterval(intervalId);

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
  },

  reset: () => {
    clearTimerInterval(get().intervalId);

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
