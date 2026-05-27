import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
      setSaveError(error instanceof Error ? error.message : 'Failed to save settings.');
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
    setSyncMessage('Cloud Sync settings saved.');
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
      setSyncError(error instanceof Error ? error.message : 'Cloud Sync action failed.');
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
    return 'Recovery Key created. Save it somewhere safe before leaving this screen.';
  });

  const handleCheckCloudSnapshot = () => runSyncAction(async () => {
    saveSyncConfig();
    const meta = await getLatestSnapshotMeta();
    setRemoteSnapshot(meta);
    return meta ? `Cloud snapshot found from ${new Date(meta.createdAt).toLocaleString()}.` : 'No cloud snapshot found yet.';
  });

  const handleUploadSnapshot = () => runSyncAction(async () => {
    saveSyncConfig();
    const { bytes, meta: localMeta } = await createSnapshotUploadPayload();
    const meta = await uploadSnapshot(bytes, localMeta);
    setRemoteSnapshot(meta);
    return `Uploaded ${formatSnapshotSize(meta.sizeBytes)} backup at ${new Date(meta.createdAt).toLocaleString()}.`;
  });

  const restoreLatestSnapshot = () => runSyncAction(async () => {
    saveSyncConfig();
    const { bytes, meta } = await downloadLatestSnapshot();
    const downloadedHash = await sha256Hex(bytes);
    if (downloadedHash !== meta.sha256.toLowerCase()) throw new Error('Downloaded snapshot checksum mismatch.');
    const backup = await createPreRestoreBackup();
    await replaceLocalSnapshot(bytes);
    markSnapshotRestored(meta);
    setRemoteSnapshot(meta);
    setSyncStatusMeta(getLocalSyncStatus());
    return `Restored cloud backup. Local pre-restore backup saved as ${backup.backupId}. Reload the app to use the restored data.`;
  });

  const runBackupAction = async (action: () => Promise<string>) => {
    setBackupBusy(true);
    setBackupError(null);
    setBackupMessage(null);
    try {
      setBackupMessage(await action());
    } catch (error) {
      setBackupError(error instanceof Error ? error.message : 'Backup action failed.');
    } finally {
      setBackupBusy(false);
    }
  };

  const handleExportBackup = () => runBackupAction(async () => {
    const filename = await exportBackupFile();
    return `Exported ${filename}.`;
  });

  const handleImportBackup = (file: File) => runBackupAction(async () => {
    const backup = await importBackupFile(file);
    return `Imported backup. Previous local data was saved as ${backup.backupId}. Reload the app to use the imported data.`;
  });

  const handleRestoreSnapshot = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.confirm === 'function') {
      const confirmed = window.confirm('Restore the latest cloud backup onto this web app? A local backup will be created first.');
      if (!confirmed) return;
      restoreLatestSnapshot();
      return;
    }

    Alert.alert(
      'Restore Cloud Backup?',
      'A local backup will be created first, then this device will load the cloud snapshot.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Restore', style: 'destructive', onPress: restoreLatestSnapshot },
      ],
    );
  };

  if (!db) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Loading settings…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Control room</Text>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Tune your maxes, bodyweight context, session defaults, and AI connection.</Text>
        </View>

        <SectionHeader title="1RM Settings" subtitle="Current maxes used across dashboards and workout planning." />
        <Card variant="elevated" style={styles.card}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardKicker}>Strength profile</Text>
            <Text style={styles.statusPill}>Big three</Text>
          </View>
          <NumberField label="Squat 1RM" value={squat} onChangeValue={setSquat} step={2.5} min={0} unit="kg" />
          <NumberField label="Bench 1RM" value={bench} onChangeValue={setBench} step={2.5} min={0} unit="kg" />
          <NumberField label="Deadlift 1RM" value={deadlift} onChangeValue={setDeadlift} step={2.5} min={0} unit="kg" />
        </Card>

        <SectionHeader title="Training Preferences" subtitle="Defaults used when creating future sessions." />
        <Card variant="tonal" style={styles.card}>
          <NumberField
            label="Default session duration"
            value={duration}
            onChangeValue={setDuration}
            step={5}
            min={30}
            max={180}
            unit="min"
          />
        </Card>

        <SectionHeader title="Bodyweight" subtitle="Used as recovery context for nutrition and performance trends." />
        <Card style={styles.card}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardKicker}>Body context</Text>
            <Text style={styles.statusPill}>{latestBodyweight ? 'Tracked' : 'No data'}</Text>
          </View>
          <Text style={styles.cardText}>
            Latest: {latestBodyweight ? `${latestBodyweight.bodyweight} kg · ${new Date(latestBodyweight.date).toLocaleDateString()}` : 'No data'}
          </Text>
          <NumberField label="Bodyweight" value={bodyweightValue} onChangeValue={setBodyweightValue} step={0.5} min={20} unit="kg" />
          <Button
            title="Save Bodyweight"
            onPress={handleSaveBodyweight}
            disabled={bodyweightValue === null}
            loading={isSavingBodyweight}
            size="md"
          />
        </Card>

        <SectionHeader title="AI Coach" subtitle="Connection used for weekly review and workout analysis." />
        <Card variant="coach" style={styles.card}>
          <Pressable onPress={() => setAiExpanded(!aiExpanded)} style={styles.aiHeader}>
            <Text style={[styles.aiStatus, !aiConfigured && styles.aiNotConfigured]}>
              {aiConfigured ? '✓ AI configured' : '✗ Not configured'}
            </Text>
            <Text style={styles.aiToggle}>{aiExpanded ? '▲' : '▼'}</Text>
          </Pressable>
          {aiExpanded && (
            <>
              <TextField
                label="Backend URL"
                value={aiBaseUrl}
                onChangeText={setAiBaseUrl}
                placeholder="https://your-worker.workers.dev"
              />
              <TextField
                label="Auth Token"
                value={aiAuthToken}
                onChangeText={setAiAuthToken}
                placeholder="Your auth token"
              />
            </>
          )}
        </Card>

        <SectionHeader title="Cloud Sync" subtitle="Manual Recovery Key backup and restore for Safari, PWA, and other browsers." />
        <Card variant="elevated" style={styles.card}>
          <Pressable onPress={() => setSyncExpanded(!syncExpanded)} style={styles.aiHeader}>
            <Text style={[styles.aiStatus, !syncConfigured && styles.aiNotConfigured]}>
              {syncConfigured ? '✓ Cloud Sync configured' : '✗ Not configured'}
            </Text>
            <Text style={styles.aiToggle}>{syncExpanded ? '▲' : '▼'}</Text>
          </Pressable>
          {syncExpanded && (
            <>
              <Text style={styles.cardText}>Create or paste a Recovery Key, then upload this device or restore the latest cloud backup manually.</Text>
              <TextField label="Backend URL" value={syncBaseUrl} onChangeText={setSyncBaseUrl} placeholder="https://your-worker.workers.dev" />
              <TextField label="Recovery Key" value={syncRecoveryKey} onChangeText={setSyncRecoveryKey} placeholder="PL-XXXX-XXXX-XXXX-XXXX" />
              <View style={styles.buttonRow}>
                <Button title="Create" onPress={handleCreateRecoveryKey} loading={syncBusy} size="sm" style={styles.rowButton} />
                <Button title="Save" onPress={saveSyncConfig} variant="secondary" disabled={!syncBaseUrl || !syncRecoveryKey} size="sm" style={styles.rowButton} />
              </View>
              <View style={styles.buttonRow}>
                <Button title="Check" onPress={handleCheckCloudSnapshot} variant="secondary" disabled={!syncBaseUrl || !syncRecoveryKey} loading={syncBusy} size="sm" style={styles.rowButton} />
                <Button title="Upload" onPress={handleUploadSnapshot} disabled={!syncBaseUrl || !syncRecoveryKey} loading={syncBusy} size="sm" style={styles.rowButton} />
              </View>
              <Button title="Restore Cloud Backup" onPress={handleRestoreSnapshot} variant="danger" disabled={!syncBaseUrl || !syncRecoveryKey} loading={syncBusy} size="md" fullWidth />
            </>
          )}
          {remoteSnapshot ? (
            <Text style={styles.cardText}>
              Cloud backup: {new Date(remoteSnapshot.createdAt).toLocaleString()} · {formatSnapshotSize(remoteSnapshot.sizeBytes)} · {remoteSnapshot.sha256.slice(0, 8)}…
            </Text>
          ) : null}
          {syncStatusMeta.lastManualUploadAt ? <Text style={styles.cardText}>Last manual upload: {new Date(syncStatusMeta.lastManualUploadAt).toLocaleString()}</Text> : null}
          {syncStatusMeta.lastAutoUploadAt ? <Text style={styles.cardText}>Last auto upload: {new Date(syncStatusMeta.lastAutoUploadAt).toLocaleString()}</Text> : null}
          {syncStatusMeta.lastRestoreAt ? <Text style={styles.cardText}>Last restore: {new Date(syncStatusMeta.lastRestoreAt).toLocaleString()}</Text> : null}
          {syncMessage ? <Text style={styles.savedText}>{syncMessage}</Text> : null}
          {syncError ? <Text style={styles.errorText}>Cloud Sync failed: {syncError}</Text> : null}
        </Card>

        <SectionHeader title="Data Backup" subtitle="Download or import a local database backup file on web." />
        <Card variant="tonal" style={styles.card}>
          <Text style={styles.cardText}>Export creates a local training database file. Import creates a local backup first, then replaces this device database.</Text>
          {Platform.OS === 'web' ? (
            <>
              <View style={styles.buttonRow}>
                <Button title="Export" onPress={handleExportBackup} loading={backupBusy} size="sm" style={styles.rowButton} />
                <Button title="Import" onPress={() => fileInputRef.current?.click()} variant="secondary" disabled={backupBusy} size="sm" style={styles.rowButton} />
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
            <Text style={styles.cardText}>File backup is web-first in this version.</Text>
          )}
          {backupMessage ? <Text style={styles.savedText}>{backupMessage}</Text> : null}
          {backupError ? <Text style={styles.errorText}>Backup failed: {backupError}</Text> : null}
        </Card>

        <SectionHeader title="App Version" subtitle="PWA update status for the installed web app." />
        <Card variant="outlined" style={styles.card}>
          <Pressable style={styles.cardTopRow} onPress={() => setReleaseNotesExpanded((value) => !value)}>
            <Text style={styles.cardKicker}>PowerLog v{getAppVersion()}</Text>
            <Text style={styles.statusPill}>{updateAvailable ? 'Update ready' : 'Current'}</Text>
          </Pressable>
          <Text style={styles.cardText}>{updateAvailable ? 'A newer web app version is available. Refresh to load it.' : 'The installed web app checks for new deployments when opened.'}</Text>
          <Button title={releaseNotesExpanded ? 'Hide Update Notes' : 'View Update Notes'} onPress={() => setReleaseNotesExpanded((value) => !value)} variant="secondary" size="sm" fullWidth />
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
          {updateAvailable ? <Button title="Refresh App" onPress={reloadForPwaUpdate} variant="secondary" size="sm" fullWidth /> : null}
        </Card>

        <Button title="Save Settings" onPress={handleSave} loading={isSaving} fullWidth />
        {lastSavedAt ? <Text style={styles.savedText}>Last saved: {new Date(lastSavedAt).toLocaleString()}</Text> : null}
        {saveError ? <Text style={styles.errorText}>Save failed: {saveError}</Text> : null}
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
    paddingTop: spacing.xxl,
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
