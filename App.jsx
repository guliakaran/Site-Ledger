import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { DashboardScreen, LedgerScreen, PartnerDetailScreen, PartnersScreen, ProjectDetailScreen } from './src/screens/HomeScreens';
import { LoginScreen } from './src/screens/LoginScreen';
import { GstScreen, ReportsScreen, RevenueScreen } from './src/screens/MoneyScreens';
import { HelpScreen, ManagePartnersScreen, NotificationsScreen, ProfileScreen, SecurityScreen } from './src/screens/ProfileScreens';
import { Fab, Header, PartnerSheet, TabBar, Toast, TransactionSheet } from './src/screens/Shell';
import { StoreProvider, useStore } from './src/store';
import { ThemeProvider, useTheme } from './src/ThemeContext';

const screens = {
  dashboard: DashboardScreen,
  partners: PartnersScreen,
  ledger: LedgerScreen,
  revenue: RevenueScreen,
  gst: GstScreen,
  reports: ReportsScreen,
  profile: ProfileScreen,
  projectDetail: ProjectDetailScreen,
  partnerDetail: PartnerDetailScreen,
  notifications: NotificationsScreen,
  security: SecurityScreen,
  managePartners: ManagePartnersScreen,
  help: HelpScreen,
};

function Root() {
  const { loggedIn, screen } = useStore();
  const { palette, isDark } = useTheme();
  const Active = screens[screen];

  if (!loggedIn) {
    return (
      <View style={{ flex: 1, backgroundColor: palette.bg }}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={palette.bg} />
        <LoginScreen />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={palette.bg} />
      <Header />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <Active />
      </ScrollView>
      <Fab />
      <Toast />
      <TabBar />
      <TransactionSheet />
      <PartnerSheet />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StoreProvider>
          <Root />
        </StoreProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
