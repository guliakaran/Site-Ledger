import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { SummaryCard } from '../../components/cards/SummaryCard';
import { MonthlyBarChart } from '../../components/charts/MonthlyBarChart';

export function YearlyReportScreen() {
  const theme = useTheme();
  const yearly = useSelector((state) => state.reports.yearly) || {};
  return (
    <Screen>
      <Text variant="headlineSmall" style={{ color: theme.colors.onBackground, marginBottom: 12 }}>
        Year-wise
      </Text>
      <SummaryCard
        items={[
          { label: `${yearly.year || ''} revenue`, value: yearly.revenue || 0, currency: true, large: true },
          { label: 'Expenses', value: yearly.expenses || 0, currency: true },
          { label: 'Profit / Loss', value: yearly.profit || 0, currency: true, signed: true },
        ]}
      />
      <Card mode="contained" style={{ backgroundColor: theme.colors.surface }}>
        <Card.Title title="Month-wise P&L" />
        <Card.Content>
          <MonthlyBarChart monthly={yearly.monthly || []} />
        </Card.Content>
      </Card>
    </Screen>
  );
}
