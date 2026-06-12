import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Button, Card, SectionHeader } from '@/src/components/ui';
import { useDatabase } from '@/src/hooks/useDatabase';
import {
  getBackupMeta,
  getCurrentDbMeta,
  listBackupKeys,
  restoreFromBackup,
} from '@/src/services/backupRecoveryService';
import { formatSnapshotSize } from '@/src/services/snapshotBackupService';
import { colors, radius, spacing, typography } from '@/src/theme';

interface BackupMeta {
  createdAt: string;
  sizeBytes: number;
  hasWorkoutSessions: boolean;
}

export function BackupRecoveryScreen() {
  const { t } = useTranslation();
  const db = useDatabase();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [currentMeta, setCurrentMeta] = useState<{
    sizeBytes: number;
    hasWorkoutSessions: boolean;
  } | null>(null);
  const [backups, setBackups] = useState<{ key: string; meta: BackupMeta }[]>(
    [],
  );
  const [restoringKey, setRestoringKey] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [meta, keys] = await Promise.all([
        getCurrentDbMeta(),
        listBackupKeys(),
      ]);
      setCurrentMeta(meta);

      const entries: { key: string; meta: BackupMeta }[] = [];
      for (const key of keys) {
        const backupMeta = await getBackupMeta(key);
        if (backupMeta) {
          entries.push({ key, meta: backupMeta });
        }
      }
      setBackups(entries);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load backup data.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRestore = useCallback(
    async (backupKey: string) => {
      const doRestore = async () => {
        setRestoringKey(backupKey);
        setError(null);
        setMessage(null);
        try {
          const result = await restoreFromBackup(backupKey);
          setMessage(
            `Backup restored (ID: ${result.preRestoreBackupId}). Reload the app to see your data.`,
          );
          await loadData();
        } catch (err) {
          setError(
            err instanceof Error ? err.message : 'Failed to restore backup.',
          );
        } finally {
          setRestoringKey(null);
        }
      };

      if (
        Platform.OS === 'web' &&
        typeof window !== 'undefined' &&
        typeof window.confirm === 'function'
      ) {
        const confirmed = window.confirm(
          'This will replace your current data with the selected backup. Are you sure?',
        );
        if (!confirmed) return;
        await doRestore();
        return;
      }

      Alert.alert(
        'Restore Backup',
        'This will replace your current data with the selected backup. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Restore',
            style: 'destructive',
            onPress: doRestore,
          },
        ],
      );
    },
    [loadData],
  );

  const formatDate = (iso: string): string => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  const renderBackupItem = ({
    item,
  }: {
    item: { key: string; meta: BackupMeta };
  }) => {
    const { key, meta } = item;
    const isRestoring = restoringKey === key;

    return (
      <Card variant="tonal" style={styles.backupCard}>
        <View style={styles.backupRow}>
          <View style={styles.backupInfo}>
            <Text style={styles.backupDate}>{formatDate(meta.createdAt)}</Text>
            <Text style={styles.backupSize}>
              {formatSnapshotSize(meta.sizeBytes)}
            </Text>
            <View style={styles.recordBadge}>
              <Text
                style={[
                  styles.recordBadgeText,
                  meta.hasWorkoutSessions
                    ? styles.recordBadgeHas
                    : styles.recordBadgeEmpty,
                ]}
              >
                {meta.hasWorkoutSessions ? 'Has records' : 'Empty'}
              </Text>
            </View>
          </View>
          <Button
            title="Restore"
            onPress={() => handleRestore(key)}
            variant="danger"
            size="sm"
            loading={isRestoring}
            disabled={restoringKey !== null}
          />
        </View>
      </Card>
    );
  };

  if (!db) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Data Management</Text>
          <Text style={styles.title}>Local Backup Recovery</Text>
          <Text style={styles.subtitle}>
            View and restore saved database snapshots directly from the app
            without DevTools.
          </Text>
        </View>

        <SectionHeader
          title="Current Database"
          subtitle="The active database on this device."
        />
          <Card variant="outlined" style={styles.card}>
          {loading && !currentMeta ? (
            <ActivityIndicator color={colors.primary} />
          ) : currentMeta ? (
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Size</Text>
                <Text style={styles.metaValue}>
                  {formatSnapshotSize(currentMeta.sizeBytes)}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Records</Text>
                <Text
                  style={[
                    styles.metaValue,
                    currentMeta.hasWorkoutSessions
                      ? styles.metaSuccess
                      : styles.metaDanger,
                  ]}
                >
                  {currentMeta.hasWorkoutSessions ? '✓ Has data' : '✗ Empty'}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.emptyText}>No database found.</Text>
          )}
        </Card>

        <SectionHeader
          title="Saved Backups"
          subtitle="Local snapshots created automatically before cloud restore or file import."
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : backups.length === 0 ? (
        <Card variant="elevated" style={styles.card}>
            <Text style={styles.emptyText}>
              No local backups found. Backups are created automatically before
              cloud restore or file import.
            </Text>
          </Card>
        ) : (
          backups.map((item) => (
            <View key={item.key}>{renderBackupItem({ item })}</View>
          ))
        )}

        {message ? <Text style={styles.successText}>{message}</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonWrapper}>
          <Button
            title="Refresh"
            onPress={loadData}
            variant="secondary"
            size="md"
            loading={loading}
            fullWidth
          />
        </View>
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
    paddingBottom: spacing.dockBottomInset,
    gap: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xxl,
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
  card: {
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  metaItem: {
    gap: spacing.xs,
  },
  metaLabel: {
    ...typography.overline,
    color: colors.textTertiary,
  },
  metaValue: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  metaSuccess: {
    color: colors.success,
  },
  metaDanger: {
    color: colors.danger,
  },
  backupCard: {
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  backupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  backupInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  backupDate: {
    ...typography.subhead,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  backupSize: {
    ...typography.footnote,
    color: colors.textSecondary,
  },
  recordBadge: {
    alignSelf: 'flex-start',
  },
  recordBadgeText: {
    ...typography.caption,
    fontWeight: '700',
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    overflow: 'hidden',
  },
  recordBadgeHas: {
    color: colors.success,
    backgroundColor: colors.successSoft,
  },
  recordBadgeEmpty: {
    color: colors.textTertiary,
    backgroundColor: colors.surfaceMuted,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  successText: {
    ...typography.footnote,
    color: colors.success,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  errorText: {
    ...typography.footnote,
    color: colors.danger,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  buttonWrapper: {
    marginTop: spacing.md,
  },
});
