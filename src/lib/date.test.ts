import { describe, expect, it } from '@jest/globals';

import { formatDate, formatDuration, formatTime, getWeekStart, isToday } from '@/src/lib/date';

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
});
