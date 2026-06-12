import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import i18n from '@/src/i18n';

import { Button, Card, MetricCard, SectionHeader, TextField } from '@/src/components/ui';
import type { BodyweightEntry, CurrentCycle, LiftType, NutritionEntry, ProgramDay, WorkoutSession } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import {
  addNutritionEntry,
  getCurrentE1rmForLift,
  getLatestBodyweight,
  getNutritionByDate,
  getRecentWorkouts,
  updateNutritionEntry,
} from '@/src/repositories';
import { getCurrentCycle, getProgramDayByWeekDay } from '@/src/repositories/programRepository';
import { isAIConfigured, requestNutritionTags } from '@/src/services/aiService';
import { useColorScheme } from '@/components/useColorScheme';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { confirmAction } from '@/src/lib/alert';
import { colors, radius, spacing, typography } from '@/src/theme';
import { commonFoods, type FoodItem } from '@/src/data/foodDatabase';

const lightBg = require('../../../assets/power-log-light.png');
const darkBg = require('../../../assets/power-log-dark.png');
const DEBUG_RED = { uri: 'https://placehold.co/600x400/ff0000/ffffff?text=BG' };

const MAIN_LIFTS: Array<{ liftType: LiftType; label: string; color: string }> = [
  { liftType: 'squat', label: 'Squat', color: colors.primary },
  { liftType: 'bench', label: 'Bench', color: colors.success },
  { liftType: 'deadlift', label: 'Deadlift', color: colors.warning },
];

const formatDate = (value: string | Date) =>
  new Intl.DateTimeFormat(i18n.language, { month: 'short', day: 'numeric', year: 'numeric' }).format(
    typeof value === 'string' ? new Date(value) : value,
  );

const formatDuration = (seconds?: number) => {
  if (!seconds) return '—';

  const minutes = Math.round(seconds / 60);
  return i18n.t('common.durationMinutes', { minutes });
};

const formatVolume = (volume?: number) => {
  if (!volume) return '—';

  return `${Math.round(volume).toLocaleString()} kg`;
};

export function HomeDashboard() {
  const { t } = useTranslation();
  const db = useDatabase();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const bgImage = colorScheme === 'dark' ? darkBg : lightBg;
  const webBgUrl = Platform.OS === 'web' ? `url('/bg-${colorScheme === 'dark' ? 'dark' : 'light'}.png')` : null;

  const startWorkoutFromProgram = useActiveWorkoutStore((state) => state.startWorkoutFromProgram);
  const startWorkout = useActiveWorkoutStore((state) => state.startWorkout);

  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutSession[]>([]);
  const [latestBodyweight, setLatestBodyweight] = useState<BodyweightEntry | null>(null);
  const [currentE1rm, setCurrentE1rm] = useState<Record<string, number | null>>({});
  const [cycle, setCycle] = useState<CurrentCycle | null>(null);
  const [todayProgramDay, setTodayProgramDay] = useState<ProgramDay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);

  // Nutrition state
  const [todayNutrition, setTodayNutrition] = useState<NutritionEntry | null>(null);
  const [nutritionNotes, setNutritionNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSavingNutrition, setIsSavingNutrition] = useState(false);
  const [aiTags, setAiTags] = useState<string[]>([]);

  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [foodSearch, setFoodSearch] = useState('');
  const [foodQuantities, setFoodQuantities] = useState<Record<string, number>>({});
  const [showFoodList, setShowFoodList] = useState(false);

  const todayLabel = useMemo(
    () => new Intl.DateTimeFormat(i18n.language, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()),
    [],
  );

  const loadDashboard = useCallback(async () => {
    if (!db) return;

    setIsLoading(true);
    const todayStr = new Date().toISOString().slice(0, 10);
    const [workouts, bodyweight, nutrition, sqCur, bnCur, dlCur, activeCycle] = await Promise.all([
      getRecentWorkouts(db, 1),
      getLatestBodyweight(db),
      getNutritionByDate(db, todayStr),
      getCurrentE1rmForLift(db, 'squat'),
      getCurrentE1rmForLift(db, 'bench'),
      getCurrentE1rmForLift(db, 'deadlift'),
      getCurrentCycle(db),
    ]);
    setRecentWorkouts(workouts);
    setLatestBodyweight(bodyweight);
    setCurrentE1rm({ squat: sqCur, bench: bnCur, deadlift: dlCur });
    setCycle(activeCycle);

    if (activeCycle) {
      const day = await getProgramDayByWeekDay(db, activeCycle.programId, activeCycle.currentWeek, activeCycle.currentDay);
      setTodayProgramDay(day);
    } else {
      setTodayProgramDay(null);
    }
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

  const NUTRITION_STATUS_OPTIONS = ['偏少', '正常', '偏多', '高蛋白', '外食多', '饮酒', '不规律'];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const filteredFoods = foodSearch ? commonFoods.filter((f) =>
    f.nameEn.toLowerCase().includes(foodSearch.toLowerCase()) ||
    f.nameZh.includes(foodSearch) ||
    f.category.toLowerCase().includes(foodSearch.toLowerCase()),
  ) : commonFoods;

  const addFood = (foodId: string) => {
    setSelectedFoods((prev) => prev.includes(foodId) ? prev : [...prev, foodId]);
    setFoodQuantities((prev) => ({ ...prev, [foodId]: prev[foodId] ?? 1 }));
    setFoodSearch('');
    setShowFoodList(false);
  };

  const removeFood = (foodId: string) => {
    setSelectedFoods((prev) => prev.filter((f) => f !== foodId));
  };

  const setFoodQty = (foodId: string, qty: number) => {
    setFoodQuantities((prev) => ({ ...prev, [foodId]: Math.max(0.5, qty) }));
  };

  const foodTotals = useMemo(() => {
    let cal = 0; let p = 0; let c = 0; let f = 0;
    for (const id of selectedFoods) {
      const food = commonFoods.find((item) => item.id === id);
      if (!food) continue;
      const qty = foodQuantities[id] ?? 1;
      cal += food.calories * qty;
      p += food.protein * qty;
      c += food.carbs * qty;
      f += food.fat * qty;
    }
    return { calories: Math.round(cal), protein: Math.round(p), carbs: Math.round(c), fat: Math.round(f) };
  }, [selectedFoods, foodQuantities]);

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
        const res = await requestNutritionTags({ notes: nutritionNotes, statusTags: selectedTags, bodyweight: latestBodyweight?.bodyweight });
        setAiTags(res.data.tags);
        // Save AI tags back
        const updated = await getNutritionByDate(db, todayStr);
        if (updated) await updateNutritionEntry(db, updated.id, { aiTags: res.data.tags });
      } catch { /* AI optional */ }
    }

    await loadDashboard();
    setIsSavingNutrition(false);
  };

  const handleStartProgramWorkout = useCallback(async () => {
    if (!db || !todayProgramDay) return;
    setIsStarting(true);
    try {
      await startWorkoutFromProgram(db, todayProgramDay.id);
      const sessionId = useActiveWorkoutStore.getState().session?.id;
      if (sessionId) {
        router.push(`/workout/${sessionId}` as Href);
      }
    } finally {
      setIsStarting(false);
    }
  }, [db, todayProgramDay, router, startWorkoutFromProgram]);

  const handleStartFreeWorkout = useCallback(async (date?: string) => {
    if (!db) return;
    setIsStarting(true);
    try {
      await startWorkout(db, date);
      const sessionId = useActiveWorkoutStore.getState().session?.id;
      if (sessionId) {
        router.push(`/workout/${sessionId}` as Href);
      }
    } finally {
      setIsStarting(false);
    }
  }, [db, router, startWorkout]);

  const handleRestDay = () => {
    confirmAction(
      t('home.restDay'),
      t('home.restDayConfirm'),
      () => {},
    );
  };

  const lastWorkout = recentWorkouts[0];

  if (!db || isLoading) {
    return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ImageBackground source={bgImage} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} resizeMode="cover" />
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>{t('common.loadingDashboard')}</Text>
        </View>
      </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>
        <ImageBackground source={bgImage} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} resizeMode="cover" />
        {/* DEBUG: if you see red bg, the layer works but ImageBackground/image isn't loading */}
        {/* <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'red' }} /> */}
      <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{todayLabel}</Text>
          <Text style={styles.title}>{t('home.trainingCommandCenter')}</Text>
          <Text style={styles.subtitle}>{t('home.trackBodySignals')}</Text>
        </View>

        <View style={styles.glassCardWrapper}>
          {Platform.OS === 'web' && <View style={styles.glassBlob} />}
          <Card variant="glass" style={styles.heroCard}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardKicker}>{t('home.primaryAction')}</Text>
            <Text style={styles.statusPill}>{t('common.offlineReady')}</Text>
          </View>
          {todayProgramDay ? (
            <>
              <Text style={styles.cardTitle}>
                {t('home.programDayTitle', { week: cycle?.currentWeek ?? 1, day: cycle?.currentDay ?? 1 })}
              </Text>
              <Text style={styles.cardText}>{todayProgramDay.title}</Text>
              <Text style={styles.programDayExtra}>
                {todayProgramDay.mainFocus && `${todayProgramDay.mainFocus} • `}
                {todayProgramDay.estimatedDuration && `~${todayProgramDay.estimatedDuration} min`}
              </Text>
              <View style={styles.programActions}>
                <Button
                  title={t('home.startProgramDay')}
                  onPress={() => void handleStartProgramWorkout()}
                  loading={isStarting}
                  disabled={isStarting}
                  style={styles.programButton}
                  fullWidth
                />
                <Button
                  title={t('home.restDay')}
                  onPress={handleRestDay}
                  variant="ghost"
                  size="sm"
                  style={styles.restDayButton}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.cardTitle}>{t('home.startTodaysWorkout')}</Text>
              <Text style={styles.cardText}>{t('home.jumpIntoLogging')}</Text>
              <Button title={t('home.startWorkout')} onPress={() => router.push('../workout')} style={styles.cardButton} fullWidth />
            </>
          )}
        </Card>
        </View>

        <View style={styles.quickGrid}>
          <Card style={styles.quickCard} variant="coach" padding={spacing.md}>
            <Text style={styles.quickLabel}>{t('home.weeklyReview')}</Text>
            <Text style={styles.quickCopy}>{t('home.aiTrainingRecap')}</Text>
            <Button title={t('common.view')} onPress={() => router.push('/review')} variant="secondary" size="sm" />
          </Card>
          <Card style={styles.quickCard} variant="tonal" padding={spacing.md}>
            <Text style={styles.quickLabel}>{t('home.currentCycle')}</Text>
            {cycle ? (
              <Text style={styles.quickCopy}>
                {t('programOpts.week')} {cycle.currentWeek} • Day {cycle.currentDay} • {cycle.currentPhase}
              </Text>
            ) : (
              <Text style={styles.quickCopy}>{t('home.noActiveProgram')}</Text>
            )}
          </Card>
        </View>

        <SectionHeader title={t('home.recentWorkout')} subtitle={t('home.latestCompletedSession')} />
        <Card style={styles.card} variant="outlined">
          {lastWorkout ? (
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{t('common.date')}</Text>
                <Text style={styles.summaryValue}>{formatDate(lastWorkout.date)}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{t('common.duration')}</Text>
                <Text style={styles.summaryValue}>{formatDuration(lastWorkout.durationSeconds)}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{t('common.volume')}</Text>
                <Text style={styles.summaryValue}>{formatVolume(lastWorkout.totalVolume)}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.emptyText}>{t('common.noWorkouts')}</Text>
          )}
        </Card>

        <SectionHeader title={t('home.estimated1RM')} subtitle={t('home.currentMaxBigThree')} />
        <View style={styles.metricsRow}>
          {MAIN_LIFTS.map((lift) => {
            const value = currentE1rm[lift.liftType];
            return (
              <View key={lift.liftType} style={styles.metricWrap}>
                <MetricCard label={t(`analytics.${lift.liftType}`)} value={value != null ? String(value) : '—'} unit={value != null ? 'kg' : undefined} color={lift.color} />
              </View>
            );
          })}
        </View>

        <SectionHeader title={t('home.todaysNutrition')} subtitle={t('home.trackMealsMacros')} />
        <Card style={styles.card}>
          <View style={styles.macroRow}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{foodTotals.calories}</Text>
              <Text style={styles.macroLabel}>{t('settingsExtras.kcal')}</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: colors.primary }]}>{foodTotals.protein}</Text>
              <Text style={styles.macroLabel}>{t('home.protein')}</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: colors.warning }]}>{foodTotals.carbs}</Text>
              <Text style={styles.macroLabel}>{t('home.carbs')}</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, { color: colors.danger }]}>{foodTotals.fat}</Text>
              <Text style={styles.macroLabel}>{t('home.fat')}</Text>
            </View>
          </View>

          {selectedFoods.length > 0 && (
            <View style={styles.foodList}>
              {selectedFoods.map((id) => {
                const food = commonFoods.find((f) => f.id === id);
                if (!food) return null;
                const qty = foodQuantities[id] ?? 1;
                return (
                  <View key={id} style={styles.foodRow}>
                    <Text style={styles.foodName}>{food.nameZh} {food.serving}</Text>
                    <View style={styles.foodQtyRow}>
                      <Pressable onPress={() => setFoodQty(id, qty - 0.5)} style={styles.qtyBtn}>
                        <Text style={styles.qtyBtnText}>−</Text>
                      </Pressable>
                      <Text style={styles.qtyValue}>{qty}</Text>
                      <Pressable onPress={() => setFoodQty(id, qty + 0.5)} style={styles.qtyBtn}>
                        <Text style={styles.qtyBtnText}>+</Text>
                      </Pressable>
                    </View>
                    <Text style={styles.foodKcal}>{Math.round(food.calories * qty)}kcal</Text>
                    <Pressable onPress={() => removeFood(id)} style={styles.foodRemove}>
                      <Text style={styles.foodRemoveText}>×</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}

          <Pressable onPress={() => setShowFoodList(!showFoodList)} style={styles.addFoodBtn}>
            <Text style={styles.addFoodText}>{t('home.addFood')}</Text>
          </Pressable>

          {showFoodList && (
            <View style={styles.foodPicker}>
              <TextField label={t('home.searchFoods')} value={foodSearch} onChangeText={setFoodSearch} placeholder={t('home.foodSearchPlaceholder')} />
              <ScrollView style={styles.foodPickerList} nestedScrollEnabled>
                {filteredFoods.map((food) => (
                  <Pressable key={food.id} onPress={() => addFood(food.id)} style={styles.foodPickerItem}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.foodPickerName}>{food.nameZh} · {food.nameEn}</Text>
                      <Text style={styles.foodPickerMeta}>{food.serving} · {food.calories}kcal · P{food.protein} C{food.carbs} F{food.fat}</Text>
                    </View>
                    <Text style={styles.foodPickerAdd}>+</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          <Text style={styles.cardText}>{t('home.statusTags')}</Text>
          <View style={styles.tagsRow}>
            {NUTRITION_STATUS_OPTIONS.map((tag) => (
              <Pressable key={tag} onPress={() => toggleTag(tag)} style={[styles.tag, selectedTags.includes(tag) && styles.tagSelected]}>
                <Text style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextSelected]}>{tag}</Text>
              </Pressable>
            ))}
          </View>
          <TextField label={t('common.notes')} value={nutritionNotes} onChangeText={setNutritionNotes} placeholder={t('home.notesPlaceholder')} multiline />
          {aiTags.length > 0 && (
            <View style={styles.aiTagsRow}>
              <Text style={styles.aiTagsLabel}>{t('home.aiTags')}</Text>
              {aiTags.map((t) => <Text key={t} style={styles.aiTag}>{t}</Text>)}
            </View>
          )}
          <Button title={t('home.saveNutrition')} onPress={handleSaveNutrition} loading={isSavingNutrition} size="md" />
        </Card>
      </ScrollView>
    </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.dockBottomInset,
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
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
  glassCardWrapper: {
    position: 'relative',
  },
  glassBlob: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primarySoft,
    opacity: 0.5,
  },
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
  programDayExtra: {
    ...typography.footnote,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  programActions: {
    gap: spacing.xs,
  },
  programButton: {
    marginTop: spacing.xs,
  },
  restDayButton: {
    alignSelf: 'center',
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
    ...typography.callout,
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
  macroRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  macroItem: { flex: 1, alignItems: 'center', backgroundColor: colors.surfaceMuted, borderRadius: radius.lg, padding: spacing.md },
  macroValue: { ...typography.title3, color: colors.textPrimary, fontWeight: '800' },
  macroLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  foodList: { gap: spacing.sm, marginBottom: spacing.md },
  foodRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  foodName: { flex: 1, ...typography.subhead, color: colors.textPrimary },
  foodQtyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  qtyBtn: { width: 26, height: 26, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.surfaceMuted, borderWidth: 1, borderColor: colors.borderLight },
  qtyBtnText: { fontSize: 16, color: colors.primary, fontWeight: '700', lineHeight: 18 },
  qtyValue: { ...typography.subhead, color: colors.textPrimary, minWidth: 24, textAlign: 'center' },
  foodKcal: { ...typography.footnote, color: colors.textSecondary, minWidth: 44, textAlign: 'right' },
  foodRemove: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.dangerSoft },
  foodRemoveText: { fontSize: 14, color: colors.danger, fontWeight: '700' },
  addFoodBtn: { paddingVertical: spacing.sm, alignItems: 'center', borderRadius: radius.md, borderWidth: 1, borderColor: colors.primaryBorder, borderStyle: 'dashed', marginBottom: spacing.md },
  addFoodText: { ...typography.subhead, color: colors.primary, fontWeight: '600' },
  foodPicker: { marginBottom: spacing.md },
  foodPickerList: { maxHeight: 200 },
  foodPickerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, paddingHorizontal: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  foodPickerName: { ...typography.subhead, color: colors.textPrimary },
  foodPickerMeta: { ...typography.footnote, color: colors.textSecondary, marginTop: 2 },
  foodPickerAdd: { fontSize: 20, color: colors.primary, fontWeight: '700', paddingHorizontal: spacing.sm },
});
