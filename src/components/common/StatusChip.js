import React from 'react';
import { Chip, useTheme } from 'react-native-paper';
import { PROJECT_STATUS, PROJECT_STATUS_LABELS } from '../../constants/app';

export function StatusChip({ status }) {
  const theme = useTheme();
  const label = PROJECT_STATUS_LABELS[status] || status;
  const map = {
    [PROJECT_STATUS.ONGOING]: { bg: theme.colors.primaryContainer, color: theme.colors.primary },
    [PROJECT_STATUS.ON_HOLD]: { bg: theme.colors.errorContainer, color: theme.colors.error },
    [PROJECT_STATUS.COMPLETED]: { bg: theme.colors.tertiaryContainer, color: theme.colors.tertiary },
  };
  const tone = map[status] || { bg: theme.colors.surfaceVariant, color: theme.colors.onSurfaceVariant };
  return (
    <Chip compact selectedColor={tone.color} style={{ backgroundColor: tone.bg }} textStyle={{ color: tone.color, fontSize: 11 }}>
      {label}
    </Chip>
  );
}
