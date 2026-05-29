import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, SectionHeader } from '@/src/components/ui';
import { useDatabase } from '@/src/hooks/useDatabase';
import { showAlert } from '@/src/lib/alert';
import { getLatestWeeklyReview, getRecentWorkouts, getWorkoutExercises, getWorkoutSets, saveWeeklyReview } from '@/src/repositories';
import { getBodyweightTrend } from '@/src/repositories/analyticsRepository';
import { isAIConfigured, requestWeeklyReview, type WeeklyReviewResponse } from '@/src/services/aiService';
import { colors, spacing, typography } from '@/src/theme';

export function WeeklyReviewScreen() {
  const { t } = useTranslation();
  const db = useDatabase();
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState<WeeklyReviewResponse['data'] | null>(null);
  const [period, setPeriod] = useState<{ start: string; end: string } | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!db) return;
    let mounted = true;
    getLatestWeeklyReview(db).then((saved) => {
      if (!mounted || !saved) return;
      try {
        setReview(JSON.parse(saved.reviewJson) as WeeklyReviewResponse['data']);
        setPeriod({ start: saved.periodStart, end: saved.periodEnd });
        setGeneratedAt(saved.generatedAt);
      } catch {
        return;
      }
    });
    return () => { mounted = false; };
  }, [db]);

  const handleGenerateReview = useCallback(async () => {
    if (!db) return;
    if (!isAIConfigured()) {
      showAlert(t('review.aiNotConfigured'), t('common.aiNotConfiguredSetup'));
      return;
    }

    setIsLoading(true);
    try {
      const workouts = await getRecentWorkouts(db, 7);
      const now = new Date();
      const periodEnd = now.toISOString().slice(0, 10);
      const periodStartDate = new Date(now);
      periodStartDate.setDate(now.getDate() - 6);
      const periodStart = periodStartDate.toISOString().slice(0, 10);
      const thisWeek = workouts.filter((w) => {
        const d = new Date(w.date);
        const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      });

      if (thisWeek.length === 0) {
        showAlert(t('review.noData'), t('reviewExtras.noWorkoutsToReview'));
        setIsLoading(false);
        return;
      }

      const sessions = await Promise.all(thisWeek.map(async (w) => {
        const exercises = await getWorkoutExercises(db, w.id);
        const mainLifts: Array<{ nameEn: string; nameZh: string; topWeight: number; topReps: number; avgRpe: number }> = [];

        for (const ex of exercises.slice(0, 3)) {
          const sets = await getWorkoutSets(db, ex.id);
          const completed = sets.filter((s) => s.completed && s.actualWeight && s.actualReps);
          if (completed.length === 0) continue;
          const topSet = completed.reduce((a, b) => ((a.actualWeight ?? 0) > (b.actualWeight ?? 0) ? a : b));
          const avgRpe = completed.reduce((sum, s) => sum + (s.actualRpe ?? 0), 0) / completed.length;
          mainLifts.push({
            nameEn: ex.exerciseId, nameZh: ex.exerciseId,
            topWeight: topSet.actualWeight ?? 0, topReps: topSet.actualReps ?? 0,
            avgRpe: Math.round(avgRpe * 10) / 10,
          });
        }

        return {
          date: w.date,
          durationSeconds: w.durationSeconds ?? 0,
          totalVolume: w.totalVolume ?? 0,
          completionRate: w.completionRate ?? 0,
          mainLifts,
        };
      }));

      const bw = await getBodyweightTrend(db, 7);
      const bodyweightEntries = bw.map((e) => ({ date: e.date, bodyweight: e.bodyweight }));

      const res = await requestWeeklyReview({ sessions, bodyweightEntries });
      setReview(res.data);
      setPeriod({ start: periodStart, end: periodEnd });
      const saved = await saveWeeklyReview(db, {
        periodStart,
        periodEnd,
        status: 'generated',
        reviewJson: JSON.stringify(res.data),
      });
      setGeneratedAt(saved.generatedAt);
    } catch (err) {
      showAlert(t('common.error'), err instanceof Error ? err.message : t('reviewExtras.failedToGenerate'));
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('review.weeklyReview')}</Text>
        <Text style={styles.subtitle}>
          {period ? t('reviewExtras.aiAnalysisPeriod', { start: period.start, end: period.end }) : t('reviewExtras.aiPoweredAnalysis')}
        </Text>
        {generatedAt ? <Text style={styles.generatedText}>{t('reviewExtras.savedReview')} {new Date(generatedAt).toLocaleString()}</Text> : null}

        {!review && !isLoading && (
          <Button title={t('review.generateWeeklyReview')} onPress={handleGenerateReview} disabled={!db} />
        )}

        {isLoading && (
          <Card style={styles.card}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>{t('review.analyzing')}</Text>
          </Card>
        )}

        {review && (
          <>
            <SectionHeader title={t('review.summary')} />
            <Card style={styles.card}>
              <Text style={styles.bodyText}>{review.weekSummary}</Text>
            </Card>

            <SectionHeader title={t('review.liftAnalysis')} />
            {review.liftAnalysis.map((lift) => (
              <Card key={lift.lift} style={styles.card}>
                <View style={styles.liftRow}>
                  <Text style={styles.liftName}>{lift.lift}</Text>
                  <Text style={[styles.trend, lift.trend === 'up' && styles.trendUp, lift.trend === 'down' && styles.trendDown]}>
                    {lift.trend === 'up' ? '↑' : lift.trend === 'down' ? '↓' : '→'}
                  </Text>
                </View>
                <Text style={styles.bodyText}>{lift.assessment}</Text>
              </Card>
            ))}

            {review.fatigueSigns.length > 0 && (
              <>
                <SectionHeader title={t('reviewExtras.fatigueSigns')} />
                <Card style={styles.card}>
                  {review.fatigueSigns.map((s, i) => <Text key={i} style={styles.bullet}>• {s}</Text>)}
                </Card>
              </>
            )}

            <SectionHeader title={t('review.suggestions')} />
            <Card style={styles.card}>
              {review.suggestions.map((s, i) => (
                <View key={i} style={styles.suggestionRow}>
                  <Text style={styles.suggestionType}>{s.type}</Text>
                  <Text style={styles.bodyText}>{s.content}</Text>
                </View>
              ))}
            </Card>

            <SectionHeader title={t('review.deload')} />
            <Card style={styles.card}>
              <Text style={[styles.deloadStatus, review.deloadRecommendation.needed && styles.deloadNeeded]}>
                {review.deloadRecommendation.needed ? t('review.deloadRecommended') : t('review.noDeloadNeeded')}
              </Text>
              <Text style={styles.bodyText}>{review.deloadRecommendation.reasoning}</Text>
            </Card>

            <SectionHeader title={t('review.nextWeekFocus')} />
            <Card style={styles.card}>
              <Text style={styles.bodyText}>{review.nextWeekFocus}</Text>
            </Card>

            <Button title={t('review.generateNewReview')} onPress={handleGenerateReview} variant="secondary" />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.dockBottomInset },
  title: { ...typography.largeTitle, color: colors.textPrimary },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs, marginBottom: spacing.lg },
  generatedText: { ...typography.footnote, color: colors.textTertiary, marginBottom: spacing.md },
  card: { marginBottom: spacing.md },
  loadingText: { ...typography.callout, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
  bodyText: { ...typography.callout, color: colors.textPrimary, lineHeight: 20 },
  liftRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xs },
  liftName: { ...typography.headline, color: colors.textPrimary },
  trend: { ...typography.title2, color: colors.textSecondary },
  trendUp: { color: colors.success },
  trendDown: { color: colors.danger },
  bullet: { ...typography.callout, color: colors.textPrimary, lineHeight: 22 },
  suggestionRow: { marginBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight, paddingBottom: spacing.sm },
  suggestionType: { ...typography.caption, color: colors.primary, fontWeight: '700', textTransform: 'uppercase', marginBottom: 2 },
  deloadStatus: { ...typography.headline, color: colors.success, marginBottom: spacing.xs },
  deloadNeeded: { color: colors.warning },
});
