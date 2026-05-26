import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, SectionHeader } from '@/src/components/ui';
import type { WorkoutSession } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { getRecentWorkouts } from '@/src/repositories';
import { colors, spacing, typography } from '@/src/theme';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(date));

export function CalendarScreen() {
  const db = useDatabase();
  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    const loadWorkouts = async () => {
      setIsLoading(true);
      setRecentWorkouts(await getRecentWorkouts(db, 10));
      setIsLoading(false);
    };

    void loadWorkouts();
  }, [db]);

  if (!db || isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Loading calendar…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Training Calendar" />
        <Card style={styles.card}>
          <Text style={styles.cardText}>Calendar view coming in Phase 2</Text>
        </Card>

        <SectionHeader title="Recent Workout Dates" />
        <Card style={styles.card}>
          {recentWorkouts.length > 0 ? (
            recentWorkouts.map((workout) => (
              <View key={workout.id} style={styles.listItem}>
                <Text style={styles.dateText}>{formatDate(workout.date)}</Text>
                <Text style={styles.metaText}>{workout.durationSeconds ? `${Math.round(workout.durationSeconds / 60)} min` : 'Duration pending'}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No workouts yet</Text>
          )}
        </Card>
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
  card: {
    marginBottom: spacing.lg,
  },
  cardText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  listItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  dateText: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  metaText: {
    ...typography.subhead,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
