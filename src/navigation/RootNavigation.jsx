import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { useStore } from '../store';
import { useTheme } from '../ThemeContext';
import { AppNavigation } from './AppNavigation';
import { AuthNavigation } from './AuthNavigation';

export function RootNavigation() {
  const { loggedIn } = useStore();
  const { palette, isDark } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={palette.bg} />
      {loggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
