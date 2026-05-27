import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, MetricCard, NumberField, SectionHeader, TextField } from '@/src/components/ui';
import type { BodyweightEntry, LiftType, NutritionEntry, WorkoutSession } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { addBodyweightEntry, addNutritionEntry, getLatestBodyweight, getNutritionByDate, getRecentWorkouts, updateBodyweightEntry, updateNutritionEntry } from '@/src/repositories';
import { isAIConfigured, requestNutritionTags } from '@/src/services/aiService';
import { useSettingsStore } from '@/src/stores/useSettingsStore';
import { colors, radius, spacing, typography } from '@/src/theme';

const MAIN_LIFTS: Array<{ liftType: LiftType; label: string; color: string }> = [
  { liftType: 'squat', label: 'Squat', color: colors.primary },
  { liftType: 'bench', label: 'Bench', color: colors.success },
  { liftType: 'deadlift', label: 'Deadlift', color: colors.warning },
];

const formatDate = (value: string | Date) =>
  new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(
    typeof value === 'string' ? new Date(value) : value,
  );

const formatDuration = (seconds?: number) => {
  if (!seconds) return '—';

  const minutes = Math.round(seconds / 60);
  return `${minutes} min`;
};

const formatVolume = (volume?: number) => {
  if (!volume) return '—';

  return `${Math.round(volume).toLocaleString()} kg`;
};

export function HomeDashboard() {
  const db = useDatabase();
  const router = useRouter();
  const getMaxForLift = useSettingsStore((state) => state.getMaxForLift);

  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutSession[]>([]);
  const [latestBodyweight, setLatestBodyweight] = useState<BodyweightEntry | null>(null);
  const [bodyweightValue, setBodyweightValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingBodyweight, setIsSavingBodyweight] = useState(false);

  // Nutrition state
  const [todayNutrition, setTodayNutrition] = useState<NutritionEntry | null>(null);
  const [nutritionNotes, setNutritionNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSavingNutrition, setIsSavingNutrition] = useState(false);
  const [aiTags, setAiTags] = useState<string[]>([]);

  const todayLabel = useMemo(
    () => new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()),
    [],
  );

  const loadDashboard = useCallback(async () => {
    if (!db) return;

    setIsLoading(true);
    const todayStr = new Date().toISOString().slice(0, 10);
    const [workouts, bodyweight, nutrition] = await Promise.all([
      getRecentWorkouts(db, 1),
      getLatestBodyweight(db),
      getNutritionByDate(db, todayStr),
    ]);
    setRecentWorkouts(workouts);
    setLatestBodyweight(bodyweight);
    setBodyweightValue(bodyweight?.bodyweight ?? null);
    setTodayNutrition(nutrition);
    if (nutrition) {
      setNutritionNotes(nutrition.notes ?? '');
      setSelectedTags(nutrition.statusTags);
      setAiTags(nutrition.aiTags ?? []);
    }
    setIsLoading(false);
  }, [db]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const handleSaveBodyweight = async () => {
    if (!db || bodyweightValue === null) return;

    setIsSavingBodyweight(true);
    const today = new Date().toISOString();
    if (latestBodyweight) {
      await updateBodyweightEntry(db, latestBodyweight.id, { bodyweight: bodyweightValue, date: today });
    } else {
      await addBodyweightEntry(db, { bodyweight: bodyweightValue, date: today });
    }
    await loadDashboard();
    setIsSavingBodyweight(false);
  };

  const NUTRITION_STATUS_OPTIONS = ['偏少', '正常', '偏多', '高蛋白', '外食多', '饮酒', '不规律'];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const handleSaveNutrition = async () => {
    if (!db) return;

    setIsSavingNutrition(true);
    const todayStr = new Date().toISOString().slice(0, 10);

    if (todayNutrition) {
      await updateNutritionEntry(db, todayNutrition.id, { statusTags: selectedTags, notes: nutritionNotes });
    } else {
      await addNutritionEntry(db, { date: todayStr, statusTags: selectedTags, notes: nutritionNotes });
    }

    // Request AI tags if configured and notes exist
    if (isAIConfigured() && nutritionNotes.length > 0) {
      try {
        const res = await requestNutritionTags({ notes: nutritionNotes, statusTags: selectedTags, bodyweight: bodyweightValue ?? undefined });
        setAiTags(res.data.tags);
        // Save AI tags back
        const updated = await getNutritionByDate(db, todayStr);
        if (updated) await updateNutritionEntry(db, updated.id, { aiTags: res.data.tags });
      } catch { /* AI optional */ }
    }

    await loadDashboard();
    setIsSavingNutrition(false);
  };

  const lastWorkout = recentWorkouts[0];

  if (!db || isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Loading dashboard…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{todayLabel}</Text>
          <Text style={styles.title}>Training command center</Text>
          <Text style={styles.subtitle}>Track today’s body signals, launch your workout, and keep the big lifts moving.</Text>
        </View>

        <Card variant="elevated" style={styles.heroCard}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardKicker}>Primary action</Text>
            <Text style={styles.statusPill}>Offline ready</Text>
          </View>
          <Text style={styles.cardTitle}>Start today’s workout</Text>
          <Text style={styles.cardText}>Jump into logging with kg, reps, RPE, and post-session coaching.</Text>
          <Button title="Start Workout" onPress={() => router.push('../workout')} style={styles.cardButton} fullWidth />
        </Card>

        <View style={styles.quickGrid}>
          <Card style={styles.quickCard} variant="coach" padding={spacing.md}>
            <Text style={styles.quickLabel}>Weekly Review</Text>
            <Text style={styles.quickCopy}>AI training recap</Text>
            <Button title="View" onPress={() => router.push('/review')} variant="secondary" size="sm" />
          </Card>
          <Card style={styles.quickCard} variant="tonal" padding={spacing.md}>
            <Text style={styles.quickLabel}>Current cycle</Text>
            <Text style={styles.quickCopy}>No active program</Text>
          </Card>
        </View>

        <SectionHeader title="Recent Workout" subtitle="Your latest completed session at a glance." />
        <Card style={styles.card} variant="outlined">
          {lastWorkout ? (
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Date</Text>
                <Text style={styles.summaryValue}>{formatDate(lastWorkout.date)}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Duration</Text>
                <Text style={styles.summaryValue}>{formatDuration(lastWorkout.durationSeconds)}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Volume</Text>
                <Text style={styles.summaryValue}>{formatVolume(lastWorkout.totalVolume)}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.emptyText}>No workouts yet</Text>
          )}
        </Card>

        <SectionHeader title="Bodyweight" subtitle="Keep weight context close to training performance." />
        <Card style={styles.card}>
          <Text style={styles.cardText}>
            Latest: {latestBodyweight ? `${latestBodyweight.bodyweight} kg · ${formatDate(latestBodyweight.date)}` : 'No data'}
          </Text>
          <NumberField label="Bodyweight" value={bodyweightValue} onChangeValue={setBodyweightValue} step={0.5} min={20} unit="kg" />
          <Button
            title="Save Bodyweight"
            onPress={handleSaveBodyweight}
            disabled={bodyweightValue === null}
            loading={isSavingBodyweight}
            size="md"
          />
        </Card>

        <SectionHeader title="Today's Nutrition" subtitle="Lightweight tags for recovery and context." />
        <Card style={styles.card}>
          <Text style={styles.cardText}>Status tags:</Text>
          <View style={styles.tagsRow}>
            {NUTRITION_STATUS_OPTIONS.map((tag) => (
              <Pressable key={tag} onPress={() => toggleTag(tag)} style={[styles.tag, selectedTags.includes(tag) && styles.tagSelected]}>
                <Text style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextSelected]}>{tag}</Text>
              </Pressable>
            ))}
          </View>
          <TextField label="Notes" value={nutritionNotes} onChangeText={setNutritionNotes} placeholder="今天吃了什么..." multiline />
          {aiTags.length > 0 && (
            <View style={styles.aiTagsRow}>
              <Text style={styles.aiTagsLabel}>AI Tags:</Text>
              {aiTags.map((t) => <Text key={t} style={styles.aiTag}>{t}</Text>)}
            </View>
          )}
          <Button title="Save Nutrition" onPress={handleSaveNutrition} loading={isSavingNutrition} size="md" />
        </Card>

        <SectionHeader title="Estimated 1RM" subtitle="Current max settings for the big three." />
        <View style={styles.metricsRow}>
          {MAIN_LIFTS.map((lift) => {
            const max = getMaxForLift(lift.liftType);
            return (
              <View key={lift.liftType} style={styles.metricWrap}>
                <MetricCard label={lift.label} value={max ? String(max.oneRm) : '—'} unit={max ? 'kg' : undefined} color={lift.color} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  loadingText: {
    ...typography.subhead,
    color: colors.textSecondary,
  },
  hero: {
    marginBottom: spacing.sm,
  },
  eyebrow: {
    ...typography.overline,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.largeTitle,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 22,
  },
  heroCard: { gap: spacing.md, marginBottom: spacing.sm },
  card: {
    marginBottom: spacing.sm,
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  cardKicker: { ...typography.overline, color: colors.primary },
  statusPill: { ...typography.caption, color: colors.recovery, fontWeight: '800', backgroundColor: colors.successSoft, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, overflow: 'hidden' },
  cardTitle: {
    ...typography.title3,
    color: colors.textPrimary,
  },
  cardText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  cardButton: {
    marginTop: spacing.xs,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    minWidth: 0,
  },
  summaryItem: {
    flex: 1,
    minWidth: 0,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    ...typography.headline,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    minWidth: 0,
  },
  metricWrap: {
    flex: 1,
    minWidth: 0,
  },
  quickGrid: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  quickCard: { flex: 1, gap: spacing.sm },
  quickLabel: { ...typography.headline, color: colors.textPrimary },
  quickCopy: { ...typography.footnote, color: colors.textSecondary, lineHeight: 18 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md },
  tag: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.full, backgroundColor: colors.surfaceMuted, borderWidth: 1, borderColor: colors.borderLight },
  tagSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  tagText: { ...typography.footnote, color: colors.textSecondary },
  tagTextSelected: { color: '#fff', fontWeight: '600' },
  aiTagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md, alignItems: 'center' },
  aiTagsLabel: { ...typography.footnote, color: colors.textSecondary, marginRight: spacing.xs },
  aiTag: { ...typography.footnote, color: colors.primary, backgroundColor: colors.surfaceSecondary, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 10 },
});
