import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BarChart } from '@/src/components/charts/BarChart';
import { LineChart } from '@/src/components/charts/LineChart';
import { Card, MetricCard, SectionHeader } from '@/src/components/ui';
import type { LiftType } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import {
  getBodyweightTrend,
  getE1RMHistory,
  getMuscleGroupVolume,
  getRPEDistribution,
  getWeeklyCompletionRate,
  getWeeklyMuscleHeatmap,
  getWeeklyVolume,
} from '@/src/repositories';
import { useSettingsStore } from '@/src/stores/useSettingsStore';
import { useTranslation } from 'react-i18next';

import { colors, spacing, typography } from '@/src/theme';

const MAIN_LIFTS: Array<{ liftFamily: string; label: string; color: string }> = [
  { liftFamily: 'squat', label: 'Squat', color: colors.primary },
  { liftFamily: 'bench', label: 'Bench', color: colors.success },
  { liftFamily: 'deadlift', label: 'Deadlift', color: colors.warning },
];

export function AnalyticsScreen() {
  const db = useDatabase();
  const getMaxForLift = useSettingsStore((state) => state.getMaxForLift);
  const { t } = useTranslation();

  const [e1rmData, setE1rmData] = useState<Record<string, { date: string; e1rm: number }[]>>({});
  const [weeklyVolume, setWeeklyVolume] = useState<{ weekStart: string; totalVolume: number }[]>([]);
  const [rpe, setRpe] = useState<{ low: number; medium: number; high: number }>({ low: 0, medium: 0, high: 0 });
  const [completionRate, setCompletionRate] = useState<{ weekStart: string; rate: number }[]>([]);
  const [bodyweight, setBodyweight] = useState<{ date: string; bodyweight: number }[]>([]);
  const [muscleVolume, setMuscleVolume] = useState<{ muscleGroup: string; volume: number }[]>([]);
  const [muscleHeatmap, setMuscleHeatmap] = useState<{ muscleGroup: string; volume: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    const load = async () => {
      setIsLoading(true);
      const [vol, sqE1rm, bnE1rm, dlE1rm, rpeD, comp, bw, mv, hm] = await Promise.all([
        getWeeklyVolume(db, 12),
        getE1RMHistory(db, 'squat', 20),
        getE1RMHistory(db, 'bench', 20),
        getE1RMHistory(db, 'deadlift', 20),
        getRPEDistribution(db, 30),
        getWeeklyCompletionRate(db, 12),
        getBodyweightTrend(db, 90),
        getMuscleGroupVolume(db, 30),
        getWeeklyMuscleHeatmap(db, 7),
      ]);
      setWeeklyVolume(vol);
      setE1rmData({ squat: sqE1rm, bench: bnE1rm, deadlift: dlE1rm });
      setRpe(rpeD);
      setCompletionRate(comp);
      setBodyweight(bw);
      setMuscleVolume(mv);
      setMuscleHeatmap(hm);
      setIsLoading(false);
    };

    void load();
  }, [db]);

  if (!db || isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>{t('common.loadingAnalytics')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const rpeTotal = rpe.low + rpe.medium + rpe.high;
  const latestVolume = weeklyVolume.at(-1)?.totalVolume ?? 0;
  const latestCompletion = completionRate.at(-1)?.rate ?? 0;
  const latestBodyweight = bodyweight.at(-1)?.bodyweight;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{t('analytics.trainingIntelligence')}</Text>
          <Text style={styles.pageTitle}>{t('nav.analytics')}</Text>
          <Text style={styles.subtitle}>{t('analytics.strengthTrendsWorkload')}</Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricWrap}>
            <MetricCard label={t('analytics.thisWeek')} value={latestVolume ? Math.round(latestVolume).toLocaleString() : '—'} unit={latestVolume ? 'kg' : undefined} color={colors.volume} tone="default" />
          </View>
          <View style={styles.metricWrap}>
            <MetricCard label={t('common.complete')} value={`${Math.round(latestCompletion * 100)}`} unit="%" color={colors.success} tone="success" />
          </View>
          <View style={styles.metricWrap}>
            <MetricCard label={t('analytics.bodyweight')} value={latestBodyweight ? String(latestBodyweight) : '—'} unit={latestBodyweight ? 'kg' : undefined} color={colors.textPrimary} tone="coach" />
          </View>
        </View>

        {/* Current 1RM */}
        <SectionHeader title={t('analytics.strengthBoard')} subtitle={t('analytics.currentEstimated1RM')} />
        <Card variant="elevated" style={styles.card}>
          <View style={styles.metricsRowCompact}>
            {MAIN_LIFTS.map((lift) => {
              const max = getMaxForLift(lift.liftFamily as LiftType);
              return (
                <View key={lift.liftFamily} style={styles.metricWrap}>
                  <MetricCard label={t(`analytics.${lift.liftFamily}`)} value={max ? String(max.oneRm) : '—'} unit={max ? 'kg' : undefined} color={lift.color} />
                </View>
              );
            })}
          </View>
        </Card>

        {/* e1RM Curves */}
        <SectionHeader title={t('analytics.estimated1RMTrend')} subtitle={t('analytics.followMainLiftStrength')} />
        <Card style={styles.card}>
          {MAIN_LIFTS.map((lift) => (
            <LineChart
              key={lift.liftFamily}
              title={t(`analytics.${lift.liftFamily}`)}
              data={(e1rmData[lift.liftFamily] ?? []).map((d) => ({ label: d.date.slice(5), value: d.e1rm }))}
              color={lift.color}
              unit="kg"
            />
          ))}
        </Card>

        {/* Weekly Volume */}
        <SectionHeader title={t('analytics.weeklyVolume')} subtitle={t('analytics.tonnageByWeek')} />
        <Card style={styles.card}>
          <LineChart
            title={t('analytics.totalVolumeKg')}
            data={weeklyVolume.map((d) => ({ label: d.weekStart.slice(5), value: d.totalVolume }))}
            color={colors.primary}
            unit="kg"
          />
        </Card>

        {/* Completion Rate */}
        <SectionHeader title={t('analytics.weeklyCompletionRate')} subtitle={t('analytics.howMuchPlannedWork')} />
        <Card style={styles.card}>
          <LineChart
            title={t('analytics.avgCompletionPct')}
            data={completionRate.map((d) => ({ label: d.weekStart.slice(5), value: d.rate * 100 }))}
            color={colors.success}
            unit="%"
          />
        </Card>

        {/* RPE Distribution */}
        <SectionHeader title={t('analytics.rpeDistribution30Days')} subtitle={t('analytics.intensityBalance')} />
        <View style={styles.metricsRow}>
          <View style={styles.metricWrap}>
              <MetricCard label={t('analytics.low67')} value={`${rpe.low}`} color={colors.rpeLow} tone="success" />
          </View>
          <View style={styles.metricWrap}>
              <MetricCard label={t('analytics.med7585')} value={`${rpe.medium}`} color={colors.rpeMedium} tone="warning" />
          </View>
          <View style={styles.metricWrap}>
              <MetricCard label={t('analytics.high9plus')} value={`${rpe.high}`} color={colors.rpeHigh} tone="danger" />
          </View>
        </View>
        {rpeTotal > 0 && (
          <Card style={styles.card}>
            <BarChart
              title={t('analytics.rpeBreakdown')}
              data={[
                { label: t('analytics.low'), value: rpe.low, color: colors.rpeLow },
                { label: t('analytics.med'), value: rpe.medium, color: colors.rpeMedium },
                { label: t('analytics.high'), value: rpe.high, color: colors.rpeHigh },
              ]}
            />
          </Card>
        )}

        {/* Muscle Group Volume */}
        <SectionHeader title={t('analytics.muscleGroupVolume30Days')} subtitle={t('analytics.whichAreasReceivedWork')} />
        <Card style={styles.card}>
          <BarChart
            title={t('analytics.volumeByMuscleGroup')}
            data={muscleVolume.slice(0, 8).map((d) => ({ label: d.muscleGroup, value: Math.round(d.volume) }))}
          />
        </Card>

        {/* Weekly Muscle Coverage */}
        <SectionHeader title={t('analytics.weeklyMuscleCoverage')} subtitle={t('analytics.colorIntensityShowsVolume')} />
        <Card style={styles.card}>
          <View style={styles.heatmapContainer}>
            {muscleHeatmap.map((item) => {
              const maxVolume = Math.max(1, muscleHeatmap[0]?.volume ?? 1); // Heatmap is sorted by desc volume
              const ratio = item.volume / maxVolume;
              
              // Scale color from muted (0) to successSoft to success
              let backgroundColor: string = colors.surfaceMuted;
              let textColor: string = colors.textPrimary;
              if (item.volume > 0) {
                if (ratio > 0.5) {
                   backgroundColor = colors.success;
                   textColor = colors.background; // ensure contrast
                } else {
                   backgroundColor = colors.successSoft;
                   textColor = colors.success;
                }
              }

              const formattedVolume = item.volume >= 1000 
                ? (item.volume / 1000).toFixed(1) + 'k'
                : Math.round(item.volume).toString();

              return (
                <View key={item.muscleGroup} style={[styles.heatmapPill, { backgroundColor }]}>
                  <Text style={[styles.heatmapPillText, { color: textColor }]}>{item.muscleGroup}</Text>
                  <Text style={[styles.heatmapPillVolume, { color: textColor }]}>
                    {item.volume > 0 ? formattedVolume + ' kg' : '0 kg'}
                  </Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Bodyweight */}
        <SectionHeader title={t('analytics.bodyweight')} subtitle={t('analytics.bodyweightContext')} />
        <Card style={styles.card}>
          <LineChart
            title={t('analytics.bodyweight90Days')}
            data={bodyweight.map((d) => ({ label: d.date.slice(5), value: d.bodyweight }))}
            color={colors.textPrimary}
            unit="kg"
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.dockBottomInset, gap: spacing.md },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  loadingText: { ...typography.subhead, color: colors.textSecondary },
  hero: { paddingTop: spacing.lg, paddingBottom: spacing.sm },
  eyebrow: { ...typography.overline, color: colors.primary, marginBottom: spacing.xs },
  pageTitle: { ...typography.largeTitle, color: colors.textPrimary },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs, lineHeight: 22 },
  metricsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm, minWidth: 0 },
  metricsRowCompact: { flexDirection: 'row', gap: spacing.sm, minWidth: 0 },
  metricWrap: { flex: 1, minWidth: 0 },
  card: { marginBottom: spacing.sm },
  heatmapContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  heatmapPill: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, borderRadius: 100, flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  heatmapPillText: { ...typography.footnote, fontWeight: '500' },
  heatmapPillVolume: { ...typography.caption, opacity: 0.8 },
});
