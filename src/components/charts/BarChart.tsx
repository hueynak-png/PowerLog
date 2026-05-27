import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Text as SvgText, Line } from 'react-native-svg';

import { colors } from '@/src/theme/colors';
import { radius } from '@/src/theme/radius';
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
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.badge}>No data</Text>
        </View>
        <View style={styles.emptyPanel}>
          <Text style={styles.empty}>Log more sessions to fill this chart.</Text>
        </View>
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
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.badge}>Peak {Math.round(maxVal).toLocaleString()}</Text>
      </View>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <Line x1={padding.left} y1={padding.top} x2={padding.left + chartW} y2={padding.top} stroke={colors.divider} strokeWidth={1} strokeDasharray="4 6" />
        <Line x1={padding.left} y1={padding.top + chartH} x2={padding.left + chartW} y2={padding.top + chartH} stroke={colors.divider} strokeWidth={1} />
        {data.map((d, i) => {
          const barH = (d.value / maxVal) * chartH;
          const x = padding.left + gap + i * (barWidth + gap);
          const y = padding.top + chartH - barH;
          return (
            <React.Fragment key={d.label}>
              <Rect x={x} y={y} width={barWidth} height={barH} rx={6} fill={d.color ?? colors.primary} />
              <SvgText x={x + barWidth / 2} y={Math.max(y - 6, padding.top + 8)} fontSize={9} fill={colors.textSecondary} textAnchor="middle" fontWeight="700">
                {Math.round(d.value)}
              </SvgText>
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
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginBottom: spacing.sm },
  title: { ...typography.headline, color: colors.textPrimary, flex: 1 },
  badge: { ...typography.footnote, color: colors.textSecondary, fontWeight: '800', backgroundColor: colors.surfaceMuted, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, overflow: 'hidden' },
  emptyPanel: { backgroundColor: colors.surfaceMuted, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.borderLight, padding: spacing.lg },
  empty: { ...typography.callout, color: colors.textSecondary, lineHeight: 20 },
});
