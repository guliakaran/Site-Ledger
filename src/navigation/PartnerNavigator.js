import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PartnersScreen } from '../screens/partners/PartnersScreen';
import { AddPartnerScreen } from '../screens/partners/AddPartnerScreen';
import { EditPartnerScreen } from '../screens/partners/EditPartnerScreen';
import { PartnerDetailScreen } from '../screens/partners/PartnerDetailScreen';
import { useStackScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator();

export function PartnerNavigator() {
  const options = useStackScreenOptions();
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="PartnersList" component={PartnersScreen} options={{ title: 'Partners' }} />
      <Stack.Screen name="AddPartner" component={AddPartnerScreen} options={{ title: 'Add partner' }} />
      <Stack.Screen name="EditPartner" component={EditPartnerScreen} options={{ title: 'Edit partner' }} />
      <Stack.Screen name="PartnerDetail" component={PartnerDetailScreen} options={{ title: 'Partner' }} />
    </Stack.Navigator>
  );
}
