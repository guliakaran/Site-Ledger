import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Card, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorBanner } from '../../components/common/ErrorBanner';
import { SummaryCard } from '../../components/cards/SummaryCard';
import { DateRangeFilter } from '../../components/reports/DateRangeFilter';
import { MonthlyBarChart } from '../../components/charts/MonthlyBarChart';
import { RevenueExpenseChart } from '../../components/charts/RevenueExpenseChart';
import { PartnerShareChart } from '../../components/charts/PartnerShareChart';
import { AmountText } from '../../components/common/AmountText';
import { fetchReports } from '../../redux/slices/reportSlice';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';

export function ReportsScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports);
  const txCount = useSelector((state) => state.transactions.items.length);
  const projectCount = useSelector((state) => state.projects.items.length);
  const [tab, setTab] = useState('overview');
  const [preset, setPreset] = useState(reports.preset || 'this_year');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    dispatch(fetchReports({ preset, startDate, endDate }));
  }, [dispatch, preset, startDate, endDate, txCount, projectCount]);

  const totals = reports.totals || {};
  const yearly = reports.yearly || {};
  const projectWise = Array.isArray(reports.projectWise) ? reports.projectWise : [];
  const partnerWise = Array.isArray(reports.partnerWise) ? reports.partnerWise : [];

  return (
    <Screen>
      <Text variant="headlineSmall" style={{ color: theme.colors.onBackground, marginBottom: 12 }}>
        Reports
      </Text>
      <DateRangeFilter
        preset={preset}
        startDate={startDate}
        endDate={endDate}
        onPresetChange={setPreset}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
      />
      <SegmentedButtons
        value={tab}
        onValueChange={setTab}
        buttons={[
          { value: 'overview', label: 'Overview' },
          { value: 'year', label: 'Year' },
          { value: 'projects', label: 'Projects' },
          { value: 'partners', label: 'Partners' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <ErrorBanner visible={Boolean(reports.error)} message={reports.error} />
      {reports.loading ? <LoadingState label="Building reports…" /> : null}
      {tab === 'overview' ? (
        <>
          <SummaryCard
            items={[
              { label: 'Revenue', value: totals.revenue || 0, currency: true, large: true },
              { label: 'Expenses', value: totals.expenses || 0, currency: true },
              { label: 'Profit / Loss', value: totals.profit || 0, currency: true, signed: true },
            ]}
          />
          <Card mode="contained" style={{ backgroundColor: theme.colors.surface, marginBottom: 16 }}>
            <Card.Title title="Revenue vs expense" />
            <Card.Content>
              <RevenueExpenseChart revenue={totals.revenue || 0} expenses={totals.expenses || 0} />
            </Card.Content>
          </Card>
        </>
      ) : null}
      {tab === 'year' ? (
        <>
          <SummaryCard
            items={[
              { label: `${yearly.year || ''} revenue`, value: yearly.revenue || 0, currency: true, large: true },
              { label: 'Yearly expenses', value: yearly.expenses || 0, currency: true },
              { label: 'Yearly profit', value: yearly.profit || 0, currency: true, signed: true },
            ]}
          />
          <Card mode="contained" style={{ backgroundColor: theme.colors.surface, marginBottom: 16 }}>
            <Card.Title title="Month-wise P&L" />
            <Card.Content>
              <MonthlyBarChart monthly={yearly.monthly || []} />
            </Card.Content>
          </Card>
        </>
      ) : null}
      {tab === 'projects' ? (
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
      ) : null}
      {tab === 'partners' ? (
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
      ) : null}
      {reports.range ? (
        <Text variant="bodySmall" style={{ color: theme.colors.muted2, marginTop: 8 }}>
          {formatDate(reports.range.start)} – {formatDate(reports.range.end)}
        </Text>
      ) : null}
      <Button mode="outlined" onPress={() => dispatch(fetchReports({ preset, startDate, endDate }))} style={{ marginTop: 12 }}>
        Refresh reports
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('YearlyReport')}>
        Open year-wise report
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('ProjectWiseReport')}>
        Open project-wise report
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('PartnerWiseReport')}>
        Open partner-wise report
      </Button>
    </Screen>
  );
}
