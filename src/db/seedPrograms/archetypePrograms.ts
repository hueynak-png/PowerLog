import type { CyclePhase } from '@/src/domain/types';

import type { PlannedExerciseSeed, ProgramDaySeed, ProgramSeed } from './types';

const CREATED_AT = '2026-05-26T00:00:00.000Z';

type LiftPrescription = {
  sets: number;
  reps: number;
  rpe: number;
  percent: number;
  note: string;
};

type AccessoryPrescription = {
  sets: number;
  reps: number;
  rpe: number;
  category: string;
};

type TemplateDefinition = {
  id: string;
  name: string;
  type: string;
  goal: string;
  durationWeeks: number;
  description: string;
  weekPhase: (week: number) => CyclePhase;
  weekFocus: (week: number) => string;
  weekNotes?: (week: number) => string;
  lift: (week: number, liftRole: 'primary' | 'secondary' | 'variation' | 'hypertrophy') => LiftPrescription;
  accessory: (week: number) => AccessoryPrescription;
};

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const roundHalf = (value: number): number => Math.round(value * 2) / 2;

const lift = (sets: number, reps: number, rpe: number, percent: number, note: string): LiftPrescription => ({
  sets,
  reps,
  rpe: roundHalf(rpe),
  percent: Math.round(percent),
  note,
});

const plannedLift = (exerciseName: string, orderIndex: number, prescription: LiftPrescription): PlannedExerciseSeed => ({
  exerciseName,
  orderIndex,
  targetSets: prescription.sets,
  targetReps: prescription.reps,
  targetRpe: prescription.rpe,
  targetPercent: prescription.percent,
  notes: prescription.note,
});

const plannedAccessory = (exerciseName: string, orderIndex: number, prescription: AccessoryPrescription): PlannedExerciseSeed => ({
  exerciseName,
  orderIndex,
  targetSets: prescription.sets,
  targetReps: prescription.reps,
  targetRpe: prescription.rpe,
  accessoryCategory: prescription.category,
  notes: `${prescription.category} accessory; keep 1-3 reps in reserve and add load only when all reps are clean`,
});

const bradStyleLift = (week: number, role: 'primary' | 'secondary' | 'variation' | 'hypertrophy'): LiftPrescription => {
  const deload = week === 8;
  if (deload) {
    return lift(2, role === 'hypertrophy' ? 8 : 3, 6, role === 'hypertrophy' ? 55 : 60, 'Deload: reduced volume, crisp technique, no grinders');
  }
  if (role === 'primary') {
    return lift(4, week <= 2 ? 5 : week <= 5 ? 4 : 3, 6.5 + week * 0.35, 65 + week * 3, 'Brad-style top set filmed, then back-off sets at 90-94% of the top set load');
  }
  if (role === 'secondary') {
    return lift(4, week <= 4 ? 6 : 5, 6 + week * 0.3, 62 + week * 2, 'Secondary competition lift volume with repeatable bar speed');
  }
  if (role === 'variation') {
    return lift(3, week <= 4 ? 6 : 4, 6 + week * 0.25, 58 + week * 2, 'Variation slot for positional control before loading aggressively');
  }
  return lift(3, 8, clamp(6.5 + week * 0.2, 6, 8), 55 + week, 'Hypertrophy press/pull slot with controlled tempo');
};

const powerliftingLift = (week: number, role: 'primary' | 'secondary' | 'variation' | 'hypertrophy'): LiftPrescription => {
  if (week === 12) return lift(1, 1, 9, 92, 'Test week: take a conservative heavy single, stop before technical breakdown');
  if (week === 4 || week === 8 || week === 11) return lift(2, 3, 6, week === 11 ? 65 : 60, 'Deload/realization exposure with low fatigue');
  if (role === 'primary') return lift(5, week <= 3 ? 5 : week <= 7 ? 3 : 2, 6.5 + week * 0.25, 66 + week * 2, 'Competition lift progression from volume to heavy doubles');
  if (role === 'secondary') return lift(4, week <= 6 ? 5 : 3, 6 + week * 0.22, 62 + week * 1.8, 'Secondary lift reinforces weekly frequency without maxing');
  if (role === 'variation') return lift(3, week <= 6 ? 5 : 3, 6.5 + week * 0.15, 60 + week * 1.5, 'Paused/tempo variation for tight positions');
  return lift(3, 8, 7, 60, 'Small hypertrophy dose kept submaximal during strength block');
};

const hypertrophyLift = (week: number, role: 'primary' | 'secondary' | 'variation' | 'hypertrophy'): LiftPrescription => {
  if (week === 8) return lift(2, 8, 6, 55, 'Deload: leave the gym fresher than you entered');
  if (role === 'primary') return lift(4, week <= 4 ? 8 : 6, 6.5 + week * 0.25, 58 + week * 1.8, 'Primary hypertrophy lift; progress reps first, then load');
  if (role === 'secondary') return lift(4, 10, 7 + week * 0.15, 55 + week, 'Secondary volume lift with strict setup and full ROM');
  if (role === 'variation') return lift(3, 10, 7, 55 + week, 'Variation lift for weak-point volume');
  return lift(4, 12, clamp(7 + week * 0.2, 7, 8.5), 50 + week, 'Pump-focused hypertrophy work with stable reps');
};

const dupLift = (week: number, role: 'primary' | 'secondary' | 'variation' | 'hypertrophy'): LiftPrescription => {
  if (week === 10) return lift(2, role === 'hypertrophy' ? 10 : 3, 6, 58, 'Taper/deload week before restarting the wave');
  if (role === 'primary') return lift(5, week % 3 === 1 ? 6 : week % 3 === 2 ? 4 : 2, 6.5 + week * 0.25, week % 3 === 1 ? 65 : week % 3 === 2 ? 72 : 80, 'DUP primary exposure: volume, strength, and intensity rotate weekly');
  if (role === 'secondary') return lift(4, week % 2 === 0 ? 8 : 5, 6.5 + week * 0.2, week % 2 === 0 ? 62 : 70, 'Secondary DUP slot balances hypertrophy and strength practice');
  if (role === 'variation') return lift(3, 6, 7, 62 + week, 'Variation slot held moderate to preserve recovery');
  return lift(4, 10, 7.5, 55 + week, 'Hypertrophy slot for extra weekly volume');
};

const peakLift = (week: number, role: 'primary' | 'secondary' | 'variation' | 'hypertrophy'): LiftPrescription => {
  if (week === 4 || week === 8) return lift(2, 3, 6, 60, 'Deload checkpoint: low fatigue technique work');
  if (week === 11) return lift(2, 2, 6.5, 65, 'Taper week: keep the pattern sharp and stop early');
  if (week === 12) return lift(1, 1, role === 'primary' ? 9.5 : 8, role === 'primary' ? 95 : 85, 'Test week: single attempts only after warm-ups feel fast');
  if (role === 'primary') return lift(4, week <= 3 ? 4 : week <= 7 ? 3 : 2, 7 + week * 0.22, 70 + week * 2, 'Peak progression: top single/double feeler followed by prescribed work');
  if (role === 'secondary') return lift(3, week <= 6 ? 5 : 3, 6.5 + week * 0.18, 64 + week * 1.5, 'Secondary practice trimmed as meet-specific work rises');
  if (role === 'variation') return lift(3, week <= 6 ? 5 : 3, 6.5 + week * 0.12, 60 + week, 'Variation volume tapers across the peak');
  return lift(2, 10, 7, 55, 'Maintenance accessory work only');
};

const accessoryFor = (week: number, deloadWeeks: number[]): AccessoryPrescription => {
  const deload = deloadWeeks.includes(week);
  return {
    sets: deload ? 2 : 3,
    reps: deload ? 10 : 12,
    rpe: deload ? 6 : roundHalf(clamp(6.5 + week * 0.2, 6.5, 8.5)),
    category: 'accessory',
  };
};

const fourDayWeek = (week: number, template: TemplateDefinition): ProgramDaySeed[] => {
  const accessory = template.accessory(week);
  return [
    {
      dayNumber: 1,
      title: 'Day 1 - Squat + Bench Volume',
      mainFocus: 'squat + bench',
      estimatedDuration: 90,
      exercises: [
        plannedLift('Squat', 0, template.lift(week, 'primary')),
        plannedLift('Bench Press', 1, template.lift(week, 'secondary')),
        plannedAccessory('Leg Press', 2, accessory),
        plannedAccessory('Leg Curl', 3, accessory),
        plannedAccessory('Triceps Pushdown', 4, accessory),
      ],
    },
    {
      dayNumber: 2,
      title: 'Day 2 - Deadlift + Upper Back',
      mainFocus: 'deadlift + upper',
      estimatedDuration: 90,
      exercises: [
        plannedLift(week % 2 === 0 ? 'Pause Deadlift' : 'Romanian Deadlift', 0, template.lift(week, 'variation')),
        plannedLift('Close Grip Bench', 1, template.lift(week, 'secondary')),
        plannedAccessory('Lat Pulldown', 2, accessory),
        plannedAccessory('Chest Supported Row', 3, accessory),
        plannedAccessory('Biceps Curl', 4, accessory),
      ],
    },
    {
      dayNumber: 3,
      title: 'Day 3 - Squat Variation + Bench Intensity',
      mainFocus: 'bench + squat variation',
      estimatedDuration: 90,
      exercises: [
        plannedLift(week % 2 === 0 ? 'Tempo Squat' : 'Pause Squat', 0, template.lift(week, 'variation')),
        plannedLift('Paused Bench Press', 1, template.lift(week, 'primary')),
        plannedAccessory('Bulgarian Split Squat', 2, accessory),
        plannedAccessory('Pec Fly', 3, accessory),
        plannedAccessory('Lateral Raise', 4, accessory),
      ],
    },
    {
      dayNumber: 4,
      title: 'Day 4 - Deadlift + Press Hypertrophy',
      mainFocus: 'deadlift + press',
      estimatedDuration: 90,
      exercises: [
        plannedLift('Deadlift', 0, template.lift(week, 'primary')),
        plannedLift(week % 2 === 0 ? 'Incline Bench Press' : 'Dumbbell Bench Press', 1, template.lift(week, 'hypertrophy')),
        plannedAccessory('Seated Cable Row', 2, accessory),
        plannedAccessory('Face Pull', 3, accessory),
        plannedAccessory('Ab Wheel', 4, accessory),
      ],
    },
  ];
};

const upperLowerWeek = (week: number, template: TemplateDefinition): ProgramDaySeed[] => {
  const accessory = template.accessory(week);
  return [
    {
      dayNumber: 1,
      title: 'Upper 1 - Bench + Back Volume',
      mainFocus: 'upper hypertrophy',
      estimatedDuration: 75,
      exercises: [
        plannedLift('Bench Press', 0, template.lift(week, 'primary')),
        plannedLift('Barbell Row', 1, template.lift(week, 'secondary')),
        plannedAccessory('Incline Bench Press', 2, accessory),
        plannedAccessory('Lat Pulldown', 3, accessory),
        plannedAccessory('Lateral Raise', 4, accessory),
      ],
    },
    {
      dayNumber: 2,
      title: 'Lower 1 - Squat + Posterior Chain',
      mainFocus: 'lower hypertrophy',
      estimatedDuration: 80,
      exercises: [
        plannedLift('Squat', 0, template.lift(week, 'primary')),
        plannedLift('Romanian Deadlift', 1, template.lift(week, 'secondary')),
        plannedAccessory('Leg Press', 2, accessory),
        plannedAccessory('Leg Curl', 3, accessory),
        plannedAccessory('Calf Raise', 4, accessory),
      ],
    },
    {
      dayNumber: 3,
      title: 'Upper 2 - Press + Arms',
      mainFocus: 'upper hypertrophy',
      estimatedDuration: 75,
      exercises: [
        plannedLift('Overhead Press', 0, template.lift(week, 'variation')),
        plannedLift('Dumbbell Bench Press', 1, template.lift(week, 'hypertrophy')),
        plannedAccessory('Seated Cable Row', 2, accessory),
        plannedAccessory('Triceps Pushdown', 3, accessory),
        plannedAccessory('Biceps Curl', 4, accessory),
      ],
    },
    {
      dayNumber: 4,
      title: 'Lower 2 - Deadlift + Quads',
      mainFocus: 'lower hypertrophy',
      estimatedDuration: 80,
      exercises: [
        plannedLift('Deadlift', 0, template.lift(week, 'variation')),
        plannedLift('Hack Squat', 1, template.lift(week, 'secondary')),
        plannedAccessory('Bulgarian Split Squat', 2, accessory),
        plannedAccessory('Leg Extension', 3, accessory),
        plannedAccessory('Cable Crunch', 4, accessory),
      ],
    },
  ];
};

const makeProgram = (template: TemplateDefinition, weekBuilder: (week: number, template: TemplateDefinition) => ProgramDaySeed[]): ProgramSeed => ({
  id: template.id,
  name: template.name,
  type: template.type,
  goal: template.goal,
  source: 'manual',
  durationWeeks: template.durationWeeks,
  includesDeload: true,
  description: template.description,
  createdAt: CREATED_AT,
  weeks: Array.from({ length: template.durationWeeks }, (_, index) => {
    const week = index + 1;
    return {
      weekNumber: week,
      phase: template.weekPhase(week),
      focus: template.weekFocus(week),
      notes: template.weekNotes?.(week),
      days: weekBuilder(week, template),
    };
  }),
});

export const archetypePrograms: ProgramSeed[] = [
  makeProgram(
    {
      id: 'seed-program-brad-powerbuilding-8',
      name: 'Brad-Style Powerbuilding 8 Week',
      type: 'powerbuilding',
      goal: 'Top-set/back-off powerbuilding block inspired by non-PR Brad sheet structures, not PR Tracker values.',
      durationWeeks: 8,
      description: 'Four-day Brad-style template with squat/bench and deadlift/bench pairings, filmed top sets, back-offs, accessories, and week 8 deload.',
      weekPhase: (week) => (week === 8 ? 'deload' : week <= 2 ? 'entry' : week <= 5 ? 'accumulation' : 'intensification'),
      weekFocus: (week) => (week === 8 ? 'Deload and restore bar speed' : `Top set plus back-off progression week ${week}`),
      weekNotes: () => 'Derived from non-PR sheet families A-H patterns only; PR Tracker max values intentionally ignored.',
      lift: bradStyleLift,
      accessory: (week) => accessoryFor(week, [8]),
    },
    fourDayWeek,
  ),
  makeProgram(
    {
      id: 'seed-program-powerlifting-strength-12',
      name: 'Powerlifting Strength 12 Week',
      type: 'strength',
      goal: 'Build squat, bench, and deadlift strength through volume, intensification, deloads, and a conservative test week.',
      durationWeeks: 12,
      description: 'Original 12-week powerlifting template with 4-day weeks, planned deloads, competition lift practice, variations, and test-week singles.',
      weekPhase: (week) => (week === 12 ? 'test' : week === 4 || week === 8 || week === 11 ? 'deload' : week <= 3 ? 'accumulation' : week <= 7 ? 'intensification' : 'peak'),
      weekFocus: (week) => (week === 12 ? 'Conservative heavy singles' : week === 4 || week === 8 || week === 11 ? 'Reduce fatigue and keep technique sharp' : `Strength progression week ${week}`),
      lift: powerliftingLift,
      accessory: (week) => accessoryFor(week, [4, 8, 11, 12]),
    },
    fourDayWeek,
  ),
  makeProgram(
    {
      id: 'seed-program-hypertrophy-upper-lower-8',
      name: 'Hypertrophy Upper/Lower 8 Week',
      type: 'hypertrophy',
      goal: 'Accumulate quality upper/lower volume with stable RPE and repeatable progression.',
      durationWeeks: 8,
      description: 'Original 8-week upper/lower hypertrophy block using seeded exercise names, higher reps, controlled tempo, and a final deload.',
      weekPhase: (week) => (week === 8 ? 'deload' : week <= 2 ? 'entry' : 'accumulation'),
      weekFocus: (week) => (week === 8 ? 'Deload volume and joints' : `Upper/lower volume progression week ${week}`),
      lift: hypertrophyLift,
      accessory: (week) => accessoryFor(week, [8]),
    },
    upperLowerWeek,
  ),
  makeProgram(
    {
      id: 'seed-program-dup-strength-hypertrophy-10',
      name: 'DUP Strength + Hypertrophy 10 Week',
      type: 'powerbuilding',
      goal: 'Rotate volume, strength, and intensity exposures while preserving hypertrophy work.',
      durationWeeks: 10,
      description: 'Original 10-week daily/weekly undulating template with competition lift practice, variations, accessories, and a taper week.',
      weekPhase: (week) => (week === 10 ? 'deload' : week <= 2 ? 'entry' : week <= 7 ? 'accumulation' : 'intensification'),
      weekFocus: (week) => (week === 10 ? 'Taper and prepare to restart the wave' : `DUP exposure week ${week}: rotate rep emphasis`),
      lift: dupLift,
      accessory: (week) => accessoryFor(week, [10]),
    },
    fourDayWeek,
  ),
  makeProgram(
    {
      id: 'seed-program-deload-peak-test-12',
      name: 'Deload Peak Test 12 Week',
      type: 'strength',
      goal: 'Transition from base strength into low-fatigue peaking and test-week execution.',
      durationWeeks: 12,
      description: 'Original 12-week peak/test template with planned deload checkpoints, reduced accessories near the end, taper, and test week.',
      weekPhase: (week) => (week === 12 ? 'test' : week === 4 || week === 8 || week === 11 ? 'deload' : week <= 3 ? 'accumulation' : week <= 10 ? 'peak' : 'deload'),
      weekFocus: (week) => (week === 12 ? 'Test singles with conservative jumps' : week === 4 || week === 8 || week === 11 ? 'Deload checkpoint' : `Peak-specific practice week ${week}`),
      lift: peakLift,
      accessory: (week) => accessoryFor(week, [4, 8, 11, 12]),
    },
    fourDayWeek,
  ),
];
