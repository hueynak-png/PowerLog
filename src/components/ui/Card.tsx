import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { radius } from '@/src/theme/radius';
import { GlassView } from './GlassView';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  variant?: 'default' | 'outlined' | 'elevated' | 'coach' | 'tonal' | 'glass';
}

export function Card({ children, style, padding = spacing.lg, variant = 'default' }: CardProps) {
  if (variant === 'glass') {
    return (
      <GlassView style={style}>
        <View style={{ padding }}>{children}</View>
      </GlassView>
    );
  }

  return (
    <View style={[styles.card, styles[variant], { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 1,
  },
  default: {},
  outlined: {
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  elevated: {
    borderColor: colors.surface,
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 28,
    elevation: 3,
  },
  coach: {
    backgroundColor: colors.coachSoft,
    borderColor: colors.coachBorder,
  },
  tonal: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.borderLight,
  },
});
