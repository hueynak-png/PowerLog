import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';

import { Button, Card, SectionHeader } from '@/src/components/ui';
import { useDatabase } from '@/src/hooks/useDatabase';
import { confirmAction, showAlert } from '@/src/lib/alert';
import {
  getAllWeeklyReviews,
  getLatestWeeklyReview,
  saveWeeklyReview,
  deleteWeeklyReview,
} from '@/src/repositories';
import { getWorkoutsByDateRange } from '@/src/repositories/workoutRepository';
import { getBodyweightByDateRange } from '@/src/repositories/analyticsRepository';
import { getWorkoutExercises, getWorkoutSets } from '@/src/repositories';
import { isAIConfigured, requestWeeklyReview, type WeeklyReviewResponse } from '@/src/services/aiService';
import type { WeeklyReview } from '@/src/domain/types';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  initialPeriod?: { start: string; end: string };
}

export function WeeklyReviewScreen({ initialPeriod }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const db = useDatabase();
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState<WeeklyReviewResponse['data'] | null>(null);
  const [period, setPeriod] = useState<{ start: string; end: string } | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [savedReviews, setSavedReviews] = useState<WeeklyReview[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [viewingHistoryId, setViewingHistoryId] = useState<string | null>(null);

  const getDefaultPeriod = (): { start: string; end: string } => {
    const now = new Date();
    const end = now.toISOString().slice(0, 10);
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 6);
    return { start: startDate.toISOString().slice(0, 10), end };
  };

  const activePeriod = initialPeriod || period || getDefaultPeriod();

  // Load saved reviews list
  useEffect(() => {
    if (!db) return;
    getAllWeeklyReviews(db).then(setSavedReviews);
  }, [db]);

  // Load latest review on mount (only when no initialPeriod)
  useEffect(() => {
    if (!db || initialPeriod) return;
    let mounted = true;
    getLatestWeeklyReview(db).then((saved) => {
      if (!mounted || !saved) return;
      try {
        setReview(JSON.parse(saved.reviewJson) as WeeklyReviewResponse['data']);
        setPeriod({ start: saved.periodStart, end: saved.periodEnd });
        setGeneratedAt(saved.generatedAt);
      } catch {
        // Skip malformed review
      }
    });
    return () => { mounted = false; };
  }, [db, initialPeriod]);

  const handleGenerateReview = useCallback(async () => {
    if (!db) return;
    if (!isAIConfigured()) {
      showAlert(t('review.aiNotConfigured'), t('common.aiNotConfiguredSetup'));
      return;
    }

    setIsLoading(true);
    try {
      const periodStart = activePeriod.start;
      const periodEnd = activePeriod.end;

      const workouts = await getWorkoutsByDateRange(db, periodStart, periodEnd);

      if (workouts.length === 0) {
        showAlert(t('review.noData'), t('reviewExtras.noWorkoutsInRange'));
        setIsLoading(false);
        return;
      }

      const sessions = await Promise.all(workouts.map(async (w) => {
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

      const bw = await getBodyweightByDateRange(db, periodStart, periodEnd);
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
      setViewingHistoryId(null);
      // Refresh history list
      getAllWeeklyReviews(db).then(setSavedReviews);
    } catch (err) {
      showAlert(t('common.error'), err instanceof Error ? err.message : t('reviewExtras.failedToGenerate'));
    } finally {
      setIsLoading(false);
    }
  }, [db, activePeriod, t]);

  const handleViewHistoryReview = useCallback(async (id: string) => {
    if (!db) return;
    const saved = await getLatestWeeklyReview(db); // We use this via DB for the specific id
    // Need to get by id
    const all = await getAllWeeklyReviews(db);
    const found = all.find((r) => r.id === id);
    if (!found) return;
    try {
      const data = JSON.parse(found.reviewJson) as WeeklyReviewResponse['data'];
      setReview(data);
      setPeriod({ start: found.periodStart, end: found.periodEnd });
      setGeneratedAt(found.generatedAt);
      setViewingHistoryId(id);
      setShowHistory(false);
    } catch {
      // Skip malformed
    }
  }, [db]);

  const handleDeleteReview = useCallback(async (reviewItem: WeeklyReview) => {
    if (!db) return;
    const periodLabel = `${reviewItem.periodStart} → ${reviewItem.periodEnd}`;
    confirmAction(
      t('review.deleteReport'),
      t('review.deleteReportConfirm', { period: periodLabel }),
      async () => {
        await deleteWeeklyReview(db, reviewItem.id);
        const updated = savedReviews.filter((r) => r.id !== reviewItem.id);
        setSavedReviews(updated);
        // If deleting the currently-viewed review, clear it and load latest
        if (viewingHistoryId === reviewItem.id || (!viewingHistoryId && review && period?.start === reviewItem.periodStart)) {
          const latest = updated.length > 0 ? updated[0] : null;
          if (latest) {
            try {
              setReview(JSON.parse(latest.reviewJson) as WeeklyReviewResponse['data']);
              setPeriod({ start: latest.periodStart, end: latest.periodEnd });
              setGeneratedAt(latest.generatedAt);
            } catch {
              setReview(null);
              setPeriod(null);
              setGeneratedAt(null);
            }
          } else {
            setReview(null);
            setPeriod(null);
            setGeneratedAt(null);
          }
          setViewingHistoryId(null);
        }
      },
    );
  }, [db, savedReviews, viewingHistoryId, review, period, t]);

  const handleBackToLatest = useCallback(async () => {
    if (!db) return;
    const latest = await getLatestWeeklyReview(db);
    if (latest) {
      try {
        setReview(JSON.parse(latest.reviewJson) as WeeklyReviewResponse['data']);
        setPeriod({ start: latest.periodStart, end: latest.periodEnd });
        setGeneratedAt(latest.generatedAt);
      } catch {
        setReview(null);
        setPeriod(null);
        setGeneratedAt(null);
      }
    } else {
      setReview(null);
      setPeriod(null);
      setGeneratedAt(null);
    }
    setViewingHistoryId(null);
  }, [db]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('review.weeklyReview')}</Text>
        <Text style={styles.subtitle}>
          {period ? t('reviewExtras.aiAnalysisPeriod', { start: period.start, end: period.end }) : t('reviewExtras.aiPoweredAnalysis')}
        </Text>
        {generatedAt ? <Text style={styles.generatedText}>{t('reviewExtras.savedReview')} {new Date(generatedAt).toLocaleString()}</Text> : null}

        {/* Back to Latest button when viewing historical report */}
        {viewingHistoryId && (
          <Button title={t('review.backToLatest')} onPress={handleBackToLatest} variant="secondary" size="sm" />
        )}

        {/* Generate button when no review loaded or in custom period mode */}
        {(!review || initialPeriod) && !isLoading && (
          <Button
            title={initialPeriod ? t('review.generateReviewForPeriod', { start: activePeriod.start, end: activePeriod.end }) : t('review.generateWeeklyReview')}
            onPress={handleGenerateReview}
            disabled={!db}
          />
        )}

        {/* Select from Calendar button */}
        {!isLoading && (
          <View style={{ marginTop: spacing.sm }}>
            <Button
              title={t('review.selectFromCalendar')}
              onPress={() => router.push('/(tabs)/calendar' as Href)}
              variant="secondary"
              size="sm"
            />
          </View>
        )}

        {isLoading && (
          <Card variant="glass" style={styles.card}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>{t('review.analyzing')}</Text>
          </Card>
        )}

        {review && (
          <>
            <SectionHeader title={t('review.summary')} />
            <Card variant="glass" style={styles.card}>
              <Text style={styles.bodyText}>{review.weekSummary}</Text>
            </Card>

            <SectionHeader title={t('review.liftAnalysis')} />
            {review.liftAnalysis.map((lift) => (
              <Card key={lift.lift} variant="glass" style={styles.card}>
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
                <Card variant="glass" style={styles.card}>
                  {review.fatigueSigns.map((s, i) => <Text key={i} style={styles.bullet}>• {s}</Text>)}
                </Card>
              </>
            )}

            <SectionHeader title={t('review.suggestions')} />
            <Card variant="glass" style={styles.card}>
              {review.suggestions.map((s, i) => (
                <View key={i} style={styles.suggestionRow}>
                  <Text style={styles.suggestionType}>{s.type}</Text>
                  <Text style={styles.bodyText}>{s.content}</Text>
                </View>
              ))}
            </Card>

            <SectionHeader title={t('review.deload')} />
            <Card variant="glass" style={styles.card}>
              <Text style={[styles.deloadStatus, review.deloadRecommendation.needed && styles.deloadNeeded]}>
                {review.deloadRecommendation.needed ? t('review.deloadRecommended') : t('review.noDeloadNeeded')}
              </Text>
              <Text style={styles.bodyText}>{review.deloadRecommendation.reasoning}</Text>
            </Card>

            <SectionHeader title={t('review.nextWeekFocus')} />
            <Card variant="glass" style={styles.card}>
              <Text style={styles.bodyText}>{review.nextWeekFocus}</Text>
            </Card>

            <Button title={t('review.generateNewReview')} onPress={handleGenerateReview} variant="secondary" />
          </>
        )}

        {/* Report History Section */}
        <View style={{ marginTop: spacing.xl }}>
          <View style={styles.segmentRow}>
            <Pressable
              style={[styles.segment, !showHistory && styles.segmentActive]}
              onPress={() => setShowHistory(false)}
            >
              <Text style={[styles.segmentText, !showHistory && styles.segmentTextActive]}>
                {t('review.weeklyReview')}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.segment, showHistory && styles.segmentActive]}
              onPress={() => setShowHistory(true)}
            >
              <Text style={[styles.segmentText, showHistory && styles.segmentTextActive]}>
                {t('review.reportHistory')}
              </Text>
            </Pressable>
          </View>

          {showHistory && (
            <View style={{ marginTop: spacing.md }}>
              {savedReviews.length === 0 ? (
                <Card variant="glass" style={styles.card}>
                  <Text style={styles.emptyText}>{t('review.noSavedReports')}</Text>
                </Card>
              ) : (
                savedReviews.map((item) => (
                  <Card key={item.id} variant="glass" style={styles.historyCard}>
                    <View style={styles.historyRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.historyPeriod}>
                          {item.periodStart} → {item.periodEnd}
                        </Text>
                        <Text style={styles.historyDate}>{formatDate(item.generatedAt)}</Text>
                      </View>
                      <View style={styles.historyActions}>
                        <Button
                          title={t('review.viewReport')}
                          size="sm"
                          variant="secondary"
                          onPress={() => handleViewHistoryReview(item.id)}
                        />
                        <Button
                          title={t('review.deleteReport')}
                          size="sm"
                          variant="secondary"
                          onPress={() => handleDeleteReview(item)}
                        />
                      </View>
                    </View>
                  </Card>
                ))
              )}
            </View>
          )}
        </View>
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
  // History section styles
  segmentRow: { flexDirection: 'row', backgroundColor: colors.surfaceSecondary, borderRadius: 10, padding: 3 },
  segment: { flex: 1, paddingVertical: spacing.sm, alignItems: 'center', borderRadius: 8 },
  segmentActive: { backgroundColor: colors.primary },
  segmentText: { ...typography.footnote, color: colors.textSecondary, fontWeight: '600' },
  segmentTextActive: { color: '#fff' },
  emptyText: { ...typography.callout, color: colors.textSecondary, lineHeight: 20 },
  historyCard: { marginBottom: spacing.sm },
  historyRow: { flexDirection: 'row', alignItems: 'center' },
  historyPeriod: { ...typography.headline, color: colors.textPrimary },
  historyDate: { ...typography.footnote, color: colors.textTertiary, marginTop: 2 },
  historyActions: { flexDirection: 'row', gap: spacing.xs },
});
