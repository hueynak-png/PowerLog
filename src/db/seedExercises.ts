import type { ExerciseCategory, ExerciseRole, LiftFamily } from '@/src/domain/types';
import generateId from '@/src/lib/uuid';

import type { PowerLogDatabase } from './database';

interface ExerciseSeed {
  nameEn: string;
  nameZh: string;
  category: ExerciseCategory;
  liftFamily: LiftFamily;
  role: ExerciseRole;
  muscleGroups: string[];
  equipment: string;
}

const EXERCISE_SEEDS: ExerciseSeed[] = [
  {
    nameEn: 'Squat',
    nameZh: '深蹲',
    category: 'barbell',
    liftFamily: 'squat',
    role: 'competition',
    muscleGroups: ['quads', 'glutes', 'core'],
    equipment: 'barbell',
  },
  {
    nameEn: 'Bench Press',
    nameZh: '卧推',
    category: 'barbell',
    liftFamily: 'bench',
    role: 'competition',
    muscleGroups: ['chest', 'triceps', 'front_delt'],
    equipment: 'barbell',
  },
  {
    nameEn: 'Deadlift',
    nameZh: '硬拉',
    category: 'barbell',
    liftFamily: 'deadlift',
    role: 'competition',
    muscleGroups: ['back', 'glutes', 'hamstrings'],
    equipment: 'barbell',
  },
  {
    nameEn: 'Overhead Press',
    nameZh: '站姿推举',
    category: 'barbell',
    liftFamily: 'upper',
    role: 'variation',
    muscleGroups: ['shoulders', 'triceps'],
    equipment: 'barbell',
  },
  {
    nameEn: 'Barbell Row',
    nameZh: '杠铃划船',
    category: 'barbell',
    liftFamily: 'upper',
    role: 'accessory',
    muscleGroups: ['back', 'biceps'],
    equipment: 'barbell',
  },
  {
    nameEn: 'Lat Pulldown',
    nameZh: '高位下拉',
    category: 'cable',
    liftFamily: 'upper',
    role: 'accessory',
    muscleGroups: ['lats', 'biceps'],
    equipment: 'cable',
  },
  {
    nameEn: 'Leg Press',
    nameZh: '腿举',
    category: 'machine',
    liftFamily: 'squat',
    role: 'accessory',
    muscleGroups: ['quads', 'glutes'],
    equipment: 'machine',
  },
  {
    nameEn: 'Leg Curl',
    nameZh: '腿弯举',
    category: 'machine',
    liftFamily: 'lower',
    role: 'accessory',
    muscleGroups: ['hamstrings'],
    equipment: 'machine',
  },
  {
    nameEn: 'Leg Extension',
    nameZh: '腿屈伸',
    category: 'machine',
    liftFamily: 'lower',
    role: 'accessory',
    muscleGroups: ['quads'],
    equipment: 'machine',
  },
  {
    nameEn: 'Triceps Pushdown',
    nameZh: '绳索下压',
    category: 'cable',
    liftFamily: 'upper',
    role: 'accessory',
    muscleGroups: ['triceps'],
    equipment: 'cable',
  },
  {
    nameEn: 'Lateral Raise',
    nameZh: '侧平举',
    category: 'dumbbell',
    liftFamily: 'upper',
    role: 'accessory',
    muscleGroups: ['side_delt'],
    equipment: 'dumbbell',
  },
  {
    nameEn: 'Pull-Up',
    nameZh: '引体向上',
    category: 'bodyweight',
    liftFamily: 'upper',
    role: 'accessory',
    muscleGroups: ['lats', 'biceps'],
    equipment: 'bodyweight',
  },
  {
    nameEn: 'Dumbbell Row',
    nameZh: '哑铃划船',
    category: 'dumbbell',
    liftFamily: 'upper',
    role: 'accessory',
    muscleGroups: ['back', 'biceps'],
    equipment: 'dumbbell',
  },
  {
    nameEn: 'Romanian Deadlift',
    nameZh: '罗马尼亚硬拉',
    category: 'barbell',
    liftFamily: 'deadlift',
    role: 'variation',
    muscleGroups: ['hamstrings', 'glutes', 'back'],
    equipment: 'barbell',
  },
  {
    nameEn: 'Biceps Curl',
    nameZh: '二头弯举',
    category: 'dumbbell',
    liftFamily: 'upper',
    role: 'accessory',
    muscleGroups: ['biceps'],
    equipment: 'dumbbell',
  },
  {
    nameEn: 'Face Pull',
    nameZh: '面拉',
    category: 'cable',
    liftFamily: 'upper',
    role: 'accessory',
    muscleGroups: ['rear_delt', 'upper_back'],
    equipment: 'cable',
  },
  {
    nameEn: 'Hack Squat',
    nameZh: '哈克深蹲',
    category: 'machine',
    liftFamily: 'squat',
    role: 'accessory',
    muscleGroups: ['quads', 'glutes'],
    equipment: 'machine',
  },
  {
    nameEn: 'Close Grip Bench',
    nameZh: '窄距卧推',
    category: 'barbell',
    liftFamily: 'bench',
    role: 'variation',
    muscleGroups: ['triceps', 'chest'],
    equipment: 'barbell',
  },
  {
    nameEn: 'Incline Bench Press',
    nameZh: '上斜卧推',
    category: 'barbell',
    liftFamily: 'bench',
    role: 'variation',
    muscleGroups: ['upper_chest', 'triceps', 'front_delt'],
    equipment: 'barbell',
  },
  {
    nameEn: 'Bulgarian Split Squat',
    nameZh: '保加利亚分腿蹲',
    category: 'dumbbell',
    liftFamily: 'squat',
    role: 'accessory',
    muscleGroups: ['quads', 'glutes'],
    equipment: 'dumbbell',
  },
];

export const seedExercises = async (db: PowerLogDatabase): Promise<void> => {
  const existing = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM exercises');

  if ((existing?.count ?? 0) > 0) {
    return;
  }

  for (const exercise of EXERCISE_SEEDS) {
    await db.runAsync(
      `INSERT INTO exercises (
        id,
        name_en,
        name_zh,
        category,
        lift_family,
        role,
        muscle_groups,
        equipment,
        is_custom
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        generateId(),
        exercise.nameEn,
        exercise.nameZh,
        exercise.category,
        exercise.liftFamily,
        exercise.role,
        JSON.stringify(exercise.muscleGroups),
        exercise.equipment,
        0,
      ],
    );
  }
};
