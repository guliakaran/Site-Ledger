import React from 'react';
import { View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { EmptyState } from '../../components/common/EmptyState';
import { AmountText } from '../../components/common/AmountText';
import { formatCurrency } from '../../utils/currency';

export function ProjectWiseReportScreen() {
  const theme = useTheme();
  const projectWise = useSelector((state) =>
    Array.isArray(state.reports.projectWise) ? state.reports.projectWise : [],
  );
  return (
    <Screen>
      <Text variant="headlineSmall" style={{ color: theme.colors.onBackground, marginBottom: 12 }}>
        Project-wise
      </Text>
      {projectWise.length === 0 ? (
        <EmptyState title="No project figures for this range" />
      ) : (
        projectWise.map((item) => (
          <Card key={item.projectId} mode="contained" style={{ backgroundColor: theme.colors.surface, marginBottom: 10 }}>
            <Card.Content>
              <Text variant="titleMedium">{item.name}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <Text style={{ color: theme.colors.muted }}>Rev {formatCurrency(item.revenue)}</Text>
                <Text style={{ color: theme.colors.muted }}>Exp {formatCurrency(item.expenses)}</Text>
                <AmountText amount={item.profit} signed variant="bodyMedium" />
              </View>
            </Card.Content>
          </Card>
        ))
      )}
    </Screen>
  );
}
