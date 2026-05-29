import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { type Href, useRouter } from 'expo-router';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import type { WorkoutSession } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { confirmAction, showAlert } from '@/src/lib/alert';
import { deleteWorkoutSession, getRecentWorkouts } from '@/src/repositories/workoutRepository';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { getPersistedActiveSession } from '@/src/stores/useActiveWorkoutStore';
import { colors } from '@/src/theme/colors';
import { radius } from '@/src/theme/radius';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const formatDate = (date: string): string =>
  new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));

export function WorkoutStartScreen() {
  const { t } = useTranslation();
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
      showAlert(t('common.invalidDate'), t('common.invalidDateFormat'));
      return;
    }
    void handleStartWorkout(customDate);
  };

  const handleDeleteWorkout = useCallback(async (session: WorkoutSession) => {
    if (!db) return;
    confirmAction(
      t('common.deleteWorkout'),
      t('common.deleteWorkoutConfirm', { date: session.date }),
      async () => {
        await deleteWorkoutSession(db, session.id);
        setRecentWorkouts((prev) => prev.filter((w) => w.id !== session.id));
      },
    );
  }, [db]);

  const lastWorkout = recentWorkouts[0];
  const persistedSessionId = getPersistedActiveSession();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{t('workout.trainingDeck')}</Text>
          <Text style={styles.title}>{t('workout.readyToLift')}</Text>
          <Text style={styles.subtitle}>{t('workout.startFastResumeClean')}</Text>
        </View>

        {persistedSessionId && (
          <Card variant="coach" style={styles.resumeCard}>
            <View style={styles.cardTopRow}>
              <View style={styles.liveDot} />
              <Text style={styles.resumeEyebrow}>{t('workout.sessionInProgress')}</Text>
            </View>
            <Text style={styles.cardTitle}>{t('workout.pickUpWhereLeftOff')}</Text>
            <Text style={styles.lastWorkout}>{t('workout.unfinishedWorkout')}</Text>
            <Button title={t('workout.resumeWorkout')} onPress={() => router.push(`/workout/${persistedSessionId}` as Href)} fullWidth />
          </Card>
        )}

        <Card variant="elevated" style={styles.startCard}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardKicker}>{t('common.today')}</Text>
            <Text style={styles.statusPill}>{t('common.offlineReady')}</Text>
          </View>
          <Text style={styles.cardTitle}>{t('home.startTodaysWorkout')}</Text>
          {isLoading ? (
            <ActivityIndicator color={colors.primary} style={styles.loader} />
          ) : lastWorkout ? (
            <Text style={styles.lastWorkout}>{t('home.lastLoggedSession', { date: formatDate(lastWorkout.date) })}</Text>
          ) : (
            <Text style={styles.lastWorkout}>{t('home.noWorkoutsRecorded')}</Text>
          )}
          <Button title={t('workout.startTodaysWorkout')} onPress={() => void handleStartWorkout()} loading={isStarting} disabled={!db} fullWidth />
        </Card>

        <Card variant="tonal" style={styles.startCard}>
          <Text style={styles.cardTitle}>{t('workout.logPastWorkout')}</Text>
          <Text style={styles.lastWorkout}>{t('workout.backfillTraining')}</Text>
          <TextInput
            style={styles.dateInput}
            value={customDate}
            onChangeText={setCustomDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.textTertiary}
            accessibilityLabel={t('workout.pastWorkoutDate')}
          />
          <Button title={t('workout.startPastWorkout')} onPress={handleStartPastWorkout} variant="secondary" disabled={!db || !customDate} />
        </Card>

        {recentWorkouts.length > 1 && (
          <View>
            <SectionHeader title={t('workout.recent')} subtitle={t('workout.completedSessions')} />
            {recentWorkouts.slice(1).map((workout) => (
              <Card key={workout.id} variant="outlined" style={styles.recentCard}>
                <View style={styles.recentRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recentDate}>{formatDate(workout.date)}</Text>
                    <Text style={styles.recentMeta}>{Math.round((workout.completionRate ?? 0) * 100)}% complete · {Math.round(workout.totalVolume ?? 0).toLocaleString()} kg</Text>
                  </View>
                  <Button title={t('common.delete')} size="sm" variant="secondary" onPress={() => void handleDeleteWorkout(workout)} />
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
  content: { padding: spacing.lg, paddingBottom: spacing.dockBottomInset, gap: spacing.lg },
  hero: { paddingTop: spacing.xxl, paddingBottom: spacing.sm },
  eyebrow: { ...typography.overline, color: colors.primary },
  title: { ...typography.largeTitle, color: colors.textPrimary, marginTop: spacing.sm, maxWidth: 320 },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 22 },
  startCard: { gap: spacing.md, borderRadius: radius.xl },
  resumeCard: { gap: spacing.md, borderRadius: radius.xl },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  cardKicker: { ...typography.overline, color: colors.primary },
  statusPill: { ...typography.caption, color: colors.recovery, fontWeight: '800', backgroundColor: colors.successSoft, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, overflow: 'hidden' },
  resumeEyebrow: { ...typography.overline, color: colors.coach },
  liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.success, marginRight: spacing.xs },
  cardTitle: { ...typography.title3, color: colors.textPrimary },
  lastWorkout: { ...typography.callout, color: colors.textSecondary },
  loader: { alignSelf: 'flex-start' },
  recentCard: { marginBottom: spacing.sm },
  recentRow: { flexDirection: 'row', alignItems: 'center' },
  recentDate: { ...typography.headline, color: colors.textPrimary },
  recentMeta: { ...typography.footnote, color: colors.textSecondary, marginTop: spacing.xs },
  dateInput: {
    ...typography.body, color: colors.textPrimary, backgroundColor: colors.surface,
    borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.borderLight,
  },
});
