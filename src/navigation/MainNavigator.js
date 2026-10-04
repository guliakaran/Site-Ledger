import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen } from '../screens/home/HomeScreen';
import { PartnersScreen } from '../screens/partners/PartnersScreen';
import { ReportsScreen } from '../screens/reports/ReportsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { PaperHeader } from './screenOptions';

const Tab = createBottomTabNavigator();

const ICONS = {
  Home: { focused: 'home', outlined: 'home-outline' },
  Partner: { focused: 'account-group', outlined: 'account-group-outline' },
  Report: { focused: 'chart-box', outlined: 'chart-box-outline' },
  Profile: { focused: 'account-circle', outlined: 'account-circle-outline' },
};

function TabIcon({ routeName, focused, color, size }) {
  const names = ICONS[routeName] || ICONS.Home;
  return <MaterialCommunityIcons name={focused ? names.focused : names.outlined} color={color} size={size} />;
}

function MaterialBottomBar({ navigation, state, descriptors, insets }) {
  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      compact={false}
      labeled
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (event.defaultPrevented) {
          preventDefault();
          return;
        }
        navigation.dispatch({
          ...CommonActions.navigate(route.name, route.params),
          target: state.key,
        });
      }}
      renderIcon={({ route, focused, color }) => (
        <TabIcon routeName={route.name} focused={focused} color={color} size={24} />
      )}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        return options.tabBarLabel ?? options.title ?? route.name;
      }}
    />
  );
}

export function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <MaterialBottomBar {...props} />}
      screenOptions={{
        header: (props) => <PaperHeader {...props} />,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home', tabBarLabel: 'Home' }} />
      <Tab.Screen name="Partner" component={PartnersScreen} options={{ title: 'Partners', tabBarLabel: 'Partner' }} />
      <Tab.Screen name="Report" component={ReportsScreen} options={{ title: 'Reports', tabBarLabel: 'Report' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}
