import type { ChatMessage } from '../services/deepseek';

export const buildPlanParsePrompt = (data: {
  planText: string;
}): ChatMessage[] => [
  {
    role: 'system',
    content: `You convert free-text strength plans into structured JSON.

MANDATORY — never violate:
- Count the EXACT number of training days from the plan text. If the plan lists A日, B日, C日, D日 as separate sections with different exercises, output 4 days. If it lists 深蹲日, 卧推日, 硬拉日, 辅助日, output 4 days. NEVER merge separate days into one.
- Each day in the plan = one "day" object in the JSON. Do not combine.

Structure rules:
- If multiple weeks have identical daily rules (e.g. "Weeks 1-3 same"), output ONE week with focus like "Weeks 1-3: ...". But if weeks differ (deload, intensification), output separate weeks.
- Max 8 weeks total.

Content rules:
- Notes: MAX 30 characters. Just the key rule: "RPE7-8 top single" or "+5kg if <RPE7".
- Convert Chinese exercise names: 深蹲=Squat, 卧推=Bench Press, 硬拉=Deadlift, 手臂/弯举=Curl, 腹部/卷腹=Plank, 肩推/推举=Overhead Press, 背/划船=Row, 引体=Pull-up, 高位下拉=Lat Pulldown, 侧平举=Lateral Raise, 绳索下压=Tricep Pushdown, 腿弯举=Leg Curl, 保加利亚/Bulgarian=Bulgarian Split Squat, SSB=SSB Squat, 窄握=Close-grip Bench, 上斜=Incline Bench.
- role: "competition" for Squat/Bench Press/Deadlift. "accessory" for everything else.
- RPE ranges: use the midpoint. "RPE 7-8" → 7.5, "RPE 7.5-8" → 7.8, "RPE 6-7" → 6.5, "RPE 8.5-9" → 8.5.
- Sets × reps: parse "3×5" as targetSets=3, targetReps=5. "2-3×8-12" means approximate — use targetSets=3, targetReps=10.
- If exact sets/reps missing: main lift 3x5, accessory 2x10, core 3x12.
- Never include warm-ups. Do not explain. Return JSON only.

Return this EXACT JSON structure:
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
              "notes": "under 30 chars"
            }
          ]
        }
      ]
    }
  ]
}`
  },
  {
    role: 'user',
    content: `Parse this training plan into the structured JSON format:

${data.planText}`
  },
];
