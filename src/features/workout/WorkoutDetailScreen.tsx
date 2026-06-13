import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/src/i18n';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type Href, useRouter } from 'expo-router';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { MetricCard } from '@/src/components/ui/MetricCard';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { CompletionBadge } from '@/src/components/workout/CompletionBadge';
import { ExerciseCard } from '@/src/components/workout/ExerciseCard';
import { RpeSelector } from '@/src/components/workout/RpeSelector';
import { SetInput } from '@/src/components/workout/SetInput';
import type { WorkoutSet } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { showAlert } from '@/src/lib/alert';
import { formatDateTimeLocale, formatDurationLocale } from '@/src/lib/date';
import { calculateWorkoutSummary } from '@/src/lib/workoutSummary';
import { updateWorkoutSession } from '@/src/repositories';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { colors } from '@/src/theme/colors';
import { radius } from '@/src/theme/radius';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { ExercisePickerModal } from './ExercisePickerModal';

type SetField = 'actualWeight' | 'actualReps' | 'actualRpe' | 'completed';

const isMainLiftRole = (role: string): boolean => role === 'competition' || role === 'variation';

const formatValue = (value?: number, unit = ''): string =>
  typeof value === 'number' ? `${value}${unit}` : '—';

function ReadOnlySetRow({ set }: { set: WorkoutSet }) {
  const { t } = useTranslation();
  return (
    <View style={[styles.setRow, set.isWarmup && styles.warmupRow]}>
      <Text style={styles.setNumber}>{set.isWarmup ? 'W' : set.setNumber}</Text>
      <View style={styles.setCell}>
        <Text style={styles.setLabel}>{t('common.weight')}</Text>
        <Text style={styles.setValue}>{formatValue(set.actualWeight ?? set.plannedWeight, ' kg')}</Text>
        {typeof set.plannedWeight === 'number' && <Text style={styles.plannedValue}>{t('workoutDetail.planWeight', { weight: set.plannedWeight })}</Text>}
      </View>
      <View style={styles.setCell}>
        <Text style={styles.setLabel}>{t('common.reps')}</Text>
        <Text style={styles.setValue}>{formatValue(set.actualReps ?? set.plannedReps)}</Text>
        {typeof set.plannedReps === 'number' && <Text style={styles.plannedValue}>{t('workoutDetail.planReps', { reps: set.plannedReps })}</Text>}
      </View>
      <View style={styles.setCell}>
        <Text style={styles.setLabel}>{t('common.rpe')}</Text>
        <Text style={styles.setValue}>{formatValue(set.actualRpe ?? set.plannedRpe)}</Text>
        {typeof set.plannedRpe === 'number' && <Text style={styles.plannedValue}>{t('workoutDetail.planRpe', { rpe: set.plannedRpe })}</Text>}
      </View>
      <CompletionBadge completed={set.completed} size="sm" />
    </View>
  );
}

export function WorkoutDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const db = useDatabase();
  const session = useActiveWorkoutStore((state) => state.session);
  const exercises = useActiveWorkoutStore((state) => state.exercises);
  const addSet = useActiveWorkoutStore((state) => state.addSet);
  const removeExercise = useActiveWorkoutStore((state) => state.removeExercise);
  const removeSet = useActiveWorkoutStore((state) => state.removeSet);
  const updateSet = useActiveWorkoutStore((state) => state.updateSet);
  const completeSet = useActiveWorkoutStore((state) => state.completeSet);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(exercises.map((exercise) => exercise.id)));
  const [isEditing, setIsEditing] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const summary = calculateWorkoutSummary(
    exercises.map((exercise) => ({ workoutExercise: exercise, exercise: exercise.exercise, sets: exercise.sets })),
    session?.durationSeconds ?? 0,
  );

  const toggleExpanded = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSetUpdate = async (set: WorkoutSet, field: string, value: number | null | boolean, rpeRequired: boolean) => {
    if (!db) return;

    if (field === 'completed') {
      if (value === true) {
        if (rpeRequired && typeof set.actualRpe !== 'number') {
          showAlert(t('workout.rpeRequired'), t('workoutRecording.rpeAlertMainLift'));
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
    if (!db) return;
    await updateSet(db, setId, { actualRpe: rpe });
  };

  const handleAddSet = async (workoutExerciseId: string) => {
    if (!db) return;
    await addSet(db, workoutExerciseId);
    setExpandedIds((current) => new Set(current).add(workoutExerciseId));
  };

  const handleRemoveSet = async (workoutExerciseId: string, setId: string) => {
    if (!db) return;
    await removeSet(db, workoutExerciseId, setId);
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

  const isCompleted = !!session?.endedAt;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>{`‹ ${t('common.back')}`}</Text>
        </Pressable>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{t('workout.workoutDetails')}</Text>
          <Text style={styles.title}>{session ? formatDateTimeLocale(session.startedAt, i18n.language) : t('workoutDetail.completedSession')}</Text>
          <Text style={styles.subtitle}>{t('workoutDetail.readonlyHint')}</Text>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard label={t('common.duration')} value={formatDurationLocale(summary.durationSeconds, i18n.language)} color={colors.primary} />
          <MetricCard label={t('common.complete')} value={`${Math.round(summary.completionRate * 100)}`} unit="%" color={colors.success} />
          <MetricCard label={t('common.volume')} value={`${Math.round(summary.totalVolume)}`} unit="kg" color={colors.textPrimary} />
        </View>

        {isCompleted && (
          <Button
            title={isEditing ? t('common.done') : t('workout.edit')}
            variant={isEditing ? 'primary' : 'secondary'}
            onPress={async () => {
              if (isEditing && db && session) {
                await updateWorkoutSession(db, session.id, {
                  completionRate: summary.completionRate,
                  totalVolume: summary.totalVolume,
                });
              }
              setIsEditing(!isEditing);
              setShowPicker(false);
            }}
            fullWidth
          />
        )}

        <SectionHeader
          title={t('workout.exercises')}
          action={isEditing ? { text: showPicker ? t('common.close') : t('common.add'), onPress: () => setShowPicker((v) => !v) } : undefined}
        />

        {exercises.length > 0 ? (
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
                plannedSummary={`${workoutExercise.exercise.role} · ${workoutExercise.exercise.liftFamily}`}
                progress={`${completed}/${workoutExercise.sets.length}`}
                isExpanded={expandedIds.has(workoutExercise.id)}
                onToggle={() => toggleExpanded(workoutExercise.id)}
              >
                {isEditing ? (
                  <>
                    <Pressable
                      onPress={() => void handleRemoveExercise(workoutExercise.id)}
                      style={styles.deleteExerciseBtn}
                      accessibilityLabel={t('workoutRecording.deleteExercise', { name: workoutExercise.exercise.nameEn })}
                    >
                      <Text style={styles.deleteExerciseText}>{t('workout.removeExercise')}</Text>
                    </Pressable>

                    {workoutExercise.sets.map((set) => (
                      <View key={set.id} style={styles.editSetBlock}>
                        <View style={styles.editSetRow}>
                          <View style={{ flex: 1 }}>
                            <SetInput
                              setNumber={set.setNumber}
                              setLabel={set.setLabel}
                              plannedWeight={set.plannedWeight}
                              plannedReps={set.plannedReps}
                              plannedRepRange={set.plannedRepRange}
                              plannedRpe={set.plannedRpe}
                              plannedPercent={set.plannedPercent}
                              plannedNotes={set.notes}
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
                            accessibilityLabel={t('workoutRecording.deleteSet', { number: set.setNumber })}
                          >
                            <Text style={styles.deleteSetText}>×</Text>
                          </Pressable>
                        </View>
                        <RpeSelector
                          value={set.actualRpe ?? null}
                          required={rpeRequired}
                          onChange={(rpe) => void handleRpeChange(set.id, rpe)}
                        />
                      </View>
                    ))}

                    <Button
                      title={t('workout.addSet')}
                      onPress={() => void handleAddSet(workoutExercise.id)}
                      variant="secondary"
                      size="md"
                      disabled={!db}
                      fullWidth
                    />
                  </>
                ) : (
                  <>
                    {workoutExercise.notes ? <Text style={styles.notes}>{t('common.notes')}: {workoutExercise.notes}</Text> : null}
                    {workoutExercise.sets.map((set) => (
                      <View key={set.id}>
                        <ReadOnlySetRow set={set} />
                        {set.notes ? <Text style={styles.setNotes}>{t('workoutDetail.setNote')} {set.notes}</Text> : null}
                      </View>
                    ))}
                  </>
                )}
              </ExerciseCard>
            );
          })
        ) : (
          <Card variant="outlined" style={styles.card}>
            <Text style={styles.empty}>{t('workoutDetail.noExerciseData')}</Text>
          </Card>
        )}
        {isEditing && showPicker && <ExercisePickerModal onSelect={() => setShowPicker(false)} />}

        {session?.notes ? (
          <>
            <SectionHeader title={t('workout.sessionNotes')} />
            <Card style={styles.card}>
              <Text style={styles.notes}>{session.notes}</Text>
            </Card>
          </>
        ) : null}

        <Button title={t('workout.viewSummary')} variant="secondary" onPress={() => session && router.push(`/workout/${session.id}/summary` as Href)} />
        <Button title={t('common.done')} onPress={() => router.replace('/(tabs)/calendar')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.dockBottomInset, gap: spacing.md },
  backBtn: { alignSelf: 'flex-start', paddingVertical: spacing.sm },
  backBtnText: { ...typography.callout, color: colors.primary, fontWeight: '600' },
  hero: { paddingTop: spacing.lg, paddingBottom: spacing.sm },
  eyebrow: { ...typography.footnote, color: colors.success, fontWeight: '700', textTransform: 'uppercase' },
  title: { ...typography.title2, color: colors.textPrimary, marginTop: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 22 },
  metricsRow: { flexDirection: 'row', gap: spacing.sm, justifyContent: 'space-between', minWidth: 0 },
  card: { gap: spacing.sm },
  setRow: { flexDirection: 'row', alignItems: 'center', borderBottomColor: colors.borderLight, borderBottomWidth: 1, gap: spacing.sm, paddingVertical: spacing.sm },
  warmupRow: { opacity: 0.7 },
  setNumber: { ...typography.footnote, color: colors.textSecondary, textAlign: 'center', width: 20 },
  setCell: { alignItems: 'center', flex: 1 },
  setLabel: { ...typography.caption, color: colors.textTertiary },
  setValue: { ...typography.callout, color: colors.textPrimary, marginTop: 2 },
  plannedValue: { ...typography.caption, color: colors.textTertiary, marginTop: 2 },
  notes: { ...typography.callout, color: colors.textPrimary, lineHeight: 20 },
  setNotes: { ...typography.caption, color: colors.textSecondary, lineHeight: 18, paddingBottom: spacing.xs, paddingLeft: spacing.xl },
  empty: { ...typography.callout, color: colors.textSecondary, lineHeight: 20 },
  // Edit mode styles
  deleteExerciseBtn: { alignSelf: 'flex-start', marginBottom: spacing.sm, paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, borderRadius: radius.full, backgroundColor: colors.dangerSoft },
  deleteExerciseText: { ...typography.footnote, color: colors.danger, fontWeight: '700' },
  editSetBlock: { marginBottom: spacing.sm },
  editSetRow: { flexDirection: 'row', alignItems: 'center' },
  deleteSetBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.xs },
  deleteSetText: { fontSize: 20, color: colors.danger, fontWeight: '700' },
});
