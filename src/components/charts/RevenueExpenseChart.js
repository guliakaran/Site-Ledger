import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { formatCurrency } from '../../utils/currency';
import { SvgBarChart } from './MonthlyBarChart';

export function RevenueExpenseChart({ revenue, expenses }) {
  const theme = useTheme();
  const data = [
    { value: Number(revenue) || 0, label: 'Revenue', color: theme.colors.primary },
    { value: Number(expenses) || 0, label: 'Expenses', color: theme.colors.error },
  ];

  return (
    <View>
      <SvgBarChart data={data} theme={theme} height={200} formatValue={(value) => formatCurrency(value).replace('₹', '')} />
      <Text variant="bodySmall" style={{ color: theme.colors.muted, marginTop: 8 }}>
        Revenue {formatCurrency(revenue)} vs expenses {formatCurrency(expenses)}
      </Text>
    </View>
  );
}
