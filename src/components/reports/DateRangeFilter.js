import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text, TextInput, useTheme } from 'react-native-paper';
import { DATE_PRESETS } from '../../constants/app';

export function DateRangeFilter({ preset, startDate, endDate, onPresetChange, onStartChange, onEndChange }) {
  const theme = useTheme();
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={styles.chips}>
        {DATE_PRESETS.map((item) => (
          <Chip
            key={item.id}
            selected={preset === item.id}
            onPress={() => onPresetChange(item.id)}
            style={{ backgroundColor: preset === item.id ? theme.colors.primaryContainer : theme.colors.surfaceVariant }}
            compact
          >
            {item.label}
          </Chip>
        ))}
      </View>
      {preset === 'custom' ? (
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            label="Start date"
            value={startDate}
            onChangeText={onStartChange}
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="End date"
            value={endDate}
            onChangeText={onEndChange}
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />
        </View>
      ) : (
        <Text variant="bodySmall" style={{ color: theme.colors.muted }}>
          Using {DATE_PRESETS.find((item) => item.id === preset)?.label || 'selected range'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 10 },
  input: { flex: 1 },
});
