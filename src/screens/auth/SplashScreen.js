import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { APP_NAME } from '../../constants/app';

export function SplashScreen() {
  const theme = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.mark, { backgroundColor: theme.colors.primary }]}>
        <Text variant="headlineSmall" style={{ color: theme.colors.onPrimary }}>
          SL
        </Text>
      </View>
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, marginTop: 16 }}>
        {APP_NAME}
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.muted, marginTop: 6, marginBottom: 24 }}>
        Restoring your workspace
      </Text>
      <ActivityIndicator animating color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  mark: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
});
