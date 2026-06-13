import type { PowerLogDatabase as SQLiteDatabase } from '@/src/db/types';
import { getProgram, getProgramWeeks, getProgramDays, getPlannedExercises, getPlannedSets } from '@/src/repositories/programRepository';
import { getExerciseById } from '@/src/repositories/exerciseRepository';
import { normalizePercent } from '../normalizePercent';
import type { ProgramInstantiationStrategy, InstantiationOptions, InstantiationResult, InstantiatedWeek, InstantiatedDay, InstantiatedExercise } from '../types';

const ROUND_TO = 2.5;
const roundBarbell = (kg: number): number => Math.round(kg / ROUND_TO) * ROUND_TO;

export const preserveStructureRecalculateLoads: ProgramInstantiationStrategy = {
  key: 'preserve_structure_recalculate_loads',
  label: 'Preserve structure, recalculate loads from e1RM',
  supportedTemplateKeys: ['seed-program-brad-full-cycle'],

  instantiate: async (db, options) => {
    const { templateProgramId, startDate, userMaxes = {} } = options;
    const scheduleOffsets = options.scheduleOffsets ?? [0, 1, 3, 4];

    const template = await getProgram(db, templateProgramId);
    if (!template) throw new Error(`Template not found: ${templateProgramId}`);

    const weeks = await getProgramWeeks(db, templateProgramId);
    const now = new Date().toISOString();
    const startDateObj = new Date(startDate + 'T00:00:00');

    let percentUsed = 0;
    let percentSkipped = 0;
    let recalculatedSets = 0;
    let rpeOnlySets = 0;

    const result: InstantiationResult = {
      program: {
        name: `${template.name}`,
        type: template.type,
        goal: template.goal,
        source: 'manual',
        durationWeeks: template.durationWeeks,
        includesDeload: template.includesDeload,
        description: `Instantiated from "${template.name}" on ${now.slice(0, 10)}`,
        createdAt: now,
      },
      weeks: [],
      scheduledDays: [],
    };

    for (const week of weeks) {
      const instWeek: InstantiatedWeek = {
        week: { programId: '', weekNumber: week.weekNumber, phase: week.phase, focus: week.focus, notes: week.notes },
        days: [],
      };

      const days = await getProgramDays(db, week.id);

      for (const day of days) {
        const dayOffset = scheduleOffsets[(day.dayNumber - 1) % scheduleOffsets.length] ?? (day.dayNumber - 1);
        const weekOffset = (week.weekNumber - 1) * 7;
        const scheduledDate = new Date(startDateObj);
        scheduledDate.setDate(scheduledDate.getDate() + weekOffset + dayOffset);
        const dateStr = scheduledDate.toISOString().slice(0, 10);

        result.scheduledDays.push({ weekNumber: week.weekNumber, dayNumber: day.dayNumber, scheduledDate: dateStr });

        const instDay: InstantiatedDay = {
          day: { programWeekId: '', dayNumber: day.dayNumber, title: day.title, mainFocus: day.mainFocus, estimatedDuration: day.estimatedDuration, scheduledDate: dateStr },
          exercises: [],
        };

        const exercises = await getPlannedExercises(db, day.id);

        for (const ex of exercises) {
          const exerciseDef = await getExerciseById(db, ex.exerciseId);
          const liftFamily = exerciseDef?.liftFamily;

          let familyMax: number | undefined;
          if (liftFamily === 'squat') familyMax = options.userMaxes?.squat;
          else if (liftFamily === 'bench') familyMax = options.userMaxes?.bench;
          else if (liftFamily === 'deadlift') familyMax = options.userMaxes?.deadlift;

          const normalized = normalizePercent(ex.targetPercent);
          if (normalized.skipped) {
            percentSkipped++;
          } else {
            percentUsed++;
          }

          let recalculatedLoad: number | undefined = ex.targetLoad ?? undefined;
          if (normalized.ratio != null && familyMax != null) {
            recalculatedLoad = roundBarbell(familyMax * normalized.ratio);
          }

          const instEx: InstantiatedExercise = {
            exercise: {
              exerciseId: ex.exerciseId, orderIndex: ex.orderIndex, targetSets: ex.targetSets,
              targetReps: ex.targetReps, targetRepRange: ex.targetRepRange,
              targetLoad: recalculatedLoad, targetRpe: ex.targetRpe, targetPercent: ex.targetPercent,
              accessoryCategory: ex.accessoryCategory, notes: ex.notes,
            },
            sets: [],
          };

          const sets = await getPlannedSets(db, ex.id);

          if (sets.length > 0) {
            const originalTopSetLoad = sets[0]?.targetLoad ?? 0;

            for (const ps of sets) {
              let setLoad: number | undefined = ps.targetLoad ?? undefined;

              if (recalculatedLoad != null && ps.targetLoad != null && originalTopSetLoad > 0) {
                setLoad = roundBarbell(recalculatedLoad * (ps.targetLoad / originalTopSetLoad));
                recalculatedSets++;
              } else if (recalculatedLoad != null && ps.targetLoad == null) {
                setLoad = recalculatedLoad;
                recalculatedSets++;
              } else {
                rpeOnlySets++;
              }

              instEx.sets.push({
                setNumber: ps.setNumber, setLabel: ps.setLabel,
                targetReps: ps.targetReps, targetRepRange: ps.targetRepRange,
                targetLoad: setLoad, baseTargetLoad: setLoad, targetRpe: ps.targetRpe, targetPercent: ps.targetPercent, notes: ps.notes,
              });
            }
          } else {
            rpeOnlySets++;
          }

          instDay.exercises.push(instEx);
        }

        instWeek.days.push(instDay);
      }

      result.weeks.push(instWeek);
    }

    console.log(`[Brad Instantiation] Template: ${templateProgramId}`);
    console.log(`[Brad Instantiation] User maxes: S=${userMaxes.squat ?? '?'} B=${userMaxes.bench ?? '?'} D=${userMaxes.deadlift ?? '?'}`);
    console.log(`[Brad Instantiation] Percents: ${percentUsed} used, ${percentSkipped} skipped`);
    console.log(`[Brad Instantiation] Sets: ${recalculatedSets} recalculated, ${rpeOnlySets} RPE-only`);

    return result;
  },
};
