import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { FormField } from '../../components/forms/FormField';
import { ChoiceField } from '../../components/forms/ChoiceField';
import { ErrorBanner } from '../../components/common/ErrorBanner';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../../constants/app';
import { addExpense } from '../../redux/slices/transactionSlice';
import { todayIso } from '../../utils/date';
import { parseAmount } from '../../utils/currency';
import { validateTransaction } from '../../utils/validation';

export function AddExpenseScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const projectId = route.params?.projectId;
  const projects = useSelector((state) => state.projects.items);
  const { error } = useSelector((state) => state.transactions);
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState({
    projectId: projectId || projects[0]?.id || '',
    category: EXPENSE_CATEGORIES[0],
    description: '',
    amount: '',
    date: todayIso(),
    vendor: '',
    paymentMethod: PAYMENT_METHODS[0],
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }));

  const onSubmit = async () => {
    const nextErrors = validateTransaction(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }
    setSaving(true);
    const result = await dispatch(
      addExpense({
        ...values,
        amount: parseAmount(values.amount),
        description: values.description.trim(),
      }),
    );
    setSaving(false);
    if (addExpense.fulfilled.match(result)) {
      navigation.goBack();
    }
  };

  return (
    <Screen>
      <ErrorBanner visible={Boolean(error)} message={error} />
      <ChoiceField
        label="Project"
        value={values.projectId}
        options={projects.map((item) => ({ value: item.id, label: item.name }))}
        onChange={set('projectId')}
        error={errors.projectId}
      />
      <ChoiceField
        label="Category"
        value={values.category}
        options={EXPENSE_CATEGORIES.map((item) => ({ value: item, label: item }))}
        onChange={set('category')}
      />
      <FormField label="Description" value={values.description} onChangeText={set('description')} error={errors.description} />
      <FormField label="Amount (₹)" value={values.amount} onChangeText={set('amount')} keyboardType="numeric" error={errors.amount} />
      <FormField label="Date" value={values.date} onChangeText={set('date')} placeholder="YYYY-MM-DD" error={errors.date} />
      <FormField label="Vendor" value={values.vendor} onChangeText={set('vendor')} />
      <ChoiceField
        label="Payment method"
        value={values.paymentMethod}
        options={PAYMENT_METHODS.map((item) => ({ value: item, label: item }))}
        onChange={set('paymentMethod')}
      />
      <FormField label="Notes" value={values.notes} onChangeText={set('notes')} multiline />
      <Button mode="contained" onPress={onSubmit} loading={saving} disabled={saving}>
        Save expense
      </Button>
    </Screen>
  );
}
