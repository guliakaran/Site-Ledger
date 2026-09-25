import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { PartnerDetailScreen, ProjectDetailScreen, ProjectTransactionsScreen } from '../screens/HomeScreens';
import { AppHeader, HeaderProvider } from '../components/AppHeader';
import { Fab, PartnerSheet, Toast, TransactionSheet } from '../screens/Shell';
import { useTheme } from '../ThemeContext';
import { BottomTabNavigation } from './BottomTabNavigation';
import { ProfileNavigation } from './ProfileNavigation';

const Stack = createNativeStackNavigator();

function withScroll(Screen) {
  return function ScrolledScreen(props) {
    const { palette } = useTheme();
    return (
      <ScrollView style={{ flex: 1, backgroundColor: palette.bg }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <Screen {...props} />
      </ScrollView>
    );
  };
}

function AppLayout({ children }) {
  const { palette } = useTheme();
  return (
    <HeaderProvider>
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <AppHeader />
      <View style={{ flex: 1 }}>{children}</View>
      <Fab />
      <Toast />
      <TransactionSheet />
      <PartnerSheet />
    </View>
    </HeaderProvider>
  );
}

export function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      layout={({ children }) => <AppLayout>{children}</AppLayout>}
    >
      <Stack.Screen name="Tabs" component={BottomTabNavigation} />
      <Stack.Screen name="ProjectDetail" component={withScroll(ProjectDetailScreen)} />
      <Stack.Screen name="ProjectTransactions" component={withScroll(ProjectTransactionsScreen)} />
      <Stack.Screen name="PartnerDetail" component={withScroll(PartnerDetailScreen)} />
      <Stack.Screen name="ProfileStack" component={ProfileNavigation} />
    </Stack.Navigator>
  );
}
