import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';
import { create } from 'zustand';

import type { Exercise, WorkoutExercise, WorkoutSession, WorkoutSet } from '@/src/domain/types';
import { calculateSetVolume } from '@/src/lib/volume';
import {
  addWorkoutExercise,
  addWorkoutSet,
  completeWorkoutSession,
  createWorkoutSession,
  deleteWorkoutExercise,
  getExerciseById,
  getSessionSets,
  getWorkoutExercises,
  getWorkoutSession,
  updateWorkoutSet,
} from '@/src/repositories';

type ActiveWorkoutExercise = WorkoutExercise & { exercise: Exercise; sets: WorkoutSet[] };

interface ActiveWorkoutState {
  session: WorkoutSession | null;
  exercises: ActiveWorkoutExercise[];
  isActive: boolean;
  startWorkout: (db: SQLiteDatabase, date?: string) => Promise<void>;
  loadWorkout: (db: SQLiteDatabase, sessionId: string) => Promise<void>;
  addExercise: (db: SQLiteDatabase, exerciseId: string) => Promise<void>;
  removeExercise: (db: SQLiteDatabase, workoutExerciseId: string) => Promise<void>;
  addSet: (db: SQLiteDatabase, workoutExerciseId: string) => Promise<void>;
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
  },

  loadWorkout: async (db, sessionId) => {
    const session = await getWorkoutSession(db, sessionId);

    if (!session) {
      set(emptyWorkoutState);
      return;
    }

    const workoutExercises = await getWorkoutExercises(db, sessionId);
    const exercises = await Promise.all(
      workoutExercises.map(async (workoutExercise) => {
        const exercise = await getExerciseById(db, workoutExercise.exerciseId);
        const sets = await getSessionSets(db, sessionId);

        if (!exercise) {
          throw new Error(`Exercise not found: ${workoutExercise.exerciseId}`);
        }

        return {
          ...workoutExercise,
          exercise,
          sets: sets.filter((workoutSet) => workoutSet.workoutExerciseId === workoutExercise.id),
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

    return completedSession;
  },

  discardWorkout: async (db) => {
    const { session, exercises } = get();

    if (!session) {
      set(emptyWorkoutState);
      return;
    }

    await Promise.all(exercises.map((exercise) => deleteWorkoutExercise(db, exercise.id)));
    await completeWorkoutSession(db, session.id, new Date().toISOString(), 0, 0, 0);

    set(emptyWorkoutState);
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
