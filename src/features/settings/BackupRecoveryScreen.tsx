import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, SectionHeader } from '@/src/components/ui';
import { useDatabase } from '@/src/hooks/useDatabase';
import {
  getBackupMeta,
  getCurrentDbMeta,
  listBackupKeys,
  restoreFromBackup,
  type DatabaseSnapshotMeta,
} from '@/src/services/backupRecoveryService';
import { formatSnapshotSize } from '@/src/services/snapshotBackupService';
import { colors, spacing, typography } from '@/src/theme';

type BackupMeta = DatabaseSnapshotMeta & { createdAt: string };

export function BackupRecoveryScreen() {
  const { t } = useTranslation();
  const db = useDatabase();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [currentMeta, setCurrentMeta] = useState<DatabaseSnapshotMeta | null>(
    null,
  );
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
        err instanceof Error ? err.message : '加载备份数据失败。',
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
            `备份已恢复（ID：${result.preRestoreBackupId}）。请重新加载应用以查看恢复的数据。`,
          );
          await loadData();
        } catch (err) {
          setError(
            err instanceof Error ? err.message : '恢复备份失败。',
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
          '这会用所选备份替换当前数据，确定继续吗？',
        );
        if (!confirmed) return;
        await doRestore();
        return;
      }

      Alert.alert(
        '恢复备份',
        '这会用所选备份替换当前数据，确定继续吗？',
        [
          { text: '取消', style: 'cancel' },
          {
            text: '恢复',
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
            <Text style={styles.backupDetail}>计划：{meta.programCount}</Text>
            <Text style={styles.backupDetail}>训练记录：{meta.workoutSessionCount}</Text>
            {meta.programCount === 0 && meta.workoutSessionCount === 0 ? (
              <Text style={styles.emptyNotice}>暂无计划和训练记录</Text>
            ) : null}
          </View>
          <Button
            title="恢复"
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
      <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { paddingTop: insets.top }]}>
          <Text style={styles.eyebrow}>数据管理</Text>
          <Text style={styles.title}>本地备份恢复</Text>
          <Text style={styles.subtitle}>
            直接在应用内查看和恢复保存的数据库快照，无需使用开发者工具。
          </Text>
        </View>

        <SectionHeader
          title="当前数据库"
          subtitle="此设备上正在使用的数据库。"
        />
        <Card variant="outlined" style={styles.card}>
          {loading && !currentMeta ? (
            <ActivityIndicator color={colors.primary} />
          ) : currentMeta ? (
            <View style={styles.metaContent}>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>数据库大小</Text>
                  <Text style={styles.metaValue}>
                    {formatSnapshotSize(currentMeta.sizeBytes)}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>计划</Text>
                  <Text style={styles.metaValue}>
                    {currentMeta.programCount}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>训练记录</Text>
                  <Text style={styles.metaValue}>
                    {currentMeta.workoutSessionCount}
                  </Text>
                </View>
              </View>
              {currentMeta.programCount === 0 &&
              currentMeta.workoutSessionCount === 0 ? (
                <Text style={styles.emptyNotice}>暂无计划和训练记录</Text>
              ) : null}
            </View>
          ) : (
            <Text style={styles.emptyText}>未找到本地数据库。</Text>
          )}
        </Card>

        <SectionHeader
          title="已保存的本地备份"
          subtitle="在云端恢复或文件导入前自动创建的本地快照。"
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : backups.length === 0 ? (
          <Card variant="elevated" style={styles.card}>
            <Text style={styles.emptyText}>
              未找到本地备份。云端恢复或文件导入前会自动创建备份。
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
            title="刷新"
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
  metaContent: {
    gap: spacing.sm,
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
  backupDetail: {
    ...typography.footnote,
    color: colors.textSecondary,
  },
  emptyNotice: {
    ...typography.footnote,
    color: colors.textTertiary,
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
