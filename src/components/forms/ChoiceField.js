import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, Text, useTheme } from 'react-native-paper';

export function ChoiceField({ label, value, options, onChange, error }) {
  const theme = useTheme();
  return (
    <View style={{ marginBottom: 12 }}>
      <Text variant="labelLarge" style={{ color: theme.colors.muted, marginBottom: 8 }}>
        {label}
      </Text>
      <View style={styles.row}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <Text
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? theme.colors.primaryContainer : theme.colors.surfaceVariant,
                  color: selected ? theme.colors.primary : theme.colors.onSurfaceVariant,
                  borderColor: selected ? theme.colors.primary : theme.colors.outline,
                },
              ]}
            >
              {option.label}
            </Text>
          );
        })}
      </View>
      {error ? <HelperText type="error">{error}</HelperText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    fontSize: 13,
  },
});
