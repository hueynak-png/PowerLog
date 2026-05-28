import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type Href, useRouter } from 'expo-router';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { ExerciseCard } from '@/src/components/workout/ExerciseCard';
import { RpeSelector } from '@/src/components/workout/RpeSelector';
import { SetInput } from '@/src/components/workout/SetInput';
import { TimerPill } from '@/src/components/workout/TimerPill';
import type { WorkoutSet } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { showAlert } from '@/src/lib/alert';
import { getSetLoadGuidance } from '@/src/lib/setGuidance';
import { uploadCompletedWorkoutSnapshot } from '@/src/services/autoSyncService';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { useTimerStore } from '@/src/stores/useTimerStore';
import { colors } from '@/src/theme/colors';
import { radius } from '@/src/theme/radius';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { ExercisePickerModal } from './ExercisePickerModal';

type SetField = 'actualWeight' | 'actualReps' | 'actualRpe' | 'completed';

const isMainLiftRole = (role: string): boolean => role === 'competition' || role === 'variation';

export function WorkoutRecordingScreen() {
  const db = useDatabase();
  const router = useRouter();
  const session = useActiveWorkoutStore((state) => state.session);
  const exercises = useActiveWorkoutStore((state) => state.exercises);
  const addSet = useActiveWorkoutStore((state) => state.addSet);
  const removeExercise = useActiveWorkoutStore((state) => state.removeExercise);
  const removeSet = useActiveWorkoutStore((state) => state.removeSet);
  const updateSet = useActiveWorkoutStore((state) => state.updateSet);
  const completeSet = useActiveWorkoutStore((state) => state.completeSet);
  const completeWorkout = useActiveWorkoutStore((state) => state.completeWorkout);
  const reorderExercise = useActiveWorkoutStore((state) => state.reorderExercise);
  const setsCompleted = useActiveWorkoutStore((state) => state.getSetsCompleted());
  const setsTotal = useActiveWorkoutStore((state) => state.getSetsTotal());
  const elapsedSeconds = useTimerStore((state) => state.elapsedSeconds);
  const isRunning = useTimerStore((state) => state.isRunning);
  const resetTimer = useTimerStore((state) => state.reset);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [showPicker, setShowPicker] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [restSeconds, setRestSeconds] = useState<number | null>(null);
  const restTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const progressLabel = useMemo(() => `${setsCompleted} / ${setsTotal} sets`, [setsCompleted, setsTotal]);
  const completionPct = setsTotal > 0 ? Math.round((setsCompleted / setsTotal) * 100) : 0;

  const clearRestTimer = () => {
    if (restTimerRef.current) { clearInterval(restTimerRef.current); restTimerRef.current = null; }
    setRestSeconds(null);
  };

  const startRestTimer = () => {
    clearRestTimer();
    setRestSeconds(90);
    restTimerRef.current = setInterval(() => {
      setRestSeconds((prev) => {
        if (prev === null || prev <= 1) { clearRestTimer(); return null; }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearRestTimer(), []);

  const toggleExpanded = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSetUpdate = async (set: WorkoutSet, field: string, value: number | null | boolean, rpeRequired: boolean) => {
    if (!db) {
      return;
    }

    if (field === 'completed') {
      if (value === true) {
        const nextRpe = set.actualRpe;
        if (rpeRequired && typeof nextRpe !== 'number') {
          showAlert('RPE required', 'Main lift sets need an RPE before completion.');
          return;
        }
        await completeSet(db, set.id);
        startRestTimer();
        return;
      }
      await updateSet(db, set.id, { completed: false });
      return;
    }

    await updateSet(db, set.id, { [field as SetField]: value } as Partial<WorkoutSet>);
  };

  const handleRpeChange = async (setId: string, rpe: number) => {
    if (!db) {
      return;
    }

    await updateSet(db, setId, { actualRpe: rpe });
  };

  const handleAddSet = async (workoutExerciseId: string) => {
    if (!db) {
      return;
    }

    await addSet(db, workoutExerciseId);
    setExpandedIds((current) => new Set(current).add(workoutExerciseId));
  };

  const handleRemoveExercise = async (workoutExerciseId: string) => {
    if (!db) return;

    await removeExercise(db, workoutExerciseId);
    setExpandedIds((current) => {
      const next = new Set(current);
      next.delete(workoutExerciseId);
      return next;
    });
  };

  const handleRemoveSet = async (workoutExerciseId: string, setId: string) => {
    if (!db) return;
    await removeSet(db, workoutExerciseId, setId);
  };

  const updateExerciseOrderIndex = async (db: any, exerciseId: string, newOrderIndex: number) => {
    await db.runAsync('UPDATE workout_exercises SET order_index = ? WHERE id = ?', [newOrderIndex, exerciseId]);
  };

  const handleMoveExercise = async (index: number, direction: 'up' | 'down') => {
    if (!db) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= exercises.length) return;
    const currentExercise = exercises[index];
    const targetExercise = exercises[targetIndex];
    reorderExercise(index, targetIndex);
    await updateExerciseOrderIndex(db, currentExercise.id, targetIndex);
    await updateExerciseOrderIndex(db, targetExercise.id, index);
  };

  const handleCompleteWorkout = async () => {
    if (!db || !session) {
      return;
    }

    const missingRpe = exercises.some((exercise) =>
      isMainLiftRole(exercise.exercise.role) && exercise.sets.some((set) => set.completed && typeof set.actualRpe !== 'number'),
    );
    if (missingRpe) {
      showAlert('RPE required', 'Add RPE to every completed main lift set before finishing.');
      return;
    }

    setIsCompleting(true);
    try {
      await completeWorkout(db);
      void uploadCompletedWorkoutSnapshot().catch(() => undefined);
      resetTimer();
      router.push(`/workout/${session.id}/summary` as Href);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Back button */}
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹ Back</Text>
        </Pressable>

        <Card variant="elevated" style={styles.topCard}>
          <Text style={styles.sessionKicker}>Active workout</Text>
          <Text style={styles.sessionTitle}>Training cockpit</Text>
          <View style={styles.topRow}>
            <TimerPill elapsedSeconds={elapsedSeconds} isRunning={isRunning} />
            <View style={styles.progressBlock}>
              <Text style={styles.progressValue}>{completionPct}%</Text>
              <Text style={styles.progressLabel}>{progressLabel}</Text>
            </View>
          </View>
          {restSeconds !== null ? (
            <View style={styles.restTimerBanner}>
              <Text style={styles.restTimerLabel}>Rest</Text>
              <Text style={styles.restTimerValue}>{Math.floor(restSeconds / 60)}:{String(restSeconds % 60).padStart(2, '0')}</Text>
              <Pressable onPress={clearRestTimer} style={styles.restSkipBtn}>
                <Text style={styles.restSkipText}>⚡Skip</Text>
              </Pressable>
            </View>
          ) : null}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${completionPct}%` }]} />
          </View>
        </Card>

        <SectionHeader title="Exercises" subtitle="Log each working set with fast kg/reps/RPE inputs." action={{ text: showPicker ? 'Close' : 'Add' , onPress: () => setShowPicker((value) => !value) }} />
        {exercises.length > 1 && (
          <View style={styles.reorderBar}>
            <Pressable onPress={() => setIsReorderMode(!isReorderMode)} style={styles.reorderToggleBtn}>
              <Text style={styles.reorderToggleText}>{isReorderMode ? 'Done' : 'Reorder exercises'}</Text>
            </Pressable>
          </View>
        )}
        {showPicker && <ExercisePickerModal onSelect={() => setShowPicker(false)} />}

        {exercises.length === 0 ? (
          <Card variant="outlined" style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Build the session</Text>
            <Text style={styles.emptyCopy}>Add your first lift, then record weight, reps, and RPE as you train.</Text>
            <Button title="Add Exercise" onPress={() => setShowPicker(true)} variant="secondary" />
          </Card>
        ) : (
          exercises.map((workoutExercise, index) => {
            const completed = workoutExercise.sets.filter((set) => set.completed).length;
            const rpeRequired = isMainLiftRole(workoutExercise.exercise.role);
            const guidance = getSetLoadGuidance(workoutExercise.sets);
            return (
              <ExerciseCard
                key={workoutExercise.id}
                exerciseNameEn={workoutExercise.exercise.nameEn}
                exerciseNameZh={workoutExercise.exercise.nameZh}
                category={workoutExercise.exercise.category}
                muscleGroups={workoutExercise.exercise.muscleGroups}
                plannedSummary={rpeRequired ? 'Main lift · RPE required' : 'Accessory work'}
                progress={`${completed}/${workoutExercise.sets.length}`}
                isExpanded={expandedIds.has(workoutExercise.id)}
                onToggle={() => toggleExpanded(workoutExercise.id)}
                headerAction={isReorderMode ? (
                  <View style={styles.reorderActions}>
                    <Pressable onPress={() => void handleMoveExercise(index, 'up')} disabled={index === 0}
                      style={[styles.reorderArrowBtn, index === 0 && styles.reorderArrowDisabled]}>
                      <Text style={styles.reorderArrowText}>↑</Text>
                    </Pressable>
                    <Pressable onPress={() => void handleMoveExercise(index, 'down')} disabled={index === exercises.length - 1}
                      style={[styles.reorderArrowBtn, index === exercises.length - 1 && styles.reorderArrowDisabled]}>
                      <Text style={styles.reorderArrowText}>↓</Text>
                    </Pressable>
                  </View>
                ) : undefined}
              >
                <Pressable
                  onPress={() => void handleRemoveExercise(workoutExercise.id)}
                  style={styles.deleteExerciseBtn}
                  accessibilityLabel={`Delete ${workoutExercise.exercise.nameEn}`}
                >
                  <Text style={styles.deleteExerciseText}>Remove exercise</Text>
                </Pressable>

                {guidance ? (
                  <View style={styles.guidanceBox}>
                    <Text style={[styles.guidanceTitle, guidance.severity === 'alert' && styles.guidanceAlert]}>{guidance.title}</Text>
                    <Text style={styles.guidanceText}>{guidance.message}</Text>
                  </View>
                ) : null}
                {workoutExercise.sets.map((set) => (
                  <View key={set.id} style={styles.setBlock}>
                    <View style={styles.setRow}>
                      <View style={{ flex: 1 }}>
                        <SetInput
                          setNumber={set.setNumber}
                          plannedWeight={set.plannedWeight}
                          plannedReps={set.plannedReps}
                          plannedRpe={set.plannedRpe}
                          actualWeight={set.actualWeight ?? null}
                          actualReps={set.actualReps ?? null}
                          actualRpe={set.actualRpe ?? null}
                          completed={set.completed}
                          isWarmup={set.isWarmup}
                          rpeRequired={rpeRequired}
                          onUpdate={(field, value) => void handleSetUpdate(set, field, value, rpeRequired)}
                        />
                      </View>
                      <Pressable
                        onPress={() => void handleRemoveSet(workoutExercise.id, set.id)}
                        style={styles.deleteSetBtn}
                        accessibilityLabel={`Delete set ${set.setNumber}`}
                      >
                        <Text style={styles.deleteSetText}>×</Text>
                      </Pressable>
                    </View>
                    <RpeSelector value={set.actualRpe ?? null} required={rpeRequired} onChange={(rpe) => void handleRpeChange(set.id, rpe)} />
                  </View>
                ))}
                <Button title="Add Set" onPress={() => void handleAddSet(workoutExercise.id)} variant="secondary" size="md" disabled={!db} fullWidth />
              </ExerciseCard>
            );
          })
        )}

        <View style={styles.footerActions}>
          <Button title="Add Exercise" onPress={() => setShowPicker(true)} variant="secondary" disabled={!db} fullWidth />
          <Button title="Complete Workout" onPress={handleCompleteWorkout} loading={isCompleting} disabled={!db || !session || setsTotal === 0} fullWidth />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.dockBottomInset, gap: spacing.md },
  backBtn: { paddingVertical: spacing.sm },
  backBtnText: { ...typography.callout, color: colors.primary, fontWeight: '600' },
  topCard: { marginBottom: spacing.sm, gap: spacing.md },
  sessionKicker: { ...typography.overline, color: colors.primary },
  sessionTitle: { ...typography.title2, color: colors.textPrimary },
  topRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  progressBlock: { alignItems: 'flex-end' },
  progressValue: { ...typography.metric, color: colors.textPrimary },
  progressLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2, fontWeight: '700' },
  progressTrack: { height: 10, borderRadius: radius.full, backgroundColor: colors.surfaceMuted, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: radius.full, backgroundColor: colors.primary },
  emptyCard: { gap: spacing.md },
  emptyTitle: { ...typography.headline, color: colors.textPrimary },
  emptyCopy: { ...typography.callout, color: colors.textSecondary, lineHeight: 20 },
  setBlock: { marginBottom: spacing.sm },
  setRow: { flexDirection: 'row', alignItems: 'center' },
  deleteExerciseBtn: { alignSelf: 'flex-start', marginBottom: spacing.sm, paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, borderRadius: radius.full, backgroundColor: colors.dangerSoft },
  deleteExerciseText: { ...typography.footnote, color: colors.danger, fontWeight: '700' },
  deleteSetBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.xs },
  deleteSetText: { fontSize: 20, color: colors.danger, fontWeight: '700' },
  reorderArrowBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.surfaceMuted },
  reorderArrowDisabled: { opacity: 0.3 },
  reorderArrowText: { fontSize: 16, color: colors.primary, fontWeight: '900', lineHeight: 18 },
  reorderActions: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.xs },
  guidanceBox: { borderRadius: radius.lg, backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: colors.primaryBorder, padding: spacing.md, marginBottom: spacing.sm },
  guidanceTitle: { ...typography.subhead, color: colors.primary, fontWeight: '800', marginBottom: spacing.xs },
  guidanceAlert: { color: colors.danger },
  guidanceText: { ...typography.footnote, color: colors.textSecondary, lineHeight: 18 },
  footerActions: { gap: spacing.sm, marginTop: spacing.sm },
  reorderBar: { paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  reorderToggleBtn: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: radius.md, backgroundColor: colors.surfaceMuted, alignSelf: 'flex-start' },
  reorderToggleText: { ...typography.subhead, color: colors.primary, fontWeight: '600' },
  restTimerBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.lg, backgroundColor: colors.primarySoft, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
  restTimerLabel: { ...typography.overline, color: colors.textSecondary },
  restTimerValue: { ...typography.metric, color: colors.primary, fontSize: 36 },
  restSkipBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.full, backgroundColor: colors.primary },
  restSkipText: { ...typography.footnote, color: '#FFFFFF', fontWeight: '800' },
});
