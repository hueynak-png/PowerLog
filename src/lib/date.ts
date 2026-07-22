const pad2 = (value: number): string => value.toString().padStart(2, '0');

const toUtcParts = (isoString: string): Date => new Date(isoString);

const isChineseLocale = (locale: string): boolean => locale.toLowerCase().startsWith('zh');

export const formatDate = (isoString: string): string => {
  const date = toUtcParts(isoString);
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
};

export const formatTime = (isoString: string): string => {
  const date = toUtcParts(isoString);
  return `${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}`;
};

export const formatDuration = (seconds: number): string => {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}m`;
};

export const formatDateTimeLocale = (isoString: string, locale: string): string => {
  const date = new Date(isoString);

  if (isChineseLocale(locale)) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

export const formatDurationLocale = (seconds: number, locale: string): string => {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (isChineseLocale(locale)) {
    if (hours > 0 && minutes > 0) return `${hours}小时${minutes}分钟`;
    if (hours > 0) return `${hours}小时`;
    return `${minutes}分钟`;
  }

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${minutes}m`;
};

export const isToday = (isoString: string): boolean => formatDate(isoString) === formatDate(new Date().toISOString());

export const getWeekStart = (date: Date): Date => {
  const start = new Date(date.getTime());
  start.setHours(0, 0, 0, 0);

  const dayIndex = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - dayIndex);

  return start;
};

/** Parse a persisted YYYY-MM-DD value as a local calendar date. */
export const parseLocalDate = (value: string): Date => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error(`Invalid local date: ${value}`);

  const [, yearString, monthString, dayString] = match;
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error(`Invalid local date: ${value}`);
  }

  return date;
};

/** Format a local calendar date for the scheduled_date column. */
export const formatLocalDate = (date: Date): string =>
  `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

/**
 * Returns the number of days until the first configured weekday, using a
 * Monday-based schedule (0=Mon … 6=Sun).
 */
export const getFirstTrainingOffset = (startDate: string, scheduleOffsets: number[]): number => {
  const date = parseLocalDate(startDate);
  const firstTrainingDay = scheduleOffsets[0] ?? 0;
  const mondayBasedDay = (date.getDay() + 6) % 7;
  return (firstTrainingDay - mondayBasedDay + 7) % 7;
};
