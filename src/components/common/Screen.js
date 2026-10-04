import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Screen({ children, scroll = true, padded = true, contentContainerStyle, style }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const bodyStyle = [
    styles.body,
    padded && styles.padded,
    { paddingBottom: 32 + insets.bottom, backgroundColor: theme.colors.background },
    contentContainerStyle,
  ];

  if (!scroll) {
    return <View style={[styles.flex, { backgroundColor: theme.colors.background }, style]}>{children}</View>;
  }

  return (
    <ScrollView
      style={[styles.flex, { backgroundColor: theme.colors.background }, style]}
      contentContainerStyle={bodyStyle}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  body: { flexGrow: 1 },
  padded: { paddingHorizontal: 16, paddingTop: 12 },
});
