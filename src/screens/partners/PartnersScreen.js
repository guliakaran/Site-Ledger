import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Button, FAB, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingState } from '../../components/common/LoadingState';
import { PartnerCard } from '../../components/cards/PartnerCard';
import { selectPartner } from '../../redux/slices/partnerSlice';
import {
  calculatePartnerInvestment,
  calculatePartnerShare,
} from '../../utils/financial';

export function PartnersScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const partners = useSelector((state) => state.partners.items);
  const projectPartners = useSelector((state) => state.partners.projectPartners);
  const transactions = useSelector((state) => state.transactions.items);
  const loading = useSelector((state) => state.partners.loading);

  const cards = useMemo(
    () =>
      partners.map((partner) => ({
        partner,
        projectCount: projectPartners.filter((item) => item.partnerId === partner.id).length,
        financials: {
          investment: calculatePartnerInvestment(projectPartners, partner.id),
          net: calculatePartnerShare(transactions, projectPartners, partner.id),
        },
      })),
    [partners, projectPartners, transactions],
  );

  return (
    <View style={{ flex: 1 }}>
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text variant="headlineSmall" style={{ color: theme.colors.onBackground }}>
          Partners
        </Text>
        <Button compact onPress={() => navigation.navigate('AddPartner')}>
          Add partner
        </Button>
      </View>
      {loading && cards.length === 0 ? <LoadingState label="Loading partners…" /> : null}
      {cards.length === 0 && !loading ? (
        <EmptyState
          icon="account-group-outline"
          title="No partners yet"
          message="Add partners and assign them to projects with an investment and profit share."
          actionLabel="Add partner"
          onAction={() => navigation.navigate('AddPartner')}
        />
      ) : (
        cards.map(({ partner, financials, projectCount }) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            financials={financials}
            projectCount={projectCount}
            onPress={() => {
              dispatch(selectPartner(partner.id));
              navigation.navigate('PartnerDetail', { partnerId: partner.id });
            }}
          />
        ))
      )}
    </Screen>
      <FAB
        icon="account-plus"
        style={{ position: 'absolute', right: 16, bottom: 24, backgroundColor: theme.colors.primary }}
        color={theme.colors.onPrimary}
        onPress={() => navigation.navigate('AddPartner')}
      />
    </View>
  );
}
