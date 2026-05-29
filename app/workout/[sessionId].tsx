import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { WorkoutDetailScreen } from '@/src/features/workout/WorkoutDetailScreen';
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
  const startTimerFrom = useTimerStore((state) => state.startFrom);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

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
          startTimerFrom(loaded.startedAt);
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
  }, [db, loadWorkout, sessionId, startTimerFrom]);

  if (isLoading || !db) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.loadingText}>{t('route.loadingWorkout')}</Text>
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.loadingText}>{t('route.workoutNotFound')}</Text>
      </SafeAreaView>
    );
  }

  if (!isActive) {
    return <WorkoutDetailScreen />;
  }

  return <WorkoutRecordingScreen />;
}

const styles = StyleSheet.create({
  centered: { alignItems: 'center', backgroundColor: colors.background, flex: 1, justifyContent: 'center', padding: spacing.lg },
  loadingText: { ...typography.callout, color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' },
});
