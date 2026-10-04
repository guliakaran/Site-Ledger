import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FormField } from '../../components/forms/FormField';
import { ErrorBanner } from '../../components/common/ErrorBanner';
import { clearAuthError, forgotPassword } from '../../redux/slices/authSlice';
import { validateForgotPassword } from '../../utils/validation';

export function ForgotPasswordScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading, error, forgotMessage } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    const nextErrors = validateForgotPassword({ email });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }
    dispatch(forgotPassword({ email: email.trim() }));
  };

  return (
    <View style={[styles.wrap, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground }}>
        Forgot password
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.muted, marginTop: 8, marginBottom: 24 }}>
        Enter the email on your account. We'll send reset instructions. Your password is never stored on this device.
      </Text>
      <ErrorBanner visible={Boolean(error)} message={error} onDismiss={() => dispatch(clearAuthError())} />
      {forgotMessage ? (
        <Text variant="bodyMedium" style={{ color: theme.colors.primary, marginBottom: 16 }}>
          {forgotMessage}
        </Text>
      ) : null}
      <FormField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" error={errors.email} />
      <Button mode="contained" onPress={onSubmit} loading={loading} disabled={loading}>
        Send reset link
      </Button>
      <Button mode="text" onPress={() => navigation.goBack()} style={{ marginTop: 8 }}>
        Back to login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
});
