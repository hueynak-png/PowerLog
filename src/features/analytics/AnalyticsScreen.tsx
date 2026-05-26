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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    const load = async () => {
      setIsLoading(true);
      const [vol, sqE1rm, bnE1rm, dlE1rm, rpeD, comp, bw, mv] = await Promise.all([
        getWeeklyVolume(db, 12),
        getE1RMHistory(db, 'squat', 20),
        getE1RMHistory(db, 'bench', 20),
        getE1RMHistory(db, 'deadlift', 20),
        getRPEDistribution(db, 30),
        getWeeklyCompletionRate(db, 12),
        getBodyweightTrend(db, 90),
        getMuscleGroupVolume(db, 30),
      ]);
      setWeeklyVolume(vol);
      setE1rmData({ squat: sqE1rm, bench: bnE1rm, deadlift: dlE1rm });
      setRpe(rpeD);
      setCompletionRate(comp);
      setBodyweight(bw);
      setMuscleVolume(mv);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Analytics</Text>

        {/* Current 1RM */}
        <SectionHeader title="Current 1RM" />
        <View style={styles.metricsRow}>
          {MAIN_LIFTS.map((lift) => {
            const max = getMaxForLift(lift.liftFamily as LiftType);
            return (
              <View key={lift.liftFamily} style={styles.metricWrap}>
                <MetricCard label={lift.label} value={max ? String(max.oneRm) : '—'} unit={max ? 'kg' : undefined} color={lift.color} />
              </View>
            );
          })}
        </View>

        {/* e1RM Curves */}
        <SectionHeader title="Estimated 1RM Trend" />
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
        <SectionHeader title="Weekly Volume" />
        <Card style={styles.card}>
          <LineChart
            title="Total Volume (kg)"
            data={weeklyVolume.map((d) => ({ label: d.weekStart.slice(5), value: d.totalVolume }))}
            color={colors.primary}
            unit="kg"
          />
        </Card>

        {/* Completion Rate */}
        <SectionHeader title="Weekly Completion Rate" />
        <Card style={styles.card}>
          <LineChart
            title="Avg Completion %"
            data={completionRate.map((d) => ({ label: d.weekStart.slice(5), value: d.rate * 100 }))}
            color={colors.success}
            unit="%"
          />
        </Card>

        {/* RPE Distribution */}
        <SectionHeader title="RPE Distribution (30 days)" />
        <View style={styles.metricsRow}>
          <View style={styles.metricWrap}>
            <MetricCard label="Low (6-7)" value={`${rpe.low}`} color={colors.rpeLow} />
          </View>
          <View style={styles.metricWrap}>
            <MetricCard label="Med (7.5-8.5)" value={`${rpe.medium}`} color={colors.rpeMedium} />
          </View>
          <View style={styles.metricWrap}>
            <MetricCard label="High (9+)" value={`${rpe.high}`} color={colors.rpeHigh} />
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
        <SectionHeader title="Muscle Group Volume (30 days)" />
        <Card style={styles.card}>
          <BarChart
            title="Volume by Muscle Group"
            data={muscleVolume.slice(0, 8).map((d) => ({ label: d.muscleGroup, value: Math.round(d.volume) }))}
          />
        </Card>

        {/* Bodyweight */}
        <SectionHeader title="Bodyweight" />
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
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  loadingText: { ...typography.subhead, color: colors.textSecondary },
  pageTitle: { ...typography.largeTitle, color: colors.textPrimary, marginBottom: spacing.lg },
  metricsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  metricWrap: { flex: 1 },
  card: { marginBottom: spacing.lg },
});

