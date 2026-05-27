import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { radius } from '@/src/theme/radius';

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  color?: string;
  detail?: string;
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'coach';
  style?: ViewStyle;
}

const toneColor = {
  default: colors.primarySoft,
  success: colors.successSoft,
  warning: colors.warningSoft,
  danger: colors.dangerSoft,
  coach: colors.coachSoft,
};

export function MetricCard({ label, value, unit, color, detail, tone = 'default', style }: MetricCardProps) {
  return (
    <View style={[styles.container, { backgroundColor: toneColor[tone] }, style]}>
      <View style={styles.valueLine}>
        <Text style={[styles.value, color ? { color } : undefined]}>
          {value}
        </Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
      <Text style={styles.label} numberOfLines={2}>{label}</Text>
      {detail ? <Text style={styles.detail} numberOfLines={2}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    minWidth: 0,
    flexShrink: 1,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 1,
  },
  valueLine: {
    width: '100%',
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 1,
    flexWrap: 'nowrap',
  },
  value: {
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.4,
    color: colors.textPrimary,
    flexShrink: 1,
    minWidth: 0,
    textAlign: 'center',
  },
  unit: {
    fontSize: 10,
    color: colors.textSecondary,
    flexShrink: 0,
    fontWeight: '800',
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontWeight: '700',
    textAlign: 'center',
  },
  detail: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
    textAlign: 'center',
  },
});
