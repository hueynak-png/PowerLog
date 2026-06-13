import type { PlannedSet } from '@/src/domain/types';

export interface AiAdjustmentPatch {
  plannedSetId: string;
  action: 'adjust_load' | 'adjust_rpe' | 'no_change';
  loadMultiplier?: number;
  newTargetLoad?: number;
  rpeDelta?: number;
  reason: string;
}

export interface AiAdjustmentResponse {
  adjustments: AiAdjustmentPatch[];
  summary: {
    overallReadiness: 'normal' | 'fatigued' | 'fresh';
    mainReason: string;
    setsAdjusted: number;
    averageAdjustment: number;
  };
}

interface AdjustmentContext {
  weekPhase: string;
  exerciseRole: string;
  liftFamily: string;
  isDeload: boolean;
  isTaper: boolean;
  isAccessory: boolean;
}

export interface SanitizedAdjustment {
  set: PlannedSet;
  loadMultiplier: number;
  newTargetLoad: number | undefined;
  rpeDelta: number;
  reason: string;
}

const getContext = (set: PlannedSet, weekPhase?: string, exerciseRole?: string, liftFamily?: string): AdjustmentContext => {
  const phase = (weekPhase ?? '').toLowerCase();
  const role = (exerciseRole ?? '').toLowerCase();
  return {
    weekPhase: phase,
    exerciseRole: role,
    liftFamily: liftFamily ?? 'unknown',
    isDeload: phase === 'deload',
    isTaper: phase === 'peak' || phase === 'test' || phase === 'deload',
    isAccessory: role === 'accessory',
  };
};

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

export const sanitizeAndApplyAdjustments = (
  sets: PlannedSet[],
  patches: AiAdjustmentPatch[],
  weekPhase?: string,
  exerciseRole?: string,
  liftFamily?: string,
): SanitizedAdjustment[] => {
  const patchMap = new Map<string, AiAdjustmentPatch>();
  for (const p of patches) {
    patchMap.set(p.plannedSetId, p);
  }

  const results: SanitizedAdjustment[] = [];

  for (const set of sets) {
    const patch = patchMap.get(set.id);
    if (!patch) continue;

    const ctx = getContext(set, weekPhase, exerciseRole, liftFamily);

    // Rule: deload/taper weeks — no upward adjustments
    if (ctx.isTaper && patch.loadMultiplier && patch.loadMultiplier > 1.0) {
      continue;
    }

    // Rule: accessories — default no adjustment unless AI explicitly reasoned
    if (ctx.isAccessory && !patch.reason.toLowerCase().includes('accessory')) {
      continue;
    }

    // Rule: RPE-only sets (no load) — skip load adjustments
    if (set.targetLoad == null && set.baseTargetLoad == null) {
      continue;
    }

    const baseLoad = set.baseTargetLoad ?? set.targetLoad ?? 0;

    // Clamp load multiplier to 0.90–1.05
    let multiplier = patch.loadMultiplier ?? 1.0;
    multiplier = clamp(multiplier, 0.90, 1.05);

    const newLoad = Math.round(baseLoad * multiplier / 2.5) * 2.5;

    // Rule: final load must be > 0
    if (newLoad <= 0) continue;

    // Clamp RPE delta to ±0.5
    const rpeDelta = clamp(patch.rpeDelta ?? 0, -0.5, 0.5);

    results.push({
      set,
      loadMultiplier: multiplier,
      newTargetLoad: newLoad,
      rpeDelta,
      reason: patch.reason,
    });
  }

  return results;
};

export const buildAdjustmentSummary = (results: SanitizedAdjustment[]): string => {
  if (results.length === 0) return '';
  const avgMultiplier = results.reduce((s, r) => s + r.loadMultiplier, 0) / results.length;
  const pct = ((avgMultiplier - 1) * 100).toFixed(1);
  return `AI微调了 ${results.length} 组，平均 ${pct > '0' ? '+' : ''}${pct}%`;
};
