import { describe, expect, it } from '@jest/globals';

import {
  formatDate,
  formatDuration,
  formatLocalDate,
  formatTime,
  getFirstTrainingOffset,
  getWeekStart,
  isToday,
  parseLocalDate,
} from '@/src/lib/date';

describe('date', () => {
  it('formats date as YYYY-MM-DD', () => {
    expect(formatDate('2026-05-25T14:30:00Z')).toBe('2026-05-25');
  });

  it('formats time as HH:MM', () => {
    expect(formatTime('2026-05-25T14:05:00Z')).toBe('14:05');
  });

  it('formats durations', () => {
    expect(formatDuration(5400)).toBe('1h 30m');
    expect(formatDuration(2700)).toBe('45m');
  });

  it('detects today using UTC date comparison', () => {
    const today = new Date().toISOString();
    expect(isToday(today)).toBe(true);
  });

  it('returns the Monday of the week', () => {
    const date = new Date(2026, 4, 27);
    const weekStart = getWeekStart(date);

    expect(weekStart.getDay()).toBe(1);
    expect(weekStart.getDate()).toBe(25);
  });

  it('parses and formats schedule dates without UTC conversion', () => {
    const date = parseLocalDate('2026-07-27');

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(6);
    expect(date.getDate()).toBe(27);
    expect(formatLocalDate(date)).toBe('2026-07-27');
  });

  it('anchors a training week on its first configured weekday', () => {
    expect(getFirstTrainingOffset('2026-07-22', [0, 1, 3, 4])).toBe(5);
    expect(getFirstTrainingOffset('2026-07-27', [0, 1, 3, 4])).toBe(0);
  });
});
