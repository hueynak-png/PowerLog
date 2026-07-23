interface WorkoutActivityProps {
  exerciseName: string;
  weightKg: number;
  setIndex: number;
  totalSets: number;
  restEndsAt: number;
  nextWeightKg?: number;
  phase: 'lifting' | 'resting' | 'ready';
}

// Live Activities are native-only. Keep the service contract available on web
// without bundling the unavailable expo-widgets module.
export const liveActivityService = {
  async start(_props: WorkoutActivityProps): Promise<void> {},
  async update(_props: WorkoutActivityProps): Promise<void> {},
  async end(): Promise<void> {},
  isActive(): boolean {
    return false;
  },
};
