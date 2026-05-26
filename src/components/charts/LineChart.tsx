import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polyline, Circle, Line, Text as SvgText } from 'react-native-svg';

import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
  color?: string;
  height?: number;
  unit?: string;
}

export function LineChart({ data, title, color = colors.primary, height = 160, unit = '' }: LineChartProps) {
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.empty}>No data yet</Text>
      </View>
    );
  }

  const padding = { top: 20, right: 16, bottom: 30, left: 40 };
  const width = 320;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const y = padding.top + chartH - ((d.value - minVal) / range) * chartH;
    return { x, y, ...d };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const lastPoint = points[points.length - 1];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Y axis labels */}
        <SvgText x={padding.left - 4} y={padding.top + 4} fontSize={10} fill={colors.textTertiary} textAnchor="end">
          {Math.round(maxVal)}{unit}
        </SvgText>
        <SvgText x={padding.left - 4} y={padding.top + chartH + 4} fontSize={10} fill={colors.textTertiary} textAnchor="end">
          {Math.round(minVal)}{unit}
        </SvgText>
        {/* Baseline */}
        <Line x1={padding.left} y1={padding.top + chartH} x2={padding.left + chartW} y2={padding.top + chartH} stroke={colors.borderLight} strokeWidth={1} />
        {/* Line */}
        <Polyline points={polylinePoints} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        {/* End dot */}
        <Circle cx={lastPoint.x} cy={lastPoint.y} r={4} fill={color} />
        {/* X labels: first and last */}
        <SvgText x={points[0].x} y={height - 4} fontSize={9} fill={colors.textTertiary} textAnchor="start">
          {data[0].label}
        </SvgText>
        <SvgText x={lastPoint.x} y={height - 4} fontSize={9} fill={colors.textTertiary} textAnchor="end">
          {data[data.length - 1].label}
        </SvgText>
      </Svg>
      <Text style={styles.latest}>Latest: {Math.round(lastPoint.value)}{unit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  title: { ...typography.headline, color: colors.textPrimary, marginBottom: spacing.sm },
  empty: { ...typography.callout, color: colors.textSecondary },
  latest: { ...typography.footnote, color: colors.textSecondary, marginTop: spacing.xs },
});
