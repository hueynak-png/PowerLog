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
      <Text style={styles.text}>{formatTimer(elapsedSeconds)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignSelf: 'center',
  },
  running: { backgroundColor: colors.success + '18' },
  text: { ...typography.headline, color: colors.textPrimary, fontVariant: ['tabular-nums'] },
});
