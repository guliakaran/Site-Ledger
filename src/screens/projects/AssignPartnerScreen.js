import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { FormField } from '../../components/forms/FormField';
import { ChoiceField } from '../../components/forms/ChoiceField';
import { EmptyState } from '../../components/common/EmptyState';
import { assignPartner } from '../../redux/slices/partnerSlice';
import { parseAmount } from '../../utils/currency';
import { validateAssignment } from '../../utils/validation';

export function AssignPartnerScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const projectId = route.params?.projectId;
  const partners = useSelector((state) => state.partners.items);
  const existing = useSelector((state) =>
    state.partners.projectPartners.filter((item) => item.projectId === projectId).map((item) => item.partnerId),
  );
  const available = partners.filter((partner) => !existing.includes(partner.id));
  const [values, setValues] = useState({
    partnerId: available[0]?.id || '',
    investment: '',
    profitSharePercentage: '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }));

  if (available.length === 0) {
    return (
      <Screen>
        <EmptyState
          title="All partners assigned"
          message="Every partner is already on this project. Add a new partner first."
          actionLabel="Add partner"
          onAction={() => navigation.navigate('AddPartner')}
        />
      </Screen>
    );
  }

  const onSubmit = async () => {
    const nextErrors = validateAssignment(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }
    setSaving(true);
    const result = await dispatch(
      assignPartner({
        projectId,
        partnerId: values.partnerId,
        investment: parseAmount(values.investment),
        profitSharePercentage: Number(values.profitSharePercentage),
      }),
    );
    setSaving(false);
    if (assignPartner.fulfilled.match(result)) {
      navigation.goBack();
    }
  };

  return (
    <Screen>
      <ChoiceField
        label="Partner"
        value={values.partnerId}
        options={available.map((item) => ({ value: item.id, label: item.name }))}
        onChange={set('partnerId')}
        error={errors.partnerId}
      />
      <FormField label="Investment (₹)" value={values.investment} onChangeText={set('investment')} keyboardType="numeric" error={errors.investment} />
      <FormField
        label="Profit share %"
        value={values.profitSharePercentage}
        onChangeText={set('profitSharePercentage')}
        keyboardType="numeric"
        error={errors.profitSharePercentage}
      />
      <Button mode="contained" onPress={onSubmit} loading={saving} disabled={saving}>
        Assign to project
      </Button>
    </Screen>
  );
}
