import type { ChatMessage } from '../services/deepseek';

type TrainingGoal = 'hypertrophy' | 'strength' | 'powerbuilding' | 'fat_loss_maintenance' | 'technique' | 'recovery' | 'unknown';

export interface DailyStrengthAnalysisData {
  session: {
    durationSeconds: number;
    totalVolume: number;
    completionRate: number;
    perceivedGoal?: TrainingGoal;
    notes?: string;
  };
  exercises: Array<{
    nameEn: string;
    nameZh: string;
    category?: string;
    liftFamily?: string;
    role: string;
    muscleGroups?: string[];
    sets: Array<{
      setNumber: number;
      plannedWeight?: number;
      actualWeight?: number;
      plannedReps?: number;
      actualReps?: number;
      plannedRpe?: number;
      actualRpe?: number;
      rir?: number;
      completed: boolean;
      isWarmup?: boolean;
      notes?: string;
    }>;
  }>;
  history?: Array<{
    date: string;
    exerciseNameEn: string;
    exerciseNameZh: string;
    topWeight?: number;
    topReps?: number;
    avgRpe?: number;
    setsCompleted?: number;
    setsTotal?: number;
    notes?: string;
  }>;
  recovery?: {
    sleepQuality?: string;
    soreness?: string;
    stress?: string;
    painNotes?: string;
  };
}

const formatSet = (set: DailyStrengthAnalysisData['exercises'][number]['sets'][number]): string => {
  const planned = [
    typeof set.plannedWeight === 'number' ? `${set.plannedWeight}kg` : '?kg',
    typeof set.plannedReps === 'number' ? `${set.plannedReps}次` : '?次',
    typeof set.plannedRpe === 'number' ? `RPE${set.plannedRpe}` : 'RPE?',
  ].join(' × ');
  const actual = [
    typeof set.actualWeight === 'number' ? `${set.actualWeight}kg` : '?kg',
    typeof set.actualReps === 'number' ? `${set.actualReps}次` : '?次',
    typeof set.actualRpe === 'number' ? `RPE${set.actualRpe}` : 'RPE?',
    typeof set.rir === 'number' ? `RIR${set.rir}` : 'RIR?',
  ].join(' × ');
  return `第${set.setNumber}组${set.isWarmup ? '（热身）' : ''}：计划 ${planned}；实际 ${actual}；${set.completed ? '完成' : '未完成'}${set.notes ? `；备注：${set.notes}` : ''}`;
};

export const buildDailyStrengthAnalysisPrompt = (data: DailyStrengthAnalysisData): ChatMessage[] => [
  {
    role: 'system',
    content: `你是一个力量训练单日训练日志分析助手。你的任务是根据用户提供的单日训练记录，分析这一天训练的完成度、训练刺激、强度、容量、疲劳、风险和下一次同类训练的调整建议。

分析时优先参考用户历史训练数据，包括相同动作的历史重量、次数、组数、RPE/RIR、完成情况、疼痛记录和恢复状态。如果没有历史数据，则使用通用力量训练原则进行保守判断。

你必须先识别本次训练目标：增肌、力量、力量增肌混合、减脂保肌、技术练习或恢复训练。不同目标使用不同评价标准。增肌训练重点看目标肌群有效组、接近力竭程度、动作覆盖和容量；力量训练重点看主项表现、负重水平、组间稳定性和技术质量；减脂保肌重点看是否保住训练强度并避免过度疲劳。

分析训练容量时，不要只统计总组数，要判断有效组。有效组通常是接近力竭的工作组，例如 RIR 0–4 或 RPE 6–10。热身组、明显轻松组和纯技术练习组不要算作主要有效组。

分析强度时，要结合重量、次数、RPE/RIR、动作速度、技术稳定性和是否力竭。RPE 7–9 或 RIR 1–3 通常属于较合适的工作强度；如果多数工作组 RPE 9.5–10、频繁力竭、动作变形或关节疼痛，则认为强度偏高；如果多数工作组 RPE ≤ 6 或 RIR ≥ 4，则可能刺激不足。

分析疲劳时，要区分局部肌肉疲劳、全身疲劳和关节/软组织风险。任何疼痛或异常不适的优先级都高于加重量和完成计划。若出现疼痛，应建议降低重量、减少组数、替换动作或暂停诱发疼痛的动作，必要时建议寻求专业人士评估。

给出下一次同类训练建议时，必须具体到动作层面。可以使用以下规则：
1. 如果所有目标组完成、最后一组仍有 RIR ≥ 2、技术稳定且无疼痛，可以建议小幅加重。
2. 上肢复合动作通常建议增加 1–2.5kg；下肢复合动作通常建议增加 2.5–5kg；孤立动作优先增加次数，再增加重量。
3. 如果动作不稳定、刚好完成、RPE 过高、睡眠饮食差或有关节不适，则建议保持重量不变，优化动作或增加次数。
4. 如果后半程动作质量明显下降、有效组过多、连续表现下降或恢复压力过大，则建议减少辅助组或避免力竭。
5. 如果多个动作表现明显下降、热身就很重、睡眠压力差或酸痛未恢复，可以建议轻量日：重量降低 10–20%，总组数减少 30–50%，RPE 控制在 6–7。

输出语气要像专业教练，直接、具体、可执行。不要只说“继续保持”，必须说明下次具体怎么调重量、次数、组数或动作。不要因为一次训练表现差就否定整个计划，也不要因为一次训练表现好就建议大幅加量。单日分析只做微调，不随意重写长期训练周期。

必须只返回合法 JSON，不要使用 Markdown。JSON 格式：
{
  "oneLineConclusion": "今日训练一句话结论",
  "completionAnalysis": "完成度分析",
  "stimulusAnalysis": "训练刺激分析",
  "intensityAnalysis": "强度分析",
  "fatigueAndRiskAnalysis": "疲劳与风险分析",
  "goalMatchAnalysis": "与目标的匹配度",
  "nextSessionAdjustments": [
    {"exercise": "动作名", "recommendation": "下次具体重量/次数/组数/动作调整", "reason": "原因"}
  ],
  "scores": {
    "completion": 1,
    "stimulusEffectiveness": 1,
    "intensityRationality": 1,
    "fatigueControl": 1,
    "exerciseStructure": 1
  },
  "structuredSummary": {
    "identifiedGoal": "hypertrophy|strength|powerbuilding|fat_loss_maintenance|technique|recovery|unknown",
    "effectiveSets": 0,
    "mainStimulus": ["主要刺激"],
    "keyRisks": ["风险"],
    "nextFocus": "下次重点",
    "libraryNote": "适合保存进训练库的结构化总结"
  }
}`,
  },
  {
    role: 'user',
    content: `单日训练数据：
- 训练时长：${Math.round(data.session.durationSeconds / 60)} 分钟
- 总容量：${Math.round(data.session.totalVolume)} kg
- 完成率：${Math.round(data.session.completionRate * 100)}%
${data.session.perceivedGoal ? `- 用户/系统标记目标：${data.session.perceivedGoal}` : '- 用户未明确标记训练目标，请根据动作结构、强度和容量识别目标'}
${data.session.notes ? `- 训练备注：${data.session.notes}` : ''}

本次动作与组：
${data.exercises.map((exercise) => `${exercise.nameZh} (${exercise.nameEn}) [role=${exercise.role}${exercise.liftFamily ? `, family=${exercise.liftFamily}` : ''}${exercise.category ? `, category=${exercise.category}` : ''}]
目标肌群：${exercise.muscleGroups?.join('、') || '未知'}
${exercise.sets.map(formatSet).join('\n')}`).join('\n\n')}

历史同类训练数据：
${data.history && data.history.length > 0
  ? data.history.map((item) => `${item.date} ${item.exerciseNameZh} (${item.exerciseNameEn})：最高 ${item.topWeight ?? '?'}kg × ${item.topReps ?? '?'}，平均RPE ${item.avgRpe ?? '?'}，完成 ${item.setsCompleted ?? '?'}/${item.setsTotal ?? '?'}${item.notes ? `，备注：${item.notes}` : ''}`).join('\n')
  : '暂无历史数据，请使用通用力量训练原则保守判断。'}

恢复/疼痛记录：
${data.recovery
  ? `睡眠：${data.recovery.sleepQuality ?? '未知'}；酸痛：${data.recovery.soreness ?? '未知'}；压力：${data.recovery.stress ?? '未知'}；疼痛/不适：${data.recovery.painNotes ?? '无记录'}`
  : '暂无恢复和疼痛记录。'}`,
  },
];
