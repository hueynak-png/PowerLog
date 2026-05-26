import type { PowerLogDatabase } from './types';

const CREATED_AT = '2026-05-26T00:00:00.000Z';

const PROGRAM_SUMMARIES = [
  {
    id: 'seed-program-brad-full-cycle',
    name: "Brad's Excel Large Cycle",
    type: 'powerbuilding',
    goal: 'Imported Brad-style powerlifting/powerbuilding cycle with competition lifts, variations, accessories, RPE progression, and deload exposure.',
    source: 'imported_excel',
    durationWeeks: 33,
    includesDeload: true,
    description: "Deterministic import derived from 33 non-PR training week sheets in Brad's Program.xlsx. PR Tracker is intentionally ignored.",
  },
  {
    id: 'seed-program-brad-powerbuilding-8',
    name: 'Brad-Style Powerbuilding 8 Week',
    type: 'powerbuilding',
    goal: 'Top-set/back-off powerbuilding block inspired by non-PR Brad sheet structures, not PR Tracker values.',
    source: 'manual',
    durationWeeks: 8,
    includesDeload: true,
    description: 'Four-day Brad-style template with squat/bench and deadlift/bench pairings, filmed top sets, back-offs, accessories, and week 8 deload.',
  },
  {
    id: 'seed-program-powerlifting-strength-12',
    name: 'Powerlifting Strength 12 Week',
    type: 'strength',
    goal: 'Build squat, bench, and deadlift strength through volume, intensification, deloads, and a conservative test week.',
    source: 'manual',
    durationWeeks: 12,
    includesDeload: true,
    description: 'Original 12-week powerlifting template with 4-day weeks, planned deloads, competition lift practice, variations, and test-week singles.',
  },
  {
    id: 'seed-program-hypertrophy-upper-lower-8',
    name: 'Hypertrophy Upper/Lower 8 Week',
    type: 'hypertrophy',
    goal: 'Accumulate quality upper/lower volume with stable RPE and repeatable progression.',
    source: 'manual',
    durationWeeks: 8,
    includesDeload: true,
    description: 'Original 8-week upper/lower hypertrophy block using seeded exercise names, higher reps, controlled tempo, and a final deload.',
  },
  {
    id: 'seed-program-dup-strength-hypertrophy-10',
    name: 'DUP Strength + Hypertrophy 10 Week',
    type: 'powerbuilding',
    goal: 'Rotate volume, strength, and intensity exposures while preserving hypertrophy work.',
    source: 'manual',
    durationWeeks: 10,
    includesDeload: true,
    description: 'Original 10-week daily/weekly undulating template with competition lift practice, variations, accessories, and a taper week.',
  },
  {
    id: 'seed-program-deload-peak-test-12',
    name: 'Deload Peak Test 12 Week',
    type: 'strength',
    goal: 'Transition from base strength into low-fatigue peaking and test-week execution.',
    source: 'manual',
    durationWeeks: 12,
    includesDeload: true,
    description: 'Original 12-week peak/test template with planned deload checkpoints, reduced accessories near the end, taper, and test week.',
  },
];

export const seedProgramSummaries = async (db: PowerLogDatabase): Promise<void> => {
  for (const program of PROGRAM_SUMMARIES) {
    const existing = await db.getFirstAsync<{ id: string }>('SELECT id FROM programs WHERE id = ? LIMIT 1', [program.id]);
    if (existing) continue;

    await db.runAsync(
      `INSERT INTO programs (id, name, type, goal, source, duration_weeks, includes_deload, description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        program.id,
        program.name,
        program.type,
        program.goal,
        program.source,
        program.durationWeeks,
        program.includesDeload ? 1 : 0,
        program.description,
        CREATED_AT,
      ],
    );
  }
};
