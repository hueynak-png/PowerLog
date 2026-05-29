import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { WorkoutSummaryScreen as WorkoutSummaryFeatureScreen } from '@/src/features/workout/WorkoutSummaryScreen';
import { useDatabase } from '@/src/hooks/useDatabase';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export default function WorkoutSummaryScreen() {
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const db = useDatabase();
  const loadWorkout = useActiveWorkoutStore((state) => state.loadWorkout);
  const session = useActiveWorkoutStore((state) => state.session);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (!db || !sessionId) {
      return;
    }

    let mounted = true;
    setIsLoading(true);
    loadWorkout(db, sessionId).finally(() => {
      if (mounted) {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [db, loadWorkout, sessionId]);

  if (isLoading || !db) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.loadingText}>{t('route.loadingSummary')}</Text>
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.loadingText}>{t('route.summaryNotFound')}</Text>
      </SafeAreaView>
    );
  }

  return <WorkoutSummaryFeatureScreen />;
}

const styles = StyleSheet.create({
  centered: { alignItems: 'center', backgroundColor: colors.background, flex: 1, justifyContent: 'center', padding: spacing.lg },
  loadingText: { ...typography.callout, color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' },
});
