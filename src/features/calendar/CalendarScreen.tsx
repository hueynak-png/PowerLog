import { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type Href, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, SectionHeader } from '@/src/components/ui';
import type { WorkoutSession } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { deleteWorkoutSession, getWorkoutsByDate, getWorkoutsByMonth } from '@/src/repositories';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
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
    Alert.alert(
      'Delete Workout',
      `Delete workout from ${session.date}? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive',
          onPress: async () => {
            await deleteWorkoutSession(db, session.id);
            setDayWorkouts((prev) => prev.filter((w) => w.id !== session.id));
            setMonthWorkouts((prev) => prev.filter((w) => w.id !== session.id));
          },
        },
      ],
    );
  }, [db]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month navigation */}
        <View style={styles.monthNav}>
          <Pressable onPress={prevMonth} style={styles.navBtn}>
            <Text style={styles.navBtnText}>‹</Text>
          </Pressable>
          <Text style={styles.monthTitle}>{formatMonthYear(year, month)}</Text>
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
                style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                onPress={() => setSelectedDate(dateStr)}
              >
                <Text style={[
                  styles.dayText,
                  isToday && styles.dayTextToday,
                  isSelected && styles.dayTextSelected,
                ]}>{day}</Text>
                {hasWorkout && <View style={styles.dot} />}
              </Pressable>
            );
          })}
        </View>

        {/* Selected date detail */}
        <SectionHeader title={selectedDate === today ? 'Today' : selectedDate} />
        {dayWorkouts.length > 0 ? (
          dayWorkouts.map((workout) => (
            <Card key={workout.id} style={styles.workoutCard}>
              <View style={styles.workoutRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.workoutTime}>
                    {new Date(workout.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <Text style={styles.workoutMeta}>
                    {workout.durationSeconds ? formatDuration(workout.durationSeconds) : 'In progress'}
                    {workout.totalVolume ? ` · ${Math.round(workout.totalVolume)} kg` : ''}
                    {workout.completionRate != null ? ` · ${Math.round(workout.completionRate * 100)}%` : ''}
                  </Text>
                </View>
                <View style={styles.workoutActions}>
                  <Button title="View" size="sm" variant="secondary"
                    onPress={() => router.push(`/workout/${workout.id}` as Href)} />
                  <Button title="Delete" size="sm" variant="secondary"
                    onPress={() => void handleDeleteWorkout(workout)} />
                </View>
              </View>
            </Card>
          ))
        ) : (
          <Card style={styles.workoutCard}>
            <Text style={styles.emptyText}>No workout on this day</Text>
          </Card>
        )}

        <Button
          title={`Start Workout for ${selectedDate === today ? 'Today' : selectedDate}`}
          onPress={() => void handleStartWorkout(selectedDate)}
          disabled={!db}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  monthNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  navBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  navBtnText: { fontSize: 28, color: colors.primary, fontWeight: '600' },
  monthTitle: { ...typography.title3, color: colors.textPrimary },
  weekRow: { flexDirection: 'row', marginBottom: spacing.xs },
  weekday: { flex: 1, textAlign: 'center', ...typography.caption, color: colors.textSecondary, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.lg },
  dayCell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  dayCellSelected: { backgroundColor: colors.primary, borderRadius: radius.full },
  dayText: { ...typography.callout, color: colors.textPrimary },
  dayTextToday: { color: colors.primary, fontWeight: '700' },
  dayTextSelected: { color: '#fff', fontWeight: '700' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success, marginTop: 2 },
  workoutCard: { marginBottom: spacing.sm },
  workoutRow: { flexDirection: 'row', alignItems: 'center' },
  workoutTime: { ...typography.headline, color: colors.textPrimary },
  workoutMeta: { ...typography.footnote, color: colors.textSecondary, marginTop: spacing.xs },
  workoutActions: { flexDirection: 'row', gap: spacing.xs },
  emptyText: { ...typography.callout, color: colors.textSecondary },
});
