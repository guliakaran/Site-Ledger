import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { AVATAR_COLORS } from '../../constants/app';
import { formatCurrency } from '../../utils/currency';

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export function PartnerShareChart({ items }) {
  const theme = useTheme();
  const slices = (items || [])
    .filter((item) => item.investment > 0)
    .map((item, index) => ({
      ...item,
      color: AVATAR_COLORS[index % AVATAR_COLORS.length],
    }));

  if (!slices.length) {
    return <Text style={{ color: theme.colors.muted }}>No partner investments yet.</Text>;
  }

  const total = slices.reduce((sum, item) => sum + Number(item.investment || 0), 0) || 1;
  const cx = 90;
  const cy = 90;
  const radius = 78;
  let angle = 0;

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={180} height={180} viewBox="0 0 180 180">
        <G>
          {slices.map((item) => {
            const sweep = (Number(item.investment) / total) * 360;
            const startAngle = angle;
            const endAngle = angle + Math.max(sweep, 0.5);
            angle += sweep;
            return (
              <Path
                key={item.partnerId || item.name}
                d={describeArc(cx, cy, radius, startAngle, endAngle)}
                stroke={item.color}
                strokeWidth={26}
                fill="none"
                strokeLinecap="butt"
              />
            );
          })}
          <Circle cx={cx} cy={cy} r={52} fill={theme.colors.surface} />
        </G>
      </Svg>
      <View style={{ marginTop: 12, width: '100%' }}>
        {slices.map((item) => (
          <View
            key={item.partnerId || item.name}
            style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}
          >
            <Text style={{ color: item.color }}>{item.name}</Text>
            <Text style={{ color: theme.colors.onSurface }}>{formatCurrency(item.investment)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
