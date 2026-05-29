import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
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
  headerAction?: React.ReactNode;
  children?: React.ReactNode;
}

export function ExerciseCard({
  exerciseNameEn, exerciseNameZh, category, muscleGroups,
  plannedSummary, progress, isExpanded, onToggle, headerAction, children,
}: ExerciseCardProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      <Pressable onPress={onToggle} style={styles.header} accessibilityRole="button"
        accessibilityLabel={`${exerciseNameEn} ${isExpanded ? t('exerciseCard.collapse') : t('exerciseCard.expand')}`}>
        <View style={styles.headerLeft}>
          <View style={styles.metaRow}>
            {category && <Text style={styles.metaPill}>{category}</Text>}
            {muscleGroups?.slice(0, 2).map((group) => <Text key={group} style={styles.musclePill}>{group}</Text>)}
          </View>
          <Text style={styles.nameEn}>{exerciseNameEn}</Text>
          <View style={styles.nameRow}>
            <Text style={styles.nameZh}>{exerciseNameZh}</Text>
            {headerAction}
          </View>
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
    backgroundColor: colors.surface, borderRadius: radius.xl,
    marginBottom: spacing.md, overflow: 'hidden',
    borderWidth: 1, borderColor: colors.borderLight,
    shadowColor: colors.shadow, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1, shadowRadius: 18, elevation: 1,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: spacing.lg, minHeight: 70,
  },
  headerLeft: { flex: 1 },
  headerRight: { alignItems: 'flex-end', marginLeft: spacing.md },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.sm },
  metaPill: { ...typography.caption, color: colors.primary, fontWeight: '800', backgroundColor: colors.primarySoft, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 2, overflow: 'hidden' },
  musclePill: { ...typography.caption, color: colors.textSecondary, fontWeight: '700', backgroundColor: colors.surfaceMuted, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 2, overflow: 'hidden' },
  nameEn: { ...typography.headline, color: colors.textPrimary },
  nameZh: { ...typography.footnote, color: colors.textSecondary, marginTop: 2 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  plan: { ...typography.caption, color: colors.textTertiary, marginTop: spacing.xs },
  progress: { ...typography.headline, color: colors.primary, backgroundColor: colors.primarySoft, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, overflow: 'hidden', marginBottom: spacing.xs },
  chevron: { fontSize: 12, color: colors.textTertiary },
  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
});
