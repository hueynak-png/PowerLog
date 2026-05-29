import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type Href, useRouter } from 'expo-router';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { MetricCard } from '@/src/components/ui/MetricCard';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { CompletionBadge } from '@/src/components/workout/CompletionBadge';
import { ExerciseCard } from '@/src/components/workout/ExerciseCard';
import type { WorkoutSet } from '@/src/domain/types';
import { calculateWorkoutSummary } from '@/src/lib/workoutSummary';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

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
        {typeof set.plannedWeight === 'number' && <Text style={styles.plannedValue}>Plan {set.plannedWeight} kg</Text>}
      </View>
      <View style={styles.setCell}>
        <Text style={styles.setLabel}>{t('common.reps')}</Text>
        <Text style={styles.setValue}>{formatValue(set.actualReps ?? set.plannedReps)}</Text>
        {typeof set.plannedReps === 'number' && <Text style={styles.plannedValue}>Plan {set.plannedReps}</Text>}
      </View>
      <View style={styles.setCell}>
        <Text style={styles.setLabel}>{t('common.rpe')}</Text>
        <Text style={styles.setValue}>{formatValue(set.actualRpe ?? set.plannedRpe)}</Text>
        {typeof set.plannedRpe === 'number' && <Text style={styles.plannedValue}>Plan {set.plannedRpe}</Text>}
      </View>
      <CompletionBadge completed={set.completed} size="sm" />
    </View>
  );
}

export function WorkoutDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const session = useActiveWorkoutStore((state) => state.session);
  const exercises = useActiveWorkoutStore((state) => state.exercises);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(exercises.map((exercise) => exercise.id)));

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>{`‹ ${t('common.back')}`}</Text>
        </Pressable>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{t('workout.workoutDetails')}</Text>
          <Text style={styles.title}>{session ? new Date(session.startedAt).toLocaleString() : 'Completed session'}</Text>
          <Text style={styles.subtitle}>Read-only view of the exercises and sets saved for this workout.</Text>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard label={t('common.duration')} value={formatDuration(summary.durationSeconds)} color={colors.primary} />
          <MetricCard label={t('common.complete')} value={`${Math.round(summary.completionRate * 100)}`} unit="%" color={colors.success} />
          <MetricCard label={t('common.volume')} value={`${Math.round(summary.totalVolume)}`} unit="kg" color={colors.textPrimary} />
        </View>

        <SectionHeader title={t('workout.exercises')} />
        {exercises.length > 0 ? (
          exercises.map((workoutExercise) => {
            const completed = workoutExercise.sets.filter((set) => set.completed).length;
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
                {workoutExercise.notes ? <Text style={styles.notes}>{t('common.notes')}: {workoutExercise.notes}</Text> : null}
                {workoutExercise.sets.map((set) => (
                  <View key={set.id}>
                    <ReadOnlySetRow set={set} />
                    {set.notes ? <Text style={styles.setNotes}>Set note: {set.notes}</Text> : null}
                  </View>
                ))}
              </ExerciseCard>
            );
          })
        ) : (
          <Card variant="outlined" style={styles.card}>
            <Text style={styles.empty}>No exercise data saved for this workout.</Text>
          </Card>
        )}

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
  hero: { paddingTop: spacing.sm, paddingBottom: spacing.sm },
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
});
