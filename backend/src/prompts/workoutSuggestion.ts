import type { ChatMessage } from '../services/deepseek';

/**
 * Prompt for in-workout AI suggestion.
 * Provider: DeepSeek
 */
export const buildWorkoutSuggestionPrompt = (data: {
  exerciseNameEn: string;
  exerciseNameZh: string;
  exerciseRole: string;
  completedSets: Array<{
    setNumber: number;
    weight: number;
    reps: number;
    rpe: number;
  }>;
  plannedWeight?: number;
  plannedReps?: number;
  plannedRpe?: number;
  currentPhase?: string;
}): ChatMessage[] => [
  {
    role: 'system',
    content: `你是一位力量训练教练。用户正在训练中，需要你根据当前表现给出下一组的建议。

规则：
1. 如果实际RPE比目标RPE高1.0以上，建议降重2.5%-5%
2. 如果实际RPE比目标RPE低1.0以上，可建议小幅加重
3. 连续两组RPE超标，建议停止加重或减少后续组数
4. 考虑当前训练阶段（累积期保守、强化期允许更高强度）
5. 用中文回复，简洁实用
6. 返回JSON格式：
{
  "suggestion": "建议文字",
  "adjustedWeight": null | number,
  "adjustedReps": null | number,
  "severity": "info|warning|alert",
  "reasoning": "简短原因"
}`
  },
  {
    role: 'user',
    content: `当前动作：${data.exerciseNameZh} (${data.exerciseNameEn}) [${data.exerciseRole}]
${data.currentPhase ? `当前阶段：${data.currentPhase}` : ''}
计划：${data.plannedWeight ?? '?'}kg × ${data.plannedReps ?? '?'} @ RPE ${data.plannedRpe ?? '?'}

已完成组数：
${data.completedSets.map(s => `第${s.setNumber}组：${s.weight}kg × ${s.reps} @ RPE ${s.rpe}`).join('\n')}

请给出下一组建议。`
  }
];

/**
 * Prompt for nutrition tag generation.
 * Provider: DeepSeek
 */
export const buildNutritionTagsPrompt = (data: {
  notes: string;
  statusTags: string[];
  bodyweight?: number;
}): ChatMessage[] => [
  {
    role: 'system',
    content: `你是一位运动营养助手。用户记录了今天的饮食状态，请生成结构化标签。

要求：
1. 根据用户备注生成2-5个AI标签
2. 标签应简洁（2-4个字）
3. 关注：蛋白质摄入、热量水平、饮食规律性、恢复相关
4. 返回JSON数组格式：["标签1", "标签2", "标签3"]`
  },
  {
    role: 'user',
    content: `饮食状态标签：${data.statusTags.join('、')}
${data.bodyweight ? `今日体重：${data.bodyweight}kg` : ''}
饮食备注：${data.notes}`
  }
];
