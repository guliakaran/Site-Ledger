import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { useStackScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  const options = useStackScreenOptions();
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={options}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot password' }} />
    </Stack.Navigator>
  );
}
