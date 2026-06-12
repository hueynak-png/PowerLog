import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { MetricCard } from '@/src/components/ui/MetricCard';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { useDatabase } from '@/src/hooks/useDatabase';
import i18n from '@/src/i18n';
import { formatDurationLocale } from '@/src/lib/date';
import { calculateWorkoutSummary } from '@/src/lib/workoutSummary';
import { getRecentExerciseHistory, updateWorkoutSession } from '@/src/repositories';
import { isAIConfigured, requestDailyStrengthAnalysis, type DailyStrengthAnalysisResponse } from '@/src/services/aiService';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { colors } from '@/src/theme/colors';
import { radius } from '@/src/theme/radius';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

type ScoreItem = { label: string; value: number; tone: 'success' | 'warning' | 'coach' };

export function WorkoutSummaryScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const db = useDatabase();
  const currentLocale = i18n.language;
  const session = useActiveWorkoutStore((state) => state.session);
  const exercises = useActiveWorkoutStore((state) => state.exercises);

  const [aiAnalysis, setAiAnalysis] = useState<DailyStrengthAnalysisResponse['data'] | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const summary = calculateWorkoutSummary(
    exercises.map((exercise) => ({ workoutExercise: exercise, exercise: exercise.exercise, sets: exercise.sets })),
    session?.durationSeconds ?? 0,
  );

  const aiScores: ScoreItem[] = aiAnalysis ? [
    { label: t('workoutSummary.completenessAnalysis'), value: aiAnalysis.scores.completion, tone: 'success' },
    { label: t('workoutSummary.trainingStimulus'), value: aiAnalysis.scores.stimulusEffectiveness, tone: 'coach' },
    { label: t('workoutSummary.intensityJudgment'), value: aiAnalysis.scores.intensityRationality, tone: 'coach' },
    { label: t('workoutSummary.fatigueAndRisk'), value: aiAnalysis.scores.fatigueControl, tone: 'warning' },
    { label: t('workoutSummary.structuredSummary'), value: aiAnalysis.scores.exerciseStructure, tone: 'success' },
  ] : [];

  const scoreToneStyles = {
    success: styles.successScore,
    warning: styles.warningScore,
    coach: styles.coachScore,
  };

  const requestAnalysis = async (force = false) => {
    if (!db || !session || !isAIConfigured()) return;

    setAiLoading(true);
    setAiError(null);

    try {
      if (!force && session.aiSummaryJson) {
        setAiAnalysis(JSON.parse(session.aiSummaryJson) as DailyStrengthAnalysisResponse['data']);
        return;
      }

      await updateWorkoutSession(db, session.id, { aiSummaryStatus: 'pending' });

      const history = (
        await Promise.all(
          exercises.map((ex) => getRecentExerciseHistory(db, ex.exercise.id, session.id, 3)),
        )
      ).flat();

      const res = await requestDailyStrengthAnalysis({
        session: {
          durationSeconds: summary.durationSeconds,
          totalVolume: summary.totalVolume,
          completionRate: summary.completionRate,
          notes: session.notes,
        },
        exercises: exercises.map((ex) => ({
          nameEn: ex.exercise.nameEn,
          nameZh: ex.exercise.nameZh,
          category: ex.exercise.category,
          liftFamily: ex.exercise.liftFamily,
          role: ex.exercise.role,
          muscleGroups: ex.exercise.muscleGroups,
          sets: ex.sets.map((s) => ({
            setNumber: s.setNumber,
            plannedWeight: s.plannedWeight,
            actualWeight: s.actualWeight,
            plannedReps: s.plannedReps,
            actualReps: s.actualReps,
            plannedRpe: s.plannedRpe,
            actualRpe: s.actualRpe,
            rir: typeof s.actualRpe === 'number' ? Math.max(0, Math.round((10 - s.actualRpe) * 10) / 10) : undefined,
            completed: s.completed,
            isWarmup: s.isWarmup,
            notes: s.notes,
          })),
        })),
        history,
      });

      setAiAnalysis(res.data);
      await updateWorkoutSession(db, session.id, {
        aiSummaryStatus: 'generated',
        aiSummaryJson: JSON.stringify(res.data),
      });
    } catch (err) {
      setAiError(err instanceof Error ? err.message : t('common.aiUnavailable'));
      await updateWorkoutSession(db, session.id, { aiSummaryStatus: 'failed' });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!isAIConfigured()) return;
    if (!db || !session) return;

    let cancelled = false;

    const loadOrRequestAnalysis = async () => {
      setAiLoading(true);
      setAiError(null);

      try {
        if (session.aiSummaryJson) {
          if (!cancelled) setAiAnalysis(JSON.parse(session.aiSummaryJson) as DailyStrengthAnalysisResponse['data']);
          return;
        }
        await requestAnalysis(false);
      } catch (err) {
        if (!cancelled) setAiError(err instanceof Error ? err.message : t('common.aiUnavailable'));
      } finally {
        if (!cancelled) setAiLoading(false);
      }
    };

    void loadOrRequestAnalysis();

    return () => {
      cancelled = true;
    };
  }, [db, session?.id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{t('workout.sessionComplete')}</Text>
          <Text style={styles.title}>{t('workoutSummary.strongWork')}</Text>
          <Text style={styles.subtitle}>{t('workoutSummary.savedOffline')}</Text>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard label={t('common.duration')} value={formatDurationLocale(summary.durationSeconds, currentLocale)} color={colors.primary} />
          <MetricCard label={t('common.complete')} value={`${Math.round(summary.completionRate * 100)}`} unit="%" color={colors.success} />
          <MetricCard label={t('common.volume')} value={`${Math.round(summary.totalVolume)}`} unit="kg" color={colors.textPrimary} />
        </View>

        <SectionHeader title={t('workout.mainLifts')} />
        {summary.mainLiftPerformance.length > 0 ? (
          summary.mainLiftPerformance.map((lift) => (
            <Card key={lift.exerciseId} variant="glass" style={styles.card}>
              <Text style={styles.cardTitle}>{lift.exerciseNameEn}</Text>
              <Text style={styles.cardSubtitle}>{lift.exerciseNameZh}</Text>
              <View style={styles.liftStats}>
                <Text style={styles.stat}>{lift.topWeight} kg</Text>
                <Text style={styles.stat}>{lift.topReps} reps</Text>
                <Text style={styles.stat}>RPE {lift.avgRpe.toFixed(1)}</Text>
              </View>
              <Text style={[styles.status, { color: lift.allSetsCompleted ? colors.success : colors.warning }]}>
                {lift.allSetsCompleted ? t('workoutSummary.allSetsCompleted') : t('workoutSummary.someSetsMissed')}
              </Text>
            </Card>
          ))
        ) : (
          <Card variant="glass" style={styles.card}>
            <Text style={styles.empty}>{t('workoutSummary.noMainLiftData')}</Text>
          </Card>
        )}

        <SectionHeader title={t('workout.rpeDistribution')} />
        <View style={styles.metricsRow}>
          <MetricCard label={t('analytics.low')} value={`${summary.rpeDistribution.low}`} color={colors.rpeLow} />
          <MetricCard label={t('analytics.med')} value={`${summary.rpeDistribution.medium}`} color={colors.rpeMedium} />
          <MetricCard label={t('analytics.high')} value={`${summary.rpeDistribution.high}`} color={colors.rpeHigh} />
        </View>

        <SectionHeader title={t('workout.suggestions')} />
        <Card style={styles.card}>
          {summary.suggestions.length > 0 ? (
            summary.suggestions.map((suggestion, index) => (
              <View key={`${suggestion.type}-${index}`} style={styles.suggestion}>
                <Text style={[styles.severity, suggestion.severity === 'alert' && styles.alert]}>{suggestion.severity}</Text>
                <Text style={styles.suggestionText}>{suggestion.message}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.empty}>{t('workoutSummary.noRuleAdjustments')}</Text>
          )}
        </Card>

        <SectionHeader title={t('workout.aiCoach')} eyebrow={t('workoutSummary.postSessionReport')} subtitle={t('workoutSummary.loadedOnce')} />
        <Card variant="glass" style={styles.card}>
          {aiLoading && (
            <View style={styles.aiLoading}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.aiLoadingText}>{t('workoutSummary.aiAnalyzing')}</Text>
            </View>
          )}
          {aiError && (
            <Text style={styles.aiError}>
              {aiError === 'AI service not configured' ? t('common.aiNotConfiguredSetup') : `${t('common.aiUnavailable')}: ${aiError}`}
            </Text>
          )}
          {aiAnalysis && (
            <View style={styles.aiContent}>
              <View style={styles.aiHeaderRow}>
                <View style={styles.aiVerdictBadge}>
                  <Text style={styles.aiVerdictBadgeText}>{t('workoutSummary.coachVerdict')}</Text>
                </View>
                <Button
                  title={aiLoading ? t('workoutSummary.analyzing') : t('workout.reAnalyze')}
                  onPress={() => void requestAnalysis(true)}
                  variant="secondary"
                  size="sm"
                  disabled={aiLoading || !db || !session || !isAIConfigured()}
                />
              </View>
              <Card variant="glass" padding={spacing.md} style={styles.aiVerdictCard}>
                <Text style={styles.aiSummaryText}>{aiAnalysis.oneLineConclusion}</Text>
              </Card>
              <View style={styles.scoreGrid}>
                {aiScores.map((score) => (
                  <View key={score.label} style={[styles.scoreItem, scoreToneStyles[score.tone]]}>
                    <Text style={styles.scoreValue}>{score.value}</Text>
                    <Text style={styles.scoreLabel}>{score.label}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.aiSectionGrid}>
                <View style={styles.aiSection}>
                  <Text style={styles.aiSectionTitle}>{t('workoutSummary.completenessAnalysis')}</Text>
                  <Text style={styles.aiBullet}>{aiAnalysis.completionAnalysis}</Text>
                </View>
                <View style={styles.aiSection}>
                  <Text style={styles.aiSectionTitle}>{t('workoutSummary.trainingStimulus')}</Text>
                  <Text style={styles.aiBullet}>{aiAnalysis.stimulusAnalysis}</Text>
                </View>
                <View style={styles.aiSection}>
                  <Text style={styles.aiSectionTitle}>{t('workoutSummary.intensityJudgment')}</Text>
                  <Text style={styles.aiBullet}>{aiAnalysis.intensityAnalysis}</Text>
                </View>
                <View style={[styles.aiSection, styles.riskSection]}>
                  <Text style={[styles.aiSectionTitle, { color: colors.warning }]}>{t('workoutSummary.fatigueAndRisk')}</Text>
                  <Text style={styles.aiBullet}>{aiAnalysis.fatigueAndRiskAnalysis}</Text>
                </View>
                <View style={styles.aiSection}>
                  <Text style={styles.aiSectionTitle}>{t('workoutSummary.goalMatch')}</Text>
                  <Text style={styles.aiBullet}>{aiAnalysis.goalMatchAnalysis}</Text>
                </View>
              </View>
              {aiAnalysis.nextSessionAdjustments.length > 0 && (
                <View style={styles.aiSection}>
                  <Text style={styles.aiSectionTitle}>{t('workoutSummary.nextAdjustment')}</Text>
                  {aiAnalysis.nextSessionAdjustments.map((adjustment, i) => (
                    <View key={`${adjustment.exercise}-${i}`} style={styles.nextActionCard}>
                      <Text style={styles.nextActionExercise}>{adjustment.exercise}</Text>
                      <Text style={styles.nextActionRecommendation}>{adjustment.recommendation}</Text>
                      <Text style={styles.nextActionReason}>{adjustment.reason}</Text>
                    </View>
                  ))}
                </View>
              )}
              <View style={[styles.aiSection, styles.structuredPanel]}>
                <Text style={styles.aiSectionTitle}>{t('workoutSummary.structuredSummary')}</Text>
                <View style={styles.structuredRow}>
                  <Text style={styles.structuredLabel}>{t('workoutSummary.goal')}</Text>
                  <Text style={styles.structuredValue}>{aiAnalysis.structuredSummary.identifiedGoal}</Text>
                </View>
                <View style={styles.structuredRow}>
                  <Text style={styles.structuredLabel}>{t('workoutSummary.effectiveSets')}</Text>
                  <Text style={styles.structuredValue}>{aiAnalysis.structuredSummary.effectiveSets}</Text>
                </View>
                <View style={styles.structuredRow}>
                  <Text style={styles.structuredLabel}>{t('workoutSummary.nextFocus')}</Text>
                  <Text style={styles.structuredValue}>{aiAnalysis.structuredSummary.nextFocus}</Text>
                </View>
                <Text style={styles.aiBullet}>{aiAnalysis.structuredSummary.libraryNote}</Text>
              </View>
            </View>
          )}
          {!aiLoading && !aiError && !aiAnalysis && (
            <Text style={styles.empty}>{t('workoutSummary.aiNotConfiguredLocal')}</Text>
          )}
        </Card>

        <Button title={t('common.done')} onPress={() => router.replace('/(tabs)')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.dockBottomInset, gap: spacing.md },
  hero: { paddingTop: spacing.lg, paddingBottom: spacing.sm },
  eyebrow: { ...typography.footnote, color: colors.success, fontWeight: '700', textTransform: 'uppercase' },
  title: { ...typography.largeTitle, color: colors.textPrimary, marginTop: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 22 },
  metricsRow: { flexDirection: 'row', gap: spacing.sm, justifyContent: 'space-between', minWidth: 0 },
  card: { gap: spacing.sm },
  cardTitle: { ...typography.headline, color: colors.textPrimary },
  cardSubtitle: { ...typography.footnote, color: colors.textSecondary },
  liftStats: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  stat: { ...typography.callout, backgroundColor: colors.surfaceMuted, color: colors.textPrimary, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radius.full, overflow: 'hidden' },
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
  aiHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  aiVerdictBadge: { backgroundColor: colors.coach, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  aiVerdictBadgeText: { ...typography.overline, color: '#fff' },
  aiVerdictCard: { backgroundColor: colors.surface, marginTop: spacing.xs },
  aiSummaryText: { ...typography.body, color: colors.textPrimary, lineHeight: 24, fontWeight: '600' },
  scoreGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  scoreItem: { minWidth: 72, flex: 1, borderRadius: radius.lg, borderWidth: 1, paddingHorizontal: spacing.sm, paddingVertical: spacing.sm, alignItems: 'center' },
  successScore: { backgroundColor: colors.successSoft, borderColor: colors.successBorder },
  warningScore: { backgroundColor: colors.warningSoft, borderColor: colors.warningBorder },
  coachScore: { backgroundColor: colors.coachSoft, borderColor: colors.coachBorder },
  scoreValue: { ...typography.title2, color: colors.textPrimary },
  scoreLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2, fontWeight: '700' },
  aiSectionGrid: { gap: spacing.sm },
  aiSection: { marginTop: spacing.xs, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.borderLight, padding: spacing.md },
  riskSection: { backgroundColor: colors.warningSoft, borderColor: colors.warningBorder },
  aiSectionTitle: { ...typography.footnote, color: colors.primary, fontWeight: '700', marginBottom: spacing.xs },
  aiBullet: { ...typography.callout, color: colors.textPrimary, lineHeight: 21 },
  nextActionCard: { backgroundColor: colors.surfaceMuted, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.sm, borderWidth: 1, borderColor: colors.borderLight },
  nextActionExercise: { ...typography.headline, color: colors.textPrimary },
  nextActionRecommendation: { ...typography.callout, color: colors.primary, fontWeight: '700', marginTop: spacing.xs, lineHeight: 20 },
  nextActionReason: { ...typography.footnote, color: colors.textSecondary, marginTop: spacing.xs, lineHeight: 18 },
  structuredPanel: { backgroundColor: colors.surfaceMuted },
  structuredRow: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md, borderBottomColor: colors.divider, borderBottomWidth: 1, paddingVertical: spacing.xs },
  structuredLabel: { ...typography.footnote, color: colors.textSecondary, fontWeight: '700' },
  structuredValue: { ...typography.footnote, color: colors.textPrimary, flex: 1, textAlign: 'right' },
});
