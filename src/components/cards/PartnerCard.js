import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Text, useTheme } from 'react-native-paper';
import { AmountText } from '../common/AmountText';
import { AVATAR_COLORS } from '../../constants/app';
import { getInitials } from '../../utils/validation';
import { formatCurrency } from '../../utils/currency';

export function PartnerCard({ partner, financials, projectCount, onPress }) {
  const theme = useTheme();
  const color = AVATAR_COLORS[(partner.name || '').length % AVATAR_COLORS.length];
  return (
    <Card mode="contained" style={[styles.card, { backgroundColor: theme.colors.surface }]} onPress={onPress}>
      <Card.Content style={styles.row}>
        <Avatar.Text size={44} label={getInitials(partner.name)} style={{ backgroundColor: color }} />
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
            {partner.name}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.muted, marginTop: 2 }}>
            {projectCount} {projectCount === 1 ? 'project' : 'projects'} · Invested {formatCurrency(financials?.investment || 0)}
          </Text>
        </View>
        <AmountText amount={financials?.net || 0} signed variant="bodyMedium" />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
