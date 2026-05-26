import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { radius } from '@/src/theme/radius';

interface NumberFieldProps {
  label: string;
  value: number | null;
  onChangeValue: (val: number | null) => void;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
}

export function NumberField({ label, value, onChangeValue, step = 2.5, min, max, unit }: NumberFieldProps) {
  const decrement = () => {
    const next = (value ?? 0) - step;
    if (min !== undefined && next < min) return;
    onChangeValue(next);
  };
  const increment = () => {
    const next = (value ?? 0) + step;
    if (max !== undefined && next > max) return;
    onChangeValue(next);
  };
  const handleText = (text: string) => {
    if (text === '') { onChangeValue(null); return; }
    const n = parseFloat(text);
    if (!isNaN(n)) onChangeValue(n);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Pressable onPress={decrement} style={styles.stepper} accessibilityLabel={`Decrease ${label}`}>
          <Text style={styles.stepperText}>−</Text>
        </Pressable>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={value !== null ? String(value) : ''}
            onChangeText={handleText}
            keyboardType="decimal-pad"
            accessibilityLabel={`${label} value`}
          />
          {unit && <Text style={styles.unit}>{unit}</Text>}
        </View>
        <Pressable onPress={increment} style={styles.stepper} accessibilityLabel={`Increase ${label}`}>
          <Text style={styles.stepperText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  label: { ...typography.subhead, color: colors.textSecondary, marginBottom: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center' },
  stepper: {
    width: 44, height: 44, borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  stepperText: { fontSize: 22, color: colors.primary, fontWeight: '600' },
  inputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: spacing.sm },
  input: { ...typography.title2, color: colors.textPrimary, textAlign: 'center', minWidth: 60 },
  unit: { ...typography.subhead, color: colors.textSecondary, marginLeft: spacing.xs },
});
