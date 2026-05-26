import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { radius } from '@/src/theme/radius';

interface ExerciseCardProps {
  exerciseNameEn: string;
  exerciseNameZh: string;
  category?: string;
  muscleGroups?: string[];
  plannedSummary?: string;
  progress?: string;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export function ExerciseCard({
  exerciseNameEn, exerciseNameZh, category, muscleGroups,
  plannedSummary, progress, isExpanded, onToggle, children,
}: ExerciseCardProps) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onToggle} style={styles.header} accessibilityRole="button"
        accessibilityLabel={`${exerciseNameEn} ${isExpanded ? 'collapse' : 'expand'}`}>
        <View style={styles.headerLeft}>
          <Text style={styles.nameEn}>{exerciseNameEn}</Text>
          <Text style={styles.nameZh}>{exerciseNameZh}</Text>
          {plannedSummary && <Text style={styles.plan}>{plannedSummary}</Text>}
        </View>
        <View style={styles.headerRight}>
          {progress && <Text style={styles.progress}>{progress}</Text>}
          <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
        </View>
      </Pressable>
      {isExpanded && <View style={styles.body}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    marginBottom: spacing.md, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: spacing.lg, minHeight: 70,
  },
  headerLeft: { flex: 1 },
  headerRight: { alignItems: 'flex-end', marginLeft: spacing.md },
  nameEn: { ...typography.headline, color: colors.textPrimary },
  nameZh: { ...typography.footnote, color: colors.textSecondary, marginTop: 2 },
  plan: { ...typography.caption, color: colors.textTertiary, marginTop: spacing.xs },
  progress: { ...typography.subhead, color: colors.primary, marginBottom: 2 },
  chevron: { fontSize: 12, color: colors.textTertiary },
  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
});
