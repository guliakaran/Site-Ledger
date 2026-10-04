import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { FormField } from '../../components/forms/FormField';
import { ChoiceField } from '../../components/forms/ChoiceField';
import { ErrorBanner } from '../../components/common/ErrorBanner';
import { PROJECT_STATUS } from '../../constants/app';
import { createProject } from '../../redux/slices/projectSlice';
import { todayIso } from '../../utils/date';
import { parseAmount } from '../../utils/currency';
import { validateProject } from '../../utils/validation';

const STATUS_OPTIONS = [
  { value: PROJECT_STATUS.ONGOING, label: 'Ongoing' },
  { value: PROJECT_STATUS.ON_HOLD, label: 'On hold' },
  { value: PROJECT_STATUS.COMPLETED, label: 'Completed' },
];

export function AddProjectScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.projects);
  const [values, setValues] = useState({
    name: '',
    clientName: '',
    description: '',
    location: '',
    startDate: todayIso(),
    expectedEndDate: '',
    status: PROJECT_STATUS.ONGOING,
    estimatedValue: '',
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }));

  const onSubmit = async () => {
    const nextErrors = validateProject(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }
    const result = await dispatch(
      createProject({
        ...values,
        name: values.name.trim(),
        clientName: values.clientName.trim(),
        location: values.location.trim(),
        estimatedValue: parseAmount(values.estimatedValue),
      }),
    );
    if (createProject.fulfilled.match(result)) {
      navigation.replace('ProjectDetail', { projectId: result.payload.id });
    }
  };

  return (
    <Screen>
      <ErrorBanner visible={Boolean(error)} message={error} />
      <FormField label="Project name" value={values.name} onChangeText={set('name')} error={errors.name} />
      <FormField label="Client name" value={values.clientName} onChangeText={set('clientName')} error={errors.clientName} />
      <FormField label="Location" value={values.location} onChangeText={set('location')} error={errors.location} />
      <FormField label="Description" value={values.description} onChangeText={set('description')} multiline />
      <FormField label="Start date" value={values.startDate} onChangeText={set('startDate')} placeholder="YYYY-MM-DD" error={errors.startDate} />
      <FormField label="Expected end date" value={values.expectedEndDate} onChangeText={set('expectedEndDate')} placeholder="YYYY-MM-DD" />
      <FormField label="Estimated value (₹)" value={values.estimatedValue} onChangeText={set('estimatedValue')} keyboardType="numeric" error={errors.estimatedValue} />
      <ChoiceField label="Status" value={values.status} options={STATUS_OPTIONS} onChange={set('status')} />
      <Button mode="contained" onPress={onSubmit} loading={loading} disabled={loading}>
        Create project
      </Button>
    </Screen>
  );
}
