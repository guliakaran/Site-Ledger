import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Button, FAB, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingState } from '../../components/common/LoadingState';
import { SummaryCard } from '../../components/cards/SummaryCard';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { TransactionCard } from '../../components/cards/TransactionCard';
import { selectActiveProjects, selectProjects } from '../../redux/selectors/projectSelectors';
import { selectRecentTransactions, selectTotals } from '../../redux/selectors/transactionSelectors';
import { calculateProjectExpenses, calculateProjectProfit, calculateProjectRevenue } from '../../utils/financial';
import { selectProject } from '../../redux/slices/projectSlice';

export function HomeScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const activeProjects = useSelector(selectActiveProjects);
  const totals = useSelector(selectTotals);
  const recent = useSelector(selectRecentTransactions);
  const transactions = useSelector((state) => state.transactions.items);
  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.projects.loading);

  const projectCards = useMemo(
    () =>
      projects.slice(0, 4).map((project) => ({
        project,
        financials: {
          revenue: calculateProjectRevenue(transactions, project.id),
          expenses: calculateProjectExpenses(transactions, project.id),
          profit: calculateProjectProfit(transactions, project.id),
        },
      })),
    [projects, transactions],
  );

  return (
    <View style={{ flex: 1 }}>
    <Screen>
      <Text variant="headlineSmall" style={{ color: theme.colors.onBackground }}>
        Hello{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.muted, marginBottom: 16, marginTop: 4 }}>
        Portfolio snapshot across all projects
      </Text>
      <SummaryCard
        items={[
          { label: 'Total revenue', value: totals.revenue, currency: true, large: true },
          { label: 'Net profit', value: totals.profit, currency: true, signed: true },
          { label: 'Expenses', value: totals.expenses, currency: true },
          { label: 'Active projects', value: String(activeProjects.length) },
        ]}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text variant="titleMedium" style={{ color: theme.colors.onBackground }}>
          Projects
        </Text>
        <Button compact onPress={() => navigation.navigate('AddProject')}>
          Add project
        </Button>
      </View>
      {loading && projectCards.length === 0 ? <LoadingState label="Loading projects…" /> : null}
      {projectCards.length === 0 && !loading ? (
        <EmptyState
          icon="office-building-outline"
          title="No projects yet"
          message="Create a project to start tracking revenue and expenses."
          actionLabel="Add project"
          onAction={() => navigation.navigate('AddProject')}
        />
      ) : (
        projectCards.map(({ project, financials }) => (
          <ProjectCard
            key={project.id}
            project={project}
            financials={financials}
            onPress={() => {
              dispatch(selectProject(project.id));
              navigation.navigate('ProjectDetail', { projectId: project.id });
            }}
          />
        ))
      )}
      <Text variant="titleMedium" style={{ color: theme.colors.onBackground, marginTop: 8, marginBottom: 8 }}>
        Recent activity
      </Text>
      {recent.length === 0 ? (
        <EmptyState icon="swap-horizontal" title="No transactions" message="Add revenue or an expense from a project." />
      ) : (
        recent.map((item) => (
          <TransactionCard
            key={item.id}
            transaction={item}
            projectName={projects.find((project) => project.id === item.projectId)?.name}
          />
        ))
      )}
    </Screen>
      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 24, backgroundColor: theme.colors.primary }}
        color={theme.colors.onPrimary}
        onPress={() => navigation.navigate('AddProject')}
      />
    </View>
  );
}
