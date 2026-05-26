import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';

import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  title: string;
  height?: number;
}

export function BarChart({ data, title, height = 140 }: BarChartProps) {
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.empty}>No data yet</Text>
      </View>
    );
  }

  const width = 320;
  const padding = { top: 10, right: 8, bottom: 24, left: 8 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const barWidth = Math.min(32, (chartW / data.length) * 0.7);
  const gap = (chartW - barWidth * data.length) / (data.length + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {data.map((d, i) => {
          const barH = (d.value / maxVal) * chartH;
          const x = padding.left + gap + i * (barWidth + gap);
          const y = padding.top + chartH - barH;
          return (
            <React.Fragment key={d.label}>
              <Rect x={x} y={y} width={barWidth} height={barH} rx={3} fill={d.color ?? colors.primary} />
              <SvgText x={x + barWidth / 2} y={height - 4} fontSize={9} fill={colors.textTertiary} textAnchor="middle">
                {d.label}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  title: { ...typography.headline, color: colors.textPrimary, marginBottom: spacing.sm },
  empty: { ...typography.callout, color: colors.textSecondary },
});
