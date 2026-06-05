import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type Href, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, NumberField, SectionHeader, TextField } from '@/src/components/ui';
import type { BodyweightEntry, LiftType } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { addBodyweightEntry, getLatestBodyweight, updateBodyweightEntry } from '@/src/repositories';
import { configureAI, getAIConfig, isAIConfigured } from '@/src/services/aiService';
import {
  configureSync,
  createRecoveryKey,
  downloadLatestSnapshot,
  getLatestSnapshotMeta,
  getLocalSyncStatus,
  getSyncConfig,
  isSyncConfigured,
  markSnapshotRestored,
  type RemoteSnapshotMeta,
  uploadSnapshot,
} from '@/src/services/syncService';
import { createPreRestoreBackup, replaceLocalSnapshot, sha256Hex } from '@/src/db/snapshot';
import { exportBackupFile, importBackupFile } from '@/src/services/localBackupFileService';
import { createSnapshotUploadPayload, formatSnapshotSize } from '@/src/services/snapshotBackupService';
import { getAppVersion, releaseNotes } from '@/src/services/versionService';
import { hasPwaUpdateAvailable, reloadForPwaUpdate, subscribeToPwaUpdates } from '@/src/services/pwaUpdateService';
import { useSettingsStore } from '@/src/stores/useSettingsStore';
import { colors, radius, spacing, typography } from '@/src/theme';

export function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const db = useDatabase();
  const profile = useSettingsStore((state) => state.profile);
  const getMaxForLift = useSettingsStore((state) => state.getMaxForLift);
  const updateMax = useSettingsStore((state) => state.updateMax);
  const updateProfile = useSettingsStore((state) => state.updateProfile);

  const [squat, setSquat] = useState<number | null>(null);
  const [bench, setBench] = useState<number | null>(null);
  const [deadlift, setDeadlift] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(60);
  const [isSaving, setIsSaving] = useState(false);
  const [latestBodyweight, setLatestBodyweight] = useState<BodyweightEntry | null>(null);
  const [bodyweightValue, setBodyweightValue] = useState<number | null>(null);
  const [isSavingBodyweight, setIsSavingBodyweight] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(profile?.lastSettingsSavedAt ?? null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // AI configuration
  const savedAIConfig = getAIConfig();
  const [aiBaseUrl, setAiBaseUrl] = useState(savedAIConfig.baseUrl);
  const [aiAuthToken, setAiAuthToken] = useState(savedAIConfig.authToken);
  const [aiConfigured, setAiConfigured] = useState(isAIConfigured());
  const [aiExpanded, setAiExpanded] = useState(!isAIConfigured());

  const savedSyncConfig = getSyncConfig();
  const [syncBaseUrl, setSyncBaseUrl] = useState(savedSyncConfig.baseUrl || savedAIConfig.baseUrl);
  const [syncRecoveryKey, setSyncRecoveryKey] = useState(savedSyncConfig.recoveryKey);
  const [syncConfigured, setSyncConfigured] = useState(isSyncConfigured());
  const [syncExpanded, setSyncExpanded] = useState(!isSyncConfigured());
  const [syncBusy, setSyncBusy] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [remoteSnapshot, setRemoteSnapshot] = useState<RemoteSnapshotMeta | null>(null);
  const [syncStatusMeta, setSyncStatusMeta] = useState(getLocalSyncStatus());
  const [backupBusy, setBackupBusy] = useState(false);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);
  const [backupError, setBackupError] = useState<string | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(hasPwaUpdateAvailable());
  const [releaseNotesExpanded, setReleaseNotesExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSquat(getMaxForLift('squat')?.oneRm ?? null);
    setBench(getMaxForLift('bench')?.oneRm ?? null);
    setDeadlift(getMaxForLift('deadlift')?.oneRm ?? null);
    setDuration(profile?.defaultSessionDuration ?? 60);
    setLastSavedAt(profile?.lastSettingsSavedAt ?? null);
  }, [getMaxForLift, profile?.defaultSessionDuration, profile?.lastSettingsSavedAt]);

  useEffect(() => {
    if (!db) return;

    let mounted = true;
    getLatestBodyweight(db).then((entry) => {
      if (!mounted) return;
      setLatestBodyweight(entry);
      setBodyweightValue(entry?.bodyweight ?? null);
    });

    return () => {
      mounted = false;
    };
  }, [db]);

  useEffect(() => subscribeToPwaUpdates(() => setUpdateAvailable(true)), []);

  const saveLiftMax = async (liftType: LiftType, value: number | null) => {
    if (!db || value === null) return;
    await updateMax(db, liftType, value);
  };

  const handleSaveBodyweight = async () => {
    if (!db || bodyweightValue === null) return;

    setIsSavingBodyweight(true);
    try {
      const today = new Date().toISOString();
      if (latestBodyweight) {
        await updateBodyweightEntry(db, latestBodyweight.id, { bodyweight: bodyweightValue, date: today });
      } else {
        await addBodyweightEntry(db, { bodyweight: bodyweightValue, date: today });
      }
      const entry = await getLatestBodyweight(db);
      setLatestBodyweight(entry);
      setBodyweightValue(entry?.bodyweight ?? null);
    } finally {
      setIsSavingBodyweight(false);
    }
  };

  const handleSave = async () => {
    if (!db) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const savedAt = new Date().toISOString();
      await Promise.all([
        saveLiftMax('squat', squat),
        saveLiftMax('bench', bench),
        saveLiftMax('deadlift', deadlift),
        updateProfile(db, {
          ...(duration !== null ? { defaultSessionDuration: duration } : {}),
          lastSettingsSavedAt: savedAt,
        }),
      ]);

      // Save AI config
      if (aiBaseUrl && aiAuthToken) {
        configureAI(aiBaseUrl, aiAuthToken);
        setAiBaseUrl(getAIConfig().baseUrl);
        setAiAuthToken(getAIConfig().authToken);
        setAiConfigured(true);
        setAiExpanded(false);
      }

      setLastSavedAt(savedAt);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : t('settings.failedToSave'));
    } finally {
      setIsSaving(false);
    }
  };

  const saveSyncConfig = () => {
    configureSync(syncBaseUrl, syncRecoveryKey);
    setSyncBaseUrl(getSyncConfig().baseUrl);
    setSyncRecoveryKey(getSyncConfig().recoveryKey);
    setSyncConfigured(isSyncConfigured());
    setSyncExpanded(false);
    setSyncMessage(t('settings.cloudSyncSaved'));
    setSyncError(null);
  };

  const runSyncAction = async (action: () => Promise<string>) => {
    setSyncBusy(true);
    setSyncError(null);
    setSyncMessage(null);
    try {
      setSyncMessage(await action());
      setSyncStatusMeta(getLocalSyncStatus());
      setSyncConfigured(isSyncConfigured());
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : t('settings.cloudSyncFailed'));
    } finally {
      setSyncBusy(false);
    }
  };

  const handleCreateRecoveryKey = () => runSyncAction(async () => {
    const created = await createRecoveryKey(syncBaseUrl);
    setSyncRecoveryKey(created.recoveryKey);
    setSyncBaseUrl(getSyncConfig().baseUrl);
    setSyncConfigured(true);
    setSyncExpanded(true);
    return t('settings.recoveryKeyCreated');
  });

  const handleCheckCloudSnapshot = () => runSyncAction(async () => {
    saveSyncConfig();
    const meta = await getLatestSnapshotMeta();
    setRemoteSnapshot(meta);
    return meta ? `${t('settingsExtras.cloudSnapshotFoundFrom')} ${new Date(meta.createdAt).toLocaleString(i18n.language)}.` : t('settings.noSnapshot');
  });

  const handleUploadSnapshot = () => runSyncAction(async () => {
    saveSyncConfig();
    const { bytes, meta: localMeta } = await createSnapshotUploadPayload();
    const meta = await uploadSnapshot(bytes, localMeta);
    setRemoteSnapshot(meta);
    return t('settingsExtras.uploadedBackup', { size: formatSnapshotSize(meta.sizeBytes), date: new Date(meta.createdAt).toLocaleString(i18n.language) });
  });

  const restoreLatestSnapshot = () => runSyncAction(async () => {
    saveSyncConfig();
    const { bytes, meta } = await downloadLatestSnapshot();
    const downloadedHash = await sha256Hex(bytes);
    if (downloadedHash !== meta.sha256.toLowerCase()) throw new Error(t('errors.snapshotChecksumMismatch'));
    const backup = await createPreRestoreBackup();
    await replaceLocalSnapshot(bytes);
    markSnapshotRestored(meta);
    setRemoteSnapshot(meta);
    setSyncStatusMeta(getLocalSyncStatus());
    return t('settingsExtras.restoredCloudBackup', { backupId: backup.backupId });
  });

  const runBackupAction = async (action: () => Promise<string>) => {
    setBackupBusy(true);
    setBackupError(null);
    setBackupMessage(null);
    try {
      setBackupMessage(await action());
    } catch (error) {
      setBackupError(error instanceof Error ? error.message : t('settingsExtras.backupActionFailed'));
    } finally {
      setBackupBusy(false);
    }
  };

  const handleExportBackup = () => runBackupAction(async () => {
    const filename = await exportBackupFile();
    return t('settingsExtras.exportedFile', { filename });
  });

  const handleImportBackup = (file: File) => runBackupAction(async () => {
    const backup = await importBackupFile(file);
    return t('settingsExtras.importedBackup', { backupId: backup.backupId });
  });

  const handleRestoreSnapshot = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.confirm === 'function') {
      const confirmed = window.confirm(t('settingsExtras.restoreConfirm'));
      if (!confirmed) return;
      restoreLatestSnapshot();
      return;
    }

    Alert.alert(
      t('settings.restoreCloudBackup'),
      t('settingsExtras.restoreHint'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('settings.restoreCloudBackup'), style: 'destructive', onPress: restoreLatestSnapshot },
      ],
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
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{t('settings.controlRoom')}</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{t('nav.settings')}</Text>
            <Pressable
              style={styles.langToggle}
              onPress={() => i18n.changeLanguage(i18n.language === 'zh-CN' ? 'en' : 'zh-CN')}
              accessibilityLabel={t('settingsExtras.switchLanguage')}
            >
              <Text style={styles.langToggleText}>{i18n.language === 'zh-CN' ? 'EN' : '中'}</Text>
            </Pressable>
          </View>
          <Text style={styles.subtitle}>{t('settingsExtras.heroSubtitle')}</Text>
        </View>

        <SectionHeader title={t('settings.oneRMSettings')} subtitle={t('settingsExtras.currentMaxes')} />
        <Card variant="elevated" style={styles.card}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardKicker}>{t('settingsExtras.strengthProfile')}</Text>
            <Text style={styles.statusPill}>{t('settingsExtras.bigThree')}</Text>
          </View>
          <NumberField label={t('settingsExtras.squat1RM')} value={squat} onChangeValue={setSquat} step={2.5} min={0} unit="kg" />
          <NumberField label={t('settingsExtras.bench1RM')} value={bench} onChangeValue={setBench} step={2.5} min={0} unit="kg" />
          <NumberField label={t('settingsExtras.deadlift1RM')} value={deadlift} onChangeValue={setDeadlift} step={2.5} min={0} unit="kg" />
        </Card>

        <SectionHeader title={t('settings.trainingPreferences')} subtitle={t('settingsExtras.trainingPrefsSubtitle')} />
        <Card variant="tonal" style={styles.card}>
          <NumberField
            label={t('settingsExtras.defaultSessionDuration')}
            value={duration}
            onChangeValue={setDuration}
            step={5}
            min={30}
            max={180}
            unit="min"
          />
        </Card>

        <SectionHeader title={t('settings.bodyweight')} subtitle={t('settingsExtras.bodyweightHint')} />
        <Card style={styles.card}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardKicker}>{t('settingsExtras.bodyContext')}</Text>
            <Text style={styles.statusPill}>{latestBodyweight ? t('settingsExtras.tracked') : t('common.noData')}</Text>
          </View>
          <Text style={styles.cardText}>
            {t('settingsExtras.latest')}: {latestBodyweight ? `${latestBodyweight.bodyweight} kg · ${new Date(latestBodyweight.date).toLocaleDateString(i18n.language)}` : t('common.noData')}
          </Text>
          <NumberField label={t('settings.bodyweight')} value={bodyweightValue} onChangeValue={setBodyweightValue} step={0.5} min={20} unit="kg" />
          <Button
            title={t('settings.saveBodyweight')}
            onPress={handleSaveBodyweight}
            disabled={bodyweightValue === null}
            loading={isSavingBodyweight}
            size="md"
          />
        </Card>

        <SectionHeader title={t('workout.aiCoach')} subtitle={t('settingsExtras.aiCoachSubtitle')} />
        <Card variant="coach" style={styles.card}>
          <Pressable onPress={() => setAiExpanded(!aiExpanded)} style={styles.aiHeader}>
            <Text style={[styles.aiStatus, !aiConfigured && styles.aiNotConfigured]}>
              {aiConfigured ? '✓ ' + t('settingsExtras.aiConfigured') : '✗ ' + t('settingsExtras.notConfigured')}
            </Text>
            <Text style={styles.aiToggle}>{aiExpanded ? '▲' : '▼'}</Text>
          </Pressable>
          {aiExpanded && (
            <>
              <TextField
                label={t('settingsExtras.backendUrl')}
                value={aiBaseUrl}
                onChangeText={setAiBaseUrl}
                placeholder="https://your-worker.workers.dev"
              />
              <TextField
                label={t('settingsExtras.authToken')}
                value={aiAuthToken}
                onChangeText={setAiAuthToken}
                placeholder={t('settingsExtras.yourAuthToken')}
              />
            </>
          )}
        </Card>

        <SectionHeader title={t('settings.cloudSync')} subtitle={t('settingsExtras.cloudSyncSubtitle')} />
        <Card variant="elevated" style={styles.card}>
          <Pressable onPress={() => setSyncExpanded(!syncExpanded)} style={styles.aiHeader}>
            <Text style={[styles.aiStatus, !syncConfigured && styles.aiNotConfigured]}>
              {syncConfigured ? '✓ ' + t('settingsExtras.cloudSyncConfigured') : '✗ ' + t('settingsExtras.notConfigured')}
            </Text>
            <Text style={styles.aiToggle}>{syncExpanded ? '▲' : '▼'}</Text>
          </Pressable>
          {syncExpanded && (
            <>
              <Text style={styles.cardText}>{t('settingsExtras.cloudSyncHint')}</Text>
              <TextField label={t('settingsExtras.backendUrl')} value={syncBaseUrl} onChangeText={setSyncBaseUrl} placeholder="https://your-worker.workers.dev" />
              <TextField label={t('settingsExtras.recoveryKey')} value={syncRecoveryKey} onChangeText={setSyncRecoveryKey} placeholder={t('settingsExtras.recoveryKeyPlaceholder')} />
              <View style={styles.buttonRow}>
                <Button title={t('settings.create')} onPress={handleCreateRecoveryKey} loading={syncBusy} size="sm" style={styles.rowButton} />
                <Button title={t('common.save')} onPress={saveSyncConfig} variant="secondary" disabled={!syncBaseUrl || !syncRecoveryKey} size="sm" style={styles.rowButton} />
              </View>
              <View style={styles.buttonRow}>
                <Button title={t('settings.check')} onPress={handleCheckCloudSnapshot} variant="secondary" disabled={!syncBaseUrl || !syncRecoveryKey} loading={syncBusy} size="sm" style={styles.rowButton} />
                <Button title={t('settings.upload')} onPress={handleUploadSnapshot} disabled={!syncBaseUrl || !syncRecoveryKey} loading={syncBusy} size="sm" style={styles.rowButton} />
              </View>
              <Button title={t('settings.restoreCloudBackup')} onPress={handleRestoreSnapshot} variant="danger" disabled={!syncBaseUrl || !syncRecoveryKey} loading={syncBusy} size="md" fullWidth />
            </>
          )}
          {remoteSnapshot ? (
            <Text style={styles.cardText}>
              {t('settingsExtras.cloudBackup')}: {new Date(remoteSnapshot.createdAt).toLocaleString(i18n.language)} · {formatSnapshotSize(remoteSnapshot.sizeBytes)} · {remoteSnapshot.sha256.slice(0, 8)}…
            </Text>
          ) : null}
          {syncStatusMeta.lastManualUploadAt ? <Text style={styles.cardText}>{t('settingsExtras.lastManualUpload')}: {new Date(syncStatusMeta.lastManualUploadAt).toLocaleString(i18n.language)}</Text> : null}
          {syncStatusMeta.lastAutoUploadAt ? <Text style={styles.cardText}>{t('settingsExtras.lastAutoUpload')}: {new Date(syncStatusMeta.lastAutoUploadAt).toLocaleString(i18n.language)}</Text> : null}
          {syncStatusMeta.lastRestoreAt ? <Text style={styles.cardText}>{t('settingsExtras.lastRestore')}: {new Date(syncStatusMeta.lastRestoreAt).toLocaleString(i18n.language)}</Text> : null}
          {syncMessage ? <Text style={styles.savedText}>{syncMessage}</Text> : null}
          {syncError ? <Text style={styles.errorText}>{t('settingsExtras.cloudSyncFailed')}: {syncError}</Text> : null}
        </Card>

        <SectionHeader title={t('settings.dataBackup')} subtitle={t('settingsExtras.dataBackupSubtitle')} />
        <Card variant="tonal" style={styles.card}>
          <Text style={styles.cardText}>{t('settingsExtras.dataBackupHint')}</Text>
          {Platform.OS === 'web' ? (
            <>
              <View style={styles.buttonRow}>
                <Button title={t('settings.export')} onPress={handleExportBackup} loading={backupBusy} size="sm" style={styles.rowButton} />
                <Button title={t('settings.import')} onPress={() => fileInputRef.current?.click()} variant="secondary" disabled={backupBusy} size="sm" style={styles.rowButton} />
              </View>
              <input
                ref={fileInputRef}
                type="file"
                accept=".sqlite,.db,application/octet-stream"
                style={{ display: 'none' }}
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  event.currentTarget.value = '';
                  if (file) handleImportBackup(file);
                }}
              />
            </>
          ) : (
            <Text style={styles.cardText}>{t('settingsExtras.fileBackupWebOnly')}</Text>
          )}
          {backupMessage ? <Text style={styles.savedText}>{backupMessage}</Text> : null}
          {backupError ? <Text style={styles.errorText}>{t('settingsExtras.backupFailed')}: {backupError}</Text> : null}
        </Card>

        <SectionHeader title={t('settingsExtras.localBackupRecovery')} subtitle={t('settingsExtras.localBackupRecoveryHint')} />
        <Card variant="tonal" style={styles.card}>
          <Text style={styles.cardText}>{t('settingsExtras.localBackupRecoveryDesc')}</Text>
          <Button
            title={t('settingsExtras.viewLocalBackups')}
            onPress={() => router.push('/recovery' as Href)}
            variant="secondary"
            size="md"
            fullWidth
          />
        </Card>

        <SectionHeader title={t('settings.appVersion')} subtitle={t('settingsExtras.pwaUpdateStatus')} />
        <Card variant="outlined" style={styles.card}>
          <Pressable style={styles.cardTopRow} onPress={() => setReleaseNotesExpanded((value) => !value)}>
            <Text style={styles.cardKicker}>{t('settingsExtras.powerLogVersion', { version: getAppVersion() })}</Text>
            <Text style={styles.statusPill}>{updateAvailable ? t('settings.updateReady') : t('settingsExtras.current')}</Text>
          </Pressable>
          <Text style={styles.cardText}>{updateAvailable ? t('settingsExtras.updateAvailableHint') : t('settingsExtras.upToDateHint')}</Text>
          <Button title={releaseNotesExpanded ? t('settings.hideUpdateNotes') : t('settings.viewUpdateNotes')} onPress={() => setReleaseNotesExpanded((value) => !value)} variant="secondary" size="sm" fullWidth />
          {releaseNotesExpanded ? (
            <View style={styles.releaseList}>
              {releaseNotes.map((release) => (
                <View key={release.version} style={styles.releaseItem}>
                  <Text style={styles.releaseTitle}>v{release.version} · {release.date}</Text>
                  {release.highlights.map((highlight) => (
                    <Text key={highlight} style={styles.releaseText}>• {highlight}</Text>
                  ))}
                </View>
              ))}
            </View>
          ) : null}
          {updateAvailable ? <Button title={t('common.refresh')} onPress={reloadForPwaUpdate} variant="secondary" size="sm" fullWidth /> : null}
        </Card>

        <Button title={t('settings.saveSettings')} onPress={handleSave} loading={isSaving} fullWidth />
        {lastSavedAt ? <Text style={styles.savedText}>{t('settings.lastSaved', { date: new Date(lastSavedAt).toLocaleString(i18n.language) })}</Text> : null}
        {saveError ? <Text style={styles.errorText}>{t('settings.saveFailed')}: {saveError}</Text> : null}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  langToggle: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  langToggleText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
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
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  cardKicker: { ...typography.overline, color: colors.primary },
  statusPill: { ...typography.caption, color: colors.recovery, fontWeight: '800', backgroundColor: colors.successSoft, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, overflow: 'hidden' },
  cardText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  rowButton: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aiStatus: {
    ...typography.footnote,
    color: colors.success,
    fontWeight: '700',
  },
  aiNotConfigured: {
    color: colors.textSecondary,
  },
  aiToggle: {
    ...typography.callout,
    color: colors.textSecondary,
  },
  savedText: {
    ...typography.footnote,
    color: colors.success,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  errorText: {
    ...typography.footnote,
    color: colors.danger,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  releaseList: {
    gap: spacing.sm,
  },
  releaseItem: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
  },
  releaseTitle: {
    ...typography.subhead,
    color: colors.textPrimary,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  releaseText: {
    ...typography.footnote,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
