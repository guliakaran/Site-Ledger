import React, { useMemo, useState } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../components/common/Screen';
import { FormField } from '../../components/forms/FormField';
import { ChoiceField } from '../../components/forms/ChoiceField';
import { EmptyState } from '../../components/common/EmptyState';
import { PROJECT_STATUS } from '../../constants/app';
import { updateProject } from '../../redux/slices/projectSlice';
import { parseAmount } from '../../utils/currency';
import { validateProject } from '../../utils/validation';

const STATUS_OPTIONS = [
  { value: PROJECT_STATUS.ONGOING, label: 'Ongoing' },
  { value: PROJECT_STATUS.ON_HOLD, label: 'On hold' },
  { value: PROJECT_STATUS.COMPLETED, label: 'Completed' },
];

export function EditProjectScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const projectId = route.params?.projectId;
  const project = useSelector((state) => state.projects.items.find((item) => item.id === projectId));
  const { loading } = useSelector((state) => state.projects);
  const initial = useMemo(
    () => ({
      name: project?.name || '',
      clientName: project?.clientName || '',
      description: project?.description || '',
      location: project?.location || '',
      startDate: project?.startDate || '',
      expectedEndDate: project?.expectedEndDate || '',
      status: project?.status || PROJECT_STATUS.ONGOING,
      estimatedValue: project?.estimatedValue != null ? String(project.estimatedValue) : '',
    }),
    [project],
  );
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }));

  if (!project) {
    return (
      <Screen>
        <EmptyState title="Project not found" actionLabel="Back" onAction={() => navigation.goBack()} />
      </Screen>
    );
  }

  const onSubmit = async () => {
    const nextErrors = validateProject(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }
    const result = await dispatch(
      updateProject({
        id: project.id,
        data: {
          ...values,
          name: values.name.trim(),
          clientName: values.clientName.trim(),
          location: values.location.trim(),
          estimatedValue: parseAmount(values.estimatedValue),
        },
      }),
    );
    if (updateProject.fulfilled.match(result)) {
      navigation.goBack();
    }
  };

  return (
    <Screen>
      <FormField label="Project name" value={values.name} onChangeText={set('name')} error={errors.name} />
      <FormField label="Client name" value={values.clientName} onChangeText={set('clientName')} error={errors.clientName} />
      <FormField label="Location" value={values.location} onChangeText={set('location')} error={errors.location} />
      <FormField label="Description" value={values.description} onChangeText={set('description')} multiline />
      <FormField label="Start date" value={values.startDate} onChangeText={set('startDate')} error={errors.startDate} />
      <FormField label="Expected end date" value={values.expectedEndDate} onChangeText={set('expectedEndDate')} />
      <FormField label="Estimated value (₹)" value={values.estimatedValue} onChangeText={set('estimatedValue')} keyboardType="numeric" />
      <ChoiceField label="Status" value={values.status} options={STATUS_OPTIONS} onChange={set('status')} />
      <Button mode="contained" onPress={onSubmit} loading={loading} disabled={loading}>
        Save changes
      </Button>
    </Screen>
  );
}
