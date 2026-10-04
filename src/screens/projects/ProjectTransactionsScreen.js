import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { EmptyState } from '../../components/common/EmptyState';
import { TransactionCard } from '../../components/cards/TransactionCard';
import { TRANSACTION_TYPE } from '../../constants/app';

export function ProjectTransactionsScreen({ route }) {
  const theme = useTheme();
  const projectId = route.params?.projectId;
  const project = useSelector((state) => state.projects.items.find((item) => item.id === projectId));
  const transactions = useSelector((state) => state.transactions.items);
  const [type, setType] = useState('all');

  const items = useMemo(
    () =>
      transactions
        .filter((item) => item.projectId === projectId)
        .filter((item) => type === 'all' || item.type === type),
    [transactions, projectId, type],
  );

  return (
    <Screen>
      <Text variant="titleMedium" style={{ color: theme.colors.onBackground, marginBottom: 8 }}>
        {project?.name || 'Project'} ledger
      </Text>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        {[
          { id: 'all', label: 'All' },
          { id: TRANSACTION_TYPE.REVENUE, label: 'Revenue' },
          { id: TRANSACTION_TYPE.EXPENSE, label: 'Expenses' },
        ].map((item) => (
          <Chip key={item.id} selected={type === item.id} onPress={() => setType(item.id)} compact>
            {item.label}
          </Chip>
        ))}
      </View>
      {items.length === 0 ? (
        <EmptyState title="No transactions" message="Revenue and expenses for this project will show up here." />
      ) : (
        items.map((item) => <TransactionCard key={item.id} transaction={item} projectName={project?.name} />)
      )}
    </Screen>
  );
}
