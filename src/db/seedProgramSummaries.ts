import type { PowerLogDatabase } from './types';

const CREATED_AT = '2026-05-26T00:00:00.000Z';

const PROGRAM_SUMMARIES = [
  {
    id: 'seed-program-brad-full-cycle',
    name: "Brad Excel 大周期",
    type: 'powerbuilding',
    goal: '导入 Brad 风格的力量举/增肌周期，包含竞赛动作、变式、辅助训练、RPE 递增及减载。',
    source: 'imported_excel',
    durationWeeks: 33,
    includesDeload: true,
    description: '从 Brad Program.xlsx 中 33 个非 PR 训练周表确定性导入。PR Tracker 已被有意忽略。',
  },
  {
    id: 'seed-program-brad-powerbuilding-8',
    name: 'Brad 风格增肌力量 8 周',
    type: 'powerbuilding',
    goal: '以 Brad 非 PR 训练表结构为灵感的顶组/退阶增肌力量模块，非 PR Tracker 数值。',
    source: 'manual',
    durationWeeks: 8,
    includesDeload: true,
    description: '四天 Brad 风格模板，深蹲/卧推和硬拉/卧推配对，录制顶组、退阶组、辅助动作，第 8 周减载。',
  },
  {
    id: 'seed-program-powerlifting-strength-12',
    name: '力量举力量 12 周',
    type: 'strength',
    goal: '通过容量期、强化期、减载和保守测试周来提升深蹲、卧推和硬拉力量。',
    source: 'manual',
    durationWeeks: 12,
    includesDeload: true,
    description: '原创 12 周力量举模板，每周 4 天训练，计划减载、竞赛动作练习、变式动作和测试周单次试举。',
  },
  {
    id: 'seed-program-hypertrophy-upper-lower-8',
    name: '增肌上下肢分化 8 周',
    type: 'hypertrophy',
    goal: '以稳定 RPE 和可重复进阶方式积累高质量上下肢训练量。',
    source: 'manual',
    durationWeeks: 8,
    includesDeload: true,
    description: '原创 8 周上下肢增肌模块，使用种子动作名称、较高次数、控制节奏和最终减载。',
  },
  {
    id: 'seed-program-dup-strength-hypertrophy-10',
    name: 'DUP 力量增肌 10 周',
    type: 'powerbuilding',
    goal: '轮换容量、力量和强度刺激，同时保持增肌训练。',
    source: 'manual',
    durationWeeks: 10,
    includesDeload: true,
    description: '原创 10 周日/周波动模板，包含竞赛动作练习、变式动作、辅助训练和减量周。',
  },
  {
    id: 'seed-program-deload-peak-test-12',
    name: '减载冲峰测试 12 周',
    type: 'strength',
    goal: '从基础力量过渡到低疲劳冲峰和测试周执行。',
    source: 'manual',
    durationWeeks: 12,
    includesDeload: true,
    description: '原创 12 周冲峰/测试模板，计划减载检查点，末期减少辅助动作，减量周和测试周。',
  },
];

export const seedProgramSummaries = async (db: PowerLogDatabase): Promise<void> => {
  for (const program of PROGRAM_SUMMARIES) {
    const existing = await db.getFirstAsync<{ id: string }>('SELECT id FROM programs WHERE id = ? LIMIT 1', [program.id]);
    if (existing) {
      // Update existing seeded programs with latest translations
      await db.runAsync(
        `UPDATE programs SET name = ?, type = ?, goal = ?, description = ? WHERE id = ?`,
        [program.name, program.type, program.goal, program.description, program.id],
      );
      continue;
    }

    await db.runAsync(
      `INSERT INTO programs (id, name, type, goal, source, duration_weeks, includes_deload, description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        program.id,
        program.name,
        program.type,
        program.goal,
        program.source,
        program.durationWeeks,
        program.includesDeload ? 1 : 0,
        program.description,
        CREATED_AT,
      ],
    );
  }
};
