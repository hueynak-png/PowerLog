import { useCallback, useEffect, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type Href, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from "expo-router/react-navigation";

import { Button, Card, SectionHeader, TextField } from '@/src/components/ui';
import type { ProgramDay, WorkoutSession } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { confirmAction, showAlert } from '@/src/lib/alert';
import { deleteWorkoutSession, getWorkoutsByDate, getWorkoutsByMonth } from '@/src/repositories';
import { getScheduledProgramDaysByDate, getCurrentCycle, scheduleProgramDays, getProgramWeeks, getProgramDays, rescheduleProgramDayCascade } from '@/src/repositories/programRepository';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { useTranslation } from 'react-i18next';
import i18n from '@/src/i18n';

import { colors, spacing, typography } from '@/src/theme';
import { radius } from '@/src/theme/radius';

const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

const getToday = () => new Date().toISOString().slice(0, 10);

const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month, 0).getDate();

const getFirstDayOffset = (year: number, month: number): number => {
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

const formatMonthYear = (year: number, month: number): string =>
  new Intl.DateTimeFormat(i18n.language, { year: 'numeric', month: 'long' }).format(new Date(year, month - 1));

const formatDuration = (seconds: number): string => {
  const m = Math.round(seconds / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
};

export function CalendarScreen() {
  const db = useDatabase();
  const router = useRouter();
  const startWorkout = useActiveWorkoutStore((state) => state.startWorkout);
  const startWorkoutFromProgram = useActiveWorkoutStore((state) => state.startWorkoutFromProgram);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const today = getToday();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [monthWorkouts, setMonthWorkouts] = useState<WorkoutSession[]>([]);
  const [dayWorkouts, setDayWorkouts] = useState<WorkoutSession[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [scheduledDays, setScheduledDays] = useState<Array<ProgramDay & { programName: string; programId: string; weekNumber: number; exerciseCount: number }>>([]);
  const [scheduledTotal, setScheduledTotal] = useState(0);
  const [activeProgramId, setActiveProgramId] = useState<string | null>(null);

  // Range selection state
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);
  const [showReschedulePicker, setShowReschedulePicker] = useState(false);
  const [rescheduleDayId, setRescheduleDayId] = useState<string | null>(null);
  const [customRescheduleDate, setCustomRescheduleDate] = useState('');

  // Load workouts for current month
  useEffect(() => {
    if (!db) return;
    getWorkoutsByMonth(db, year, month).then(setMonthWorkouts);
  }, [db, year, month]);

  // Refresh month workouts when tab regains focus (after completing a workout)
  useFocusEffect(
    useCallback(() => {
      if (!db) return;
      getWorkoutsByMonth(db, year, month).then(setMonthWorkouts);
    }, [db, year, month]),
  );

  // Load active cycle + auto-repair + scheduled dates for month
  useEffect(() => {
    if (!db) return;
    (async () => {
      const activeCycle = await getCurrentCycle(db);
      if (activeCycle) {
        setActiveProgramId(activeCycle.programId);
        // Auto-repair: schedule if needed
        const weeks = await getProgramWeeks(db, activeCycle.programId);
        if (weeks.length > 0) {
          const firstWeekDays = await getProgramDays(db, weeks[0].id);
          if (firstWeekDays.length > 0 && !firstWeekDays[0].scheduledDate) {
            const startDate = new Date().toISOString().slice(0, 10);
            const count = await scheduleProgramDays(db, activeCycle.programId, startDate, [0, 1, 3, 4]);
            console.log(`[Calendar] Auto-scheduled ${count} days`);
          }
        }
      }
    })();
  }, [db]);

  // Load workouts + scheduled program days for selected date
  useEffect(() => {
    if (!db || !selectedDate) return;
    Promise.all([
      getWorkoutsByDate(db, selectedDate),
      getScheduledProgramDaysByDate(db, selectedDate),
    ]).then(([workouts, scheduled]) => {
      setDayWorkouts(workouts);
      setScheduledDays(scheduled);
      console.log(`[Calendar] ${selectedDate}: ${workouts.length} completed, ${scheduled.length} scheduled`);
    });
  }, [db, selectedDate, monthWorkouts, refreshKey]);

  // Count total scheduled days (single query per program)
  useEffect(() => {
    if (!db) return;
    getCurrentCycle(db).then(async (cycle) => {
      if (!cycle) { setScheduledTotal(0); return; }
      const weeks = await getProgramWeeks(db, cycle.programId);
      let total = 0;
      for (const w of weeks) {
        const days = await getProgramDays(db, w.id);
        total += days.filter(d => d.scheduledDate != null).length;
      }
      setScheduledTotal(total);
    });
  }, [db, dayWorkouts, scheduledDays, refreshKey]);

  // Collect dates with scheduled days for calendar dots (from the current active program)
  const [scheduledMonthDates, setScheduledMonthDates] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (!db) return;
    getCurrentCycle(db).then(async (cycle) => {
      if (!cycle) { setScheduledMonthDates(new Set()); return; }
      const weeks = await getProgramWeeks(db, cycle.programId);
      const dates = new Set<string>();
      for (const w of weeks) {
        const days = await getProgramDays(db, w.id);
        for (const d of days) {
          if (d.scheduledDate) dates.add(d.scheduledDate);
        }
      }
      setScheduledMonthDates(dates);
    });
  }, [db, dayWorkouts, scheduledDays, refreshKey]);

  const workoutDates = new Set(monthWorkouts.map((w) => w.date));
  const scheduledDates = scheduledMonthDates;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOffset = getFirstDayOffset(year, month);

  const prevMonth = () => {
    if (month === 1) { setYear(year - 1); setMonth(12); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 12) { setYear(year + 1); setMonth(1); }
    else setMonth(month + 1);
  };

  const handleDatePress = (dateStr: string) => {
    if (!isRangeMode) {
      setSelectedDate(dateStr);
      return;
    }
    if (!rangeStart) {
      setRangeStart(dateStr);
    } else if (!rangeEnd) {
      if (dateStr < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(dateStr);
      } else {
        setRangeEnd(dateStr);
      }
    } else {
      setRangeStart(dateStr);
      setRangeEnd(null);
    }
  };

  const handleCancelRange = () => {
    setIsRangeMode(false);
    setRangeStart(null);
    setRangeEnd(null);
  };

  const handleGenerateReview = () => {
    if (!rangeStart || !rangeEnd) return;
    const start = rangeStart < rangeEnd ? rangeStart : rangeEnd;
    const end = rangeStart < rangeEnd ? rangeEnd : rangeStart;
    router.push({
      pathname: '/review',
      params: { startDate: start, endDate: end },
    } as Href);
  };

  const isInRange = (date: string, start: string | null, end: string | null): boolean =>
    start !== null && end !== null && date > start && date < end;

  const rangeComplete = rangeStart !== null && rangeEnd !== null;

  const handleStartWorkout = useCallback(async (date: string) => {
    if (!db) return;
    // Single scheduled day → auto-start
    if (scheduledDays.length === 1) {
      await startWorkoutFromProgram(db, scheduledDays[0].id);
      const sessionId = useActiveWorkoutStore.getState().session?.id;
      if (sessionId) router.push(`/workout/${sessionId}` as Href);
      return;
    }
    // Multiple scheduled days → show selection dialog
    if (scheduledDays.length > 1) {
      const buttons: Array<{ text: string; onPress: () => void; style?: 'cancel' | 'default' | 'destructive' }> = [
        ...scheduledDays.slice(0, 5).map((sd) => ({
          text: `${sd.programName} – Week ${sd.weekNumber} Day ${sd.dayNumber}`,
          onPress: async () => {
            await startWorkoutFromProgram(db, sd.id);
            const sessionId = useActiveWorkoutStore.getState().session?.id;
            if (sessionId) router.push(`/workout/${sessionId}` as Href);
          },
        })),
        { text: t('common.cancel'), style: 'cancel' as const, onPress: () => {} },
      ];
      Alert.alert(
        t('calendar.selectPlan'),
        t('calendar.multiplePlansHint', { count: scheduledDays.length }),
        buttons,
      );
      return;
    }
    // No scheduled days → free training
    await startWorkout(db, date);
    const sessionId = useActiveWorkoutStore.getState().session?.id;
    if (sessionId) router.push(`/workout/${sessionId}` as Href);
  }, [db, router, startWorkout, startWorkoutFromProgram, scheduledDays, t]);

  const handleStartScheduledWorkout = useCallback(async (programDayId: string) => {
    if (!db) return;
    await startWorkoutFromProgram(db, programDayId);
    const sessionId = useActiveWorkoutStore.getState().session?.id;
    if (sessionId) router.push(`/workout/${sessionId}` as Href);
  }, [db, router, startWorkoutFromProgram]);

  const handleReschedule = useCallback(async (programDayId: string, label: string) => {
    if (!db) return;
    Alert.alert(
      '推迟训练',
      `${label}`,
      [
        { text: '推迟到下一个训练日', onPress: async () => {
          try {
            const r = await rescheduleProgramDayCascade(db, { programDayId, mode: 'next_training_day' });
            showAlert('已顺延', `已顺延 ${r.affectedCount} 个训练日（${r.historyCreatedCount} 条记录）\n${r.firstChanges.map(c => `${c.label}: ${c.from} → ${c.to}`).join('\n')}`);
            setRefreshKey(k => k + 1);
          } catch (e) { showAlert('推迟失败', e instanceof Error ? e.message : 'Unknown error'); }
        }},
        { text: '选择日期', onPress: () => {
          setRescheduleDayId(programDayId);
          setShowReschedulePicker(true);
        }},
        { text: '取消', style: 'cancel', onPress: () => {} },
      ],
    );
  }, [db]);

  const handleDeleteWorkout = useCallback(async (session: WorkoutSession) => {
    if (!db) return;
    confirmAction(
      t('common.deleteWorkout'),
      t('common.deleteWorkoutConfirm', { date: session.date }),
      async () => {
        await deleteWorkoutSession(db, session.id);
        setDayWorkouts((prev) => prev.filter((w) => w.id !== session.id));
        setMonthWorkouts((prev) => prev.filter((w) => w.id !== session.id));
      },
    );
  }, [db]);

  return (
    <>
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { paddingTop: insets.top }]}>
          <Text style={styles.eyebrow}>{t('calendar.trainingHistory')}</Text>
          <Text style={styles.title}>{t('nav.calendar')}</Text>
          <Text style={styles.subtitle}>{t('calendar.reviewCompletedSessions')}</Text>
        </View>

        {/* Month navigation */}
        <Card variant="elevated" style={styles.calendarCard}>
          <View style={styles.monthNav}>
            <Pressable onPress={prevMonth} style={styles.navBtn}>
              <Text style={styles.navBtnText}>‹</Text>
            </Pressable>
            <View style={styles.monthTitleBlock}>
              <Text style={styles.monthKicker}>{t('calendar.monthView')}</Text>
              <Text style={styles.monthTitle}>{formatMonthYear(year, month)}</Text>
            </View>
            <Pressable onPress={nextMonth} style={styles.navBtn}>
              <Text style={styles.navBtnText}>›</Text>
            </Pressable>
          </View>

          {/* Weekday headers */}
          <View style={styles.weekRow}>
            {WEEKDAYS.map((d) => (
              <Text key={d} style={styles.weekday}>{t(`weekdays.${d}`)}</Text>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={styles.grid}>
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <View key={`empty-${i}`} style={styles.dayCell} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const hasWorkout = workoutDates.has(dateStr);
              const hasScheduled = scheduledDates.has(dateStr);
              const isSelected = dateStr === selectedDate;
              const isToday = dateStr === today;
              return (
                <Pressable
                  key={dateStr}
                  testID={`calendar-date-${dateStr}`}
                  style={[
                    styles.dayCell,
                    isRangeMode && (rangeStart === dateStr || rangeEnd === dateStr) && styles.dayCellSelected,
                    isRangeMode && isInRange(dateStr, rangeStart, rangeEnd) && styles.dayCellInRange,
                    !isRangeMode && isToday && styles.dayCellToday,
                    !isRangeMode && isSelected && styles.dayCellSelected,
                  ]}
                  onPress={() => handleDatePress(dateStr)}
                >
                  <Text style={[
                    styles.dayText,
                    isRangeMode && (rangeStart === dateStr || rangeEnd === dateStr) && styles.dayTextSelected,
                    !isRangeMode && isToday && !isSelected && styles.dayTextToday,
                    !isRangeMode && isSelected && styles.dayTextSelected,
                  ]}>{day}</Text>
                  {hasWorkout && (
                    <View style={[
                      styles.dot,
                      (isRangeMode && (rangeStart === dateStr || rangeEnd === dateStr)) && styles.dotSelected,
                      (!isRangeMode && isSelected) && styles.dotSelected,
                    ]} />
                  )}
                  {!hasWorkout && hasScheduled && (
                    <View style={[
                      styles.scheduledDot,
                      (!isRangeMode && isSelected) && styles.dotSelected,
                    ]} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </Card>

        {/* Range mode toggle */}
        <View style={styles.rangeToggleRow}>
          {isRangeMode ? (
            <Button title={t('calendar.cancelRange')} onPress={handleCancelRange} variant="secondary" size="sm" />
          ) : (
            <Button title={t('calendar.selectRange')} onPress={() => setIsRangeMode(true)} variant="secondary" size="sm" />
          )}
        </View>

        {/* Range mode info */}
        {isRangeMode && !rangeComplete && (
          <Card variant="tonal" style={styles.rangeInfoCard}>
            <Text style={styles.rangeHint}>
              {!rangeStart ? t('calendar.rangeStartHint') : t('calendar.rangeEndHint')}
            </Text>
            {rangeStart && (
              <Text style={styles.rangeText}>{rangeStart} → ...</Text>
            )}
          </Card>
        )}

        {/* Range complete: show generate button */}
        {rangeComplete && (
          <View style={{ gap: spacing.sm }}>
            <Card variant="tonal" style={styles.rangeInfoCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rangeText}>
                  {t('calendar.selectedRange', { start: rangeStart, end: rangeEnd })}
                </Text>
              </View>
              <Pressable onPress={handleCancelRange}>
                <Text style={styles.clearRangeText}>{t('calendar.clearRange')}</Text>
              </Pressable>
            </Card>
            <Button
              title={t('calendar.generateReviewForRange', { start: rangeStart, end: rangeEnd })}
              onPress={handleGenerateReview}
              fullWidth
            />
          </View>
        )}

        {/* Selected date detail — hide in range mode */}
        {!isRangeMode && (
          <>
            {/* Debug bar — only in development */}
            {__DEV__ && (
            <Card variant="tonal" style={styles.debugCard}>
              <Text style={styles.debugText}>
                activeProgramId: {activeProgramId ?? 'none'} | scheduledTotal: {scheduledTotal} | forDate: {scheduledDays.length}
              </Text>
            </Card>
            )}

            {/* Scheduled program days — show FIRST */}
            {scheduledDays.length > 0 && (
              <>
                <SectionHeader title="计划训练" subtitle={`${scheduledDays.length} 个计划训练日`} />
                {scheduledDays.map((sd) => (
                  <Card key={sd.id} variant="elevated" testID="scheduled-card" style={styles.workoutCard}>
                    <View style={styles.workoutRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.workoutTime}>{sd.programName}</Text>
                        <Text style={styles.workoutMeta}>
                          Week {sd.weekNumber} Day {sd.dayNumber} · {sd.title}{' '}
                          {sd.exerciseCount > 0 ? `· ${sd.exerciseCount} exercises` : ''}
                        </Text>
                        {sd.mainFocus && <Text style={styles.workoutMeta}>{sd.mainFocus}</Text>}
                        {sd.estimatedDuration && <Text style={styles.workoutMeta}>~{sd.estimatedDuration} min</Text>}
                      </View>
                      <View style={styles.workoutActions}>
                        <Button
                          title="开始"
                          size="sm"
                          variant="primary"
                          testID="scheduled-card-start-btn"
                          onPress={() => void handleStartScheduledWorkout(sd.id)}
                        />
                        <Button
                          title="推迟"
                          size="sm"
                          variant="secondary"
                          testID="scheduled-card-reschedule-btn"
                          onPress={() => void handleReschedule(sd.id, `W${sd.weekNumber}D${sd.dayNumber} ${sd.title}`)}
                        />
                      </View>
                    </View>
                  </Card>
                ))}
              </>
            )}

            {/* Completed workouts */}
            <SectionHeader title={selectedDate === today ? t('common.today') : selectedDate} subtitle={`${dayWorkouts.length} 已完成 · ${scheduledDays.length} 计划`} />
            {dayWorkouts.length > 0 ? (
              dayWorkouts.map((workout) => (
                <Card key={workout.id} variant="outlined" style={styles.workoutCard}>
                  <View style={styles.workoutRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.workoutTime}>
                        {new Date(workout.startedAt).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                      <Text style={styles.workoutMeta}>
                        {workout.durationSeconds ? formatDuration(workout.durationSeconds) : t('common.inProgress')}
                        {workout.totalVolume ? ` · ${Math.round(workout.totalVolume)} kg` : ''}
                        {workout.completionRate != null ? ` · ${Math.round(workout.completionRate * 100)}%` : ''}
                      </Text>
                    </View>
                    <View style={styles.workoutActions}>
                      <Button title={t('common.view')} size="sm" variant="secondary"
                        onPress={() => router.push(`/workout/${workout.id}` as Href)} />
                      <Button title={t('common.delete')} size="sm" variant="secondary"
                        onPress={() => void handleDeleteWorkout(workout)} />
                    </View>
                  </View>
                </Card>
              ))
            ) : scheduledDays.length === 0 ? (
              <Card variant="tonal" style={styles.workoutCard}>
                <Text style={styles.emptyText}>当天无训练安排</Text>
              </Card>
            ) : null}

            <Button
              title={
                scheduledDays.length > 1
                  ? `${t('calendar.selectPlan')} (${scheduledDays.length})`
                  : t('calendar.startWorkoutFor', { date: selectedDate === today ? t('common.today') : selectedDate })
              }
              onPress={() => void handleStartWorkout(selectedDate)}
              disabled={!db}
              fullWidth
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>

    {/* Custom reschedule date picker modal */}
    <Modal visible={showReschedulePicker} animationType="slide" transparent>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>选择推迟日期</Text>
            <Pressable onPress={() => { setShowReschedulePicker(false); setRescheduleDayId(null); setCustomRescheduleDate(''); }}>
              <Text style={styles.cancelText}>取消</Text>
            </Pressable>
          </View>
          <Text style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.sm }}>
            输入目标日期 (YYYY-MM-DD):
          </Text>
          <TextField
            label="目标日期"
            value={customRescheduleDate}
            onChangeText={setCustomRescheduleDate}
            placeholder="2026-07-01"
          />
          <Button
            title="确认推迟"
            onPress={async () => {
              if (!/^\d{4}-\d{2}-\d{2}$/.test(customRescheduleDate)) {
                showAlert('日期格式错误', '请输入 YYYY-MM-DD 格式');
                return;
              }
              if (!db || !rescheduleDayId) return;
              try {
                const r = await rescheduleProgramDayCascade(db, {
                  programDayId: rescheduleDayId,
                  mode: 'custom_date',
                  targetDate: customRescheduleDate,
                });
                showAlert('已推迟', `已推迟到 ${customRescheduleDate}`);
                setRefreshKey(k => k + 1);
                setShowReschedulePicker(false);
                setCustomRescheduleDate('');
                setRescheduleDayId(null);
              } catch (e) {
                showAlert('推迟失败', e instanceof Error ? e.message : 'Unknown error');
              }
            }}
            fullWidth
          />
        </View>
      </SafeAreaView>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.dockBottomInset, gap: spacing.md },
  hero: { paddingTop: spacing.lg, paddingBottom: spacing.sm },
  eyebrow: { ...typography.overline, color: colors.primary, marginBottom: spacing.xs },
  title: { ...typography.largeTitle, color: colors.textPrimary },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs, lineHeight: 22 },
  calendarCard: { gap: spacing.md },
  monthNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  monthTitleBlock: { alignItems: 'center', flex: 1 },
  monthKicker: { ...typography.overline, color: colors.primary, marginBottom: 2 },
  navBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.primarySoft },
  navBtnText: { fontSize: 28, color: colors.primary, fontWeight: '600' },
  monthTitle: { ...typography.title3, color: colors.textPrimary },
  weekRow: { flexDirection: 'row' },
  weekday: { flex: 1, textAlign: 'center', ...typography.caption, color: colors.textSecondary, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full },
  dayCellToday: { backgroundColor: colors.primarySoft },
  dayCellSelected: { backgroundColor: colors.primary },
  dayText: { ...typography.callout, color: colors.textPrimary },
  dayTextToday: { color: colors.primary, fontWeight: '700' },
  dayTextSelected: { color: '#fff', fontWeight: '700' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success, marginTop: 2 },
  dotSelected: { backgroundColor: '#fff' },
  scheduledDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary, marginTop: 2 },
  workoutCard: { marginBottom: spacing.sm, gap: spacing.sm },
  workoutRow: { flexDirection: 'row', alignItems: 'center' },
  workoutTime: { ...typography.headline, color: colors.textPrimary },
  workoutMeta: { ...typography.footnote, color: colors.textSecondary, marginTop: spacing.xs },
  workoutActions: { flexDirection: 'row', gap: spacing.xs },
  emptyText: { ...typography.callout, color: colors.textSecondary, lineHeight: 20 },
  debugCard: { gap: 0, padding: spacing.sm },
  debugText: { ...typography.caption, color: colors.textTertiary, fontFamily: 'monospace' },
  // Range mode styles
  rangeToggleRow: { alignItems: 'flex-start' },
  rangeInfoCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  rangeHint: { ...typography.callout, color: colors.textSecondary },
  rangeText: { ...typography.callout, color: colors.textPrimary, fontWeight: '600' },
  clearRangeText: { ...typography.footnote, color: colors.primary, fontWeight: '600' },
  dayCellInRange: { backgroundColor: colors.primary, opacity: 0.25 },
  // Modal styles
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  modalTitle: { ...typography.title2, color: colors.textPrimary, marginBottom: spacing.md },
  cancelText: { ...typography.body, color: colors.primary },
});
