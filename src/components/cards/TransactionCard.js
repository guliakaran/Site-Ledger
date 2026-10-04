import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AmountText } from '../common/AmountText';
import { formatDate } from '../../utils/date';
import { TRANSACTION_TYPE } from '../../constants/app';

export function TransactionCard({ transaction, projectName, onPress }) {
  const theme = useTheme();
  const inflow = transaction.type === TRANSACTION_TYPE.REVENUE;
  const color = inflow ? theme.colors.profit : theme.colors.loss;
  const bg = inflow ? theme.colors.primaryContainer : theme.colors.errorContainer;
  return (
    <Card mode="contained" style={[styles.card, { backgroundColor: theme.colors.surface }]} onPress={onPress}>
      <Card.Content style={styles.row}>
        <View style={[styles.icon, { backgroundColor: bg }]}>
          <MaterialCommunityIcons name={inflow ? 'arrow-down' : 'arrow-up'} size={18} color={color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="titleSmall" style={{ color: theme.colors.onSurface }}>
            {transaction.description}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.muted, marginTop: 2 }}>
            {transaction.category} · {projectName || 'Project'} · {formatDate(transaction.date)}
          </Text>
        </View>
        <AmountText amount={inflow ? transaction.amount : -transaction.amount} signed variant="bodyMedium" />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
