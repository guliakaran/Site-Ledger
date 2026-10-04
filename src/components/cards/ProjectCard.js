import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { AmountText } from '../common/AmountText';
import { StatusChip } from '../common/StatusChip';
import { formatDate } from '../../utils/date';

export function ProjectCard({ project, financials, onPress }) {
  const theme = useTheme();
  return (
    <Card mode="contained" style={[styles.card, { backgroundColor: theme.colors.surface }]} onPress={onPress}>
      <Card.Content>
        <View style={styles.row}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
              {project.name}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.muted, marginTop: 2 }}>
              {project.location}
            </Text>
          </View>
          <StatusChip status={project.status} />
        </View>
        <View style={styles.metrics}>
          <View style={{ flex: 1 }}>
            <Text variant="labelSmall" style={{ color: theme.colors.muted2 }}>
              Revenue
            </Text>
            <AmountText amount={financials?.revenue || 0} variant="bodyMedium" />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="labelSmall" style={{ color: theme.colors.muted2 }}>
              P&L
            </Text>
            <AmountText amount={financials?.profit || 0} signed variant="bodyMedium" />
          </View>
        </View>
        <Text variant="bodySmall" style={{ color: theme.colors.muted2, marginTop: 10 }}>
          Started {formatDate(project.startDate)} · {project.clientName}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  metrics: { flexDirection: 'row', marginTop: 14, gap: 12 },
});
