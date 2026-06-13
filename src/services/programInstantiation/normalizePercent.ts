export interface NormalizeResult {
  ratio: number | null;
  skipped: boolean;
  reason?: string;
}

export const normalizePercent = (value: number | null | undefined): NormalizeResult => {
  if (value == null || value <= 0) {
    return { ratio: null, skipped: true, reason: 'null/zero/negative' };
  }

  // Already a ratio (0 < value <= 1.2)
  // 1.2 as upper bound because no real training goes below 1.2%
  if (value <= 1.2) {
    return { ratio: value, skipped: false };
  }

  // Percent format (1.2 < value <= 120)
  // 120% is the absolute maximum for any training program
  if (value <= 120) {
    return { ratio: value / 100, skipped: false };
  }

  // Implausible value
  return { ratio: null, skipped: true, reason: `implausible value ${value}` };
};

export const formatPercentSummary = (
  total: number,
  used: number,
  skipped: number,
): string => {
  return `Percent normalization: ${used} used, ${skipped} skipped (of ${total} total)`;
};
