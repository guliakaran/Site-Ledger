import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Button, Card, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { EmptyState } from '../../components/common/EmptyState';
import { SummaryCard } from '../../components/cards/SummaryCard';
import { StatusChip } from '../../components/common/StatusChip';
import { AmountText } from '../../components/common/AmountText';
import { AVATAR_COLORS } from '../../constants/app';
import { deleteProject, selectProject } from '../../redux/slices/projectSlice';
import { removeAssignment } from '../../redux/slices/partnerSlice';
import {
  calculateProjectExpenses,
  calculateProjectMargin,
  calculateProjectProfit,
  calculateProjectRevenue,
} from '../../utils/financial';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';
import { getInitials } from '../../utils/validation';

export function ProjectDetailScreen({ navigation, route }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const projectId = route.params?.projectId;
  const project = useSelector((state) => state.projects.items.find((item) => item.id === projectId));
  const transactions = useSelector((state) => state.transactions.items);
  const partners = useSelector((state) => state.partners.items);
  const assignments = useSelector((state) =>
    state.partners.projectPartners.filter((item) => item.projectId === projectId),
  );
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const financials = useMemo(
    () => ({
      revenue: calculateProjectRevenue(transactions, projectId),
      expenses: calculateProjectExpenses(transactions, projectId),
      profit: calculateProjectProfit(transactions, projectId),
      margin: calculateProjectMargin(transactions, projectId),
    }),
    [transactions, projectId],
  );

  React.useEffect(() => {
    if (projectId) {
      dispatch(selectProject(projectId));
    }
  }, [dispatch, projectId]);

  if (!project) {
    return (
      <Screen>
        <EmptyState title="Project not found" actionLabel="Back" onAction={() => navigation.goBack()} />
      </Screen>
    );
  }

  const onDelete = async () => {
    const result = await dispatch(deleteProject(project.id));
    setConfirmDelete(false);
    if (deleteProject.fulfilled.match(result)) {
      navigation.popToTop();
    }
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text variant="headlineSmall" style={{ color: theme.colors.onBackground }}>
            {project.name}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.muted, marginTop: 4 }}>
            {project.clientName} · {project.location}
          </Text>
        </View>
        <StatusChip status={project.status} />
      </View>
      <Text variant="bodySmall" style={{ color: theme.colors.muted2, marginBottom: 16 }}>
        {formatDate(project.startDate)} – {project.expectedEndDate ? formatDate(project.expectedEndDate) : 'Open'}
      </Text>
      <SummaryCard
        items={[
          { label: 'Revenue', value: financials.revenue, currency: true, large: true },
          { label: 'Expenses', value: financials.expenses, currency: true },
          { label: 'Net profit', value: financials.profit, currency: true, signed: true },
          { label: 'Margin', value: `${financials.margin.toFixed(1)}%` },
        ]}
      />
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
        <Button mode="contained" onPress={() => navigation.navigate('AddRevenue', { projectId: project.id })} style={{ flex: 1 }}>
          Add revenue
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('AddExpense', { projectId: project.id })} style={{ flex: 1 }}>
          Add expense
        </Button>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="titleMedium" style={{ color: theme.colors.onBackground }}>
          Partners
        </Text>
        <Button compact onPress={() => navigation.navigate('AssignPartner', { projectId: project.id })}>
          Assign
        </Button>
      </View>
      {assignments.length === 0 ? (
        <EmptyState icon="account-plus-outline" title="No partners on this project" actionLabel="Assign partner" onAction={() => navigation.navigate('AssignPartner', { projectId: project.id })} />
      ) : (
        assignments.map((assignment, index) => {
          const partner = partners.find((item) => item.id === assignment.partnerId);
          const share = financials.profit * (Number(assignment.profitSharePercentage) / 100);
          if (!partner) {
            return null;
          }
          return (
            <Card key={assignment.id} mode="contained" style={{ marginBottom: 8, backgroundColor: theme.colors.surface }}>
              <Card.Title
                title={partner.name}
                subtitle={`${assignment.profitSharePercentage}% share · invested ${formatCurrency(assignment.investment)}`}
                left={() => (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: theme.colors.onPrimary }}>{getInitials(partner.name)}</Text>
                  </View>
                )}
                right={() => <AmountText amount={share} signed />}
              />
              <Card.Actions>
                <Button onPress={() => dispatch(removeAssignment(assignment.id))}>Remove</Button>
              </Card.Actions>
            </Card>
          );
        })
      )}
      <Button mode="text" onPress={() => navigation.navigate('ProjectTransactions', { projectId: project.id })}>
        View transactions
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('EditProject', { projectId: project.id })}>
        Edit project
      </Button>
      <Button textColor={theme.colors.error} onPress={() => setConfirmDelete(true)}>
        Delete project
      </Button>
      <Portal>
        <Dialog visible={confirmDelete} onDismiss={() => setConfirmDelete(false)}>
          <Dialog.Title>Delete project?</Dialog.Title>
          <Dialog.Content>
            <Text>This removes {project.name} from the workspace. Transactions already logged stay in history until deleted separately.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmDelete(false)}>Cancel</Button>
            <Button onPress={onDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Screen>
  );
}
