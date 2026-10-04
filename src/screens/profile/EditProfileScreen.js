import React, { useMemo, useState } from 'react';
import { Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { FormField } from '../../components/forms/FormField';
import { ErrorBanner } from '../../components/common/ErrorBanner';
import { clearUserStatus, updateProfile } from '../../redux/slices/userSlice';
import { validateProfile } from '../../utils/validation';

export function EditProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { loading, error, success } = useSelector((state) => state.user);
  const initial = useMemo(
    () => ({
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      gstin: profile?.gstin || '',
      pan: profile?.pan || '',
      address: profile?.address || '',
    }),
    [profile],
  );
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }));

  const onSubmit = async () => {
    const nextErrors = validateProfile(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }
    const result = await dispatch(updateProfile({ ...values, name: values.name.trim(), email: values.email.trim() }));
    if (updateProfile.fulfilled.match(result)) {
      navigation.goBack();
    }
  };

  return (
    <Screen>
      <ErrorBanner visible={Boolean(error)} message={error} onDismiss={() => dispatch(clearUserStatus())} />
      <FormField label="Full name" value={values.name} onChangeText={set('name')} error={errors.name} />
      <FormField label="Email" value={values.email} onChangeText={set('email')} keyboardType="email-address" error={errors.email} />
      <FormField label="Phone" value={values.phone} onChangeText={set('phone')} keyboardType="phone-pad" error={errors.phone} />
      <FormField label="GSTIN" value={values.gstin} onChangeText={set('gstin')} />
      <FormField label="PAN" value={values.pan} onChangeText={set('pan')} />
      <FormField label="Address" value={values.address} onChangeText={set('address')} />
      <Button mode="contained" onPress={onSubmit} loading={loading} disabled={loading}>
        Save profile
      </Button>
      <Snackbar visible={Boolean(success)} onDismiss={() => dispatch(clearUserStatus())} duration={2000}>
        {success}
      </Snackbar>
    </Screen>
  );
}
