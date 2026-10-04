import React, { useState } from 'react';
import { List, Text, useTheme } from 'react-native-paper';
import { Screen } from '../../components/common/Screen';
import { FAQS, APP_VERSION } from '../../constants/app';

export function HelpScreen() {
  const theme = useTheme();
  const [open, setOpen] = useState(null);

  return (
    <Screen>
      <Text variant="titleMedium" style={{ color: theme.colors.onBackground, marginBottom: 8 }}>
        Contact
      </Text>
      <List.Item title="Email support" description="hello@siteledger.app" left={(props) => <List.Icon {...props} icon="email-outline" />} />
      <List.Item title="Report an issue" description="Include the project name and date" left={(props) => <List.Icon {...props} icon="bug-outline" />} />
      <Text variant="titleMedium" style={{ color: theme.colors.onBackground, marginTop: 16, marginBottom: 8 }}>
        FAQs
      </Text>
      {FAQS.map((item, index) => (
        <List.Accordion
          key={item.q}
          title={item.q}
          expanded={open === index}
          onPress={() => setOpen(open === index ? null : index)}
          titleNumberOfLines={3}
        >
          <List.Item title={item.a} titleNumberOfLines={8} />
        </List.Accordion>
      ))}
      <Text variant="bodySmall" style={{ textAlign: 'center', color: theme.colors.muted2, marginTop: 18 }}>
        SiteLedger · v{APP_VERSION}
      </Text>
    </Screen>
  );
}
