import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEMO_CREDENTIALS } from '../../constants/app';
import { FormField } from '../../components/forms/FormField';
import { ErrorBanner } from '../../components/common/ErrorBanner';
import { clearAuthError, login } from '../../redux/slices/authSlice';
import { validateLogin } from '../../utils/validation';

export function LoginScreen({ navigation }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }
    dispatch(login({ email: email.trim(), password }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: theme.colors.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.wrap, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <View style={[styles.mark, { backgroundColor: theme.colors.primary }]}>
          <Text variant="titleLarge" style={{ color: theme.colors.onPrimary }}>
            SL
          </Text>
        </View>
        <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, marginTop: 18 }}>
          Welcome back
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.muted, marginTop: 8, marginBottom: 24 }}>
          Sign in to SiteLedger to manage projects, partners, and financials.
        </Text>
        <ErrorBanner visible={Boolean(error)} message={error} onDismiss={() => dispatch(clearAuthError())} />
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
          placeholder="you@company.com"
        />
        <FormField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          error={errors.password}
          right={<TextInput.Icon icon={showPassword ? 'eye-off-outline' : 'eye-outline'} onPress={() => setShowPassword((value) => !value)} />}
        />
        <Button mode="text" onPress={() => navigation.navigate('ForgotPassword')} compact style={{ alignSelf: 'flex-end', marginBottom: 8 }}>
          Forgot password?
        </Button>
        <Button mode="contained" onPress={onSubmit} loading={loading} disabled={loading}>
          Log in
        </Button>
        <Text variant="bodySmall" style={{ color: theme.colors.muted2, marginTop: 18, textAlign: 'center' }}>
          Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  mark: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
});
