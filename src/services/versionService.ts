import Constants from 'expo-constants';

export const getAppVersion = (): string => Constants.expoConfig?.version ?? '1.0.0';

export const releaseNotes = [
  {
    version: '1.1.1',
    date: '2026-05-27',
    highlights: ['修复悬浮 dock 文字显示不全', '新增可点击更新内容记录'],
  },
  {
    version: '1.1.0',
    date: '2026-05-27',
    highlights: ['Program Generator 改为结构化选项', '增加 Stop Active Plan', '升级 GPT 计划生成上下文'],
  },
  {
    version: '1.0.0',
    date: '2026-05-27',
    highlights: ['Cloud Sync、自动备份、Web 导入导出', 'Weekly Review 保存', '训练中本地 RPE 重量建议'],
  },
];
