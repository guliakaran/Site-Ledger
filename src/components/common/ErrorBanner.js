import React from 'react';
import { Banner, useTheme } from 'react-native-paper';

export function ErrorBanner({ visible, message, onDismiss }) {
  const theme = useTheme();
  if (!visible || !message) {
    return null;
  }
  return (
    <Banner
      visible
      actions={onDismiss ? [{ label: 'Dismiss', onPress: onDismiss }] : []}
      style={{ backgroundColor: theme.colors.errorContainer, marginBottom: 12, borderRadius: 12 }}
    >
      {message}
    </Banner>
  );
}
