import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import moment from 'moment';
import { formatCurrency } from '../../utils/currency';

export function MonthlyBarChart({ monthly }) {
  const theme = useTheme();
  const data = (monthly || []).map((item, index) => ({
    value: Math.max(Number(item.profit) || 0, 0),
    label: moment().month(index).format('MMM'),
    color: item.profit >= 0 ? theme.colors.primary : theme.colors.error,
  }));

  if (!data.length) {
    return <Text style={{ color: theme.colors.muted }}>No monthly data yet.</Text>;
  }

  return <SvgBarChart data={data} theme={theme} formatValue={(value) => formatCurrency(value).replace('₹', '')} />;
}

export function SvgBarChart({ data, theme, height = 180, formatValue }) {
  const width = 320;
  const chartHeight = height - 28;
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const barWidth = Math.max(10, Math.min(36, (width - 24) / data.length - 8));
  const gap = (width - 12 - barWidth * data.length) / Math.max(data.length, 1);

  return (
    <View>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (chartHeight - 8);
          const x = 8 + index * (barWidth + gap);
          const y = chartHeight - barHeight;
          return (
            <React.Fragment key={item.label}>
              <Rect x={x} y={y} width={barWidth} height={Math.max(barHeight, 2)} rx={4} fill={item.color} />
              <SvgText
                x={x + barWidth / 2}
                y={height - 6}
                fontSize="9"
                fill={theme.colors.muted2}
                textAnchor="middle"
              >
                {item.label}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
      {formatValue ? (
        <Text variant="bodySmall" style={{ color: theme.colors.muted2 }}>
          Scale up to {formatValue(maxValue)}
        </Text>
      ) : null}
    </View>
  );
}
