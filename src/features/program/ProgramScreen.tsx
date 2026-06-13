import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, NumberField, SectionHeader, TextField } from '@/src/components/ui';
import type { CyclePhase, CurrentCycle, Program, ProgramDay } from '@/src/domain/types';
import { useDatabase } from '@/src/hooks/useDatabase';
import { confirmAction, showAlert } from '@/src/lib/alert';
import {
  createProgram,
  createProgramWeek,
  createProgramDay,
  createPlannedExercise,
  getPrograms,
  deleteProgram,
  getCurrentCycle,
  setCurrentCycle,
  deactivateCurrentCycle,
  getAllExercises,
  getProgramDaysForWeek,
} from '@/src/repositories';
import { requestPlanGeneration, isAIConfigured } from '@/src/services/aiService';
import { instantiateAndActivate } from '@/src/services/programInstantiation';
import { getCurrentTrainingMaxes } from '@/src/services/programInstantiation/trainingMaxes';
import type { CurrentTrainingMaxes } from '@/src/services/programInstantiation/trainingMaxes';
import { colors, radius, spacing, typography } from '@/src/theme';

type GoalType = 'hypertrophy' | 'strength' | 'maintenance' | 'powerbuilding';
type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
type VolumeTolerance = 'low' | 'medium' | 'high';
type IntensityPreference = 'conservative' | 'moderate' | 'aggressive';
type ProgressionStyle = 'rpe' | 'percentage' | 'double_progression';

const goalTypeOptions: Array<{ label: string; value: GoalType }> = [
  { label: 'program.hypertrophy', value: 'hypertrophy' },
  { label: 'program.strength', value: 'strength' },
  { label: 'program.maintenance', value: 'maintenance' },
  { label: 'program.powerbuilding', value: 'powerbuilding' },
];

const experienceOptions: Array<{ label: string; value: ExperienceLevel }> = [
  { label: 'program.beginner', value: 'beginner' },
  { label: 'program.intermediate', value: 'intermediate' },
  { label: 'program.advanced', value: 'advanced' },
];

const volumeOptions: Array<{ label: string; value: VolumeTolerance }> = [
  { label: 'programOpts.volumeLow', value: 'low' },
  { label: 'programOpts.volumeMedium', value: 'medium' },
  { label: 'programOpts.volumeHigh', value: 'high' },
];

const intensityOptions: Array<{ label: string; value: IntensityPreference }> = [
  { label: 'programOpts.intensityConservative', value: 'conservative' },
  { label: 'programOpts.intensityModerate', value: 'moderate' },
  { label: 'programOpts.intensityAggressive', value: 'aggressive' },
];

const progressionOptions: Array<{ label: string; value: ProgressionStyle }> = [
  { label: 'programOpts.progressionRpe', value: 'rpe' },
  { label: 'programOpts.progressionPercentage', value: 'percentage' },
  { label: 'programOpts.progressionDouble', value: 'double_progression' },
];

const weakPointOptions = ['programOpts.weakBenchLockout', 'programOpts.weakBenchOffChest', 'programOpts.weakSquatDepth', 'programOpts.weakSquatStrength', 'programOpts.weakDeadliftLockout', 'programOpts.weakDeadliftOffFloor', 'programOpts.weakQuads', 'programOpts.weakGlutes', 'programOpts.weakUpperBack', 'programOpts.weakShoulders', 'programOpts.weakArms'];
const equipmentOptions = ['programOpts.equipBarbell', 'programOpts.equipDumbbells', 'programOpts.equipCable', 'programOpts.equipMachines', 'programOpts.equipBodyweight', 'programOpts.equipBands', 'programOpts.equipFullGym', 'programOpts.equipHomeGym'];
const limitationOptions = ['programOpts.limitNoOHP', 'programOpts.limitNoLowBar', 'programOpts.limitNoSumo', 'programOpts.limitKnee', 'programOpts.limitShoulder', 'programOpts.limitLowerBack', 'programOpts.limitTime', 'programOpts.limitHighImpact'];

function SelectChips<T extends string>({ label, value, options, onChange, t }: { label: string; value: T; options: Array<{ label: string; value: T }>; onChange: (value: T) => void; t: (key: string) => string }) {
  return (
    <View style={styles.selectorBlock}>
      <Text style={styles.selectorLabel}>{label}</Text>
      <View style={styles.chipGrid}>
        {options.map((option) => (
          <Pressable key={option.value} onPress={() => onChange(option.value)} style={[styles.chip, value === option.value && styles.chipSelected]}>
            <Text style={[styles.chipText, value === option.value && styles.chipTextSelected]}>{t(option.label)}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function MultiSelectChips({ label, values, options, onChange, t }: { label: string; values: string[]; options: string[]; onChange: (values: string[]) => void; t: (key: string) => string }) {
  const toggle = (option: string) => {
    onChange(values.includes(option) ? values.filter((value) => value !== option) : [...values, option]);
  };

  return (
    <View style={styles.selectorBlock}>
      <Text style={styles.selectorLabel}>{label}</Text>
      <View style={styles.chipGrid}>
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <Pressable key={option} onPress={() => toggle(option)} style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{t(option)}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function ProgramScreen() {
  const { t } = useTranslation();
  const db = useDatabase();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [cycle, setCycle] = useState<CurrentCycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [activatingProgram, setActivatingProgram] = useState<Program | null>(null);
  const [weekOneDays, setWeekOneDays] = useState<ProgramDay[]>([]);
  const [pickingDayProgram, setPickingDayProgram] = useState<Program | null>(null);

  // Instantiation state
  const [showInstantiateModal, setShowInstantiateModal] = useState(false);
  const [instantiatingProgram, setInstantiatingProgram] = useState<Program | null>(null);
  const [instStartDate, setInstStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [instSquatMax, setInstSquatMax] = useState<number | null>(null);
  const [instBenchMax, setInstBenchMax] = useState<number | null>(null);
  const [instDeadliftMax, setInstDeadliftMax] = useState<number | null>(null);
  const [instantiating, setInstantiating] = useState(false);
  const [enableAiAdjustment, setEnableAiAdjustment] = useState(false);
  const [trainingMaxes, setTrainingMaxes] = useState<CurrentTrainingMaxes | null>(null);
  const [useTrainingMax, setUseTrainingMax] = useState(false);
  const [trainingMaxPercent, setTrainingMaxPercent] = useState<number | null>(90);

  // Form state
  const [goalType, setGoalType] = useState<GoalType>('strength');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('intermediate');
  const [daysPerWeek, setDaysPerWeek] = useState<number | null>(4);
  const [sessionDuration, setSessionDuration] = useState<number | null>(90);
  const [durationWeeks, setDurationWeeks] = useState<number | null>(6);
  const [includeDeload, setIncludeDeload] = useState(true);
  const [weakPoints, setWeakPoints] = useState<string[]>([]);
  const [availableEquipment, setAvailableEquipment] = useState<string[]>(['programOpts.equipFullGym']);
  const [limitations, setLimitations] = useState<string[]>([]);
  const [volumeTolerance, setVolumeTolerance] = useState<VolumeTolerance>('medium');
  const [intensityPreference, setIntensityPreference] = useState<IntensityPreference>('moderate');
  const [progressionStyle, setProgressionStyle] = useState<ProgressionStyle>('rpe');
  const [squatMax, setSquatMax] = useState<number | null>(null);
  const [benchMax, setBenchMax] = useState<number | null>(null);
  const [deadliftMax, setDeadliftMax] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    if (!db) return;
    setLoading(true);
    const [progs, activeCycle] = await Promise.all([
      getPrograms(db),
      getCurrentCycle(db),
    ]);
    setPrograms(progs);
    setCycle(activeCycle);
    setLoading(false);
  }, [db]);

  useEffect(() => { void refresh(); }, [refresh]);

  const handleGenerate = async () => {
    if (!db) return;
    if (!isAIConfigured()) {
      showAlert(t('program.aiNotConfiguredProgram'), t('common.aiNotConfiguredSetup'));
      return;
    }
    if (!squatMax || !benchMax || !deadliftMax) {
      showAlert(t('program.missingData'), t('program.missing1RMData'));
      return;
    }

    setGenerating(true);
    try {
      const result = await requestPlanGeneration({
        goalType,
        experienceLevel,
        trainingDaysPerWeek: daysPerWeek ?? 4,
        maxSessionDuration: sessionDuration ?? 90,
        durationWeeks: durationWeeks ?? 6,
        includesDeload: includeDeload,
        squatMax,
        benchMax,
        deadliftMax,
        weakPoints: weakPoints.length ? weakPoints : undefined,
        availableEquipment: availableEquipment.length ? availableEquipment : undefined,
        limitations: limitations.length ? limitations : undefined,
        volumeTolerance,
        intensityPreference,
        progressionStyle,
      });

      // Save program to database
      const program = await createProgram(db, {
        name: result.data.name,
        type: result.data.type,
        goal: goalType,
        source: 'ai_generated',
        durationWeeks: durationWeeks ?? 6,
        includesDeload: includeDeload,
        description: result.data.description,
        createdAt: new Date().toISOString(),
      });

      // Get all exercises for name matching
      const exercises = await getAllExercises(db);

      for (const week of result.data.weeks) {
        const savedWeek = await createProgramWeek(db, {
          programId: program.id,
          weekNumber: week.weekNumber,
          phase: week.phase as CyclePhase,
          focus: week.focus,
        });

        for (const day of week.days) {
          const savedDay = await createProgramDay(db, {
            programWeekId: savedWeek.id,
            dayNumber: day.dayNumber,
            title: day.title,
            mainFocus: day.mainFocus,
            estimatedDuration: day.estimatedDuration,
          });

          for (let i = 0; i < day.exercises.length; i++) {
            const ex = day.exercises[i];
            const match = exercises.find(
              (e) => e.nameEn.toLowerCase() === ex.exerciseNameEn.toLowerCase(),
            );
            const exerciseId = match?.id ?? 'unknown';

            await createPlannedExercise(db, {
              programDayId: savedDay.id,
              exerciseId,
              orderIndex: i,
              targetSets: ex.targetSets,
              targetReps: ex.targetReps,
              targetRpe: ex.targetRpe ?? undefined,
              targetPercent: ex.targetPercent ?? undefined,
              notes: ex.notes,
            });
          }
        }
      }

      setShowForm(false);
      showAlert(t('common.success'), t('programOpts.programCreated', { name: program.name }));
      await refresh();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      showAlert(t('program.generationFailed'), msg);
    } finally {
      setGenerating(false);
    }
  };

  const handleSetActive = async (program: Program) => {
    if (!db) return;

    // If a different cycle is already active, confirm replacement
    if (cycle && cycle.programId !== program.id) {
      const currentName = programs.find(p => p.id === cycle.programId)?.name ?? '未知计划';
      confirmAction(
        '替换当前激活周期',
        `当前已激活: ${currentName}\n是否替换为: ${program.name}？`,
        async () => {
          await doSetActive(program);
        },
      );
      return;
    }

    await doSetActive(program);
  };

  const doSetActive = async (program: Program) => {
    if (!db) return;
    if (program.requiresInstantiation) {
      setInstantiatingProgram(program);
      setShowInstantiateModal(true);
      const maxes = await getCurrentTrainingMaxes(db);
      setTrainingMaxes(maxes);
      setInstSquatMax(maxes.squat?.value && maxes.squat.value > 0 ? maxes.squat.value : null);
      setInstBenchMax(maxes.bench?.value && maxes.bench.value > 0 ? maxes.bench.value : null);
      setInstDeadliftMax(maxes.deadlift?.value && maxes.deadlift.value > 0 ? maxes.deadlift.value : null);
      return;
    }
    const days = await getProgramDaysForWeek(db, program.id, 1);
    if (days.length === 0) {
      showAlert(t('programOpts.noTrainingDays'), t('programOpts.noTrainingDaysHint'));
      return;
    }
    setWeekOneDays(days);
    setPickingDayProgram(program);
    setShowDayPicker(true);
  };

  const handleDelete = (program: Program) => {
    if (!db) return;
    confirmAction(t('program.deleteProgram'), t('programOpts.programDeleteConfirm', { name: program.name }), async () => {
      await deleteProgram(db, program.id);
      await refresh();
    });
  };

  const handleConfirmDay = async (dayNumber: number) => {
    if (!db || !pickingDayProgram) return;
    setShowDayPicker(false);
    setPickingDayProgram(null);
    const wasReplacing = cycle != null;
    await setCurrentCycle(db, {
      programId: pickingDayProgram.id,
      goal: pickingDayProgram.goal,
      currentWeek: 1,
      currentDay: dayNumber,
      currentPhase: 'entry',
      trainingDaysPerWeek: daysPerWeek ?? 4,
      startedAt: new Date().toISOString(),
      isActive: true,
    });
    await refresh();
    if (wasReplacing) {
      showAlert('已替换', '当前激活周期已替换为新的计划。');
    }
  };

  const handleInstantiate = async () => {
    if (!db || !instantiatingProgram) return;
    if (!instSquatMax || !instBenchMax || !instDeadliftMax) {
      showAlert('数据缺失', '请填写 Squat / Bench / Deadlift 三项基准值。');
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(instStartDate)) {
      showAlert('日期格式错误', '请输入 YYYY-MM-DD 格式的开始日期。');
      return;
    }

    // Outlier warnings (non-blocking)
    const warnings: string[] = [];
    if (instSquatMax < 50 || instSquatMax > 400) warnings.push(`Squat ${instSquatMax}kg 超出常见范围 (50-400)`);
    if (instBenchMax < 30 || instBenchMax > 300) warnings.push(`Bench ${instBenchMax}kg 超出常见范围 (30-300)`);
    if (instDeadliftMax < 60 || instDeadliftMax > 450) warnings.push(`Deadlift ${instDeadliftMax}kg 超出常见范围 (60-450)`);

    // Stale data warning
    const staleLifts: string[] = [];
    if (trainingMaxes?.squat?.staleDays && trainingMaxes.squat.staleDays > 60) staleLifts.push('Squat');
    if (trainingMaxes?.bench?.staleDays && trainingMaxes.bench.staleDays > 60) staleLifts.push('Bench');
    if (trainingMaxes?.deadlift?.staleDays && trainingMaxes.deadlift.staleDays > 60) staleLifts.push('Deadlift');
    if (staleLifts.length > 0) warnings.push(`${staleLifts.join('、')} 估算值较旧（>60天），建议确认后再生成`);

    const finalSquat = useTrainingMax ? instSquatMax * (trainingMaxPercent ?? 90) / 100 : instSquatMax;
    const finalBench = useTrainingMax ? instBenchMax * (trainingMaxPercent ?? 90) / 100 : instBenchMax;
    const finalDeadlift = useTrainingMax ? instDeadliftMax * (trainingMaxPercent ?? 90) / 100 : instDeadliftMax;

    setInstantiating(true);
    try {
      await instantiateAndActivate(db, {
        templateProgramId: instantiatingProgram.id,
        startDate: instStartDate,
        userMaxes: { squat: finalSquat, bench: finalBench, deadlift: finalDeadlift },
        scheduleOffsets: [0, 1, 3, 4],
        trainingDaysPerWeek: 4,
        enableAiFatigueAdjustment: enableAiAdjustment,
        adjustmentWeeks: 2,
      });
      setShowInstantiateModal(false);
      const wasReplacing = cycle != null && cycle.programId !== instantiatingProgram.id;
      const aiNote = enableAiAdjustment ? '\nAI 疲劳微调已启用（前 2 周）' : '';
      const replaceNote = wasReplacing ? '\n已替换当前激活周期' : '';
      showAlert('计划已生成', 
        `${instantiatingProgram.name} 已实例化\n` +
        `Squat: ${instSquatMax}kg · Bench: ${instBenchMax}kg · Deadlift: ${instDeadliftMax}kg\n` +
        `从 ${instStartDate} 开始，共 33 周，已排入日历。${aiNote}${replaceNote}`
      );
      await refresh();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      showAlert('Instantiation failed', msg);
    } finally {
      setInstantiating(false);
    }
  };

  const handleDeactivate = () => {
    if (!db) return;
    confirmAction(t('program.endCycle'), t('programOpts.cycleDeactivateConfirm'), async () => {
      await deactivateCurrentCycle(db);
      await refresh();
    });
  };

  if (!db || loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{t('program.programBuilder')}</Text>
          <Text style={styles.title}>{t('nav.program')}</Text>
          <Text style={styles.subtitle}>{t('programOpts.heroSubtitle')}</Text>
        </View>

        {/* Current Cycle */}
        <SectionHeader title={t('home.currentCycle')} subtitle={t('programOpts.activeBlockHint')} />
        {cycle ? (
          <Card variant="elevated" style={styles.card}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardKicker}>{t('programOpts.activeBlock')}</Text>
              <Text style={styles.statusPill}>{t('programOpts.week')} {cycle.currentWeek}</Text>
            </View>
            <Text style={styles.cycleName}>
              {programs.find((p) => p.id === cycle.programId)?.name ?? t('programOpts.unknown')}
            </Text>
            <Text style={styles.cycleDetail}>
              {t('programOpts.week')} {cycle.currentWeek} • {t('programOpts.phase')}: {cycle.currentPhase}
            </Text>
            <View style={styles.cycleActions}>
              <Button title={t('program.stopActivePlan')} onPress={handleDeactivate} variant="danger" size="md" fullWidth />
            </View>
          </Card>
        ) : (
          <Card variant="tonal" style={styles.card}>
            <Text style={styles.emptyText}>{t('home.noActiveProgram')}</Text>
          </Card>
        )}

        {/* Generate Button */}
        <SectionHeader title={t('program.aiProgramGenerator')} subtitle={t('programOpts.createNewCycle')} />
        <Card variant="coach" style={styles.card}>
          <Text style={styles.programDesc}>{t('programOpts.aiDraftHint')}</Text>
          <Button
            title={t('program.generateAIProgram')}
            onPress={() => setShowForm(true)}
            variant="primary"
            fullWidth
          />
        </Card>

        {/* Program Library */}
        <SectionHeader title={t('program.programLibrary')} subtitle={`${programs.length} ${t('programOpts.savedProgram')}${programs.length === 1 ? '' : 's'}`} />
        {programs.length === 0 ? (
          <Card variant="outlined" style={styles.card}>
            <Text style={styles.emptyText}>{t('programOpts.noSavedPrograms')}</Text>
          </Card>
        ) : (
          programs.map((program) => (
            <Card key={program.id} style={styles.card} variant="outlined">
              <View style={styles.cardTopRow}>
                <Text style={styles.cardKicker}>{program.source === 'imported_excel' ? 'Excel 导入' : program.source === 'manual' ? '手动创建' : program.source.replace('_', ' ')}</Text>
                <Text style={styles.statusPill}>{program.durationWeeks} {t('programOpts.weeks')}</Text>
              </View>
              <Text style={styles.programName}>{program.id.startsWith('seed-program-') ? t(`seedPrograms.${program.id}.name`) : program.name}</Text>
              <Text style={styles.programMeta}>
                {t(`program.${program.type}`)} • {program.durationWeeks} {t('programOpts.weeks')} • {program.source === 'imported_excel' ? 'Excel 导入' : '手动创建'}
              </Text>
              {program.goal && (
                <Text style={styles.programGoal}>{program.id.startsWith('seed-program-') ? t(`seedPrograms.${program.id}.goal`) : program.goal}</Text>
              )}
              {program.description && (
                <Text style={styles.programDesc}>{program.id.startsWith('seed-program-') ? t(`seedPrograms.${program.id}.description`) : program.description}</Text>
              )}
              <View style={styles.programActions}>
                {cycle?.programId === program.id ? (
                  <Text style={styles.activeIndicator}>当前已激活</Text>
                ) : (
                  <Button
                    title={program.requiresInstantiation ? '生成并激活' : t('program.setActive')}
                    onPress={() => handleSetActive(program)}
                    variant="secondary"
                    size="sm"
                  />
                )}
                <Button
                    title={t('common.delete')}
                  onPress={() => handleDelete(program)}
                  variant="ghost"
                  size="sm"
                />
              </View>
            </Card>
          ))
        )}
      </ScrollView>

      {/* Generation Form Modal */}
      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalKicker}>{t('program.aiProgramGenerator')}</Text>
                <Text style={styles.modalTitle}>{t('program.generateProgram')}</Text>
              </View>
              <Pressable onPress={() => setShowForm(false)} accessibilityRole="button">
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </Pressable>
            </View>

            <Card variant="elevated" style={styles.card}>
              <SelectChips label={t('program.goal')} value={goalType} options={goalTypeOptions} onChange={setGoalType} t={t} />
              <SelectChips label={t('program.experience')} value={experienceLevel} options={experienceOptions} onChange={setExperienceLevel} t={t} />
              <NumberField label={t('programOpts.daysPerWeek')} value={daysPerWeek} onChangeValue={setDaysPerWeek} step={1} min={2} max={6} />
              <NumberField label={t('programOpts.sessionDuration')} value={sessionDuration} onChangeValue={setSessionDuration} step={5} min={45} max={150} unit="min" />
              <NumberField label={t('programOpts.programWeeks')} value={durationWeeks} onChangeValue={setDurationWeeks} step={1} min={3} max={16} />
              <MultiSelectChips label={t('program.weakPoints')} values={weakPoints} options={weakPointOptions} onChange={setWeakPoints} t={t} />
              <MultiSelectChips label={t('program.availableEquipment')} values={availableEquipment} options={equipmentOptions} onChange={setAvailableEquipment} t={t} />
              <MultiSelectChips label={t('program.limitations')} values={limitations} options={limitationOptions} onChange={setLimitations} t={t} />
              <SelectChips label={t('program.volume')} value={volumeTolerance} options={volumeOptions} onChange={setVolumeTolerance} t={t} />
              <SelectChips label={t('program.intensity')} value={intensityPreference} options={intensityOptions} onChange={setIntensityPreference} t={t} />
              <SelectChips label={t('program.progression')} value={progressionStyle} options={progressionOptions} onChange={setProgressionStyle} t={t} />
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>{t('program.includeDeloadWeek')}</Text>
                <Switch value={includeDeload} onValueChange={setIncludeDeload} trackColor={{ true: colors.primary }} />
              </View>
            </Card>

            <SectionHeader title={t('program.current1RM')} subtitle={t('programOpts.anchorPercentages')} />
            <Card style={styles.card}>
              <NumberField label={t('analytics.squat')} value={squatMax} onChangeValue={setSquatMax} step={2.5} min={0} unit="kg" />
              <NumberField label={t('analytics.bench')} value={benchMax} onChangeValue={setBenchMax} step={2.5} min={0} unit="kg" />
              <NumberField label={t('analytics.deadlift')} value={deadliftMax} onChangeValue={setDeadliftMax} step={2.5} min={0} unit="kg" />
            </Card>

            <Button
              title={generating ? t('program.generating') : t('program.generateProgram')}
              onPress={() => void handleGenerate()}
              loading={generating}
              disabled={generating}
              fullWidth
            />
            {generating && (
              <Text style={styles.generatingHint}>{t('programOpts.generatingHint')}</Text>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Day Picker Modal */}
      <Modal visible={showDayPicker} animationType="slide" presentationStyle="pageSheet" transparent>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalKicker}>{t('program.setActive')}</Text>
                <Text style={styles.modalTitle}>{t('programOpts.pickStartingDay')}</Text>
              </View>
              <Pressable onPress={() => { setShowDayPicker(false); setPickingDayProgram(null); }} accessibilityRole="button">
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </Pressable>
            </View>
            <Text style={styles.pickDayHint}>{t('programOpts.pickDayHint', { name: pickingDayProgram?.name ?? '' })}</Text>
            {weekOneDays.length === 0 ? (
              <Card variant="tonal" style={styles.card}>
                <Text style={styles.emptyText}>{t('programOpts.noTrainingDays')}</Text>
                <Text style={{ ...typography.footnote, color: colors.textTertiary, marginTop: spacing.xs }}>{t('programOpts.noTrainingDaysHint')}</Text>
              </Card>
            ) : (
            weekOneDays.map((day) => (
              <Pressable
                key={day.id}
                onPress={() => void handleConfirmDay(day.dayNumber)}
                style={styles.dayCard}
              >
                <Text style={styles.dayCardTitle}>Day {day.dayNumber}: {day.title}</Text>
                {day.mainFocus && <Text style={styles.dayCardFocus}>{day.mainFocus}</Text>}
                {day.estimatedDuration && (
                  <Text style={styles.dayCardDuration}>~{day.estimatedDuration} min</Text>
                )}
              </Pressable>
            ))
            )}
          </View>
        </SafeAreaView>
      </Modal>

      {/* Instantiate Modal */}
      <Modal visible={showInstantiateModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalKicker}>生成并激活</Text>
                <Text style={styles.modalTitle}>{instantiatingProgram?.name ?? ''}</Text>
              </View>
              <Pressable onPress={() => { setShowInstantiateModal(false); setInstantiatingProgram(null); }}>
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </Pressable>
            </View>
            <Card style={styles.card}>
              <TextField label="Start date (YYYY-MM-DD)" value={instStartDate} onChangeText={setInstStartDate} placeholder="2026-06-12" />

              <Text style={styles.sectionKicker}>当前能力基准</Text>
              <Text style={{ ...typography.footnote, color: colors.textSecondary, marginBottom: spacing.sm }}>
                已自动读取分析页 e1RM，可手动修改
              </Text>

              <NumberField label="Squat (kg)" value={instSquatMax} onChangeValue={setInstSquatMax} step={2.5} min={20} />
              <Text style={styles.sourceHint}>
                {trainingMaxes?.squat?.source === 'analytics_e1rm' ? '来自分析估算 e1RM' :
                 trainingMaxes?.squat?.source === 'manual_1rm' ? '来自手动 1RM' :
                 '暂无数据，请手动输入'}
                {trainingMaxes?.squat?.staleDays && trainingMaxes.squat.staleDays > 60 && ' · 估算值较旧，请确认'}
              </Text>

              <NumberField label="Bench (kg)" value={instBenchMax} onChangeValue={setInstBenchMax} step={2.5} min={20} />
              <Text style={styles.sourceHint}>
                {trainingMaxes?.bench?.source === 'analytics_e1rm' ? '来自分析估算 e1RM' :
                 trainingMaxes?.bench?.source === 'manual_1rm' ? '来自手动 1RM' :
                 '暂无数据，请手动输入'}
                {trainingMaxes?.bench?.staleDays && trainingMaxes.bench.staleDays > 60 && ' · 估算值较旧，请确认'}
              </Text>

              <NumberField label="Deadlift (kg)" value={instDeadliftMax} onChangeValue={setInstDeadliftMax} step={2.5} min={20} />
              <Text style={styles.sourceHint}>
                {trainingMaxes?.deadlift?.source === 'analytics_e1rm' ? '来自分析估算 e1RM' :
                 trainingMaxes?.deadlift?.source === 'manual_1rm' ? '来自手动 1RM' :
                 '暂无数据，请手动输入'}
                {trainingMaxes?.deadlift?.staleDays && trainingMaxes.deadlift.staleDays > 60 && ' · 估算值较旧，请确认'}
              </Text>

              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.switchLabel}>使用 Training Max</Text>
                  <Text style={{ ...typography.footnote, color: colors.textSecondary }}>
                    {useTrainingMax ? `e1RM × ${trainingMaxPercent ?? 90}% = ${Math.round(instSquatMax ?? 0 * (trainingMaxPercent ?? 90) / 100)}kg / ${Math.round(instBenchMax ?? 0 * (trainingMaxPercent ?? 90) / 100)}kg / ${Math.round(instDeadliftMax ?? 0 * (trainingMaxPercent ?? 90) / 100)}kg` : '直接使用上方 e1RM 作为换算基准'}
                  </Text>
                </View>
                <Switch value={useTrainingMax} onValueChange={setUseTrainingMax} trackColor={{ true: colors.primary }} />
              </View>
              {useTrainingMax && (
                <NumberField label="Training Max 百分比" value={trainingMaxPercent} onChangeValue={setTrainingMaxPercent} step={1} min={80} max={100} />
              )}

              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.switchLabel}>AI 疲劳微调</Text>
                  <Text style={{ ...typography.footnote, color: colors.textSecondary }}>仅调整前 1-2 周重量，不改变计划结构</Text>
                </View>
                <Switch value={enableAiAdjustment} onValueChange={setEnableAiAdjustment} trackColor={{ true: colors.primary }} />
              </View>
              <Text style={{ ...typography.footnote, color: colors.textSecondary, marginTop: spacing.sm }}>
                Schedule: Mon/Tue/Thu/Fri each week.
              </Text>
            </Card>
            <Button
              title={instantiating ? 'Instantiating...' : '生成并激活'}
              onPress={() => void handleInstantiate()}
              loading={instantiating}
              disabled={instantiating}
              fullWidth
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.dockBottomInset,
    gap: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  loadingText: {
    ...typography.subhead,
    color: colors.textSecondary,
  },
  hero: { paddingTop: spacing.lg, paddingBottom: spacing.sm },
  eyebrow: { ...typography.overline, color: colors.primary, marginBottom: spacing.xs },
  title: {
    ...typography.largeTitle,
    color: colors.textPrimary,
  },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs, lineHeight: 22 },
  card: {
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  cardKicker: { ...typography.overline, color: colors.primary },
  statusPill: { ...typography.caption, color: colors.recovery, fontWeight: '800', backgroundColor: colors.successSoft, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, overflow: 'hidden' },
  cycleName: {
    ...typography.title3,
    color: colors.textPrimary,
  },
  cycleDetail: {
    ...typography.subhead,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  cycleActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  programName: {
    ...typography.headline,
    color: colors.textPrimary,
    marginTop: -spacing.xs,
  },
  programMeta: {
    ...typography.footnote,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  programGoal: {
    ...typography.footnote,
    color: colors.primary,
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
  programDesc: {
    ...typography.subhead,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  programActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.title2,
    color: colors.textPrimary,
  },
  modalKicker: { ...typography.overline, color: colors.primary, marginBottom: 2 },
  cancelText: {
    ...typography.body,
    color: colors.primary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  switchLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  sectionKicker: { ...typography.overline, color: colors.primary, marginTop: spacing.md, marginBottom: spacing.xs },
  sourceHint: { ...typography.caption, color: colors.textTertiary, marginTop: -spacing.sm, marginBottom: spacing.sm },
  activeIndicator: { ...typography.footnote, color: colors.success, fontWeight: '800', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  selectorBlock: { gap: spacing.sm },
  selectorLabel: { ...typography.subhead, color: colors.textSecondary, fontWeight: '700' },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { borderWidth: 1, borderColor: colors.borderLight, backgroundColor: colors.surfaceMuted, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  chipSelected: { borderColor: colors.primaryBorder, backgroundColor: colors.primarySoft },
  chipText: { ...typography.footnote, color: colors.textSecondary, fontWeight: '700' },
  chipTextSelected: { color: colors.primary },
  generatingHint: {
    ...typography.footnote,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  pickDayHint: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  dayCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  dayCardTitle: {
    ...typography.headline,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  dayCardFocus: {
    ...typography.subhead,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  dayCardDuration: {
    ...typography.footnote,
    color: colors.textTertiary,
  },
});
