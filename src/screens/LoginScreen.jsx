import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../store';
import { useTheme } from '../ThemeContext';
import { Field, fonts, Icon } from '../ui';

export function LoginScreen() {
  const { palette } = useTheme();
  const insets = useSafeAreaInsets();
  const { login } = useStore();
  const [email, setEmail] = useState('karan@siteledger.app');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: palette.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: palette.text, alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
          <Text style={{ color: palette.onAccent, fontFamily: fonts.sansBold, fontSize: 18 }}>SL</Text>
        </View>
        <Text style={{ fontFamily: fonts.sansBold, fontSize: 30, color: palette.text, letterSpacing: -0.6 }}>Welcome back</Text>
        <Text style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: palette.muted, marginTop: 8, marginBottom: 28 }}>
          Sign in to SiteLedger to view your projects, partners and GST filings.
        </Text>

        <Field flex={0} label="Email" value={email} onChangeText={setEmail} placeholder="you@company.com" keyboardType="email-address" />
        <View>
          <Field flex={0} label="Password" value={password} onChangeText={setPassword} placeholder="Enter your password" secureTextEntry={!showPassword} inputStyle={{ paddingRight: 44 }} />
          <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8} style={{ position: 'absolute', right: 14, bottom: 28 }}>
            <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={palette.muted} />
          </Pressable>
        </View>

        <Text style={{ color: palette.clay, fontFamily: fonts.sansMed, fontSize: 13, minHeight: 20, marginTop: 10 }}>{error}</Text>

        <Pressable
          onPress={() => {
            const err = login(email, password);
            setError(err ?? '');
          }}
          style={{ backgroundColor: palette.text, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 6 }}
        >
          <Text style={{ color: palette.onAccent, fontFamily: fonts.sansBold, fontSize: 15 }}>Log in</Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
