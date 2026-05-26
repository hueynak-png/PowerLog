import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { type Href, useRouter } from 'expo-router';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import type { WorkoutSession } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { deleteWorkoutSession, getRecentWorkouts } from '@/src/repositories/workoutRepository';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { colors } from '@/src/theme/colors';
import { radius } from '@/src/theme/radius';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const formatDate = (date: string): string =>
  new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));

export function WorkoutStartScreen() {
  const db = useDatabase();
  const router = useRouter();
  const startWorkout = useActiveWorkoutStore((state) => state.startWorkout);
  const activeSession = useActiveWorkoutStore((state) => state.session);
  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [customDate, setCustomDate] = useState('');

  useEffect(() => {
    if (!db) {
      return;
    }

    let mounted = true;
    setIsLoading(true);
    getRecentWorkouts(db, 3)
      .then((workouts) => {
        if (mounted) {
          setRecentWorkouts(workouts);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [db]);

  const handleStartWorkout = useCallback(async (date?: string) => {
    if (!db) {
      return;
    }

    setIsStarting(true);
    try {
      await startWorkout(db, date);
      const sessionId = useActiveWorkoutStore.getState().session?.id ?? activeSession?.id;
      if (sessionId) {
        router.push(`/workout/${sessionId}` as Href);
      }
    } finally {
      setIsStarting(false);
    }
  }, [activeSession?.id, db, router, startWorkout]);

  const handleStartPastWorkout = () => {
    if (!customDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert('Invalid date', 'Please use YYYY-MM-DD format (e.g. 2024-12-25)');
      return;
    }
    void handleStartWorkout(customDate);
  };

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
            setRecentWorkouts((prev) => prev.filter((w) => w.id !== session.id));
          },
        },
      ],
    );
  }, [db]);

  const lastWorkout = recentWorkouts[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>PowerLog</Text>
          <Text style={styles.title}>Record today’s work.</Text>
          <Text style={styles.subtitle}>Fast offline logging with sets, RPE, and instant post-session feedback.</Text>
        </View>

        <Card style={styles.startCard}>
          <Text style={styles.cardTitle}>Workout deck</Text>
          {isLoading ? (
            <ActivityIndicator color={colors.primary} style={styles.loader} />
          ) : lastWorkout ? (
            <Text style={styles.lastWorkout}>Last workout: {formatDate(lastWorkout.date)}</Text>
          ) : (
            <Text style={styles.lastWorkout}>No workouts recorded yet.</Text>
          )}
          <Button title="Start Today's Workout" onPress={() => void handleStartWorkout()} loading={isStarting} disabled={!db} />
        </Card>

        <Card style={styles.startCard}>
          <Text style={styles.cardTitle}>Log a past workout</Text>
          <TextInput
            style={styles.dateInput}
            value={customDate}
            onChangeText={setCustomDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textTertiary}
            accessibilityLabel="Past workout date"
          />
          <Button title="Start Past Workout" onPress={handleStartPastWorkout} variant="secondary" disabled={!db || !customDate} />
        </Card>

        {recentWorkouts.length > 1 && (
          <View>
            <SectionHeader title="Recent" />
            {recentWorkouts.slice(1).map((workout) => (
              <Card key={workout.id} variant="outlined" style={styles.recentCard}>
                <View style={styles.recentRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recentDate}>{formatDate(workout.date)}</Text>
                    <Text style={styles.recentMeta}>{Math.round((workout.completionRate ?? 0) * 100)}% complete · {Math.round(workout.totalVolume ?? 0)} kg</Text>
                  </View>
                  <Button title="Delete" size="sm" variant="secondary" onPress={() => void handleDeleteWorkout(workout)} />
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg },
  hero: { paddingTop: spacing.xxl, paddingBottom: spacing.md },
  eyebrow: { ...typography.footnote, color: colors.primary, fontWeight: '700', textTransform: 'uppercase' },
  title: { ...typography.largeTitle, color: colors.textPrimary, marginTop: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 22 },
  startCard: { gap: spacing.md, borderRadius: radius.lg },
  cardTitle: { ...typography.title3, color: colors.textPrimary },
  lastWorkout: { ...typography.callout, color: colors.textSecondary },
  loader: { alignSelf: 'flex-start' },
  recentCard: { marginBottom: spacing.sm },
  recentRow: { flexDirection: 'row', alignItems: 'center' },
  recentDate: { ...typography.headline, color: colors.textPrimary },
  recentMeta: { ...typography.footnote, color: colors.textSecondary, marginTop: spacing.xs },
  dateInput: {
    ...typography.body, color: colors.textPrimary, backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.sm, padding: spacing.md, borderWidth: 1, borderColor: colors.borderLight,
  },
});
