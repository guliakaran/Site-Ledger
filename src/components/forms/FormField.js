import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';

export function FormField({
  label,
  value,
  onChangeText,
  error,
  multiline,
  keyboardType,
  secureTextEntry,
  placeholder,
  right,
  autoCapitalize,
}) {
  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={Boolean(error)}
        multiline={multiline}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize || (keyboardType === 'email-address' ? 'none' : 'sentences')}
        right={right}
        style={{ marginBottom: error ? 0 : 12 }}
      />
      {error ? <HelperText type="error">{error}</HelperText> : null}
    </>
  );
}
