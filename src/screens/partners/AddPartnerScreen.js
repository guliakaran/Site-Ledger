import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { FormField } from '../../components/forms/FormField';
import { ErrorBanner } from '../../components/common/ErrorBanner';
import { createPartner } from '../../redux/slices/partnerSlice';
import { validatePartner } from '../../utils/validation';

export function AddPartnerScreen({ navigation }) {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.partners);
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    pan: '',
    gstin: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }));

  const onSubmit = async () => {
    const nextErrors = validatePartner(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }
    setSaving(true);
    const result = await dispatch(createPartner({ ...values, name: values.name.trim(), isDeleted: false }));
    setSaving(false);
    if (createPartner.fulfilled.match(result)) {
      navigation.replace('PartnerDetail', { partnerId: result.payload.id });
    }
  };

  return (
    <Screen>
      <ErrorBanner visible={Boolean(error)} message={error} />
      <FormField label="Full name" value={values.name} onChangeText={set('name')} error={errors.name} />
      <FormField label="Mobile" value={values.mobile} onChangeText={set('mobile')} keyboardType="phone-pad" error={errors.mobile} />
      <FormField label="Email" value={values.email} onChangeText={set('email')} keyboardType="email-address" error={errors.email} />
      <FormField label="Address" value={values.address} onChangeText={set('address')} />
      <FormField label="PAN" value={values.pan} onChangeText={set('pan')} autoCapitalize="characters" />
      <FormField label="GSTIN" value={values.gstin} onChangeText={set('gstin')} autoCapitalize="characters" />
      <FormField label="Notes" value={values.notes} onChangeText={set('notes')} multiline />
      <Button mode="contained" onPress={onSubmit} loading={saving} disabled={saving}>
        Save partner
      </Button>
    </Screen>
  );
}
