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
import { colors, spacing, typography } from '@/src/theme';

const MAIN_LIFTS: Array<{ liftFamily: string; label: string; color: string }> = [
  { liftFamily: 'squat', label: 'Squat', color: colors.primary },
  { liftFamily: 'bench', label: 'Bench', color: colors.success },
  { liftFamily: 'deadlift', label: 'Deadlift', color: colors.warning },
];

export function AnalyticsScreen() {
  const db = useDatabase();
  const getMaxForLift = useSettingsStore((state) => state.getMaxForLift);

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
          <Text style={styles.loadingText}>Loading analytics...</Text>
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
          <Text style={styles.eyebrow}>Training intelligence</Text>
          <Text style={styles.pageTitle}>Analytics</Text>
          <Text style={styles.subtitle}>Strength trends, workload, fatigue signals, and recovery context in one dashboard.</Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricWrap}>
            <MetricCard label="This week" value={latestVolume ? Math.round(latestVolume).toLocaleString() : '—'} unit={latestVolume ? 'kg' : undefined} color={colors.volume} tone="default" />
          </View>
          <View style={styles.metricWrap}>
            <MetricCard label="Complete" value={`${Math.round(latestCompletion * 100)}`} unit="%" color={colors.success} tone="success" />
          </View>
          <View style={styles.metricWrap}>
            <MetricCard label="Bodyweight" value={latestBodyweight ? String(latestBodyweight) : '—'} unit={latestBodyweight ? 'kg' : undefined} color={colors.textPrimary} tone="coach" />
          </View>
        </View>

        {/* Current 1RM */}
        <SectionHeader title="Strength board" subtitle="Current estimated 1RM settings for the big three." />
        <Card variant="elevated" style={styles.card}>
          <View style={styles.metricsRowCompact}>
            {MAIN_LIFTS.map((lift) => {
              const max = getMaxForLift(lift.liftFamily as LiftType);
              return (
                <View key={lift.liftFamily} style={styles.metricWrap}>
                  <MetricCard label={lift.label} value={max ? String(max.oneRm) : '—'} unit={max ? 'kg' : undefined} color={lift.color} />
                </View>
              );
            })}
          </View>
        </Card>

        {/* e1RM Curves */}
        <SectionHeader title="Estimated 1RM Trend" subtitle="Follow the direction of your main lift strength." />
        <Card style={styles.card}>
          {MAIN_LIFTS.map((lift) => (
            <LineChart
              key={lift.liftFamily}
              title={lift.label}
              data={(e1rmData[lift.liftFamily] ?? []).map((d) => ({ label: d.date.slice(5), value: d.e1rm }))}
              color={lift.color}
              unit="kg"
            />
          ))}
        </Card>

        {/* Weekly Volume */}
        <SectionHeader title="Weekly Volume" subtitle="Tonnage by week across all logged exercises." />
        <Card style={styles.card}>
          <LineChart
            title="Total Volume (kg)"
            data={weeklyVolume.map((d) => ({ label: d.weekStart.slice(5), value: d.totalVolume }))}
            color={colors.primary}
            unit="kg"
          />
        </Card>

        {/* Completion Rate */}
        <SectionHeader title="Weekly Completion Rate" subtitle="How much of the planned work was completed." />
        <Card style={styles.card}>
          <LineChart
            title="Avg Completion %"
            data={completionRate.map((d) => ({ label: d.weekStart.slice(5), value: d.rate * 100 }))}
            color={colors.success}
            unit="%"
          />
        </Card>

        {/* RPE Distribution */}
        <SectionHeader title="RPE Distribution (30 days)" subtitle="Intensity balance from easier work to high-effort sets." />
        <View style={styles.metricsRow}>
          <View style={styles.metricWrap}>
              <MetricCard label="Low (6-7)" value={`${rpe.low}`} color={colors.rpeLow} tone="success" />
          </View>
          <View style={styles.metricWrap}>
              <MetricCard label="Med (7.5-8.5)" value={`${rpe.medium}`} color={colors.rpeMedium} tone="warning" />
          </View>
          <View style={styles.metricWrap}>
              <MetricCard label="High (9+)" value={`${rpe.high}`} color={colors.rpeHigh} tone="danger" />
          </View>
        </View>
        {rpeTotal > 0 && (
          <Card style={styles.card}>
            <BarChart
              title="RPE Breakdown"
              data={[
                { label: 'Low', value: rpe.low, color: colors.rpeLow },
                { label: 'Med', value: rpe.medium, color: colors.rpeMedium },
                { label: 'High', value: rpe.high, color: colors.rpeHigh },
              ]}
            />
          </Card>
        )}

        {/* Muscle Group Volume */}
        <SectionHeader title="Muscle Group Volume (30 days)" subtitle="Which areas received the most total work recently." />
        <Card style={styles.card}>
          <BarChart
            title="Volume by Muscle Group"
            data={muscleVolume.slice(0, 8).map((d) => ({ label: d.muscleGroup, value: Math.round(d.volume) }))}
          />
        </Card>

        {/* Weekly Muscle Coverage */}
        <SectionHeader title="Weekly Muscle Coverage" subtitle="Color intensity shows relative training volume" />
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
        <SectionHeader title="Bodyweight" subtitle="Bodyweight context for performance changes." />
        <Card style={styles.card}>
          <LineChart
            title="Bodyweight (90 days)"
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
  hero: { paddingTop: spacing.xxl, paddingBottom: spacing.sm },
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
