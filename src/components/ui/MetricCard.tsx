import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
}

const toneColor = {
  default: colors.primarySoft,
  success: colors.successSoft,
  warning: colors.warningSoft,
  danger: colors.dangerSoft,
  coach: colors.coachSoft,
};

export function MetricCard({ label, value, unit, color, detail, tone = 'default' }: MetricCardProps) {
  return (
    <View style={[styles.container, { backgroundColor: toneColor[tone] }]}>
      <Text style={[styles.value, color ? { color } : undefined]}>
        {value}
        {unit ? <Text style={styles.unit}> {unit}</Text> : null}
      </Text>
      <Text style={styles.label}>{label}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    minWidth: 90,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 1,
  },
  value: {
    ...typography.metric,
    color: colors.textPrimary,
  },
  unit: {
    ...typography.subhead,
    color: colors.textSecondary,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontWeight: '700',
  },
  detail: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
    textAlign: 'center',
  },
});
