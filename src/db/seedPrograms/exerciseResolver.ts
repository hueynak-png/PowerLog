import type { PowerLogDatabase } from '@/src/db/types';

interface ExerciseNameRow {
  id: string;
  name_en: string;
}

const ABBREVIATIONS: Record<string, string> = {
  'db': 'dumbbell',
  'bb': 'barbell',
  'dl': 'deadlift',
  'rdl': 'romanian deadlift',
  'sldl': 'stiff leg deadlift',
  'ohp': 'overhead press',
  'cgbp': 'close grip bench press',
  'bp': 'bench press',
  'ssb': 'safety bar',
  'hb': 'high bar',
  'lb': 'low bar',
  'tbar': 't bar',
  't bar': 't bar',
  'ext': 'extension',
  'exts': 'extension',
  'ab': 'ab',
  'abs': 'ab',
  'tricep': 'triceps',
  'bicep': 'biceps',
  'pulldown': 'pulldown',
  'pulldowns': 'pulldown',
  'pushdown': 'pushdown',
  'pushdowns': 'pushdown',
  'pull down': 'pulldown',
  'push down': 'pushdown',
};

const ALIASES: Record<string, string> = {
  'pull ups': 'pull up',
  'pullups': 'pull up',
  'pull up': 'pull up',
  'weighted pull up': 'pull up',
  'chin ups': 'chin up',
  'chin up': 'chin up',
  'chinups': 'chin up',
  'assisted pull ups': 'assisted pull up',
  'assisted pullup': 'assisted pull up',

  'squat': 'back squat',
  'squats': 'back squat',
  'back squats': 'back squat',
  'comp squat': 'back squat',
  'competition squat': 'back squat',
  'high bar': 'high bar squat',
  'low bar': 'low bar squat',
  'safety squat bar': 'safety bar squat',
  'safety squat bar squat': 'safety bar squat',
  'paused squat': 'pause squat',
  '3 2 0 tempo squat': 'tempo squat',

  'bench': 'bench press',
  'bench presses': 'bench press',
  'barbell bench': 'bench press',
  'barbell bench press': 'bench press',
  'comp bench': 'bench press',
  'competition bench': 'bench press',
  'touch and go bench': 'bench press',
  'paused bench': 'pause bench press',
  'pause bench': 'pause bench press',
  'paused bench press': 'pause bench press',
  '2 second pause bench': 'pause bench press',
  '3 2 0 tempo bench': 'pause bench press',
  'close grip': 'close grip bench press',
  'close grip bench': 'close grip bench press',
  'cgbp': 'close grip bench press',
  'larsen press': 'larsen press',
  'lasrsen press': 'larsen press',
  'close grip larsen press': 'close grip bench press',
  'pause spoto press': 'spoto press',
  'incline bench': 'incline barbell bench press',
  'incline bench press': 'incline barbell bench press',
  'incline barbell bench': 'incline barbell bench press',
  'incline dumbbell bench': 'incline dumbbell press',
  'incline dumbbell bench press': 'incline dumbbell press',
  'incline db press': 'incline dumbbell press',
  'incline db bench': 'incline dumbbell press',
  'low incline dumbbell bench press': 'incline dumbbell press',
  'flat dumbbell press': 'dumbbell bench press',
  'flat db press': 'dumbbell bench press',
  'db bench press': 'dumbbell bench press',
  'db bench': 'dumbbell bench press',
  'weighted dips': 'dip',
  'dips': 'dip',
  'pushup': 'push up',
  'pushups': 'push up',
  'push ups': 'push up',

  'ohp': 'overhead press',
  'military press': 'overhead press',
  'standing overhead press': 'overhead press',
  'barbell overhead press': 'overhead press',
  'dumbbell overhead press': 'seated dumbbell shoulder press',
  'seated dumbbell overhead press': 'seated dumbbell shoulder press',
  'dumbbell shoulder press': 'seated dumbbell shoulder press',

  'comp deadlift': 'deadlift',
  'competition deadlift': 'deadlift',
  'conventional deadlift': 'conventional deadlift',
  'conv deadlift': 'conventional deadlift',
  'sumo dl': 'sumo deadlift',
  'paused deadlift': 'pause deadlift',
  'block pulls': 'block pull',
  'rack pulls': 'rack pull',
  'trap bar dl': 'trap bar deadlift',
  'rdl': 'romanian deadlift',
  'romanian dl': 'romanian deadlift',
  'barbell rdl': 'romanian deadlift',
  'barbell romanian deadlift': 'romanian deadlift',
  'dumbbell rdl': 'dumbbell romanian deadlift',
  'db rdl': 'dumbbell romanian deadlift',
  'stiff leg deadlift': 'stiff leg deadlift',
  'stiff legged deadlift': 'stiff leg deadlift',
  'good mornings': 'good morning',
  '45 degree back ext': 'back extension',
  '45 degree back extension': 'back extension',
  'back extensions': 'back extension',
  'hip thrust barbell or machine': 'hip thrust',
  'hip thurst': 'hip thrust',
  'glute bridges': 'glute bridge',

  'lat pull down': 'lat pulldown',
  'lat pull downs': 'lat pulldown',
  'pulldown': 'lat pulldown',
  'single arm lat pull down': 'lat pulldown',
  'single arm lat pulldown': 'lat pulldown',
  'db row': 'dumbbell row',
  'one arm db row': 'dumbbell row',
  'single arm dumbbell row': 'dumbbell row',
  'single dumbbell row': 'dumbbell row',
  'chest supported cable row': 'chest supported row',
  'chest supported single arm cable row': 'chest supported row',
  'machine upper back row': 'chest supported row',
  'upper back cable row': 'seated cable row',
  'wide grip cable row': 'seated cable row',
  'wide grip seated cable row': 'seated cable row',
  'cable row': 'seated cable row',
  't bar row': 't bar row',
  'pendlay rows': 'pendlay row',

  'leg curls': 'leg curl',
  'hamstring curl': 'leg curl',
  'hamstring curls': 'leg curl',
  'single leg hamstring curl': 'leg curl',
  'leg extensions': 'leg extension',
  'quad extension': 'leg extension',
  'quad extensions': 'leg extension',
  'single leg quad extensions': 'leg extension',
  'single leg leg press': 'leg press',
  'front foot elevated split squat': 'split squat',
  'walking lunges': 'walking lunge',
  'reverse lunges': 'reverse lunge',
  'calf raises': 'calf raise',
  'standing calf raises': 'standing calf raise',
  'seated calf raises': 'seated calf raise',

  'lateral raises': 'lateral raise',
  'side raise': 'lateral raise',
  'side raises': 'lateral raise',
  'dumbbell lateral raise': 'lateral raise',
  'dumbbell lateral raise front raise super set': 'lateral raise',
  'dumbbell lateral raise + front raise super set': 'lateral raise',
  'cable lateral raises': 'cable lateral raise',
  'front raises': 'front raise',
  'face pulls': 'face pull',
  'rear delt flys': 'rear delt fly',
  'rear delt flies': 'rear delt fly',
  'dumbbell rear delt fly': 'rear delt fly',

  'biceps curls': 'biceps curl',
  'bicep curls': 'biceps curl',
  'dumbbell bicep curl': 'biceps curl',
  'dumbbell biceps curl': 'biceps curl',
  'cable bicep curl': 'biceps curl',
  'cable biceps curl': 'biceps curl',
  'straight bar bicep curl': 'biceps curl',
  'straight bar biceps curl': 'biceps curl',
  'stright bar bicep curl': 'biceps curl',
  'stright bar biceps curl': 'biceps curl',
  'barbell curl': 'barbell curl',
  'dumbbell curl': 'dumbbell curl',
  'db hammer curl': 'hammer curl',
  'dumbbell hammer curl': 'hammer curl',
  'hammer curls': 'hammer curl',

  'tricep ext': 'triceps pushdown',
  'tricep extension': 'triceps pushdown',
  'triceps ext': 'triceps pushdown',
  'triceps extension': 'triceps pushdown',
  'tricep push down': 'triceps pushdown',
  'triceps push down': 'triceps pushdown',
  'triceps pressdown': 'triceps pushdown',
  'cable tricep push down': 'triceps pushdown',
  'cable triceps push down': 'triceps pushdown',
  'stright bar tricep push down': 'triceps pushdown',
  'straight bar tricep push down': 'triceps pushdown',
  'stright bar triceps push down': 'triceps pushdown',
  'straight bar triceps push down': 'triceps pushdown',
  'overhead tricep extension': 'overhead triceps extension',
  'overhead triceps extensions': 'overhead triceps extension',
  'single arm tricep ext': 'single arm triceps extension',
  'single arm tricep extension': 'single arm triceps extension',
  'single arm triceps ext': 'single arm triceps extension',
  'dumbbell skull crusher': 'skull crusher',
  'dumbbell tricep skull crushers': 'skull crusher',
  'dumbbell triceps skull crusher': 'skull crusher',
  'skull crushers': 'skull crusher',

  'cable pec fly': 'pec fly',
  'pec flys': 'pec fly',
  'pec flies': 'pec fly',

  'ab leg raises': 'hanging leg raise',
  'hanging leg raises': 'hanging leg raise',
  'hanging knee raises': 'hanging knee raise',
  'cable ab cruches': 'cable crunch',
  'cable ab crunches': 'cable crunch',
  'cable crunches': 'cable crunch',
  'decline bench sit ups': 'decline sit up',
  'decline bench situp': 'decline sit up',
  'decline sit ups': 'decline sit up',
  'planks': 'plank',
  'side planks': 'side plank',
  'pallof presses': 'pallof press',
  'dead bugs': 'dead bug',
};

const stripPlural = (s: string): string => {
  if (s.endsWith('ies')) return s.slice(0, -3) + 'y';
  if (s.endsWith('ses')) return s;
  if (s.endsWith('s') && s.length > 3 && !s.endsWith('ss')) return s.slice(0, -1);
  return s;
};

const expandAbbreviations = (s: string): string => {
  return s
    .split(' ')
    .map(token => ABBREVIATIONS[token] ?? token)
    .join(' ');
};

export const normalizeExerciseName = (name: string): string => {
  let result = name
    .toLowerCase()
    .replace(/[-–—_/]/g, ' ')
    .replace(/[():.,+&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  result = expandAbbreviations(result);
  result = result.replace(/\s+/g, ' ').trim();

  if (ALIASES[result]) return ALIASES[result];

  const singular = stripPlural(result);
  if (ALIASES[singular]) return ALIASES[singular];

  return singular;
};

export const getExerciseIdMap = async (db: PowerLogDatabase): Promise<Map<string, string>> => {
  const rows = await db.getAllAsync<ExerciseNameRow>('SELECT id, name_en FROM exercises WHERE is_custom = 0');
  const map = new Map<string, string>();
  for (const row of rows) {
    map.set(normalizeExerciseName(row.name_en), row.id);
  }
  return map;
};

export const resolveExerciseId = (exerciseIdsByName: Map<string, string>, exerciseName: string): string => {
  const key = normalizeExerciseName(exerciseName);
  const id = exerciseIdsByName.get(key);
  if (!id) {
    throw new Error(`Missing seeded exercise for "${exerciseName}" (normalized: "${key}")`);
  }
  return id;
};

export interface UnresolvedExercise {
  raw: string;
  normalized: string;
}

export const findUnresolvedExercises = (
  exerciseIdsByName: Map<string, string>,
  rawNames: string[],
): UnresolvedExercise[] => {
  const seen = new Set<string>();
  const unresolved: UnresolvedExercise[] = [];
  for (const raw of rawNames) {
    if (seen.has(raw)) continue;
    seen.add(raw);
    const normalized = normalizeExerciseName(raw);
    if (!exerciseIdsByName.has(normalized)) {
      unresolved.push({ raw, normalized });
    }
  }
  return unresolved;
};
