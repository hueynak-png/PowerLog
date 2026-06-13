import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { radius } from '@/src/theme/radius';
import { CompletionBadge } from './CompletionBadge';

interface SetInputProps {
  setNumber: number;
  setLabel?: string;
  plannedWeight?: number;
  plannedReps?: number;
  plannedRepRange?: string;
  plannedRpe?: number;
  plannedPercent?: number;
  plannedNotes?: string;
  actualWeight: number | null;
  actualReps: number | null;
  actualRpe: number | null;
  completed: boolean;
  isWarmup?: boolean;
  onUpdate: (field: string, value: number | null | boolean) => void;
  rpeRequired?: boolean;
}

export function SetInput({
  setNumber, setLabel, plannedWeight, plannedReps, plannedRepRange, plannedRpe, plannedPercent, plannedNotes,
  actualWeight, actualReps, actualRpe, completed, isWarmup,
  onUpdate, rpeRequired,
}: SetInputProps) {
  const { t } = useTranslation();
  const [weightText, setWeightText] = useState(actualWeight != null ? String(actualWeight) : '');
  const weightRef = useRef<TextInput>(null);
  const repsRef = useRef<TextInput>(null);
  const rpeRef = useRef<TextInput>(null);

  useEffect(() => {
    setWeightText(actualWeight != null ? String(actualWeight) : '');
  }, [actualWeight]);

  const handleNum = (field: string) => (text: string) => {
    if (text === '') {
      onUpdate(field, null);
      return;
    }
    const n = Number(text);
    if (Number.isFinite(n)) onUpdate(field, n);
  };

  const handleWeightText = (text: string) => {
    if (!/^\d*\.?\d*$/.test(text)) return;
    setWeightText(text);
  };

  const commitWeight = () => {
    if (weightText === '' || weightText === '.') {
      onUpdate('actualWeight', null);
      setWeightText('');
      return;
    }
    const n = Number(weightText);
    if (Number.isFinite(n)) {
      onUpdate('actualWeight', n);
      setWeightText(String(n));
    }
  };

  // Build compact planned summary: e.g. "Top Set · 3 reps · 105kg · RPE 5.5 · film"
  const plannedParts: string[] = [];
  if (plannedRepRange) {
    plannedParts.push(`${plannedRepRange} reps`);
  } else if (plannedReps != null) {
    plannedParts.push(`${plannedReps} reps`);
  }
  if (plannedWeight != null) plannedParts.push(`${plannedWeight}kg`);
  if (plannedRpe != null) plannedParts.push(`RPE ${plannedRpe}`);
  if (plannedPercent != null) plannedParts.push(`${plannedPercent}%`);
  const plannedSummary = plannedParts.join(' · ');

  const labelText = setLabel ?? (isWarmup ? 'W' : String(setNumber));
  const filmBadge = plannedNotes && plannedNotes.toLowerCase().includes('film');

  return (
    <View style={[styles.row, completed && styles.completedRow, isWarmup && styles.warmup]}>
      <View style={styles.setLabelCol}>
        <Text style={[styles.setLabel, completed && styles.setNumCompleted]} numberOfLines={1}>{labelText}</Text>
        {filmBadge && <Text style={styles.filmBadge}>film</Text>}
      </View>
      {plannedSummary ? (
        <Text style={styles.plannedSummary} numberOfLines={1}>{plannedSummary}</Text>
      ) : null}
      <View style={styles.inputGroup}>
        <TextInput ref={weightRef} style={[styles.input, completed && styles.completedInput]} value={weightText}
          onChangeText={handleWeightText} onBlur={commitWeight} keyboardType="decimal-pad" inputMode="decimal"
          placeholder={t('setInput.kg')} placeholderTextColor={colors.textTertiary}
          selectTextOnFocus returnKeyType="next" blurOnSubmit={false} onSubmitEditing={() => repsRef.current?.focus()}
          accessibilityLabel={t('setInput.setWeight', { setNumber })} />
        <TextInput ref={repsRef} style={[styles.input, completed && styles.completedInput]} value={actualReps != null ? String(actualReps) : ''}
          onChangeText={handleNum('actualReps')} keyboardType="number-pad"
          placeholder={t('setInput.reps')} placeholderTextColor={colors.textTertiary}
          selectTextOnFocus returnKeyType="next" blurOnSubmit={false} onSubmitEditing={() => rpeRef.current?.focus()}
          accessibilityLabel={t('setInput.setReps', { setNumber })} />
        <TextInput style={[styles.input, completed && styles.completedInput, rpeRequired && actualRpe == null && styles.rpeRequiredInput]} value={actualRpe != null ? String(actualRpe) : ''}
          onChangeText={handleNum('actualRpe')} keyboardType="decimal-pad"
          inputMode="decimal"
          placeholder={rpeRequired ? t('setInput.rpeRequired') : t('setInput.rpe')}
          placeholderTextColor={rpeRequired ? colors.warning : colors.textTertiary}
          accessibilityLabel={t('setInput.setRpe', { setNumber })} />
      </View>
      <Pressable onPress={() => onUpdate('completed', !completed)}
        accessibilityLabel={completed ? t('setInput.setUncomplete', { setNumber }) : t('setInput.setComplete', { setNumber })}>
        <CompletionBadge completed={completed} size="sm" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.sm,
    borderWidth: 1, borderColor: colors.borderLight, gap: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.lg, marginBottom: spacing.sm,
    flexWrap: 'wrap',
  },
  completedRow: { backgroundColor: colors.successSoft, borderColor: colors.successBorder },
  warmup: { opacity: 0.7 },
  setLabelCol: { width: 56, alignItems: 'flex-start' },
  setLabel: { ...typography.footnote, color: colors.primary, fontWeight: '800' },
  setNum: { ...typography.footnote, color: colors.textSecondary, width: 22, textAlign: 'center', fontWeight: '800' },
  setNumCompleted: { color: colors.success },
  filmBadge: { ...typography.caption, color: colors.warning, fontWeight: '600', fontSize: 9, marginTop: 1 },
  plannedSummary: { ...typography.caption, color: colors.textTertiary, flex: 1, minWidth: 120, textAlign: 'left' },
  inputGroup: { flexDirection: 'row', gap: spacing.xs, flex: 2 },
  input: {
    ...typography.callout, color: colors.textPrimary, textAlign: 'center',
    backgroundColor: colors.surfaceMuted, borderRadius: radius.md,
    paddingHorizontal: spacing.sm, paddingVertical: spacing.xs,
    flex: 1, minHeight: 36, borderWidth: 1, borderColor: colors.borderLight,
  },
  completedInput: { backgroundColor: colors.surface, borderColor: colors.successBorder },
  rpeRequiredInput: { borderColor: colors.warningBorder, backgroundColor: colors.warningSoft },
});
