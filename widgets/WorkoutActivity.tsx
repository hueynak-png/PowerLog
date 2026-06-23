import { createLiveActivity } from 'expo-widgets';
import type { LiveActivityEnvironment } from 'expo-widgets';
import { StyleSheet, Text, View } from 'react-native';

interface WorkoutActivityProps {
  exerciseName: string;
  weightKg: number;
  setIndex: number;
  totalSets: number;
  restEndsAt: number;
  nextWeightKg?: number;
  phase: 'lifting' | 'resting' | 'ready';
}

function Banner(props: WorkoutActivityProps) {
  return (
    <View style={s.banner}>
      <Text style={s.bannerTitle} numberOfLines={1}>{props.exerciseName}</Text>
      <Text style={s.bannerSub}>
        {props.weightKg}kg · Set {props.setIndex}/{props.totalSets}
      </Text>
    </View>
  );
}

function CompactLeading(props: WorkoutActivityProps) {
  return (
    <View style={s.compact}>
      <Text style={s.compactEx} numberOfLines={1}>{props.exerciseName}</Text>
      <Text style={s.compactVal}>{props.weightKg}kg</Text>
    </View>
  );
}

function CompactTrailing(props: WorkoutActivityProps) {
  if (props.phase !== 'resting') return null;
  const sLeft = Math.max(0, Math.ceil((props.restEndsAt - Date.now()) / 1000));
  const m = Math.floor(sLeft / 60);
  const sec = sLeft % 60;
  return (
    <View style={s.compact}>
      <Text style={s.compactTimer}>{m}:{String(sec).padStart(2, '0')}</Text>
    </View>
  );
}

function Minimal(props: WorkoutActivityProps) {
  return (
    <View style={s.compact}>
      <Text style={s.compactVal}>{props.weightKg}kg</Text>
    </View>
  );
}

function ExpandedLeading(props: WorkoutActivityProps) {
  return (
    <View style={s.expanded}>
      <Text style={s.expName}>{props.exerciseName}</Text>
      <Text style={s.expMeta}>Set {props.setIndex}/{props.totalSets}</Text>
    </View>
  );
}

function ExpandedTrailing(props: WorkoutActivityProps) {
  const sLeft = Math.max(0, Math.ceil((props.restEndsAt - Date.now()) / 1000));
  const m = Math.floor(sLeft / 60);
  const sec = sLeft % 60;
  return (
    <View style={s.expanded}>
      <Text style={s.expTimer}>{m}:{String(sec).padStart(2, '0')}</Text>
    </View>
  );
}

function ExpandedBottom(props: WorkoutActivityProps) {
  return (
    <View style={s.expBottom}>
      <View style={s.expRow}>
        <Text style={s.expLabel}>Current</Text>
        <Text style={s.expValue}>{props.weightKg}kg</Text>
      </View>
      {props.nextWeightKg != null && (
        <View style={s.expRow}>
          <Text style={s.expLabel}>Next Set</Text>
          <Text style={s.expValue}>{props.nextWeightKg}kg</Text>
        </View>
      )}
      <View style={s.expRow}>
        <Text style={s.expLabel}>Progress</Text>
        <Text style={s.expValue}>Set {props.setIndex} of {props.totalSets}</Text>
      </View>
    </View>
  );
}

export const WorkoutLiveActivityComponent = createLiveActivity(
  'WorkoutActivity',
  (props: WorkoutActivityProps, _env: LiveActivityEnvironment) => ({
    banner: Banner(props),
    compactLeading: CompactLeading(props),
    compactTrailing: CompactTrailing(props),
    minimal: Minimal(props),
    expandedLeading: ExpandedLeading(props),
    expandedTrailing: ExpandedTrailing(props),
    expandedBottom: ExpandedBottom(props),
  }),
);

export type { WorkoutActivityProps };

const s = StyleSheet.create({
  banner: { padding: 4 },
  bannerTitle: { fontSize: 14, fontWeight: '700', color: '#fff' },
  bannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  compact: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  compactEx: { fontSize: 11, fontWeight: '700', color: '#fff' },
  compactVal: { fontSize: 13, fontWeight: '800', color: '#fff' },
  compactTimer: { fontSize: 13, fontWeight: '800', color: '#4CAF50', fontVariant: ['tabular-nums'] },
  expanded: { alignItems: 'flex-start', justifyContent: 'center', padding: 4 },
  expName: { fontSize: 15, fontWeight: '700', color: '#fff' },
  expMeta: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  expTimer: { fontSize: 15, fontWeight: '800', color: '#4CAF50', fontVariant: ['tabular-nums'] },
  expBottom: { gap: 4, padding: 4 },
  expRow: { flexDirection: 'row', justifyContent: 'space-between' },
  expLabel: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  expValue: { fontSize: 12, fontWeight: '600', color: '#fff' },
});
