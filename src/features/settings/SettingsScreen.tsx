import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, NumberField, SectionHeader, TextField } from '@/src/components/ui';
import type { LiftType } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { configureAI, getAIConfig, isAIConfigured } from '@/src/services/aiService';
import { useSettingsStore } from '@/src/stores/useSettingsStore';
import { colors, spacing, typography } from '@/src/theme';

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

  // AI configuration
  const savedAIConfig = getAIConfig();
  const [aiBaseUrl, setAiBaseUrl] = useState(savedAIConfig.baseUrl);
  const [aiAuthToken, setAiAuthToken] = useState(savedAIConfig.authToken);
  const [aiConfigured, setAiConfigured] = useState(isAIConfigured());

  useEffect(() => {
    setSquat(getMaxForLift('squat')?.oneRm ?? null);
    setBench(getMaxForLift('bench')?.oneRm ?? null);
    setDeadlift(getMaxForLift('deadlift')?.oneRm ?? null);
    setDuration(profile?.defaultSessionDuration ?? 60);
  }, [getMaxForLift, profile?.defaultSessionDuration]);

  const saveLiftMax = async (liftType: LiftType, value: number | null) => {
    if (!db || value === null) return;
    await updateMax(db, liftType, value);
  };

  const handleSave = async () => {
    if (!db) return;

    setIsSaving(true);
    await Promise.all([
      saveLiftMax('squat', squat),
      saveLiftMax('bench', bench),
      saveLiftMax('deadlift', deadlift),
      duration !== null ? updateProfile(db, { defaultSessionDuration: duration }) : Promise.resolve(),
    ]);

    // Save AI config
    if (aiBaseUrl && aiAuthToken) {
      configureAI(aiBaseUrl, aiAuthToken);
      setAiConfigured(true);
    }

    setIsSaving(false);
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
        <Text style={styles.title}>Settings</Text>

        <SectionHeader title="1RM Settings" />
        <Card style={styles.card}>
          <NumberField label="Squat 1RM" value={squat} onChangeValue={setSquat} step={2.5} min={0} unit="kg" />
          <NumberField label="Bench 1RM" value={bench} onChangeValue={setBench} step={2.5} min={0} unit="kg" />
          <NumberField label="Deadlift 1RM" value={deadlift} onChangeValue={setDeadlift} step={2.5} min={0} unit="kg" />
        </Card>

        <SectionHeader title="Training Preferences" />
        <Card style={styles.card}>
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

        <SectionHeader title="AI Coach" />
        <Card style={styles.card}>
          <Text style={styles.aiStatus}>
            {aiConfigured ? '✓ AI configured' : 'Not configured'}
          </Text>
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
        </Card>

        <Button title="Save Settings" onPress={handleSave} loading={isSaving} />
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
  title: {
    ...typography.largeTitle,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.lg,
  },
  aiStatus: {
    ...typography.footnote,
    color: colors.success,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
});
