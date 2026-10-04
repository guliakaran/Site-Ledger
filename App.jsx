import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { bootstrapApp, store } from './src/redux/store';
import { getNavigationTheme, getPaperTheme } from './src/theme/theme';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SplashScreen } from './src/screens/auth/SplashScreen';

function PaperIcon(props) {
  return <MaterialCommunityIcons {...props} />;
}

function ThemedRoot() {
  const bootstrapped = useSelector((state) => state.auth.bootstrapped);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const appearance = useSelector((state) => state.settings.appearance);
  const systemScheme = useColorScheme();
  const isDark = appearance === 'dark' || (appearance === 'system' && systemScheme === 'dark');
  const paperTheme = getPaperTheme(isDark);
  const navigationTheme = getNavigationTheme(isDark);

  return (
    <PaperProvider
      theme={paperTheme}
      settings={{
        icon: PaperIcon,
      }}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={paperTheme.colors.background} />
      {!bootstrapped ? (
        <SplashScreen />
      ) : (
        <NavigationContainer theme={navigationTheme}>
          {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </PaperProvider>
  );
}

export default function App() {
  useEffect(() => {
    bootstrapApp();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemedRoot />
      </Provider>
    </SafeAreaProvider>
  );
}
