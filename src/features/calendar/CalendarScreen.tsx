import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type Href, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, SectionHeader } from '@/src/components/ui';
import type { WorkoutSession } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { confirmAction } from '@/src/lib/alert';
import { deleteWorkoutSession, getWorkoutsByDate, getWorkoutsByMonth } from '@/src/repositories';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { useTranslation } from 'react-i18next';

import { colors, spacing, typography } from '@/src/theme';
import { radius } from '@/src/theme/radius';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getToday = () => new Date().toISOString().slice(0, 10);

const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month, 0).getDate();

/** Monday = 0, Sunday = 6 */
const getFirstDayOffset = (year: number, month: number): number => {
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

const formatMonthYear = (year: number, month: number): string =>
  new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long' }).format(new Date(year, month - 1));

const formatDuration = (seconds: number): string => {
  const m = Math.round(seconds / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
};

export function CalendarScreen() {
  const db = useDatabase();
  const router = useRouter();
  const startWorkout = useActiveWorkoutStore((state) => state.startWorkout);
  const { t } = useTranslation();

  const today = getToday();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [monthWorkouts, setMonthWorkouts] = useState<WorkoutSession[]>([]);
  const [dayWorkouts, setDayWorkouts] = useState<WorkoutSession[]>([]);

  // Load workouts for current month
  useEffect(() => {
    if (!db) return;
    getWorkoutsByMonth(db, year, month).then(setMonthWorkouts);
  }, [db, year, month]);

  // Load workouts for selected date
  useEffect(() => {
    if (!db || !selectedDate) return;
    getWorkoutsByDate(db, selectedDate).then(setDayWorkouts);
  }, [db, selectedDate, monthWorkouts]);

  const workoutDates = new Set(monthWorkouts.map((w) => w.date));
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

  const handleStartWorkout = useCallback(async (date: string) => {
    if (!db) return;
    await startWorkout(db, date);
    const sessionId = useActiveWorkoutStore.getState().session?.id;
    if (sessionId) router.push(`/workout/${sessionId}` as Href);
  }, [db, router, startWorkout]);

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
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
              <Text key={d} style={styles.weekday}>{d}</Text>
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
              const isSelected = dateStr === selectedDate;
              const isToday = dateStr === today;
              return (
                <Pressable
                  key={dateStr}
                  style={[styles.dayCell, isToday && styles.dayCellToday, isSelected && styles.dayCellSelected]}
                  onPress={() => setSelectedDate(dateStr)}
                >
                  <Text style={[
                    styles.dayText,
                    isToday && styles.dayTextToday,
                    isSelected && styles.dayTextSelected,
                  ]}>{day}</Text>
                  {hasWorkout && <View style={[styles.dot, isSelected && styles.dotSelected]} />}
                </Pressable>
              );
            })}
          </View>
        </Card>

        {/* Selected date detail */}
        <SectionHeader title={selectedDate === today ? t('common.today') : selectedDate} subtitle={`${dayWorkouts.length} ${dayWorkouts.length === 1 ? t('common.session') : t('common.sessions')} ${t('common.logged')}`} />
        {dayWorkouts.length > 0 ? (
          dayWorkouts.map((workout) => (
            <Card key={workout.id} variant="outlined" style={styles.workoutCard}>
              <View style={styles.workoutRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.workoutTime}>
                    {new Date(workout.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
        ) : (
          <Card variant="tonal" style={styles.workoutCard}>
            <Text style={styles.emptyText}>{t('common.noWorkoutThisDay')}</Text>
          </Card>
        )}

        <Button
          title={t('calendar.startWorkoutFor', { date: selectedDate === today ? t('common.today') : selectedDate })}
          onPress={() => void handleStartWorkout(selectedDate)}
          disabled={!db}
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.dockBottomInset, gap: spacing.md },
  hero: { paddingTop: spacing.xxl, paddingBottom: spacing.sm },
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
  workoutCard: { marginBottom: spacing.sm, gap: spacing.sm },
  workoutRow: { flexDirection: 'row', alignItems: 'center' },
  workoutTime: { ...typography.headline, color: colors.textPrimary },
  workoutMeta: { ...typography.footnote, color: colors.textSecondary, marginTop: spacing.xs },
  workoutActions: { flexDirection: 'row', gap: spacing.xs },
  emptyText: { ...typography.callout, color: colors.textSecondary, lineHeight: 20 },
});
