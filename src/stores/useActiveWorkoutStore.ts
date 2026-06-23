import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';
import { Platform } from 'react-native';
import { create } from 'zustand';

import type { Exercise, WorkoutExercise, WorkoutSession, WorkoutSet } from '@/src/domain/types';
import { calculateSetVolume } from '@/src/lib/volume';
import {
  addWorkoutExercise,
  addWorkoutSet,
  completeWorkoutSession,
  createWorkoutSession,
  deleteWorkoutExercise,
  deleteWorkoutSet,
  getExerciseById,
  getSessionSets,
  getWorkoutExercises,
  getWorkoutSession,
  updateWorkoutSet,
} from '@/src/repositories';
import { advanceCycleDay, getPlannedExercises, getPlannedSets } from '@/src/repositories/programRepository';
import { liveActivityService } from '@/src/services/liveActivityService';

type ActiveWorkoutExercise = WorkoutExercise & { exercise: Exercise; sets: WorkoutSet[] };

interface ActiveWorkoutState {
  session: WorkoutSession | null;
  exercises: ActiveWorkoutExercise[];
  isActive: boolean;
  startWorkout: (db: SQLiteDatabase, date?: string) => Promise<void>;
  startWorkoutFromProgram: (db: SQLiteDatabase, programDayId: string) => Promise<void>;
  loadWorkout: (db: SQLiteDatabase, sessionId: string) => Promise<void>;
  addExercise: (db: SQLiteDatabase, exerciseId: string) => Promise<void>;
  removeExercise: (db: SQLiteDatabase, workoutExerciseId: string) => Promise<void>;
  reorderExercise: (fromIndex: number, toIndex: number) => void;
  addSet: (db: SQLiteDatabase, workoutExerciseId: string) => Promise<void>;
  removeSet: (db: SQLiteDatabase, workoutExerciseId: string, setId: string) => Promise<void>;
  updateSet: (db: SQLiteDatabase, setId: string, updates: Partial<WorkoutSet>) => Promise<void>;
  completeSet: (db: SQLiteDatabase, setId: string) => Promise<void>;
  completeWorkout: (db: SQLiteDatabase) => Promise<WorkoutSession>;
  discardWorkout: (db: SQLiteDatabase) => Promise<void>;
  getTotalVolume: () => number;
  getCompletionRate: () => number;
  getSetsCompleted: () => number;
  getSetsTotal: () => number;
}

const emptyWorkoutState = {
  session: null,
  exercises: [],
  isActive: false,
};

const ACTIVE_SESSION_KEY = 'powerlog-active-session';

const persistActiveSession = (sessionId: string | null) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    try {
      if (sessionId) window.localStorage.setItem(ACTIVE_SESSION_KEY, sessionId);
      else window.localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch { /* ignore */ }
  }
};

export const getPersistedActiveSession = (): string | null => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    try { return window.localStorage.getItem(ACTIVE_SESSION_KEY); }
    catch { return null; }
  }
  return null;
};

const getSetVolume = (set: WorkoutSet): number => {
  if (!set.completed) {
    return 0;
  }

  return calculateSetVolume(set.actualWeight ?? set.plannedWeight ?? 0, set.actualReps ?? set.plannedReps ?? 0);
};

const getSessionDuration = (session: WorkoutSession): number =>
  Math.max(0, Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000));

export const useActiveWorkoutStore = create<ActiveWorkoutState>((set, get) => ({
  ...emptyWorkoutState,

  startWorkout: async (db, date?) => {
    const now = new Date().toISOString();
    const workoutDate = date ?? now.slice(0, 10);
    const session = await createWorkoutSession(db, {
      date: workoutDate,
      startedAt: now,
      aiSummaryStatus: 'not_requested',
    });

    set({ session, exercises: [], isActive: true });
    persistActiveSession(session.id);
  },

  startWorkoutFromProgram: async (db, programDayId) => {
    const now = new Date().toISOString();
    // Use the program day's scheduled date, fall back to today
    const dayRow = await db.getFirstAsync<{ scheduled_date: string | null }>(
      'SELECT scheduled_date FROM program_days WHERE id = ?', [programDayId],
    );
    const workoutDate = dayRow?.scheduled_date ?? now.slice(0, 10);
    const session = await createWorkoutSession(db, {
      programDayId,
      date: workoutDate,
      startedAt: now,
      aiSummaryStatus: 'not_requested',
    });

    const plannedExercises = await getPlannedExercises(db, programDayId);
    const exercises: ActiveWorkoutExercise[] = [];

    for (const pe of plannedExercises) {
      const exercise = await getExerciseById(db, pe.exerciseId);
      if (!exercise) continue;

      const workoutExercise = await addWorkoutExercise(db, {
        workoutSessionId: session.id,
        exerciseId: pe.exerciseId,
        plannedExerciseId: pe.id,
        orderIndex: pe.orderIndex,
        notes: pe.notes ?? undefined,
      });

      const sets: WorkoutSet[] = [];

      // Read planned_sets for per-set differentiation (Brad program)
      const plannedSets = await getPlannedSets(db, pe.id);

      if (plannedSets.length > 0) {
        for (const ps of plannedSets) {
          const noteParts = [];
          if (ps.notes) noteParts.push(ps.notes);
          if (ps.adjustmentReason) noteParts.push(`AI ${ps.adjustmentReason}`);

          const set = await addWorkoutSet(db, {
            workoutExerciseId: workoutExercise.id,
            setNumber: ps.setNumber,
            setLabel: ps.setLabel,
            plannedWeight: ps.targetLoad ?? undefined,
            plannedReps: ps.targetReps ?? undefined,
            plannedRepRange: ps.targetRepRange ?? undefined,
            plannedRpe: ps.targetRpe ?? undefined,
            plannedPercent: ps.targetPercent ?? undefined,
            actualWeight: ps.targetLoad ?? undefined,
            actualReps: ps.targetReps ?? undefined,
            completed: false,
            isWarmup: false,
            notes: noteParts.length > 0 ? noteParts.join('; ') : undefined,
          });
          sets.push(set);
        }
      } else {
        // Fallback: exercise-level uniform sets (AI-generated programs, old plans)
        const targetSets = pe.targetSets ?? 1;
        for (let i = 0; i < targetSets; i++) {
          const set = await addWorkoutSet(db, {
            workoutExerciseId: workoutExercise.id,
            setNumber: i + 1,
            plannedWeight: pe.targetLoad ?? undefined,
            plannedReps: pe.targetReps ?? undefined,
            plannedRepRange: pe.targetRepRange ?? undefined,
            plannedRpe: pe.targetRpe ?? undefined,
            plannedPercent: pe.targetPercent ?? undefined,
            actualWeight: pe.targetLoad ?? undefined,
            actualReps: pe.targetReps ?? undefined,
            completed: false,
            isWarmup: false,
          });
          sets.push(set);
        }
      }

      exercises.push({ ...workoutExercise, exercise, sets });
    }

    set({ session, exercises, isActive: true });
    persistActiveSession(session.id);
  },

  loadWorkout: async (db, sessionId) => {
    const session = await getWorkoutSession(db, sessionId);

    if (!session) {
      set(emptyWorkoutState);
      return;
    }

    const workoutExercises = await getWorkoutExercises(db, sessionId);
    // Single query for all session sets (fixes N+1: was called once per exercise)
    const allSets = await getSessionSets(db, sessionId);
    const exercises = await Promise.all(
      workoutExercises.map(async (workoutExercise) => {
        const exercise = await getExerciseById(db, workoutExercise.exerciseId);

        if (!exercise) {
          throw new Error(`Exercise not found: ${workoutExercise.exerciseId}`);
        }

        return {
          ...workoutExercise,
          exercise,
          sets: allSets.filter((workoutSet) => workoutSet.workoutExerciseId === workoutExercise.id),
        };
      }),
    );

    set({ session, exercises, isActive: !session.endedAt });
  },

  addExercise: async (db, exerciseId) => {
    const { session, exercises } = get();

    if (!session) {
      throw new Error('Cannot add exercise without an active workout session.');
    }

    const exercise = await getExerciseById(db, exerciseId);

    if (!exercise) {
      throw new Error(`Exercise not found: ${exerciseId}`);
    }

    const workoutExercise = await addWorkoutExercise(db, {
      workoutSessionId: session.id,
      exerciseId,
      orderIndex: exercises.length,
    });
    const firstSet = await addWorkoutSet(db, {
      workoutExerciseId: workoutExercise.id,
      setNumber: 1,
      completed: false,
      isWarmup: false,
    });

    set((state) => ({
      exercises: [...state.exercises, { ...workoutExercise, exercise, sets: [firstSet] }],
    }));
  },

  removeExercise: async (db, workoutExerciseId) => {
    await deleteWorkoutExercise(db, workoutExerciseId);

    set((state) => ({
      exercises: state.exercises.filter((exercise) => exercise.id !== workoutExerciseId),
    }));
  },

  reorderExercise: (fromIndex, toIndex) => {
    set((state) => {
      const newExercises = [...state.exercises];
      const [movedExercise] = newExercises.splice(fromIndex, 1);
      newExercises.splice(toIndex, 0, movedExercise);
      
      return {
        exercises: newExercises.map((exercise, index) => ({
          ...exercise,
          orderIndex: index,
        })),
      };
    });
  },

  addSet: async (db, workoutExerciseId) => {
    const workoutExercise = get().exercises.find((exercise) => exercise.id === workoutExerciseId);

    if (!workoutExercise) {
      throw new Error(`Workout exercise not found: ${workoutExerciseId}`);
    }

    const savedSet = await addWorkoutSet(db, {
      workoutExerciseId,
      setNumber: workoutExercise.sets.length + 1,
      completed: false,
      isWarmup: false,
    });

    set((state) => ({
      exercises: state.exercises.map((exercise) =>
        exercise.id === workoutExerciseId ? { ...exercise, sets: [...exercise.sets, savedSet] } : exercise,
      ),
    }));
  },

  removeSet: async (db, workoutExerciseId, setId) => {
    await deleteWorkoutSet(db, setId);

    set((state) => ({
      exercises: state.exercises.map((exercise) =>
        exercise.id === workoutExerciseId
          ? { ...exercise, sets: exercise.sets.filter((s) => s.id !== setId) }
          : exercise,
      ),
    }));
  },

  updateSet: async (db, setId, updates) => {
    await updateWorkoutSet(db, setId, updates);

    set((state) => ({
      exercises: state.exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((workoutSet) =>
          workoutSet.id === setId ? { ...workoutSet, ...updates, id: workoutSet.id } : workoutSet,
        ),
      })),
    }));
  },

  completeSet: async (db, setId) => {
    await get().updateSet(db, setId, { completed: true });

    // Update Live Activity with new progress
    try {
      const state = get();
      if (!state.isActive) return;

      for (const ex of state.exercises) {
        const targetSet = ex.sets.find((s) => s.id === setId);
        if (!targetSet) continue;

        const incompletedSets = ex.sets.filter((s) => !s.completed);
        const completedCount = ex.sets.filter((s) => s.completed).length;

        if (incompletedSets.length > 0) {
          liveActivityService.update({
            weightKg: incompletedSets[0].plannedWeight ?? 0,
            setIndex: completedCount + 1,
            totalSets: ex.sets.length,
            nextWeightKg: incompletedSets[1]?.plannedWeight,
            exerciseName: ex.exercise.nameEn,
            restEndsAt: Date.now() + 90000,
            phase: 'lifting',
          });
        }
        break;
      }
    } catch {
      /* no-op: Live Activity update is best-effort */
    }
  },

  completeWorkout: async (db) => {
    const { session } = get();

    if (!session) {
      throw new Error('Cannot complete workout without an active workout session.');
    }

    const endedAt = new Date().toISOString();
    const durationSeconds = getSessionDuration(session);
    const completionRate = get().getCompletionRate();
    const totalVolume = get().getTotalVolume();

    await completeWorkoutSession(db, session.id, endedAt, durationSeconds, completionRate, totalVolume);

    const completedSession: WorkoutSession = {
      ...session,
      endedAt,
      durationSeconds,
      completionRate,
      totalVolume,
    };

    set({ session: completedSession, isActive: false });
    persistActiveSession(null);

    liveActivityService.end();

    if (session.programDayId) {
      await advanceCycleDay(db);
    }

    return completedSession;
  },

  discardWorkout: async (db) => {
    const { session, exercises } = get();

    if (!session) {
      set(emptyWorkoutState);
      persistActiveSession(null);
      liveActivityService.end();
      return;
    }

    await Promise.all(exercises.map((exercise) => deleteWorkoutExercise(db, exercise.id)));
    await completeWorkoutSession(db, session.id, new Date().toISOString(), 0, 0, 0);

    set(emptyWorkoutState);
    persistActiveSession(null);
    liveActivityService.end();
  },

  getTotalVolume: () =>
    get().exercises.reduce(
      (total, exercise) => total + exercise.sets.reduce((exerciseTotal, set) => exerciseTotal + getSetVolume(set), 0),
      0,
    ),

  getCompletionRate: () => {
    const total = get().getSetsTotal();

    if (total === 0) {
      return 0;
    }

    return get().getSetsCompleted() / total;
  },

  getSetsCompleted: () =>
    get().exercises.reduce(
      (total, exercise) => total + exercise.sets.filter((workoutSet) => workoutSet.completed).length,
      0,
    ),
  getSetsTotal: () => get().exercises.reduce((total, exercise) => total + exercise.sets.length, 0),
}));

export type { ActiveWorkoutExercise, ActiveWorkoutState };
