import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { radius } from '@/src/theme/radius';

interface CompletionBadgeProps {
  completed: boolean;
  size?: 'sm' | 'md';
}

export function CompletionBadge({ completed, size = 'md' }: CompletionBadgeProps) {
  const dim = size === 'sm' ? 24 : 32;
  return (
    <View style={[styles.circle, { width: dim, height: dim, borderRadius: dim / 2 }, completed && styles.completed]}>
      {completed && <Text style={[styles.check, size === 'sm' && styles.checkSm]}>✓</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderWidth: 2, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  completed: { backgroundColor: colors.success, borderColor: colors.success },
  check: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  checkSm: { fontSize: 12 },
});
