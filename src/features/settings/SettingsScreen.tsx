import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, NumberField, SectionHeader, TextField } from '@/src/components/ui';
import type { BodyweightEntry, LiftType } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { addBodyweightEntry, getLatestBodyweight, updateBodyweightEntry } from '@/src/repositories';
import { configureAI, getAIConfig, isAIConfigured } from '@/src/services/aiService';
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
    paddingBottom: spacing.xxxl,
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
});
