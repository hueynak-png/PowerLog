import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  action?: { text: string; onPress: () => void };
}

export function SectionHeader({ title, eyebrow, subtitle, action }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {action && (
        <Pressable onPress={action.onPress} accessibilityRole="button">
          <Text style={styles.action}>{action.text}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  copy: { flex: 1, paddingRight: spacing.md },
  eyebrow: { ...typography.overline, color: colors.primary, marginBottom: 2 },
  title: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  subtitle: { ...typography.footnote, color: colors.textSecondary, marginTop: 2, lineHeight: 18 },
  action: {
    ...typography.subhead,
    color: colors.primary,
  },
});
