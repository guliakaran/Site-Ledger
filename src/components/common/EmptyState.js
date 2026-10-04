import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function EmptyState({ icon = 'folder-open-outline', title, message, actionLabel, onAction }) {
  const theme = useTheme();
  return (
    <View style={styles.wrap}>
      <MaterialCommunityIcons name={icon} size={36} color={theme.colors.muted} />
      <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginTop: 12 }}>
        {title}
      </Text>
      {message ? (
        <Text variant="bodyMedium" style={{ color: theme.colors.muted, textAlign: 'center', marginTop: 6 }}>
          {message}
        </Text>
      ) : null}
      {actionLabel ? (
        <Button mode="contained" onPress={onAction} style={{ marginTop: 16 }}>
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 24 },
});
