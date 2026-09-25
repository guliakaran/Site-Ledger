import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DashboardScreen, LedgerScreen, PartnersScreen } from '../screens/HomeScreens';
import { GstScreen, ReportsScreen, RevenueScreen } from '../screens/MoneyScreens';
import { useTheme } from '../ThemeContext';
import { fonts, Icon } from '../ui';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Dashboard', component: DashboardScreen, icon: 'view-dashboard-outline', label: 'Home' },
  { name: 'Partners', component: PartnersScreen, icon: 'account-group-outline', label: 'Partners' },
  { name: 'Ledger', component: LedgerScreen, icon: 'format-list-bulleted', label: 'Ledger' },
  { name: 'Revenue', component: RevenueScreen, icon: 'currency-inr', label: 'Revenue' },
  { name: 'Gst', component: GstScreen, icon: 'file-document-outline', label: 'GST' },
  { name: 'Reports', component: ReportsScreen, icon: 'chart-box-outline', label: 'Reports' },
];

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

export function BottomTabNavigation() {
  const { palette } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.green,
        tabBarInactiveTintColor: palette.muted2,
        tabBarStyle: {
          backgroundColor: palette.bg,
          borderTopColor: palette.border,
          height: 58 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8),
        },
        tabBarLabelStyle: {
          fontFamily: fonts.sansMed,
          fontSize: 10,
          letterSpacing: 0.1,
        },
      }}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={withScroll(tab.component)}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, size }) => <Icon name={tab.icon} size={size} color={color} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
