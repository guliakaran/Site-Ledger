import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigation } from './src/navigation/RootNavigation';
import { StoreProvider } from './src/store';
import { ThemeProvider } from './src/ThemeContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StoreProvider>
          <RootNavigation />
        </StoreProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
