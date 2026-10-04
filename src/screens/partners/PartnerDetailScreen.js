import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { EmptyState } from '../../components/common/EmptyState';
import { SummaryCard } from '../../components/cards/SummaryCard';
import { AmountText } from '../../components/common/AmountText';
import { deletePartner, selectPartner } from '../../redux/slices/partnerSlice';
import {
  calculatePartnerInvestment,
  calculatePartnerLoss,
  calculatePartnerProfit,
  calculatePartnerShare,
  calculateProjectProfit,
} from '../../utils/financial';
import { formatCurrency } from '../../utils/currency';

export function PartnerDetailScreen({ navigation, route }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const partnerId = route.params?.partnerId;
  const partner = useSelector((state) => state.partners.items.find((item) => item.id === partnerId));
  const projects = useSelector((state) => state.projects.items);
  const transactions = useSelector((state) => state.transactions.items);
  const assignments = useSelector((state) =>
    state.partners.projectPartners.filter((item) => item.partnerId === partnerId),
  );
  const [confirm, setConfirm] = useState(false);

  React.useEffect(() => {
    if (partnerId) {
      dispatch(selectPartner(partnerId));
    }
  }, [dispatch, partnerId]);

  const financials = useMemo(
    () => ({
      investment: calculatePartnerInvestment(assignments, partnerId),
      profit: calculatePartnerProfit(transactions, assignments, partnerId),
      loss: calculatePartnerLoss(transactions, assignments, partnerId),
      net: calculatePartnerShare(transactions, assignments, partnerId),
    }),
    [assignments, transactions, partnerId],
  );

  if (!partner) {
    return (
      <Screen>
        <EmptyState title="Partner not found" actionLabel="Back" onAction={() => navigation.goBack()} />
      </Screen>
    );
  }

  const onDelete = async () => {
    const result = await dispatch(deletePartner(partner.id));
    setConfirm(false);
    if (deletePartner.fulfilled.match(result)) {
      navigation.popToTop();
    }
  };

  return (
    <Screen>
      <Text variant="headlineSmall" style={{ color: theme.colors.onBackground }}>
        {partner.name}
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.muted, marginBottom: 16 }}>
        {partner.email || partner.mobile}
      </Text>
      <SummaryCard
        items={[
          { label: 'Total invested', value: financials.investment, currency: true, large: true },
          { label: 'Net P&L', value: financials.net, currency: true, signed: true },
          { label: 'Profit share', value: financials.profit, currency: true },
          { label: 'Loss share', value: financials.loss, currency: true },
        ]}
      />
      <Text variant="titleMedium" style={{ color: theme.colors.onBackground, marginBottom: 8 }}>
        Projects
      </Text>
      {assignments.length === 0 ? (
        <EmptyState title="Not assigned to a project yet" />
      ) : (
        assignments.map((assignment) => {
          const project = projects.find((item) => item.id === assignment.projectId);
          const share = calculateProjectProfit(transactions, assignment.projectId) * (assignment.profitSharePercentage / 100);
          return (
            <Card key={assignment.id} mode="contained" style={{ marginBottom: 8, backgroundColor: theme.colors.surface }}>
              <Card.Content>
                <Text variant="titleMedium">{project?.name || 'Project'}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.muted, marginTop: 4 }}>
                  {assignment.profitSharePercentage}% share · invested {formatCurrency(assignment.investment)}
                </Text>
                <View style={{ marginTop: 8 }}>
                  <AmountText amount={share} signed />
                </View>
              </Card.Content>
            </Card>
          );
        })
      )}
      <Button mode="text" onPress={() => navigation.navigate('EditPartner', { partnerId: partner.id })}>
        Edit partner
      </Button>
      <Button textColor={theme.colors.error} onPress={() => setConfirm(true)}>
        Remove partner
      </Button>
      <Portal>
        <Dialog visible={confirm} onDismiss={() => setConfirm(false)}>
          <Dialog.Title>Remove partner?</Dialog.Title>
          <Dialog.Content>
            <Text>{partner.name} will be marked as removed and hidden from the partners list.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirm(false)}>Cancel</Button>
            <Button onPress={onDelete}>Remove</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Screen>
  );
}
