import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { radius } from '@/src/theme/radius';

const RPE_VALUES = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] as const;

interface RpeSelectorProps {
  value: number | null;
  onChange: (rpe: number) => void;
  required?: boolean;
}

function getRpeColor(rpe: number): string {
  if (rpe <= 7) return colors.rpeLow;
  if (rpe <= 8.5) return colors.rpeMedium;
  return colors.rpeHigh;
}

export function RpeSelector({ value, onChange, required }: RpeSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>RPE{required ? ' *' : ''}</Text>
      <View style={styles.grid}>
        {RPE_VALUES.map((rpe) => {
          const isSelected = value === rpe;
          const rpeColor = getRpeColor(rpe);
          return (
            <Pressable
              key={rpe}
              onPress={() => onChange(rpe)}
              accessibilityLabel={`RPE ${rpe}`}
              style={[styles.chip, isSelected && { backgroundColor: rpeColor }]}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {Number.isInteger(rpe) ? rpe : rpe.toFixed(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: spacing.sm },
  label: { ...typography.footnote, color: colors.textSecondary, marginBottom: spacing.xs },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  chip: {
    minWidth: 40, height: 36, borderRadius: radius.sm,
    backgroundColor: colors.surfaceSecondary, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  chipText: { ...typography.callout, color: colors.textPrimary },
  chipTextSelected: { color: '#FFFFFF', fontWeight: '600' },
});
