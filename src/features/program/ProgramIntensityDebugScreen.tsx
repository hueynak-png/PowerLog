import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { Button, Card, NumberField, SectionHeader, TextField } from '@/src/components/ui';
import { useDatabase } from '@/src/hooks/useDatabase';
import { resolveStrategy } from '@/src/services/programInstantiation/registry';
import { getCycleIndex, getWeekInCycle } from '@/src/services/programInstantiation/cycleProgression';
import { getExerciseById } from '@/src/repositories/exerciseRepository';
import { formatLocalDate, parseLocalDate, getFirstTrainingOffset } from '@/src/lib/date';
import type { InstantiationResult, InstantiatedSet } from '@/src/services/programInstantiation/types';
import type { SetRole } from '@/src/services/programInstantiation/intensityProfile';
import { colors, radius, spacing, typography } from '@/src/theme';

type IntensityProfile = 'conservative' | 'standard' | 'aggressive';

interface DebugRow {
  weekNumber: number;
  cycleIndex: number;
  weekInCycle: number;
  phase: string;
  dayNumber: number;
  exerciseName: string;
  setRole: string;
  reps: number | string;
  sets: string;
  targetRpe: number | string;
  percent: string;
  finalWeight: number | string;
  warning: string;
  reason: string;
}

interface Anomaly {
  severity: 'error' | 'warning';
  message: string;
  week?: number;
  day?: number;
  exercise?: string;
}

const CROSS_SECTION_WEEKS = [1, 6, 11, 16, 21, 26, 31];

export function ProgramIntensityDebugScreen() {
  const db = useDatabase();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    squat?: string; bench?: string; deadlift?: string;
    startDate?: string; profile?: string;
  }>();

  const [squatMax, setSquatMax] = useState(Number(params.squat) || 180);
  const [benchMax, setBenchMax] = useState(Number(params.bench) || 120);
  const [deadliftMax, setDeadliftMax] = useState(Number(params.deadlift) || 220);
  const [startDate, setStartDate] = useState(params.startDate || '2026-06-15');
  const [intensityProfile, setIntensityProfile] = useState<IntensityProfile>(
    (params.profile as IntensityProfile) || 'standard'
  );
  const [scheduleDays, setScheduleDays] = useState('0,1,3,4');
  const [loading, setLoading] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState(false);

  const profileLabel = intensityProfile === 'conservative' ? '保守' : intensityProfile === 'aggressive' ? '激进' : '标准';

  const handleGenerate = useCallback(async () => {
    if (!db) return;
    setLoading(true);

    try {
      const offsets = scheduleDays.split(',').map(Number);
      const strategy = resolveStrategy('seed-program-brad-full-cycle');
      if (!strategy) throw new Error('Strategy not found');

      const instantiationResult = await strategy.instantiate(db, {
        templateProgramId: 'seed-program-brad-full-cycle',
        startDate,
        userMaxes: { squat: squatMax, bench: benchMax, deadlift: deadliftMax },
        scheduleOffsets: offsets,
        trainingDaysPerWeek: offsets.length,
        intensityTier: intensityProfile,
      });

      setResult(instantiationResult);

      // Build debug rows
      const debugRows: DebugRow[] = [];
      const detectedAnomalies: Anomaly[] = [];

      for (const week of instantiationResult.weeks) {
        const cycleIndex = getCycleIndex(week.week.weekNumber);
        const weekInCycle = getWeekInCycle(week.week.weekNumber);

        for (const day of week.days) {
          for (const ex of day.exercises) {
            const exerciseDef = await getExerciseById(db, ex.exercise.exerciseId);
            const exerciseName = exerciseDef?.name_en ?? ex.exercise.exerciseId;
            const isAccessory = ex.exercise.accessoryCategory != null;

            for (const set of ex.sets) {
              const setRole = (set as any).setRole ?? inferDebugRole(set, isAccessory);
              const reps = set.targetReps ?? '—';
              const rpe = set.targetRpe ?? '—';
              const percent = set.targetPercent != null ? (set.targetPercent * 100).toFixed(1) + '%' : '—';
              const finalWeight = set.targetLoad ?? '—';

              // Anomaly detection
              let warning = '';
              let reason = '';
              const pct = set.targetPercent ?? 0;
              const wk = week.week.weekNumber;
              const ph = week.week.phase;

              // Phase-based reason for later cycles
              if (wk >= 26 && ph === 'deload') reason = 'deload';
              else if (wk >= 31 && (ph === 'peak' || ph === 'test')) reason = 'peak/taper';
              else if (wk >= 26 && cycleIndex >= 6) reason = 'peak volume reduction';
              else if (ph === 'deload') reason = 'deload week';
              else if (ph === 'transition') reason = 'transition';

              if (!isAccessory) {
                if (intensityProfile === 'standard') {
                  if (setRole === 'top_single' && pct < 0.82) warning = 'top_single < 82%';
                  else if (setRole === 'top_single' && pct > 0.95) warning = 'top_single > 95%';
                  else if (setRole === 'top_triple' && pct < 0.70) warning = 'top_triple < 70%';
                  else if (setRole === 'top_triple' && pct > 0.88) warning = 'top_triple > 88%';
                  else if (setRole === 'volume' && reps === 5 && pct < 0.65) warning = '5-rep < 65%';
                }
                if (setRole === 'backoff' && typeof finalWeight === 'number' && pct > 0.95) {
                  warning = 'backoff > 95%';
                }
              }

              if (warning) {
                detectedAnomalies.push({
                  severity: 'warning',
                  message: `W${wk}D${day.day.dayNumber} ${exerciseName} ${setRole}: ${warning} (${(pct * 100).toFixed(1)}%)`,
                  week: wk, day: day.day.dayNumber, exercise: exerciseName,
                });
              }

              debugRows.push({
                weekNumber: week.week.weekNumber,
                cycleIndex, weekInCycle, phase: ph,
                dayNumber: day.day.dayNumber,
                exerciseName, setRole,
                reps,
                sets: `${set.setNumber}/${ex.sets.length}`,
                targetRpe: rpe,
                percent,
                finalWeight,
                warning,
                reason,
              });
            }
          }
        }
      }

      // Global anomaly checks
      const sDay = instantiationResult.scheduledDays[0];
      if (sDay && sDay.scheduledDate !== startDate) {
        detectedAnomalies.unshift({
          severity: 'warning',
          message: `Start date mismatch: selected=${startDate}, first scheduled=${sDay.scheduledDate}`,
        });
      }

      // Same weekInCycle weight check across cycles
      const cycleWeights: Record<string, number[]> = {};
      for (const row of debugRows) {
        if (row.setRole.startsWith('top_') && typeof row.finalWeight === 'number') {
          const key = `${row.weekInCycle}-D${row.dayNumber}-${row.exerciseName}-${row.setRole}`;
          if (!cycleWeights[key]) cycleWeights[key] = [];
          cycleWeights[key].push(row.weekNumber);
        }
      }

      // Non-monotonic decline detection
      const crossRows = debugRows.filter(r => CROSS_SECTION_WEEKS.includes(r.weekNumber) && r.dayNumber === 1 && !r.setRole.startsWith('variation') && r.setRole !== 'accessory');
      const exerciseWeights: Record<string, { week: number; weight: number; reason: string }[]> = {};
      for (const r of crossRows) {
        const key = `${r.exerciseName}-${r.setRole}`;
        if (!exerciseWeights[key]) exerciseWeights[key] = [];
        if (typeof r.finalWeight === 'number') {
          exerciseWeights[key].push({ week: r.weekNumber, weight: r.finalWeight, reason: r.reason });
        }
      }
      for (const [key, entries] of Object.entries(exerciseWeights)) {
        for (let i = 1; i < entries.length; i++) {
          if (entries[i].weight < entries[i - 1].weight && !entries[i].reason) {
            detectedAnomalies.push({
              severity: 'warning',
              message: `[decline] ${key}: W${entries[i-1].week} ${entries[i-1].weight}kg → W${entries[i].week} ${entries[i].weight}kg (no taper/deload reason)`,
              week: entries[i].week,
            });
          }
        }
      }

      // First training date check
      const trainingOffset = getFirstTrainingOffset(startDate, offsets);
      const firstTrainingObj = parseLocalDate(startDate);
      firstTrainingObj.setDate(firstTrainingObj.getDate() + trainingOffset);
      const firstTrainingDate = formatLocalDate(firstTrainingObj);
      if (sDay && sDay.scheduledDate !== firstTrainingDate) {
        detectedAnomalies.unshift({
          severity: 'warning',
          message: `First training mismatch: expected=${firstTrainingDate}, actual=${sDay.scheduledDate} (start=${startDate}, offset=${trainingOffset})`,
        });
      }

      // console.table output
      const tableRows = debugRows.filter(r => CROSS_SECTION_WEEKS.includes(r.weekNumber) && r.dayNumber === 1);
      console.table(tableRows.map(r => ({
        W: r.weekNumber, cycle: r.cycleIndex, wic: r.weekInCycle, day: r.dayNumber,
        exercise: r.exerciseName, role: r.setRole, reps: r.reps, rpe: r.targetRpe,
        percent: r.percent, weight: r.finalWeight, warn: r.warning,
      })));

      setRows(debugRows);
      setAnomalies(detectedAnomalies);
    } catch (error) {
      console.error('Debug generation failed:', error);
    } finally {
      setLoading(false);
    }
  }, [db, squatMax, benchMax, deadliftMax, startDate, intensityProfile, scheduleDays]);

  const displayRows = expandedWeeks
    ? rows
    : rows.filter(r => CROSS_SECTION_WEEKS.includes(r.weekNumber));

  const errorCount = anomalies.filter(a => a.severity === 'error').length;
  const warningCount = anomalies.filter(a => a.severity === 'warning').length;

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: insets.top }}>
          <SectionHeader title="强度检查 · Dev Debug" />
          <Text style={styles.subtitle}>复用正式计划生成逻辑，不保存不写入日历</Text>
        </View>

        <Card>
          <NumberField label="Squat e1RM (kg)" value={squatMax} onChange={setSquatMax} />
          <NumberField label="Bench e1RM (kg)" value={benchMax} onChange={setBenchMax} />
          <NumberField label="Deadlift e1RM (kg)" value={deadliftMax} onChange={setDeadliftMax} />
          <TextField label="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate} />
          <TextField label="Schedule Offsets" value={scheduleDays} onChangeText={setScheduleDays} />
          <View style={styles.profileRow}>
            {(['conservative', 'standard', 'aggressive'] as IntensityProfile[]).map(p => (
              <Pressable key={p} onPress={() => setIntensityProfile(p)}
                style={[styles.chip, intensityProfile === p && styles.chipSelected]}>
                <Text style={[styles.chipText, intensityProfile === p && styles.chipTextSelected]}>
                  {p === 'conservative' ? '保守' : p === 'standard' ? '标准' : '激进'}
                </Text>
              </Pressable>
            ))}
          </View>
        </Card>

        <Button
          title={loading ? '生成中...' : '生成强度检查表'}
          onPress={handleGenerate}
          disabled={loading || !db}
        />

        {loading && <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.md }} />}

        {result && (
          <>
            <Card>
              <SectionHeader title="概览" />
              <Text style={styles.meta}>Template: {result.program.name}</Text>
              <Text style={styles.meta}>Tier: {profileLabel} · Weeks: {result.weeks.length} · Cycles: {getCycleIndex(result.weeks.length)}</Text>
              <Text style={styles.meta}>
                First scheduled: {result.scheduledDays[0]?.scheduledDate ?? '?'} (requested: {startDate})
              </Text>
              <Text style={styles.meta}>
                First week dates: {result.scheduledDays.filter(d => d.weekNumber === 1).map(d => d.scheduledDate).join(', ')}
              </Text>
              <Text style={[styles.meta, { color: startDate === result.scheduledDays[0]?.scheduledDate ? colors.success : colors.danger }]}>
                {startDate === result.scheduledDays[0]?.scheduledDate ? '✅ Start date matches' : '❌ Start date MISMATCH'}
              </Text>
            </Card>

            {anomalies.length > 0 && (
              <Card>
                <SectionHeader title={`异常检测 (${errorCount} errors, ${warningCount} warnings)`} />
                {anomalies.map((a, i) => (
                  <Text key={i} style={[styles.anomaly, a.severity === 'error' ? styles.anomalyError : styles.anomalyWarn]}>
                    {a.severity === 'error' ? '❌' : '⚠️'} {a.message}
                  </Text>
                ))}
              </Card>
            )}

            <Card>
              <SectionHeader title={`${profileLabel} — 关键横截面 (W1/W6/W11/W16/W21/W26/W31)`} />
              <Pressable onPress={() => setExpandedWeeks(!expandedWeeks)}>
                <Text style={styles.expandToggle}>{expandedWeeks ? '收起完整表' : '展开全部 33 周'}</Text>
              </Pressable>
              <ScrollView horizontal showsHorizontalScrollIndicator>
                <View>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.td, styles.th, { width: 60 }]}>W</Text>
                    <Text style={[styles.td, styles.th, { width: 30 }]}>C</Text>
                    <Text style={[styles.td, styles.th, { width: 30 }]}>wc</Text>
                    <Text style={[styles.td, styles.th, { width: 35 }]}>D</Text>
                    <Text style={[styles.td, styles.th, { width: 130 }]}>Exercise</Text>
                    <Text style={[styles.td, styles.th, { width: 90 }]}>Role</Text>
                    <Text style={[styles.td, styles.th, { width: 35 }]}>Reps</Text>
                    <Text style={[styles.td, styles.th, { width: 30 }]}>Set</Text>
                    <Text style={[styles.td, styles.th, { width: 40 }]}>RPE</Text>
                    <Text style={[styles.td, styles.th, { width: 55 }]}>%</Text>
                    <Text style={[styles.td, styles.th, { width: 70 }]}>Weight</Text>
                    <Text style={[styles.td, styles.th, { width: 120 }]}>Warning</Text>
                  </View>
                  {displayRows.map((r, i) => (
                    <View key={i} style={[styles.tableRow, r.warning ? styles.rowWarn : null, CROSS_SECTION_WEEKS.includes(r.weekNumber) ? styles.rowHighlight : null]}>
                      <Text style={[styles.td, { width: 60, fontWeight: CROSS_SECTION_WEEKS.includes(r.weekNumber) ? '800' : '400' }]}>{r.weekNumber}</Text>
                      <Text style={[styles.td, { width: 30 }]}>{r.cycleIndex}</Text>
                      <Text style={[styles.td, { width: 30 }]}>{r.weekInCycle}</Text>
                      <Text style={[styles.td, { width: 35 }]}>{r.dayNumber}</Text>
                      <Text style={[styles.td, { width: 130 }]}>{r.exerciseName}</Text>
                      <Text style={[styles.td, { width: 90 }]}>{r.setRole}</Text>
                      <Text style={[styles.td, { width: 35 }]}>{r.reps}</Text>
                      <Text style={[styles.td, { width: 30 }]}>{r.sets}</Text>
                      <Text style={[styles.td, { width: 40 }]}>{r.targetRpe}</Text>
                      <Text style={[styles.td, { width: 55 }]}>{r.percent}</Text>
                      <Text style={[styles.td, { width: 70, fontWeight: '700' }]}>{r.finalWeight}</Text>
                      <Text style={[styles.td, { width: 120, color: r.warning ? colors.warning : colors.textTertiary }]}>{r.warning || '—'}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
              <Text style={styles.rowCount}>{displayRows.length} rows ({expandedWeeks ? 'all' : 'cross-section'}) — console.table 已输出</Text>
            </Card>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function inferDebugRole(set: InstantiatedSet, isAccessory: boolean): string {
  if (isAccessory) return 'accessory';
  const label = (set.setLabel ?? '').toLowerCase();
  if (label.includes('top single') || (label.includes('top') && set.targetReps === 1)) return 'top_single';
  if (label.includes('top double') || (label.includes('top') && set.targetReps === 2)) return 'top_double';
  if (label.includes('top triple') || (label.includes('top') && set.targetReps === 3)) return 'top_triple';
  if (label.includes('top')) return 'top_set';
  if (label.match(/^set [2-9]/) || label.match(/^set\s*[2-9]/)) return 'backoff';
  const r = set.targetReps ?? 0;
  if (r === 1) return 'top_single';
  if (r === 2) return 'top_double';
  if (r === 3) return 'top_triple';
  if (r <= 6) return 'top_set';
  return 'volume';
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxxl },
  subtitle: { color: colors.textTertiary, fontSize: typography.sm, marginBottom: spacing.md },
  meta: { color: colors.textSecondary, fontSize: typography.sm, marginBottom: 2 },
  profileRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: radius.full, borderWidth: 1, borderColor: colors.border,
  },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textSecondary, fontSize: typography.sm, fontWeight: '600' },
  chipTextSelected: { color: '#fff' },
  expandToggle: { color: colors.primary, fontSize: typography.sm, fontWeight: '700', marginBottom: spacing.sm },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: colors.border, paddingBottom: spacing.xs, marginBottom: spacing.xs },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.borderLight, paddingVertical: 2 },
  rowWarn: { backgroundColor: colors.warning + '15' },
  rowHighlight: { backgroundColor: colors.primary + '08' },
  th: { fontWeight: '800', color: colors.textPrimary, fontSize: typography.xs },
  td: { color: colors.textPrimary, fontSize: typography.xs, paddingHorizontal: 4 },
  rowCount: { color: colors.textTertiary, fontSize: typography.xs, marginTop: spacing.sm },
  anomaly: { fontSize: typography.xs, marginBottom: 2, paddingLeft: spacing.sm },
  anomalyError: { color: colors.danger, fontWeight: '700' },
  anomalyWarn: { color: colors.warning },
});
