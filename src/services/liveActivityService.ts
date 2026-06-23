import type { WorkoutActivityProps } from '@/widgets/WorkoutActivity';

interface LiveActivityInstance {
  update: (props: WorkoutActivityProps) => Promise<void>;
  end: () => Promise<void>;
}

let currentInstance: LiveActivityInstance | null = null;

export const liveActivityService = {
  async start(props: WorkoutActivityProps) {
    try {
      if (currentInstance) await this.end();
      const { WorkoutLiveActivityComponent } = await import('@/widgets/WorkoutActivity');
      currentInstance = WorkoutLiveActivityComponent.start(
        props,
        'powerlog://workout/current',
      );
    } catch (error) {
      console.warn('[LiveActivity] Start failed:', error);
    }
  },

  async update(props: WorkoutActivityProps) {
    try {
      if (!currentInstance) return;
      await currentInstance.update(props);
    } catch (error) {
      console.warn('[LiveActivity] Update failed:', error);
    }
  },

  async end() {
    try {
      if (!currentInstance) return;
      await currentInstance.end();
      currentInstance = null;
    } catch (error) {
      console.warn('[LiveActivity] End failed:', error);
    }
  },

  isActive(): boolean {
    return currentInstance !== null;
  },
};
