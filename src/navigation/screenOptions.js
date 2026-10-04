import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

export function PaperHeader({ navigation, options, back, route }) {
  const theme = useTheme();
  const title = options.headerTitle ?? options.title ?? route.name;

  return (
    <Appbar.Header
      mode="small"
      elevated={false}
      style={{ backgroundColor: theme.colors.surface }}
    >
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} titleStyle={{ fontFamily: theme.fonts.titleLarge.fontFamily }} />
    </Appbar.Header>
  );
}

export function useStackScreenOptions() {
  const theme = useTheme();
  return {
    header: (props) => <PaperHeader {...props} />,
    contentStyle: { backgroundColor: theme.colors.background },
    animation: 'slide_from_right',
  };
}
