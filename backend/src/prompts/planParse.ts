import type { ChatMessage } from '../services/deepseek';

export const buildPlanParsePrompt = (data: {
  planText: string;
}): ChatMessage[] => [
  {
    role: 'system',
    content: `You convert free-text strength plans into compact structured JSON.

CRITICAL: Keep output SMALL. Notes must be under 30 characters. Skip exercise descriptions — just name, sets, reps, RPE.

Infer the ACTUAL number of training days per week from the text.
If the plan describes multiple weeks with identical rules (e.g. "Week 1-3 same structure"), only output ONE week with a focus like "Weeks 1-3: ...". Repeat the same structure only if the plan explicitly changes rules.

Return a JSON object with this EXACT structure:
{
  "name": "Program name",
  "type": "strength|hypertrophy|powerbuilding|maintenance",
  "description": "Brief summary",
  "weeks": [
    {
      "weekNumber": 1,
      "phase": "entry|accumulation|intensification|deload|peak|test|maintenance",
      "focus": "Brief focus",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day title",
          "mainFocus": "squat|bench|deadlift|upper|lower",
          "estimatedDuration": 90,
          "exercises": [
            {
              "exerciseNameEn": "Squat",
              "role": "competition|variation|accessory",
              "targetSets": 4,
              "targetReps": 5,
              "targetRpe": 7.5,
              "targetPercent": null,
              "notes": "keep under 30 chars"
            }
          ]
        }
      ]
    }
  ]
}

Guidelines:
- Output at most 8 weeks. Each week with the actual day count from the plan.
- Notes: NEVER exceed 30 characters. Just the key rule, e.g. "RPE7-8 top single" or "+5kg if last set <RPE7".
- Convert Chinese: 深蹲=Squat, 卧推=Bench Press, 硬拉=Deadlift, 手臂/弯举=Curl, 腹部=Plank, 肩推=Overhead Press, 辅助/背=Row or Pull-up.
- For RPE rules use midpoint: "RPE 7-8" → 7.5, "RPE 6-7" → 6.5. "RPE 8.5-9" → 8.5.
- If sets/reps missing, default: main lift 3x3 or 3x5, accessory 2x10, core 3x12.
- role: competition=Squat/Bench Press/Deadlift, accessory=everything else.
- Never include warm-ups. Do not explain. Return JSON only.`
  },
  {
    role: 'user',
    content: `Parse this training plan into the structured JSON format:

${data.planText}`
  },
];
