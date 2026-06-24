import type { ChatMessage } from '../services/deepseek';

export const buildPlanParsePrompt = (data: {
  planText: string;
}): ChatMessage[] => [
  {
    role: 'system',
    content: `You convert free-text strength plans into compact structured JSON.

IMPORTANT: Be concise. Do NOT expand the plan beyond the text. If the text is high-level rules instead of exact workouts, create ONE representative training day for each week block using only the main lifts mentioned.

Return a JSON object with this EXACT structure:
{
  "name": "Program name (derived from the text, or 'Imported Plan')",
  "type": "strength|hypertrophy|powerbuilding|maintenance",
  "description": "Brief 1-2 sentence summary of the program",
  "weeks": [
    {
      "weekNumber": 1,
      "phase": "entry|accumulation|intensification|deload|peak|test|maintenance",
      "focus": "Brief focus for this week",
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
- Output at most 8 weeks.
- Output at most 2 days per week.
- Output at most 5 exercises per day.
- Use English exercise names: Squat, Bench Press, Deadlift, Overhead Press, Row, Pull-up, Curl, Plank.
- For Chinese terms: 深蹲=Squat, 卧推=Bench Press, 硬拉=Deadlift, 手臂=Curl, 腹部=Plank, 辅助=Row.
- For high-level RPE rules, convert to targetRpe values and put details in notes.
- If exact sets/reps are missing, use conservative defaults: main lift 3x3 or 3x5, accessory 2x10, core 3x12.
- Never include warm-ups.
- Do not explain. Return JSON only.`
  },
  {
    role: 'user',
    content: `Parse this training plan into the structured JSON format:

${data.planText}`
  },
];
