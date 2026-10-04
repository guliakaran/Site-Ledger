import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReportsScreen } from '../screens/reports/ReportsScreen';
import { YearlyReportScreen } from '../screens/reports/YearlyReportScreen';
import { ProjectWiseReportScreen } from '../screens/reports/ProjectWiseReportScreen';
import { PartnerWiseReportScreen } from '../screens/reports/PartnerWiseReportScreen';
import { useStackScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator();

export function ReportNavigator() {
  const options = useStackScreenOptions();
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="ReportsHome" component={ReportsScreen} options={{ title: 'Reports' }} />
      <Stack.Screen name="YearlyReport" component={YearlyReportScreen} options={{ title: 'Year-wise' }} />
      <Stack.Screen name="ProjectWiseReport" component={ProjectWiseReportScreen} options={{ title: 'Project-wise' }} />
      <Stack.Screen name="PartnerWiseReport" component={PartnerWiseReportScreen} options={{ title: 'Partner-wise' }} />
    </Stack.Navigator>
  );
}
