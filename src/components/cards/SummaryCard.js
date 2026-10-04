import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { AmountText } from '../common/AmountText';

export function SummaryCard({ title, items }) {
  const theme = useTheme();
  return (
    <Card mode="contained" style={{ backgroundColor: theme.colors.surface, marginBottom: 16 }}>
      <Card.Content>
        {title ? (
          <Text variant="labelLarge" style={{ color: theme.colors.muted, letterSpacing: 0.8, marginBottom: 8 }}>
            {title.toUpperCase()}
          </Text>
        ) : null}
        {items.map((item, index) => (
          <View
            key={item.label}
            style={[
              styles.row,
              index > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.outline, paddingTop: 12, marginTop: 12 },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text variant="labelSmall" style={{ color: theme.colors.muted2 }}>
                {item.label}
              </Text>
              {item.currency ? (
                <AmountText amount={item.value} signed={item.signed} variant={item.large ? 'headlineSmall' : 'titleMedium'} />
              ) : (
                <Text variant={item.large ? 'headlineSmall' : 'titleMedium'} style={{ color: theme.colors.onSurface }}>
                  {item.value}
                </Text>
              )}
            </View>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {},
});
