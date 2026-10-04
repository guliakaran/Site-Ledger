import React from 'react';
import { List, Switch, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { updateSettings } from '../../redux/slices/settingsSlice';

export function NotificationsScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const toggle = (key) => (value) => {
    if (key === 'notifications') {
      dispatch(
        updateSettings({
          notifications: value,
          projectUpdates: value ? settings.projectUpdates : false,
          expenseReminders: value ? settings.expenseReminders : false,
          reportReminders: value ? settings.reportReminders : false,
        }),
      );
      return;
    }
    dispatch(updateSettings({ [key]: value }));
  };

  return (
    <Screen>
      <Text variant="bodyMedium" style={{ color: theme.colors.muted, marginBottom: 12 }}>
        These preferences are stored on this device and ready for push notifications later.
      </Text>
      <List.Item
        title="Enable notifications"
        description="Master switch for local reminders"
        right={() => <Switch value={settings.notifications} onValueChange={toggle('notifications')} />}
      />
      <List.Item
        title="Project updates"
        description="Status changes and new assignments"
        right={() => (
          <Switch value={settings.projectUpdates} disabled={!settings.notifications} onValueChange={toggle('projectUpdates')} />
        )}
      />
      <List.Item
        title="Expense reminders"
        description="Prompt to log site expenses"
        right={() => (
          <Switch value={settings.expenseReminders} disabled={!settings.notifications} onValueChange={toggle('expenseReminders')} />
        )}
      />
      <List.Item
        title="Report reminders"
        description="Monthly and yearly P&L nudges"
        right={() => (
          <Switch value={settings.reportReminders} disabled={!settings.notifications} onValueChange={toggle('reportReminders')} />
        )}
      />
    </Screen>
  );
}
