import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

export function LoadingState({ label = 'Loading…' }) {
  const theme = useTheme();
  return (
    <View style={styles.wrap}>
      <ActivityIndicator animating color={theme.colors.primary} />
      <Text style={{ color: theme.colors.muted, marginTop: 12 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 28, alignItems: 'center' },
});
