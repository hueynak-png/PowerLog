import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { radius } from '@/src/theme/radius';
import { CompletionBadge } from './CompletionBadge';

interface SetInputProps {
  setNumber: number;
  plannedWeight?: number;
  plannedReps?: number;
  plannedRpe?: number;
  actualWeight: number | null;
  actualReps: number | null;
  actualRpe: number | null;
  completed: boolean;
  isWarmup?: boolean;
  onUpdate: (field: string, value: number | null | boolean) => void;
  rpeRequired?: boolean;
}

export function SetInput({
  setNumber, plannedWeight, plannedReps, plannedRpe,
  actualWeight, actualReps, actualRpe, completed, isWarmup,
  onUpdate, rpeRequired,
}: SetInputProps) {
  const handleNum = (field: string) => (text: string) => {
    if (text === '') { onUpdate(field, null); return; }
    const n = parseFloat(text);
    if (!isNaN(n)) onUpdate(field, n);
  };

  return (
    <View style={[styles.row, isWarmup && styles.warmup]}>
      <Text style={styles.setNum}>{isWarmup ? 'W' : setNumber}</Text>
      <View style={styles.cell}>
        {plannedWeight != null && <Text style={styles.planned}>{plannedWeight}</Text>}
        <TextInput style={styles.input} value={actualWeight != null ? String(actualWeight) : ''}
          onChangeText={handleNum('actualWeight')} keyboardType="decimal-pad"
          placeholder="kg" placeholderTextColor={colors.textTertiary}
          accessibilityLabel={`Set ${setNumber} weight`} />
      </View>
      <View style={styles.cell}>
        {plannedReps != null && <Text style={styles.planned}>{plannedReps}</Text>}
        <TextInput style={styles.input} value={actualReps != null ? String(actualReps) : ''}
          onChangeText={handleNum('actualReps')} keyboardType="number-pad"
          placeholder="reps" placeholderTextColor={colors.textTertiary}
          accessibilityLabel={`Set ${setNumber} reps`} />
      </View>
      <View style={styles.cell}>
        {plannedRpe != null && <Text style={styles.planned}>{plannedRpe}</Text>}
        <TextInput style={styles.input} value={actualRpe != null ? String(actualRpe) : ''}
          onChangeText={handleNum('actualRpe')} keyboardType="decimal-pad"
          placeholder={rpeRequired ? 'RPE*' : 'RPE'}
          placeholderTextColor={rpeRequired ? colors.warning : colors.textTertiary}
          accessibilityLabel={`Set ${setNumber} RPE`} />
      </View>
      <Pressable onPress={() => onUpdate('completed', !completed)}
        accessibilityLabel={`Set ${setNumber} ${completed ? 'uncomplete' : 'complete'}`}>
        <CompletionBadge completed={completed} size="sm" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.borderLight, gap: spacing.sm,
  },
  warmup: { opacity: 0.7 },
  setNum: { ...typography.footnote, color: colors.textSecondary, width: 20, textAlign: 'center' },
  cell: { flex: 1, alignItems: 'center' },
  planned: { ...typography.caption, color: colors.textTertiary, marginBottom: 2 },
  input: {
    ...typography.callout, color: colors.textPrimary, textAlign: 'center',
    backgroundColor: colors.surfaceSecondary, borderRadius: radius.sm,
    paddingHorizontal: spacing.sm, paddingVertical: spacing.xs,
    width: '100%', minHeight: 36, borderWidth: 1, borderColor: colors.borderLight,
  },
});
