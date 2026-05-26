import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, SectionHeader } from '@/src/components/ui';
import { useDatabase } from '@/src/hooks/useDatabase';
import { showAlert } from '@/src/lib/alert';
import { getRecentWorkouts, getWorkoutExercises, getWorkoutSets } from '@/src/repositories';
import { getBodyweightTrend } from '@/src/repositories/analyticsRepository';
import { isAIConfigured, requestWeeklyReview, type WeeklyReviewResponse } from '@/src/services/aiService';
import { colors, spacing, typography } from '@/src/theme';

export function WeeklyReviewScreen() {
  const db = useDatabase();
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState<WeeklyReviewResponse['data'] | null>(null);

  const handleGenerateReview = useCallback(async () => {
    if (!db) return;
    if (!isAIConfigured()) {
      showAlert('AI not configured', 'Set up AI in Settings first.');
      return;
    }

    setIsLoading(true);
    try {
      const workouts = await getRecentWorkouts(db, 7);
      const thisWeek = workouts.filter((w) => {
        const d = new Date(w.date);
        const now = new Date();
        const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      });

      if (thisWeek.length === 0) {
        showAlert('No data', 'No workouts in the last 7 days to review.');
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
    } catch (err) {
      showAlert('Error', err instanceof Error ? err.message : 'Failed to generate review');
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Weekly Review</Text>
        <Text style={styles.subtitle}>AI-powered analysis of your training week</Text>

        {!review && !isLoading && (
          <Button title="Generate Weekly Review" onPress={handleGenerateReview} disabled={!db} />
        )}

        {isLoading && (
          <Card style={styles.card}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>Analyzing your week...</Text>
          </Card>
        )}

        {review && (
          <>
            <SectionHeader title="Summary" />
            <Card style={styles.card}>
              <Text style={styles.bodyText}>{review.weekSummary}</Text>
            </Card>

            <SectionHeader title="Lift Analysis" />
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
                <SectionHeader title="Fatigue Signs" />
                <Card style={styles.card}>
                  {review.fatigueSigns.map((s, i) => <Text key={i} style={styles.bullet}>• {s}</Text>)}
                </Card>
              </>
            )}

            <SectionHeader title="Suggestions" />
            <Card style={styles.card}>
              {review.suggestions.map((s, i) => (
                <View key={i} style={styles.suggestionRow}>
                  <Text style={styles.suggestionType}>{s.type}</Text>
                  <Text style={styles.bodyText}>{s.content}</Text>
                </View>
              ))}
            </Card>

            <SectionHeader title="Deload?" />
            <Card style={styles.card}>
              <Text style={[styles.deloadStatus, review.deloadRecommendation.needed && styles.deloadNeeded]}>
                {review.deloadRecommendation.needed ? 'Deload recommended' : 'No deload needed'}
              </Text>
              <Text style={styles.bodyText}>{review.deloadRecommendation.reasoning}</Text>
            </Card>

            <SectionHeader title="Next Week Focus" />
            <Card style={styles.card}>
              <Text style={styles.bodyText}>{review.nextWeekFocus}</Text>
            </Card>

            <Button title="Generate New Review" onPress={handleGenerateReview} variant="secondary" />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  title: { ...typography.largeTitle, color: colors.textPrimary },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs, marginBottom: spacing.lg },
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

