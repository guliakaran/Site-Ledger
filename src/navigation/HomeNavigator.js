import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { AddProjectScreen } from '../screens/projects/AddProjectScreen';
import { EditProjectScreen } from '../screens/projects/EditProjectScreen';
import { ProjectDetailScreen } from '../screens/projects/ProjectDetailScreen';
import { AddRevenueScreen } from '../screens/projects/AddRevenueScreen';
import { AddExpenseScreen } from '../screens/projects/AddExpenseScreen';
import { ProjectTransactionsScreen } from '../screens/projects/ProjectTransactionsScreen';
import { AssignPartnerScreen } from '../screens/projects/AssignPartnerScreen';
import { useStackScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator();

export function HomeNavigator() {
  const options = useStackScreenOptions();
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="HomeDashboard" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="AddProject" component={AddProjectScreen} options={{ title: 'Add project' }} />
      <Stack.Screen name="EditProject" component={EditProjectScreen} options={{ title: 'Edit project' }} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ title: 'Project' }} />
      <Stack.Screen name="AddRevenue" component={AddRevenueScreen} options={{ title: 'Add revenue' }} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add expense' }} />
      <Stack.Screen name="ProjectTransactions" component={ProjectTransactionsScreen} options={{ title: 'Transactions' }} />
      <Stack.Screen name="AssignPartner" component={AssignPartnerScreen} options={{ title: 'Assign partner' }} />
    </Stack.Navigator>
  );
}
