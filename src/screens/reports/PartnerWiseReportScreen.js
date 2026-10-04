import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { EmptyState } from '../../components/common/EmptyState';
import { PartnerShareChart } from '../../components/charts/PartnerShareChart';
import { AmountText } from '../../components/common/AmountText';
import { formatCurrency } from '../../utils/currency';

export function PartnerWiseReportScreen() {
  const theme = useTheme();
  const partnerWise = useSelector((state) =>
    Array.isArray(state.reports.partnerWise) ? state.reports.partnerWise : [],
  );
  return (
    <Screen>
      <Text variant="headlineSmall" style={{ color: theme.colors.onBackground, marginBottom: 12 }}>
        Partner-wise
      </Text>
      {partnerWise.length === 0 ? (
        <EmptyState title="No partner figures for this range" />
      ) : (
        <>
          <Card mode="contained" style={{ backgroundColor: theme.colors.surface, marginBottom: 16 }}>
            <Card.Title title="Investment mix" />
            <Card.Content>
              <PartnerShareChart items={partnerWise} />
            </Card.Content>
          </Card>
          {partnerWise.map((item) => (
            <Card key={item.partnerId} mode="contained" style={{ backgroundColor: theme.colors.surface, marginBottom: 10 }}>
              <Card.Content>
                <Text variant="titleMedium">{item.name}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.muted, marginTop: 4 }}>
                  Invested {formatCurrency(item.investment)}
                </Text>
                <AmountText amount={item.net} signed />
              </Card.Content>
            </Card>
          ))}
        </>
      )}
    </Screen>
  );
}
