import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import type { Exercise, LiftFamily } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { getAllExercises } from '@/src/repositories/exerciseRepository';
import { useActiveWorkoutStore } from '@/src/stores/useActiveWorkoutStore';
import { colors } from '@/src/theme/colors';
import { radius } from '@/src/theme/radius';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface ExercisePickerModalProps {
  onSelect?: () => void;
}

const familyOrder: LiftFamily[] = ['squat', 'bench', 'deadlift', 'upper', 'lower', 'accessory'];

export function ExercisePickerModal({ onSelect }: ExercisePickerModalProps) {
  const { t } = useTranslation();
  const db = useDatabase();
  const addExercise = useActiveWorkoutStore((state) => state.addExercise);
  const [query, setQuery] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      return;
    }

    let mounted = true;
    setIsLoading(true);
    getAllExercises(db)
      .then((items) => {
        if (mounted) {
          setExercises(items);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [db]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return exercises;
    }

    return exercises.filter(
      (exercise) =>
        exercise.nameEn.toLowerCase().includes(normalized) ||
        exercise.nameZh.toLowerCase().includes(normalized) ||
        exercise.liftFamily.toLowerCase().includes(normalized),
    );
  }, [exercises, query]);

  const grouped = useMemo(
    () =>
      familyOrder
        .map((family) => ({ family, items: filtered.filter((exercise) => exercise.liftFamily === family) }))
        .filter((group) => group.items.length > 0),
    [filtered],
  );

  const handleSelect = async (exerciseId: string) => {
    if (!db || selectedId) {
      return;
    }

    setSelectedId(exerciseId);
    try {
      await addExercise(db, exerciseId);
      onSelect?.();
    } finally {
      setSelectedId(null);
    }
  };

  return (
    <Card variant="outlined" style={styles.container}>
      <Text style={styles.title}>{t('workout.addExercise')}</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={t('settingsExtras.searchExerciseHint')}
        placeholderTextColor={colors.textTertiary}
        style={styles.search}
      />
      {isLoading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <ScrollView style={styles.list} nestedScrollEnabled keyboardShouldPersistTaps="handled">
          {grouped.map((group) => (
            <View key={group.family} style={styles.group}>
              <Text style={styles.groupTitle}>{group.family.replace('_', ' ')}</Text>
              {group.items.map((exercise) => (
                <Pressable
                  key={exercise.id}
                  onPress={() => void handleSelect(exercise.id)}
                  disabled={Boolean(selectedId)}
                  style={({ pressed }) => [styles.item, pressed && styles.pressed]}
                >
                  <View style={styles.itemText}>
                    <Text style={styles.nameEn}>{exercise.nameEn}</Text>
                    <Text style={styles.nameZh}>{exercise.nameZh}</Text>
                  </View>
                  <Text style={styles.role}>{selectedId === exercise.id ? t('workout.adding') : exercise.role}</Text>
                </Pressable>
              ))}
            </View>
          ))}
          {filtered.length === 0 && <Text style={styles.empty}>{t('settingsExtras.noExercisesFound')}</Text>}
        </ScrollView>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  title: { ...typography.headline, color: colors.textPrimary },
  search: {
    ...typography.callout,
    backgroundColor: colors.surfaceSecondary,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.textPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  list: { maxHeight: 360 },
  group: { marginBottom: spacing.md },
  groupTitle: { ...typography.caption, color: colors.textTertiary, fontWeight: '700', marginBottom: spacing.xs, textTransform: 'uppercase' },
  item: { alignItems: 'center', borderBottomColor: colors.borderLight, borderBottomWidth: 1, flexDirection: 'row', paddingVertical: spacing.md },
  pressed: { opacity: 0.65 },
  itemText: { flex: 1 },
  nameEn: { ...typography.callout, color: colors.textPrimary, fontWeight: '600' },
  nameZh: { ...typography.footnote, color: colors.textSecondary, marginTop: 2 },
  role: { ...typography.caption, color: colors.primary, textTransform: 'capitalize' },
  empty: { ...typography.callout, color: colors.textSecondary, paddingVertical: spacing.lg, textAlign: 'center' },
});
