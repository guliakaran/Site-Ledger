import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screen } from '../../components/common/Screen';
import { APPEARANCE_OPTIONS } from '../../constants/app';
import { updateSettings } from '../../redux/slices/settingsSlice';

export function AppearanceScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const appearance = useSelector((state) => state.settings.appearance);

  return (
    <Screen>
      <Text variant="bodyMedium" style={{ color: theme.colors.muted, marginBottom: 16 }}>
        Choose how SiteLedger looks. System follows your phone setting.
      </Text>
      <View style={{ flexDirection: 'row', backgroundColor: theme.colors.surface, borderRadius: 16, padding: 4 }}>
        {APPEARANCE_OPTIONS.map((option) => {
          const active = appearance === option.id;
          return (
            <Text
              key={option.id}
              onPress={() => dispatch(updateSettings({ appearance: option.id }))}
              style={{
                flex: 1,
                textAlign: 'center',
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: active ? theme.colors.primaryContainer : 'transparent',
                color: active ? theme.colors.primary : theme.colors.muted,
              }}
            >
              <MaterialCommunityIcons name={option.icon} size={18} color={active ? theme.colors.primary : theme.colors.muted} />
              {'\n'}
              {option.label}
            </Text>
          );
        })}
      </View>
    </Screen>
  );
}
