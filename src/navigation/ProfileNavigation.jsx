import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView } from 'react-native';
import { HelpScreen, ManagePartnersScreen, NotificationsScreen, ProfileScreen, SecurityScreen } from '../screens/ProfileScreens';
import { useTheme } from '../ThemeContext';

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

export function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="ProfileHome" component={withScroll(ProfileScreen)} />
      <Stack.Screen name="Notifications" component={withScroll(NotificationsScreen)} />
      <Stack.Screen name="Security" component={withScroll(SecurityScreen)} />
      <Stack.Screen name="ManagePartners" component={withScroll(ManagePartnersScreen)} />
      <Stack.Screen name="Help" component={withScroll(HelpScreen)} />
    </Stack.Navigator>
  );
}
