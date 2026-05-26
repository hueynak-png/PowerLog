import type { ChatMessage } from '../services/deepseek';

/**
 * Prompt for weekly training review.
 * Provider: GPT (advanced coaching)
 */
export const buildWeeklyReviewPrompt = (data: {
  sessions: Array<{
    date: string;
    durationSeconds: number;
    totalVolume: number;
    completionRate: number;
    mainLifts: Array<{
      nameEn: string;
      nameZh: string;
      topWeight: number;
      topReps: number;
      avgRpe: number;
    }>;
  }>;
  bodyweightEntries: Array<{ date: string; bodyweight: number }>;
  currentPhase?: string;
  weekNumber?: number;
}): ChatMessage[] => [
  {
    role: 'system',
    content: `你是一位高级力量训练教练，负责每周训练复盘。

你的任务：
1. 分析本周训练数据，评估整体表现
2. 关注三大项进展、容量趋势、RPE管理、恢复状态
3. 结合体重变化判断恢复和营养状态
4. 给出下周调整建议（主项重量/组数、辅助动作、恢复策略）
5. 判断是否需要deload

返回JSON格式：
{
  "weekSummary": "本周总结（3-5句）",
  "liftAnalysis": [
    {"lift": "Squat", "assessment": "评估", "trend": "up|stable|down"}
  ],
  "volumeTrend": "increasing|stable|decreasing",
  "fatigueSigns": ["疲劳信号1"],
  "suggestions": [
    {"type": "main_lift|accessory|recovery|nutrition", "content": "建议内容"}
  ],
  "deloadRecommendation": {
    "needed": false,
    "reasoning": "原因"
  },
  "nextWeekFocus": "下周重点"
}`
  },
  {
    role: 'user',
    content: `${data.currentPhase ? `当前阶段：${data.currentPhase}` : ''}
${data.weekNumber ? `第 ${data.weekNumber} 周` : ''}

本周训练记录：
${data.sessions.map(s => `${s.date}：
  时长 ${Math.round(s.durationSeconds / 60)} 分钟 | 容量 ${Math.round(s.totalVolume)}kg | 完成率 ${Math.round(s.completionRate * 100)}%
  主项：${s.mainLifts.map(l => `${l.nameZh} ${l.topWeight}kg×${l.topReps} RPE${l.avgRpe}`).join('、')}`).join('\n\n')}

体重记录：
${data.bodyweightEntries.length > 0
  ? data.bodyweightEntries.map(e => `${e.date}: ${e.bodyweight}kg`).join('\n')
  : '本周无体重记录'}`
  }
];
