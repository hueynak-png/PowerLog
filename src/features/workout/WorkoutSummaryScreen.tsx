import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { MetricCard } from '@/src/components/ui/MetricCard';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { calculateWorkoutSummary } from '@/src/lib/workoutSummary';
import { isAIConfigured, requestSessionSummary, type SessionSummaryResponse } from '@/src/services/aiService';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export function WorkoutSummaryScreen() {
  const router = useRouter();
  const session = useActiveWorkoutStore((state) => state.session);
  const exercises = useActiveWorkoutStore((state) => state.exercises);

  const [aiSummary, setAiSummary] = useState<SessionSummaryResponse['data'] | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const summary = calculateWorkoutSummary(
    exercises.map((exercise) => ({ workoutExercise: exercise, exercise: exercise.exercise, sets: exercise.sets })),
    session?.durationSeconds ?? 0,
  );

  // Request AI summary on mount
  useEffect(() => {
    if (!isAIConfigured()) return;

    setAiLoading(true);
    requestSessionSummary({
      exercises: exercises.map((ex) => ({
        nameEn: ex.exercise.nameEn,
        nameZh: ex.exercise.nameZh,
        role: ex.exercise.role,
        sets: ex.sets.map((s) => ({
          plannedWeight: s.plannedWeight,
          actualWeight: s.actualWeight,
          plannedReps: s.plannedReps,
          actualReps: s.actualReps,
          plannedRpe: s.plannedRpe,
          actualRpe: s.actualRpe,
          completed: s.completed,
        })),
      })),
      durationSeconds: summary.durationSeconds,
      totalVolume: summary.totalVolume,
      completionRate: summary.completionRate,
    })
      .then((res) => setAiSummary(res.data))
      .catch((err) => setAiError(err instanceof Error ? err.message : 'AI unavailable'))
      .finally(() => setAiLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Session complete</Text>
          <Text style={styles.title}>Strong work.</Text>
          <Text style={styles.subtitle}>Your workout is saved offline with a local summary and coaching rules.</Text>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard label="Duration" value={formatDuration(summary.durationSeconds)} color={colors.primary} />
          <MetricCard label="Complete" value={`${Math.round(summary.completionRate * 100)}`} unit="%" color={colors.success} />
          <MetricCard label="Volume" value={`${Math.round(summary.totalVolume)}`} unit="kg" color={colors.textPrimary} />
        </View>

        <SectionHeader title="Main lifts" />
        {summary.mainLiftPerformance.length > 0 ? (
          summary.mainLiftPerformance.map((lift) => (
            <Card key={lift.exerciseId} style={styles.card}>
              <Text style={styles.cardTitle}>{lift.exerciseNameEn}</Text>
              <Text style={styles.cardSubtitle}>{lift.exerciseNameZh}</Text>
              <View style={styles.liftStats}>
                <Text style={styles.stat}>{lift.topWeight} kg</Text>
                <Text style={styles.stat}>{lift.topReps} reps</Text>
                <Text style={styles.stat}>RPE {lift.avgRpe.toFixed(1)}</Text>
              </View>
              <Text style={[styles.status, { color: lift.allSetsCompleted ? colors.success : colors.warning }]}>
                {lift.allSetsCompleted ? 'All sets completed' : 'Some sets missed'}
              </Text>
            </Card>
          ))
        ) : (
          <Card variant="outlined" style={styles.card}>
            <Text style={styles.empty}>No main lift data recorded.</Text>
          </Card>
        )}

        <SectionHeader title="RPE distribution" />
        <View style={styles.metricsRow}>
          <MetricCard label="Low" value={`${summary.rpeDistribution.low}`} color={colors.rpeLow} />
          <MetricCard label="Medium" value={`${summary.rpeDistribution.medium}`} color={colors.rpeMedium} />
          <MetricCard label="High" value={`${summary.rpeDistribution.high}`} color={colors.rpeHigh} />
        </View>

        <SectionHeader title="Suggestions" />
        <Card style={styles.card}>
          {summary.suggestions.length > 0 ? (
            summary.suggestions.map((suggestion, index) => (
              <View key={`${suggestion.type}-${index}`} style={styles.suggestion}>
                <Text style={[styles.severity, suggestion.severity === 'alert' && styles.alert]}>{suggestion.severity}</Text>
                <Text style={styles.suggestionText}>{suggestion.message}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.empty}>No rule-based adjustments today. Keep the plan moving.</Text>
          )}
        </Card>

        <SectionHeader title="AI Coach" />
        <Card style={styles.card}>
          {aiLoading && (
            <View style={styles.aiLoading}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.aiLoadingText}>AI analyzing your session...</Text>
            </View>
          )}
          {aiError && (
            <Text style={styles.aiError}>
              {aiError === 'AI service not configured' ? 'AI not configured. Set up in Settings.' : `AI unavailable: ${aiError}`}
            </Text>
          )}
          {aiSummary && (
            <View style={styles.aiContent}>
              <Text style={styles.aiSummaryText}>{aiSummary.summary}</Text>
              {aiSummary.highlights.length > 0 && (
                <View style={styles.aiSection}>
                  <Text style={styles.aiSectionTitle}>Highlights</Text>
                  {aiSummary.highlights.map((h, i) => (
                    <Text key={i} style={styles.aiBullet}>• {h}</Text>
                  ))}
                </View>
              )}
              {aiSummary.concerns.length > 0 && (
                <View style={styles.aiSection}>
                  <Text style={[styles.aiSectionTitle, { color: colors.warning }]}>Concerns</Text>
                  {aiSummary.concerns.map((c, i) => (
                    <Text key={i} style={styles.aiBullet}>• {c}</Text>
                  ))}
                </View>
              )}
              {aiSummary.suggestions.length > 0 && (
                <View style={styles.aiSection}>
                  <Text style={styles.aiSectionTitle}>AI Suggestions</Text>
                  {aiSummary.suggestions.map((s, i) => (
                    <Text key={i} style={styles.aiBullet}>• {s}</Text>
                  ))}
                </View>
              )}
            </View>
          )}
          {!aiLoading && !aiError && !aiSummary && (
            <Text style={styles.empty}>AI not configured. Local rules applied above.</Text>
          )}
        </Card>

        <Button title="Done" onPress={() => router.replace('/(tabs)')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl, gap: spacing.md },
  hero: { paddingTop: spacing.xxl, paddingBottom: spacing.sm },
  eyebrow: { ...typography.footnote, color: colors.success, fontWeight: '700', textTransform: 'uppercase' },
  title: { ...typography.largeTitle, color: colors.textPrimary, marginTop: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 22 },
  metricsRow: { flexDirection: 'row', gap: spacing.sm, justifyContent: 'space-between' },
  card: { gap: spacing.sm },
  cardTitle: { ...typography.headline, color: colors.textPrimary },
  cardSubtitle: { ...typography.footnote, color: colors.textSecondary },
  liftStats: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  stat: { ...typography.callout, backgroundColor: colors.surfaceSecondary, color: colors.textPrimary, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  status: { ...typography.footnote, fontWeight: '700', marginTop: spacing.xs },
  suggestion: { borderBottomColor: colors.borderLight, borderBottomWidth: 1, paddingVertical: spacing.sm },
  severity: { ...typography.caption, color: colors.warning, fontWeight: '700', textTransform: 'uppercase' },
  alert: { color: colors.danger },
  suggestionText: { ...typography.callout, color: colors.textPrimary, marginTop: spacing.xs, lineHeight: 20 },
  empty: { ...typography.callout, color: colors.textSecondary, lineHeight: 20 },
  aiLoading: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  aiLoadingText: { ...typography.callout, color: colors.textSecondary },
  aiError: { ...typography.callout, color: colors.textSecondary, fontStyle: 'italic' },
  aiContent: { gap: spacing.sm },
  aiSummaryText: { ...typography.body, color: colors.textPrimary, lineHeight: 22 },
  aiSection: { marginTop: spacing.xs },
  aiSectionTitle: { ...typography.footnote, color: colors.primary, fontWeight: '700', marginBottom: spacing.xs },
  aiBullet: { ...typography.callout, color: colors.textPrimary, lineHeight: 20, paddingLeft: spacing.xs },
});
