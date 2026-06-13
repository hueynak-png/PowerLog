import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';
import type { Program, PlannedSet } from '@/src/domain/types';
import {
  createProgram,
  createProgramWeek,
  createProgramDay,
  createPlannedExercise,
  createPlannedSets,
  setCurrentCycle,
  getProgram,
  getPlannedSets,
  getPlannedSetsForProgram,
  updatePlannedSetLoad,
} from '@/src/repositories/programRepository';
import type { InstantiationOptions, InstantiationResult } from './types';
import { resolveStrategy, registerStrategy } from './registry';
import { preserveStructureRecalculateLoads } from './strategies/preserveStructureRecalculateLoads';
import { sanitizeAndApplyAdjustments, buildAdjustmentSummary } from './fatigueAdjustment';
import type { SanitizedAdjustment } from './fatigueAdjustment';
import { requestFatigueAdjustment } from '@/src/services/aiService';

registerStrategy(preserveStructureRecalculateLoads);

export { registerStrategy, resolveStrategy } from './registry';
export type { InstantiationOptions, InstantiationResult, UserMaxes, UserState } from './types';

export const instantiateAndActivate = async (
  db: SQLiteDatabase,
  options: InstantiationOptions,
): Promise<Program> => {
  const template = await getProgram(db, options.templateProgramId);
  if (!template) throw new Error(`Template not found: ${options.templateProgramId}`);

  const strategy = resolveStrategy(template.id);

  if (!strategy) {
    throw new Error(
      `No instantiation strategy for template "${template.name}". ` +
      `Expected ID "${template.id}" to resolve to a registered strategy.`,
    );
  }

  const result = await strategy.instantiate(db, options);

  const program = await createProgram(db, {
    ...result.program,
    source: result.program.source as Program['source'],
  });
  console.log(`[instantiate] New program ID: ${program.id}`);

  let dayCount = 0;
  for (const instWeek of result.weeks) {
    const week = await createProgramWeek(db, {
      programId: program.id,
      weekNumber: instWeek.week.weekNumber,
      phase: instWeek.week.phase,
      focus: instWeek.week.focus,
      notes: instWeek.week.notes,
    });

    for (const instDay of instWeek.days) {
      const day = await createProgramDay(db, {
        programWeekId: week.id,
        dayNumber: instDay.day.dayNumber,
        title: instDay.day.title,
        mainFocus: instDay.day.mainFocus,
        estimatedDuration: instDay.day.estimatedDuration,
        scheduledDate: instDay.day.scheduledDate,
          });
          dayCount++;

          for (const instEx of instDay.exercises) {
        const plannedEx = await createPlannedExercise(db, {
          programDayId: day.id,
          exerciseId: instEx.exercise.exerciseId,
          orderIndex: instEx.exercise.orderIndex,
          targetSets: instEx.exercise.targetSets,
          targetReps: instEx.exercise.targetReps,
          targetRepRange: instEx.exercise.targetRepRange,
          targetLoad: instEx.exercise.targetLoad,
          targetRpe: instEx.exercise.targetRpe,
          targetPercent: instEx.exercise.targetPercent,
          accessoryCategory: instEx.exercise.accessoryCategory,
          notes: instEx.exercise.notes,
        });

        if (instEx.sets.length > 0) {
          await createPlannedSets(db, plannedEx.id, instEx.sets.map(s => ({
            setNumber: s.setNumber,
            setLabel: s.setLabel,
            targetReps: s.targetReps,
            targetRepRange: s.targetRepRange,
            targetLoad: s.targetLoad,
            targetRpe: s.targetRpe,
            targetPercent: s.targetPercent,
            baseTargetLoad: s.baseTargetLoad,
            notes: s.notes,
          })));
        }
      }
    }
  }

  let adjustmentSummary = '';
  const enableAdjustment = options.enableAiFatigueAdjustment ?? false;

  console.log(`[instantiate] Created ${dayCount} program days for program ${program.id}`);
  const adjustWeeks = options.adjustmentWeeks ?? 2;

  if (enableAdjustment) {
    try {
      const recentSets = await getPlannedSetsForProgram(db, program.id, adjustWeeks * 4 * 10);

      const previewSets = recentSets.map((ps: PlannedSet) => ({
        plannedSetId: ps.id,
        weekNumber: 0,
        dayNumber: 0,
        scheduledDate: '',
        exerciseName: '',
        liftFamily: 'unknown',
        role: '',
        setLabel: ps.setLabel ?? 'Set',
        targetReps: ps.targetReps,
        targetRepRange: ps.targetRepRange,
        targetLoad: ps.targetLoad,
        targetRpe: ps.targetRpe,
        targetPercent: ps.targetPercent,
      }));

      const aiResponse = await requestFatigueAdjustment({
        programId: program.id,
        strategy: 'preserve_structure_recalculate_loads',
        adjustmentWindow: {
          startDate: options.startDate,
          endDate: '',
          startWeek: options.startWeek ?? 1,
          weeksToAdjust: adjustWeeks,
        },
        userMaxes: options.userMaxes ?? {},
        plannedSetsPreview: previewSets,
      });

      const sanitized = sanitizeAndApplyAdjustments(recentSets, aiResponse.adjustments);

      for (const adj of sanitized) {
        await updatePlannedSetLoad(
          db, adj.set.id, adj.newTargetLoad ?? adj.set.targetLoad ?? 0,
          adj.loadMultiplier, adj.reason, 'ai_fatigue',
        );
      }

      adjustmentSummary = buildAdjustmentSummary(sanitized);
    } catch {
      adjustmentSummary = '';
    }
  }

  const startWeek = options.startWeek ?? 1;
  const startDay = options.startDay ?? 1;
  const firstWeek = result.weeks[0];

  await setCurrentCycle(db, {
    programId: program.id,
    goal: program.goal,
    currentWeek: startWeek,
    currentDay: startDay,
    currentPhase: firstWeek?.week.phase ?? 'entry',
    trainingDaysPerWeek: options.trainingDaysPerWeek ?? 4,
    startedAt: new Date().toISOString(),
    isActive: true,
  });

  return program;
};
