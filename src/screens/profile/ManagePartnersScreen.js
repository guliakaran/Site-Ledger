import React from 'react';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { EmptyState } from '../../components/common/EmptyState';
import { formatCurrency } from '../../utils/currency';
import { calculatePartnerInvestment } from '../../utils/financial';

export function ManagePartnersScreen({ navigation }) {
  const theme = useTheme();
  const partners = useSelector((state) => state.partners.items);
  const projectPartners = useSelector((state) => state.partners.projectPartners);

  return (
    <Screen>
      <Button mode="contained" onPress={() => navigation.navigate('AddPartner')} style={{ marginBottom: 16 }}>
        Add partner
      </Button>
      {partners.length === 0 ? (
        <EmptyState title="No partners" />
      ) : (
        partners.map((partner) => (
          <Card key={partner.id} mode="contained" style={{ backgroundColor: theme.colors.surface, marginBottom: 10 }}>
            <Card.Title
              title={partner.name}
              subtitle={`${partner.mobile} · invested ${formatCurrency(calculatePartnerInvestment(projectPartners, partner.id))}`}
            />
            <Card.Actions>
              <Button onPress={() => navigation.navigate('EditPartner', { partnerId: partner.id })}>Edit</Button>
              <Button onPress={() => navigation.navigate('PartnerDetail', { partnerId: partner.id })}>View</Button>
            </Card.Actions>
          </Card>
        ))
      )}
    </Screen>
  );
}
