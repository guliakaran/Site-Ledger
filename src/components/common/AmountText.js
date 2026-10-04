import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { formatCurrency, formatSignedCurrency } from '../../utils/currency';

export function AmountText({ amount, signed = false, variant = 'titleMedium', style }) {
  const theme = useTheme();
  const value = Number(amount) || 0;
  const color = value > 0 ? theme.colors.profit : value < 0 ? theme.colors.loss : theme.colors.onSurface;
  return (
    <Text variant={variant} style={[{ color }, style]}>
      {signed ? formatSignedCurrency(value) : formatCurrency(value)}
    </Text>
  );
}
