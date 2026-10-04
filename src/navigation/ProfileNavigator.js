import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { AppearanceScreen } from '../screens/profile/AppearanceScreen';
import { NotificationsScreen } from '../screens/profile/NotificationsScreen';
import { SecurityScreen } from '../screens/profile/SecurityScreen';
import { ManagePartnersScreen } from '../screens/profile/ManagePartnersScreen';
import { HelpScreen } from '../screens/profile/HelpScreen';
import { AddPartnerScreen } from '../screens/partners/AddPartnerScreen';
import { EditPartnerScreen } from '../screens/partners/EditPartnerScreen';
import { PartnerDetailScreen } from '../screens/partners/PartnerDetailScreen';
import { useStackScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator();

export function ProfileNavigator() {
  const options = useStackScreenOptions();
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit profile' }} />
      <Stack.Screen name="Appearance" component={AppearanceScreen} options={{ title: 'Appearance' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Security' }} />
      <Stack.Screen name="ManagePartners" component={ManagePartnersScreen} options={{ title: 'Manage partners' }} />
      <Stack.Screen name="Help" component={HelpScreen} options={{ title: 'Help & support' }} />
      <Stack.Screen name="AddPartner" component={AddPartnerScreen} options={{ title: 'Add partner' }} />
      <Stack.Screen name="EditPartner" component={EditPartnerScreen} options={{ title: 'Edit partner' }} />
      <Stack.Screen name="PartnerDetail" component={PartnerDetailScreen} options={{ title: 'Partner' }} />
    </Stack.Navigator>
  );
}
