import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { WorkoutRecordingScreen } from '@/src/features/workout/WorkoutRecordingScreen';
import { useDatabase } from '@/src/hooks/useDatabase';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { useTimerStore } from '@/src/stores/useTimerStore';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export default function WorkoutSessionScreen() {
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const db = useDatabase();
  const loadWorkout = useActiveWorkoutStore((state) => state.loadWorkout);
  const session = useActiveWorkoutStore((state) => state.session);
  const isActive = useActiveWorkoutStore((state) => state.isActive);
  const startTimer = useTimerStore((state) => state.start);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db || !sessionId) {
      return;
    }

    let mounted = true;
    setIsLoading(true);
    loadWorkout(db, sessionId)
      .then(() => {
        const loaded = useActiveWorkoutStore.getState().session;
        if (loaded && !loaded.endedAt) {
          startTimer();
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
  }, [db, loadWorkout, sessionId, startTimer]);

  if (isLoading || !db) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.loadingText}>Loading workout…</Text>
      </SafeAreaView>
    );
  }

  if (!session || !isActive) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.loadingText}>Workout not found or already completed.</Text>
      </SafeAreaView>
    );
  }

  return <WorkoutRecordingScreen />;
}

const styles = StyleSheet.create({
  centered: { alignItems: 'center', backgroundColor: colors.background, flex: 1, justifyContent: 'center', padding: spacing.lg },
  loadingText: { ...typography.callout, color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' },
});
