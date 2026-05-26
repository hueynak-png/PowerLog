import type { ChatMessage } from '../services/deepseek';

/**
 * Prompt for generating a single workout session summary.
 * Provider: DeepSeek
 */
export const buildSessionSummaryPrompt = (data: {
  exercises: Array<{
    nameEn: string;
    nameZh: string;
    role: string;
    sets: Array<{
      plannedWeight?: number;
      actualWeight?: number;
      plannedReps?: number;
      actualReps?: number;
      plannedRpe?: number;
      actualRpe?: number;
      completed: boolean;
    }>;
  }>;
  durationSeconds: number;
  totalVolume: number;
  completionRate: number;
}): ChatMessage[] => [
  {
    role: 'system',
    content: `你是一位专业的力量训练教练助手。用户刚完成一次训练，请根据数据生成简洁的训练总结和建议。

要求：
1. 用中文回复
2. 总结要简洁（3-5句话）
3. 重点关注：主项表现、RPE是否合理、容量是否达标
4. 如果有异常（RPE过高、完成率低），给出具体建议
5. 返回JSON格式：
{
  "summary": "训练总结文字",
  "highlights": ["亮点1", "亮点2"],
  "concerns": ["问题1"],
  "suggestions": ["建议1", "建议2"],
  "overallRating": "excellent|good|fair|poor"
}`
  },
  {
    role: 'user',
    content: `训练数据：
- 训练时长：${Math.round(data.durationSeconds / 60)} 分钟
- 总容量：${Math.round(data.totalVolume)} kg
- 完成率：${Math.round(data.completionRate * 100)}%

动作详情：
${data.exercises.map(ex => {
  const completedSets = ex.sets.filter(s => s.completed);
  const avgRpe = completedSets.length > 0
    ? (completedSets.reduce((sum, s) => sum + (s.actualRpe ?? 0), 0) / completedSets.length).toFixed(1)
    : 'N/A';
  const topWeight = Math.max(...completedSets.map(s => s.actualWeight ?? 0));
  return `${ex.nameZh} (${ex.nameEn}) [${ex.role}]
  完成：${completedSets.length}/${ex.sets.length} 组
  最大重量：${topWeight}kg
  平均RPE：${avgRpe}`;
}).join('\n\n')}`
  }
];
