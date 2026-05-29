import Constants from 'expo-constants';

export const getAppVersion = (): string => Constants.expoConfig?.version ?? '1.0.0';

export const releaseNotes = [
  {
    version: '1.5.0',
    date: '2026-05-30',
    highlights: ['新增内容区深色模式，跟随系统深浅色切换', '统一 Web App 状态栏、启动背景与内容区颜色', '优化 PWA 启动与缓存更新，减少深色模式启动闪屏'],
  },
  {
    version: '1.4.0',
    date: '2026-05-29',
    highlights: ['全面汉化：界面支持简体中文，根据设备语言自动切换', '中英文手动切换按钮（设置页标题右侧）', '训练引导、错误提示、AI 周报等全部支持中英双语'],
  },
  {
    version: '1.3.0',
    date: '2026-05-28',
    highlights: ['营养追踪升级：食物数据库 + 宏量计算 + 板块移至1RM下方'],
  },
  {
    version: '1.2.2',
    date: '2026-05-28',
    highlights: ['修复 Reorder 按钮布局超出页面'],
  },
  {
    version: '1.2.1',
    date: '2026-05-28',
    highlights: ['组间休息计时器（完成一组后自动90秒倒计时）'],
  },
  {
    version: '1.2.0',
    date: '2026-05-28',
    highlights: ['组间休息计时器', '数字键盘智能跳转', '肌肉群训练热力图', '训练中拖拽排序动作'],
  },
  {
    version: '1.1.3',
    date: '2026-05-27',
    highlights: ['修复 dock 图标和文字未居中'],
  },
  {
    version: '1.1.2',
    date: '2026-05-27',
    highlights: ['修复悬浮 dock 遮挡页面底部内容'],
  },
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
