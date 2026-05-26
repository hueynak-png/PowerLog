const pad2 = (value: number): string => value.toString().padStart(2, '0');

const toUtcParts = (isoString: string): Date => new Date(isoString);

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

export const isToday = (isoString: string): boolean => formatDate(isoString) === formatDate(new Date().toISOString());

export const getWeekStart = (date: Date): Date => {
  const start = new Date(date.getTime());
  start.setHours(0, 0, 0, 0);

  const dayIndex = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - dayIndex);

  return start;
};
