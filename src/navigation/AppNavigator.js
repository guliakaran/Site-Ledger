import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainNavigator } from './MainNavigator';
import { useStackScreenOptions } from './screenOptions';
import { AddProjectScreen } from '../screens/projects/AddProjectScreen';
import { EditProjectScreen } from '../screens/projects/EditProjectScreen';
import { ProjectDetailScreen } from '../screens/projects/ProjectDetailScreen';
import { AddRevenueScreen } from '../screens/projects/AddRevenueScreen';
import { AddExpenseScreen } from '../screens/projects/AddExpenseScreen';
import { ProjectTransactionsScreen } from '../screens/projects/ProjectTransactionsScreen';
import { AssignPartnerScreen } from '../screens/projects/AssignPartnerScreen';
import { AddPartnerScreen } from '../screens/partners/AddPartnerScreen';
import { EditPartnerScreen } from '../screens/partners/EditPartnerScreen';
import { PartnerDetailScreen } from '../screens/partners/PartnerDetailScreen';
import { YearlyReportScreen } from '../screens/reports/YearlyReportScreen';
import { ProjectWiseReportScreen } from '../screens/reports/ProjectWiseReportScreen';
import { PartnerWiseReportScreen } from '../screens/reports/PartnerWiseReportScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { AppearanceScreen } from '../screens/profile/AppearanceScreen';
import { NotificationsScreen } from '../screens/profile/NotificationsScreen';
import { SecurityScreen } from '../screens/profile/SecurityScreen';
import { ManagePartnersScreen } from '../screens/profile/ManagePartnersScreen';
import { HelpScreen } from '../screens/profile/HelpScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const options = useStackScreenOptions();

  return (
    <Stack.Navigator initialRouteName="Tabs" screenOptions={options}>
      <Stack.Screen name="Tabs" component={MainNavigator} options={{ headerShown: false }} />

      <Stack.Screen name="AddProject" component={AddProjectScreen} options={{ title: 'Add project' }} />
      <Stack.Screen name="EditProject" component={EditProjectScreen} options={{ title: 'Edit project' }} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ title: 'Project' }} />
      <Stack.Screen name="AddRevenue" component={AddRevenueScreen} options={{ title: 'Add revenue' }} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add expense' }} />
      <Stack.Screen name="ProjectTransactions" component={ProjectTransactionsScreen} options={{ title: 'Transactions' }} />
      <Stack.Screen name="AssignPartner" component={AssignPartnerScreen} options={{ title: 'Assign partner' }} />

      <Stack.Screen name="AddPartner" component={AddPartnerScreen} options={{ title: 'Add partner' }} />
      <Stack.Screen name="EditPartner" component={EditPartnerScreen} options={{ title: 'Edit partner' }} />
      <Stack.Screen name="PartnerDetail" component={PartnerDetailScreen} options={{ title: 'Partner' }} />

      <Stack.Screen name="YearlyReport" component={YearlyReportScreen} options={{ title: 'Year-wise' }} />
      <Stack.Screen name="ProjectWiseReport" component={ProjectWiseReportScreen} options={{ title: 'Project-wise' }} />
      <Stack.Screen name="PartnerWiseReport" component={PartnerWiseReportScreen} options={{ title: 'Partner-wise' }} />

      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit profile' }} />
      <Stack.Screen name="Appearance" component={AppearanceScreen} options={{ title: 'Appearance' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Security' }} />
      <Stack.Screen name="ManagePartners" component={ManagePartnersScreen} options={{ title: 'Manage partners' }} />
      <Stack.Screen name="Help" component={HelpScreen} options={{ title: 'Help & support' }} />
    </Stack.Navigator>
  );
}
