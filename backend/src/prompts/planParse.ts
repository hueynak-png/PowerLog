import type { ChatMessage } from '../services/deepseek';

export const buildPlanParsePrompt = (data: {
  planText: string;
}): ChatMessage[] => [
  {
    role: 'system',
    content: `You convert free-text strength plans into structured JSON training programs.

CRITICAL: Infer the ACTUAL number of training days per week from the text. If the plan says "4 days/week", "一周四天", or splits lifts into separate days (Squat day, Bench day, Deadlift day, accessory day), output that many days. Do NOT squash into a single representative day.

Include ALL lifts mentioned in the plan — main lifts AND accessory/assistance work. If the plan mentions 手臂/腹部/辅助, those must appear in the output.

Return a JSON object with this EXACT structure:
{
  "name": "Program name (derived from the text, or 'Imported Plan')",
  "type": "strength|hypertrophy|powerbuilding|maintenance",
  "description": "Brief 1-2 sentence summary",
  "weeks": [
    {
      "weekNumber": 1,
      "phase": "entry|accumulation|intensification|deload|peak|test|maintenance",
      "focus": "Brief focus for this week",
      "days": [
        {
          "dayNumber": 1,
          "title": "Day title (e.g. Heavy Squat + Lower Accessories)",
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
              "notes": "RPE 7-8 top single, then back-offs"
            }
          ]
        }
      ]
    }
  ]
}

Guidelines:
- Output at most 8 weeks. Output up to 6 days per week, up to 8 exercises per day.
- Infer the number of days from plan structure. Common patterns: 3-day = Squat/Bench/Deadlift split. 4-day = Upper/Lower split or Squat/Bench/Deadlift/Accessory. 5+ day = body part split.
- For high-level RPE rules and progression tables in the text, create concrete daily workouts that follow those rules.
- Convert Chinese terms: 深蹲=Squat, 卧推=Bench Press, 硬拉=Deadlift, 手臂/弯举=Curl, 腹部/核心=Plank, 辅助/背=Row or Pull-up, 肩推=Overhead Press.
- If the plan describes different rules per week block (e.g. Week 1-3 vs Week 4 deload), reflect those differences in exercises/reps/RPE for each block.
- For RPE rules like "RPE 7-8", use 7.5 as default targetRpe. For "RPE 6-7", use 6.5.
- If exact sets/reps are missing, use reasonable defaults: main lift 3x3 or 3x5, accessory 2x10-12, core 3x12.
- role: "competition" for Squat/Bench Press/Deadlift, "variation" for pause/tempo/front squat variants, "accessory" for back/biceps/triceps/core work.
- Never include warm-ups. Do not explain. Return JSON only.`
  },
  {
    role: 'user',
    content: `Parse this training plan into the structured JSON format:

${data.planText}`
  },
];
