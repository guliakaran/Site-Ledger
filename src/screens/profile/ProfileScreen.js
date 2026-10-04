import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, List, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { logout } from '../../redux/slices/authSlice';
import { APP_VERSION } from '../../constants/app';
import { getInitials } from '../../utils/validation';

export function ProfileScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const name = profile?.name || 'SiteLedger user';

  return (
    <Screen>
      <View style={{ alignItems: 'center', paddingVertical: 16 }}>
        <Avatar.Text size={84} label={getInitials(name)} style={{ backgroundColor: theme.colors.tertiary }} />
        <Text variant="headlineSmall" style={{ marginTop: 14, color: theme.colors.onBackground }}>
          {name}
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.muted, marginTop: 4 }}>
          {profile?.role || 'Partner'}
        </Text>
        <Button mode="contained" onPress={() => navigation.navigate('EditProfile')} style={{ marginTop: 16 }}>
          Edit profile
        </Button>
      </View>
      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <List.Item title="Appearance" description="Light, dark or system" left={(props) => <List.Icon {...props} icon="theme-light-dark" />} right={(props) => <List.Icon {...props} icon="chevron-right" />} onPress={() => navigation.navigate('Appearance')} />
        <List.Item title="Notifications" description="Project, expense and report reminders" left={(props) => <List.Icon {...props} icon="bell-outline" />} right={(props) => <List.Icon {...props} icon="chevron-right" />} onPress={() => navigation.navigate('Notifications')} />
        <List.Item title="Security" description="Password and session" left={(props) => <List.Icon {...props} icon="lock-outline" />} right={(props) => <List.Icon {...props} icon="chevron-right" />} onPress={() => navigation.navigate('Security')} />
        <List.Item title="Manage partners" description="Edit or remove partners" left={(props) => <List.Icon {...props} icon="account-multiple-outline" />} right={(props) => <List.Icon {...props} icon="chevron-right" />} onPress={() => navigation.navigate('ManagePartners')} />
        <List.Item title="Help & support" description="FAQs and contact" left={(props) => <List.Icon {...props} icon="help-circle-outline" />} right={(props) => <List.Icon {...props} icon="chevron-right" />} onPress={() => navigation.navigate('Help')} />
      </List.Section>
      <Button mode="contained-tonal" textColor={theme.colors.error} onPress={() => dispatch(logout())} style={{ marginTop: 8 }}>
        Log out
      </Button>
      <Text variant="bodySmall" style={{ textAlign: 'center', color: theme.colors.muted2, marginTop: 18 }}>
        SiteLedger · v{APP_VERSION}
      </Text>
    </Screen>
  );
}
