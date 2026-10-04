import React, { useState } from 'react';
import { Button, Dialog, List, Portal, Snackbar, Text, useTheme } from 'react-native-paper';
import { Screen } from '../../components/common/Screen';
import { FormField } from '../../components/forms/FormField';

export function SecurityScreen() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [nextPassword, setNextPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const onSave = () => {
    if (!currentPassword || nextPassword.length < 6) {
      setError('Enter your current password and a new password of at least 6 characters.');
      return;
    }
    if (nextPassword !== confirm) {
      setError('New passwords do not match.');
      return;
    }
    setError('');
    setOpen(false);
    setCurrentPassword('');
    setNextPassword('');
    setConfirm('');
    setToast('Password updated for this session. It is not stored on the device.');
  };

  return (
    <Screen>
      <List.Item
        title="Change password"
        description="Passwords are never written to AsyncStorage"
        left={(props) => <List.Icon {...props} icon="key-outline" />}
        onPress={() => setOpen(true)}
      />
      <List.Item
        title="This device"
        description="Active now · Bengaluru"
        left={(props) => <List.Icon {...props} icon="cellphone" />}
      />
      <Text variant="bodySmall" style={{ color: theme.colors.muted, marginTop: 12 }}>
        Session tokens are stored locally so you stay signed in. Logging out clears the token.
      </Text>
      <Portal>
        <Dialog visible={open} onDismiss={() => setOpen(false)}>
          <Dialog.Title>Change password</Dialog.Title>
          <Dialog.Content>
            <FormField label="Current password" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry />
            <FormField label="New password" value={nextPassword} onChangeText={setNextPassword} secureTextEntry />
            <FormField label="Confirm new password" value={confirm} onChangeText={setConfirm} secureTextEntry error={error} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setOpen(false)}>Cancel</Button>
            <Button onPress={onSave}>Update</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar visible={Boolean(toast)} onDismiss={() => setToast('')} duration={2500}>
        {toast}
      </Snackbar>
    </Screen>
  );
}
