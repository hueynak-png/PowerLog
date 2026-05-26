import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { isAIConfigured, requestWorkoutSuggestion, type WorkoutSuggestionResponse } from '@/src/services/aiService';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { useTimerStore } from '@/src/stores/useTimerStore';
import { colors } from '@/src/theme/colors';
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
  const updateSet = useActiveWorkoutStore((state) => state.updateSet);
  const completeSet = useActiveWorkoutStore((state) => state.completeSet);
  const completeWorkout = useActiveWorkoutStore((state) => state.completeWorkout);
  const setsCompleted = useActiveWorkoutStore((state) => state.getSetsCompleted());
  const setsTotal = useActiveWorkoutStore((state) => state.getSetsTotal());
  const elapsedSeconds = useTimerStore((state) => state.elapsedSeconds);
  const isRunning = useTimerStore((state) => state.isRunning);
  const resetTimer = useTimerStore((state) => state.reset);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [showPicker, setShowPicker] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, WorkoutSuggestionResponse['data']>>({});
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});

  const handleAISuggestion = async (workoutExerciseId: string) => {
    const exercise = exercises.find((e) => e.id === workoutExerciseId);
    if (!exercise) return;

    const completedSets = exercise.sets
      .filter((s) => s.completed && s.actualWeight != null && s.actualReps != null && s.actualRpe != null)
      .map((s) => ({
        setNumber: s.setNumber,
        weight: s.actualWeight!,
        reps: s.actualReps!,
        rpe: s.actualRpe!,
      }));

    if (completedSets.length === 0) {
      Alert.alert('No data', 'Complete at least one set with weight, reps, and RPE before requesting AI suggestion.');
      return;
    }

    setAiLoading((prev) => ({ ...prev, [workoutExerciseId]: true }));
    try {
      const response = await requestWorkoutSuggestion({
        exerciseNameEn: exercise.exercise.nameEn,
        exerciseNameZh: exercise.exercise.nameZh,
        exerciseRole: exercise.exercise.role,
        completedSets,
        plannedWeight: exercise.sets[0]?.plannedWeight,
        plannedReps: exercise.sets[0]?.plannedReps,
        plannedRpe: exercise.sets[0]?.plannedRpe,
      });
      setAiSuggestions((prev) => ({ ...prev, [workoutExerciseId]: response.data }));
    } catch {
      Alert.alert('AI unavailable', 'Could not get suggestion. Check AI settings.');
    } finally {
      setAiLoading((prev) => ({ ...prev, [workoutExerciseId]: false }));
    }
  };

  const progressLabel = useMemo(() => `${setsCompleted} / ${setsTotal} sets`, [setsCompleted, setsTotal]);

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
          Alert.alert('RPE required', 'Main lift sets need an RPE before completion.');
          return;
        }
        await completeSet(db, set.id);
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
  };

  const handleCompleteWorkout = async () => {
    if (!db || !session) {
      return;
    }

    const missingRpe = exercises.some((exercise) =>
      isMainLiftRole(exercise.exercise.role) && exercise.sets.some((set) => set.completed && typeof set.actualRpe !== 'number'),
    );
    if (missingRpe) {
      Alert.alert('RPE required', 'Add RPE to every completed main lift set before finishing.');
      return;
    }

    setIsCompleting(true);
    try {
      await completeWorkout(db);
      resetTimer();
      router.push(`/workout/${session.id}/summary` as Href);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Card style={styles.topCard}>
          <View style={styles.topRow}>
            <TimerPill elapsedSeconds={elapsedSeconds} isRunning={isRunning} />
            <View style={styles.progressBlock}>
              <Text style={styles.progressValue}>{progressLabel}</Text>
              <Text style={styles.progressLabel}>completed</Text>
            </View>
          </View>
        </Card>

        <SectionHeader title="Exercises" action={{ text: showPicker ? 'Close' : 'Add', onPress: () => setShowPicker((value) => !value) }} />
        {showPicker && <ExercisePickerModal onSelect={() => setShowPicker(false)} />}

        {exercises.length === 0 ? (
          <Card variant="outlined" style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Build the session</Text>
            <Text style={styles.emptyCopy}>Add your first lift, then record weight, reps, and RPE as you train.</Text>
            <Button title="Add Exercise" onPress={() => setShowPicker(true)} variant="secondary" />
          </Card>
        ) : (
          exercises.map((workoutExercise) => {
            const completed = workoutExercise.sets.filter((set) => set.completed).length;
            const rpeRequired = isMainLiftRole(workoutExercise.exercise.role);
            return (
              <ExerciseCard
                key={workoutExercise.id}
                exerciseNameEn={workoutExercise.exercise.nameEn}
                exerciseNameZh={workoutExercise.exercise.nameZh}
                category={workoutExercise.exercise.category}
                muscleGroups={workoutExercise.exercise.muscleGroups}
                plannedSummary={rpeRequired ? 'Main lift · RPE required' : 'Accessory work'}
                progress={`${completed}/${workoutExercise.sets.length}`}
                isExpanded={expandedIds.has(workoutExercise.id) || workoutExercise.sets.length <= 1}
                onToggle={() => toggleExpanded(workoutExercise.id)}
              >
                {workoutExercise.sets.map((set) => (
                  <View key={set.id} style={styles.setBlock}>
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
                    <RpeSelector value={set.actualRpe ?? null} required={rpeRequired} onChange={(rpe) => void handleRpeChange(set.id, rpe)} />
                  </View>
                ))}
                <Button title="Add Set" onPress={() => void handleAddSet(workoutExercise.id)} variant="secondary" size="md" disabled={!db} />
                {isAIConfigured() && (
                  <View style={styles.aiBlock}>
                    <Button
                      title={aiLoading[workoutExercise.id] ? 'Thinking...' : 'AI Suggestion'}
                      onPress={() => void handleAISuggestion(workoutExercise.id)}
                      variant="secondary"
                      size="md"
                      disabled={aiLoading[workoutExercise.id]}
                    />
                    {aiSuggestions[workoutExercise.id] && (
                      <Card style={styles.aiCard}>
                        <Text style={[styles.aiSeverity, aiSuggestions[workoutExercise.id].severity === 'alert' && styles.aiAlert]}>
                          {aiSuggestions[workoutExercise.id].severity}
                        </Text>
                        <Text style={styles.aiText}>{aiSuggestions[workoutExercise.id].suggestion}</Text>
                        {aiSuggestions[workoutExercise.id].adjustedWeight && (
                          <Text style={styles.aiAdjust}>Suggested: {aiSuggestions[workoutExercise.id].adjustedWeight}kg</Text>
                        )}
                      </Card>
                    )}
                  </View>
                )}
              </ExerciseCard>
            );
          })
        )}

        <Button title="Add Exercise" onPress={() => setShowPicker(true)} variant="secondary" disabled={!db} />
        <Button title="Complete Workout" onPress={handleCompleteWorkout} loading={isCompleting} disabled={!db || !session || setsTotal === 0} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl, gap: spacing.md },
  topCard: { marginBottom: spacing.sm },
  topRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  progressBlock: { alignItems: 'flex-end' },
  progressValue: { ...typography.title3, color: colors.textPrimary },
  progressLabel: { ...typography.caption, color: colors.textSecondary, marginTop: spacing.xs },
  emptyCard: { gap: spacing.md },
  emptyTitle: { ...typography.headline, color: colors.textPrimary },
  emptyCopy: { ...typography.callout, color: colors.textSecondary, lineHeight: 20 },
  setBlock: { marginBottom: spacing.md },
  aiBlock: { marginTop: spacing.sm, gap: spacing.sm },
  aiCard: { backgroundColor: colors.surfaceSecondary, padding: spacing.sm },
  aiSeverity: { ...typography.caption, color: colors.warning, fontWeight: '700', textTransform: 'uppercase' },
  aiAlert: { color: colors.danger },
  aiText: { ...typography.callout, color: colors.textPrimary, marginTop: spacing.xs, lineHeight: 20 },
  aiAdjust: { ...typography.footnote, color: colors.primary, fontWeight: '600', marginTop: spacing.xs },
});
