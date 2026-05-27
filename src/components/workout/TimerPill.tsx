import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { radius } from '@/src/theme/radius';
import { spacing } from '@/src/theme/spacing';

interface TimerPillProps {
  elapsedSeconds: number;
  isRunning: boolean;
}

function formatTimer(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function TimerPill({ elapsedSeconds, isRunning }: TimerPillProps) {
  return (
    <View style={[styles.pill, isRunning && styles.running]}>
      <View style={[styles.dot, isRunning && styles.runningDot]} />
      <Text style={styles.text}>{formatTimer(elapsedSeconds)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  running: { backgroundColor: colors.successSoft, borderColor: colors.successBorder },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.textTertiary },
  runningDot: { backgroundColor: colors.success },
  text: { ...typography.headline, color: colors.textPrimary, fontVariant: ['tabular-nums'] },
});
