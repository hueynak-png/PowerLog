import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, NumberField, SectionHeader, TextField } from '@/src/components/ui';
import type { CyclePhase, CurrentCycle, Program } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { confirmAction, showAlert } from '@/src/lib/alert';
import {
  createProgram,
  createProgramWeek,
  createProgramDay,
  createPlannedExercise,
  getPrograms,
  deleteProgram,
  getCurrentCycle,
  setCurrentCycle,
  deactivateCurrentCycle,
  getAllExercises,
} from '@/src/repositories';
import { requestPlanGeneration, isAIConfigured } from '@/src/services/aiService';
import { colors, radius, spacing, typography } from '@/src/theme';

export function ProgramScreen() {
  const db = useDatabase();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [cycle, setCycle] = useState<CurrentCycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [goal, setGoal] = useState('General strength');
  const [daysPerWeek, setDaysPerWeek] = useState<number | null>(4);
  const [sessionDuration, setSessionDuration] = useState<number | null>(90);
  const [durationWeeks, setDurationWeeks] = useState<number | null>(6);
  const [includeDeload, setIncludeDeload] = useState(true);
  const [squatMax, setSquatMax] = useState<number | null>(null);
  const [benchMax, setBenchMax] = useState<number | null>(null);
  const [deadliftMax, setDeadliftMax] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    if (!db) return;
    setLoading(true);
    const [progs, activeCycle] = await Promise.all([
      getPrograms(db),
      getCurrentCycle(db),
    ]);
    setPrograms(progs);
    setCycle(activeCycle);
    setLoading(false);
  }, [db]);

  useEffect(() => { void refresh(); }, [refresh]);

  const handleGenerate = async () => {
    if (!db) return;
    if (!isAIConfigured()) {
      showAlert('AI Not Configured', 'Please configure AI in Settings first.');
      return;
    }
    if (!squatMax || !benchMax || !deadliftMax) {
      showAlert('Missing Data', 'Please enter your current 1RM values.');
      return;
    }

    setGenerating(true);
    try {
      const result = await requestPlanGeneration({
        goal,
        trainingDaysPerWeek: daysPerWeek ?? 4,
        maxSessionDuration: sessionDuration ?? 90,
        durationWeeks: durationWeeks ?? 6,
        includesDeload: includeDeload,
        squatMax,
        benchMax,
        deadliftMax,
      });

      // Save program to database
      const program = await createProgram(db, {
        name: result.data.name,
        type: result.data.type,
        goal,
        source: 'ai_generated',
        durationWeeks: durationWeeks ?? 6,
        includesDeload: includeDeload,
        description: result.data.description,
        createdAt: new Date().toISOString(),
      });

      // Get all exercises for name matching
      const exercises = await getAllExercises(db);

      for (const week of result.data.weeks) {
        const savedWeek = await createProgramWeek(db, {
          programId: program.id,
          weekNumber: week.weekNumber,
          phase: week.phase as CyclePhase,
          focus: week.focus,
        });

        for (const day of week.days) {
          const savedDay = await createProgramDay(db, {
            programWeekId: savedWeek.id,
            dayNumber: day.dayNumber,
            title: day.title,
            mainFocus: day.mainFocus,
            estimatedDuration: day.estimatedDuration,
          });

          for (let i = 0; i < day.exercises.length; i++) {
            const ex = day.exercises[i];
            const match = exercises.find(
              (e) => e.nameEn.toLowerCase() === ex.exerciseNameEn.toLowerCase(),
            );
            const exerciseId = match?.id ?? 'unknown';

            await createPlannedExercise(db, {
              programDayId: savedDay.id,
              exerciseId,
              orderIndex: i,
              targetSets: ex.targetSets,
              targetReps: ex.targetReps,
              targetRpe: ex.targetRpe ?? undefined,
              targetPercent: ex.targetPercent ?? undefined,
              notes: ex.notes,
            });
          }
        }
      }

      setShowForm(false);
      showAlert('Success', `Program "${program.name}" created!`);
      await refresh();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      showAlert('Generation Failed', msg);
    } finally {
      setGenerating(false);
    }
  };

  const handleSetActive = (program: Program) => {
    if (!db) return;
    confirmAction('Set Active', `Start "${program.name}" as your current cycle?`, async () => {
      await setCurrentCycle(db, {
        programId: program.id,
        goal: program.goal,
        currentWeek: 1,
        currentPhase: 'entry',
        trainingDaysPerWeek: daysPerWeek ?? 4,
        startedAt: new Date().toISOString(),
        isActive: true,
      });
      await refresh();
    });
  };

  const handleDelete = (program: Program) => {
    if (!db) return;
    confirmAction('Delete Program', `Delete "${program.name}"? This cannot be undone.`, async () => {
      await deleteProgram(db, program.id);
      await refresh();
    });
  };

  const handleDeactivate = () => {
    if (!db) return;
    confirmAction('End Cycle', 'Deactivate the current training cycle?', async () => {
      await deactivateCurrentCycle(db);
      await refresh();
    });
  };

  if (!db || loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Loading programs…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Program builder</Text>
          <Text style={styles.title}>Program</Text>
          <Text style={styles.subtitle}>Generate, store, and activate structured training cycles from one place.</Text>
        </View>

        {/* Current Cycle */}
        <SectionHeader title="Current Cycle" subtitle="What PowerLog should treat as your active training block." />
        {cycle ? (
          <Card variant="elevated" style={styles.card}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardKicker}>Active block</Text>
              <Text style={styles.statusPill}>Week {cycle.currentWeek}</Text>
            </View>
            <Text style={styles.cycleName}>
              {programs.find((p) => p.id === cycle.programId)?.name ?? 'Unknown'}
            </Text>
            <Text style={styles.cycleDetail}>
              Week {cycle.currentWeek} • Phase: {cycle.currentPhase}
            </Text>
            <View style={styles.cycleActions}>
              <Button title="End Cycle" onPress={handleDeactivate} variant="danger" size="sm" />
            </View>
          </Card>
        ) : (
          <Card variant="tonal" style={styles.card}>
            <Text style={styles.emptyText}>No active program</Text>
          </Card>
        )}

        {/* Generate Button */}
        <SectionHeader title="AI Program Generator" subtitle="Create a new cycle from your goal, maxes, and schedule." />
        <Card variant="coach" style={styles.card}>
          <Text style={styles.programDesc}>AI can draft a structured block with weeks, training days, main lifts, and accessory work.</Text>
          <Button
            title="Generate AI Program"
            onPress={() => setShowForm(true)}
            variant="primary"
            fullWidth
          />
        </Card>

        {/* Program Library */}
        <SectionHeader title="Program Library" subtitle={`${programs.length} saved program${programs.length === 1 ? '' : 's'}`} />
        {programs.length === 0 ? (
          <Card variant="outlined" style={styles.card}>
            <Text style={styles.emptyText}>No saved programs</Text>
          </Card>
        ) : (
          programs.map((program) => (
            <Card key={program.id} style={styles.card} variant="outlined">
              <View style={styles.cardTopRow}>
                <Text style={styles.cardKicker}>{program.source.replace('_', ' ')}</Text>
                <Text style={styles.statusPill}>{program.durationWeeks} weeks</Text>
              </View>
              <Text style={styles.programName}>{program.name}</Text>
              <Text style={styles.programMeta}>
                {program.type} • {program.durationWeeks} weeks • {program.source.replace('_', ' ')}
              </Text>
              {program.description && (
                <Text style={styles.programDesc}>{program.description}</Text>
              )}
              <View style={styles.programActions}>
                {!cycle && (
                  <Button
                    title="Set Active"
                    onPress={() => handleSetActive(program)}
                    variant="secondary"
                    size="sm"
                  />
                )}
                <Button
                  title="Delete"
                  onPress={() => handleDelete(program)}
                  variant="ghost"
                  size="sm"
                />
              </View>
            </Card>
          ))
        )}
      </ScrollView>

      {/* Generation Form Modal */}
      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalKicker}>AI Program Generator</Text>
                <Text style={styles.modalTitle}>Generate Program</Text>
              </View>
              <Pressable onPress={() => setShowForm(false)} accessibilityRole="button">
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>

            <Card variant="elevated" style={styles.card}>
              <TextField label="Goal" value={goal} onChangeText={setGoal} placeholder="e.g. Peaking for competition" />
              <NumberField label="Days per week" value={daysPerWeek} onChangeValue={setDaysPerWeek} step={1} min={2} max={6} />
              <NumberField label="Session duration" value={sessionDuration} onChangeValue={setSessionDuration} step={5} min={45} max={150} unit="min" />
              <NumberField label="Program weeks" value={durationWeeks} onChangeValue={setDurationWeeks} step={1} min={3} max={16} />
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Include deload week</Text>
                <Switch value={includeDeload} onValueChange={setIncludeDeload} trackColor={{ true: colors.primary }} />
              </View>
            </Card>

            <SectionHeader title="Current 1RM" subtitle="Used to anchor percentages and loading targets." />
            <Card style={styles.card}>
              <NumberField label="Squat" value={squatMax} onChangeValue={setSquatMax} step={2.5} min={0} unit="kg" />
              <NumberField label="Bench" value={benchMax} onChangeValue={setBenchMax} step={2.5} min={0} unit="kg" />
              <NumberField label="Deadlift" value={deadliftMax} onChangeValue={setDeadliftMax} step={2.5} min={0} unit="kg" />
            </Card>

            <Button
              title={generating ? 'Generating…' : 'Generate Program'}
              onPress={() => void handleGenerate()}
              loading={generating}
              disabled={generating}
              fullWidth
            />
            {generating && (
              <Text style={styles.generatingHint}>This may take up to 2 minutes…</Text>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  hero: { paddingTop: spacing.xxl, paddingBottom: spacing.sm },
  eyebrow: { ...typography.overline, color: colors.primary, marginBottom: spacing.xs },
  title: {
    ...typography.largeTitle,
    color: colors.textPrimary,
  },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs, lineHeight: 22 },
  card: {
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  cardKicker: { ...typography.overline, color: colors.primary },
  statusPill: { ...typography.caption, color: colors.recovery, fontWeight: '800', backgroundColor: colors.successSoft, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, overflow: 'hidden' },
  cycleName: {
    ...typography.title3,
    color: colors.textPrimary,
  },
  cycleDetail: {
    ...typography.subhead,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  cycleActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  programName: {
    ...typography.headline,
    color: colors.textPrimary,
    marginTop: -spacing.xs,
  },
  programMeta: {
    ...typography.footnote,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  programDesc: {
    ...typography.subhead,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  programActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.title2,
    color: colors.textPrimary,
  },
  modalKicker: { ...typography.overline, color: colors.primary, marginBottom: 2 },
  cancelText: {
    ...typography.body,
    color: colors.primary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  switchLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  generatingHint: {
    ...typography.footnote,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
