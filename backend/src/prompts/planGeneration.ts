import type { ChatMessage } from '../services/deepseek';

export const buildPlanGenerationPrompt = (data: {
  goalType: 'hypertrophy' | 'strength' | 'maintenance' | 'powerbuilding';
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  trainingDaysPerWeek: number;
  maxSessionDuration: number;
  durationWeeks: number;
  includesDeload: boolean;
  squatMax: number;
  benchMax: number;
  deadliftMax: number;
  weakPoints?: string[];
  availableEquipment?: string[];
  limitations?: string[];
  volumeTolerance?: 'low' | 'medium' | 'high';
  intensityPreference?: 'conservative' | 'moderate' | 'aggressive';
  progressionStyle?: 'rpe' | 'percentage' | 'double_progression';
  currentBodyweight?: number;
  avoidExercises?: string[];
  includeExercises?: string[];
}): ChatMessage[] => [
  {
    role: 'system',
    content: `You are an expert powerlifting and strength coach. Generate a complete training program.

Return a JSON object with this exact structure:
{
  "name": "Program name",
  "type": "strength|hypertrophy|powerbuilding|maintenance",
  "description": "Brief description",
  "weeks": [
    {
      "weekNumber": 1,
      "phase": "entry|accumulation|intensification|deload|peak|test|maintenance",
      "focus": "Brief focus description",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day title (e.g. Squat Focus + Bench Volume)",
          "mainFocus": "squat|bench|deadlift|upper|lower",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseNameEn": "Competition Squat",
              "role": "competition|variation|accessory",
              "targetSets": 4,
              "targetReps": 5,
              "targetRpe": 7.5,
              "targetPercent": null,
              "notes": "Top set + back-offs"
            }
          ]
        }
      ]
    }
  ]
}

Rules:
- Match the primary goal type. Hypertrophy needs more accessory volume, strength needs heavier main lift practice, maintenance needs lower fatigue, powerbuilding balances both.
- Scale complexity and weekly stress to the user's experience level.
- Respect equipment, limitations, weak points, volume tolerance, and intensity preference.
- Main lifts should use RPE-based or percentage-based loading according to progression preference.
- Accessories use sets x reps, with RPE only when useful.
- Include warm-up and substitution guidance in notes.
- Respect the user's max session duration as a hard cap.
- If deload is included, make the last week or an appropriate later week a deload week.
- Use progressive overload across weeks without forcing max-effort sets every session.
- Balance volume across muscle groups and prioritize stated weak points.`
  },
  {
    role: 'user',
    content: `Generate a ${data.durationWeeks}-week training program.

Goal type: ${data.goalType}
Experience level: ${data.experienceLevel ?? 'intermediate'}
Training days per week: ${data.trainingDaysPerWeek}
Max session duration: ${data.maxSessionDuration} minutes
Include deload: ${data.includesDeload ? 'Yes' : 'No'}
Volume tolerance: ${data.volumeTolerance ?? 'medium'}
Intensity preference: ${data.intensityPreference ?? 'moderate'}
Progression style: ${data.progressionStyle ?? 'rpe'}
Weak points / priorities: ${data.weakPoints?.length ? data.weakPoints.join(', ') : 'Not specified'}
Available equipment: ${data.availableEquipment?.length ? data.availableEquipment.join(', ') : 'Full gym assumed'}
Limitations / injuries / avoid patterns: ${data.limitations?.length ? data.limitations.join(', ') : 'None specified'}

Current maxes:
- Squat: ${data.squatMax}kg
- Bench: ${data.benchMax}kg
- Deadlift: ${data.deadliftMax}kg
${data.currentBodyweight ? `Bodyweight: ${data.currentBodyweight}kg` : ''}
${data.avoidExercises?.length ? `Avoid: ${data.avoidExercises.join(', ')}` : ''}
${data.includeExercises?.length ? `Include: ${data.includeExercises.join(', ')}` : ''}`
  }
];
