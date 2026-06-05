import type { PowerLogDatabase } from '@/src/db/types';

interface ExerciseNameRow {
  id: string;
  name_en: string;
}

const ALIASES: Record<string, string> = {
  'comp squat': 'squat',
  'competition squat': 'squat',
  'squat ': 'squat',
  'comp bench': 'bench press',
  'competition bench': 'bench press',
  'bench': 'bench press',
  'pause bench press': 'paused bench press',
  'pause bench': 'paused bench press',
  '2 second pause bench': 'paused bench press',
  '3:2:0 tempo bench': 'paused bench press',
  'touch and go bench': 'bench press',
  'close grip': 'close grip bench',
  'larsen press': 'bench press',
  'lasrsen press': 'bench press',
  'close grip larsen press': 'close grip bench',
  'pause spoto press': 'spoto press',
  'deadlift ': 'deadlift',
  'comp deadlift': 'deadlift',
  'pause deadlift': 'pause deadlift',
  'barbell rdl': 'romanian deadlift',
  'dumbbell rdl': 'romanian deadlift',
  'hip thrust barbell or machine': 'hip thrust',
  'hip thurst': 'hip thrust',
  '3:2:0 tempo squat': 'tempo squat',
  'hamstring curl': 'leg curl',
  'single leg hamstring curl': 'leg curl',
  'lat pull down': 'lat pulldown',
  'single arm lat pull down': 'lat pulldown',
  'single arm dumbbell row': 'dumbbell row',
  'single dumbbell row': 'dumbbell row',
  'chest supported cable row': 'chest supported row',
  'chest supported single arm cable row': 'chest supported row',
  'machine upper back row': 'chest supported row',
  'upper back cable row': 'seated cable row',
  'wide grip cable row': 'seated cable row',
  'wide grip seated cable row': 'seated cable row',
  'single arm tricep ext': 'single arm triceps extension',
  'single arm tricep extension': 'single arm triceps extension',
  'single arm triceps ext': 'single arm triceps extension',
  'tricep ext': 'triceps pushdown',
  'tricep push down': 'triceps pushdown',
  'triceps push down': 'triceps pushdown',
  'cable tricep push down': 'triceps pushdown',
  'stright bar tricep push down': 'triceps pushdown',
  'overhead tricep extension': 'single arm triceps extension',
  'dumbbell skull crusher': 'single arm triceps extension',
  'dumbbell tricep skull crushers': 'single arm triceps extension',
  'dumbbell bicep curl': 'biceps curl',
  'dumbbell hammer curl': 'biceps curl',
  'db hammer curl': 'biceps curl',
  'straight bar bicep curl': 'biceps curl',
  'stright bar bicep curl': 'biceps curl',
  'cable bicep curl': 'biceps curl',
  'bicep curl': 'biceps curl',
  '45 degree back ext': 'back extension',
  '45 degree back extension': 'back extension',
  'face pulls': 'face pull',
  'cable lateral raise': 'lateral raise',
  'dumbbell lateral raise': 'lateral raise',
  'dumbbell lateral raise + front raise super set': 'lateral raise',
  'dumbbell rear delt fly': 'rear delt fly',
  'flat dumbbell press': 'dumbbell bench press',
  'incline dumbbell press': 'dumbbell bench press',
  'low incline dumbbell bench press': 'dumbbell bench press',
  'dumbbell overhead press': 'overhead press',
  'seated dumbbell overhead press': 'overhead press',
  'barbell overhead press': 'overhead press',
  'quad extension': 'leg extension',
  'quad extensions': 'leg extension',
  'single leg quad extensions': 'leg extension',
  'single leg leg press': 'leg press',
  'front foot elevated split squat': 'bulgarian split squat',
  'walking lunge': 'bulgarian split squat',
  'cable pec fly': 'pec fly',
  'weighted dips': 'dumbbell bench press',
  'chin ups': 'pull-up',
  'pull ups': 'pull-up',
  'ab leg raises': 'hanging leg raise',
  'hanging leg raises': 'hanging leg raise',
  'cable ab cruches': 'cable crunch',
  'decline bench sit ups': 'decline sit-up',
  'decline bench situp': 'decline sit-up',
  'dumbbell rdl': 'romanian deadlift',
  'cable bicep curl': 'biceps curl',
  '3:2:0 tempo squat': 'tempo squat',
};

export const normalizeExerciseName = (name: string): string => {
  const normalized = name
    .toLowerCase()
    .replace(/[-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[()]/g, '')
    .trim();

  return ALIASES[normalized] ?? normalized;
};

export const getExerciseIdMap = async (db: PowerLogDatabase): Promise<Map<string, string>> => {
  const rows = await db.getAllAsync<ExerciseNameRow>('SELECT id, name_en FROM exercises');
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
    console.warn(`Missing seeded exercise for "${exerciseName}" (normalized: "${key}")`);
    return 'unknown';
  }
  return id;
};
