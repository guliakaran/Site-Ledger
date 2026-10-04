import React, { useMemo, useState } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { FormField } from '../../components/forms/FormField';
import { EmptyState } from '../../components/common/EmptyState';
import { updatePartner } from '../../redux/slices/partnerSlice';
import { validatePartner } from '../../utils/validation';

export function EditPartnerScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const partnerId = route.params?.partnerId;
  const partner = useSelector((state) => state.partners.items.find((item) => item.id === partnerId));
  const initial = useMemo(
    () => ({
      name: partner?.name || '',
      mobile: partner?.mobile || '',
      email: partner?.email || '',
      address: partner?.address || '',
      pan: partner?.pan || '',
      gstin: partner?.gstin || '',
      notes: partner?.notes || '',
    }),
    [partner],
  );
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }));

  if (!partner) {
    return (
      <Screen>
        <EmptyState title="Partner not found" actionLabel="Back" onAction={() => navigation.goBack()} />
      </Screen>
    );
  }

  const onSubmit = async () => {
    const nextErrors = validatePartner(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }
    setSaving(true);
    const result = await dispatch(updatePartner({ id: partner.id, data: { ...values, name: values.name.trim() } }));
    setSaving(false);
    if (updatePartner.fulfilled.match(result)) {
      navigation.goBack();
    }
  };

  return (
    <Screen>
      <FormField label="Full name" value={values.name} onChangeText={set('name')} error={errors.name} />
      <FormField label="Mobile" value={values.mobile} onChangeText={set('mobile')} keyboardType="phone-pad" error={errors.mobile} />
      <FormField label="Email" value={values.email} onChangeText={set('email')} keyboardType="email-address" error={errors.email} />
      <FormField label="Address" value={values.address} onChangeText={set('address')} />
      <FormField label="PAN" value={values.pan} onChangeText={set('pan')} />
      <FormField label="GSTIN" value={values.gstin} onChangeText={set('gstin')} />
      <FormField label="Notes" value={values.notes} onChangeText={set('notes')} multiline />
      <Button mode="contained" onPress={onSubmit} loading={saving} disabled={saving}>
        Save changes
      </Button>
    </Screen>
  );
}
