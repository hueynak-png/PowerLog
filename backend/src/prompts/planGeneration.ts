import type { ChatMessage } from '../services/deepseek';

export const buildPlanGenerationPrompt = (data: {
  goal: string;
  trainingDaysPerWeek: number;
  maxSessionDuration: number;
  durationWeeks: number;
  includesDeload: boolean;
  squatMax: number;
  benchMax: number;
  deadliftMax: number;
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
- Main lifts (competition squat/bench/deadlift) should use RPE-based programming
- Accessories use sets x reps without specific RPE
- Include warm-up sets guidance in notes
- Respect the user's max session duration
- If deload is included, make the last week a deload week
- Use progressive overload across weeks
- Balance volume across muscle groups`
  },
  {
    role: 'user',
    content: `Generate a ${data.durationWeeks}-week training program.

Goal: ${data.goal}
Training days per week: ${data.trainingDaysPerWeek}
Max session duration: ${data.maxSessionDuration} minutes
Include deload: ${data.includesDeload ? 'Yes' : 'No'}

Current maxes:
- Squat: ${data.squatMax}kg
- Bench: ${data.benchMax}kg
- Deadlift: ${data.deadliftMax}kg
${data.currentBodyweight ? `Bodyweight: ${data.currentBodyweight}kg` : ''}
${data.avoidExercises?.length ? `Avoid: ${data.avoidExercises.join(', ')}` : ''}
${data.includeExercises?.length ? `Include: ${data.includeExercises.join(', ')}` : ''}`
  }
];
