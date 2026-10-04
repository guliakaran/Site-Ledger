export function getInitials(name) {
  return String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

export function isPhone(value) {
  return /^[+\d][\d\s-]{7,15}$/.test(String(value || '').trim());
}

export function required(value, label) {
  if (value == null || String(value).trim() === '') {
    return `${label} is required.`;
  }
  return null;
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!isEmail(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!password || String(password).length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  return errors;
}

export function validateForgotPassword({ email }) {
  const errors = {};
  if (!isEmail(email)) {
    errors.email = 'Enter a valid email address.';
  }
  return errors;
}

export function validateProject(values) {
  const errors = {};
  if (!values.name || !values.name.trim()) {
    errors.name = 'Project name is required.';
  }
  if (!values.clientName || !values.clientName.trim()) {
    errors.clientName = 'Client name is required.';
  }
  if (!values.location || !values.location.trim()) {
    errors.location = 'Location is required.';
  }
  if (!values.startDate) {
    errors.startDate = 'Start date is required.';
  }
  if (values.estimatedValue !== '' && Number(values.estimatedValue) < 0) {
    errors.estimatedValue = 'Estimated value cannot be negative.';
  }
  return errors;
}

export function validatePartner(values) {
  const errors = {};
  if (!values.name || !values.name.trim()) {
    errors.name = 'Partner name is required.';
  }
  if (!isPhone(values.mobile)) {
    errors.mobile = 'Enter a valid mobile number.';
  }
  if (values.email && !isEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  return errors;
}

export function validateTransaction(values) {
  const errors = {};
  if (!values.projectId) {
    errors.projectId = 'Select a project.';
  }
  if (!values.category) {
    errors.category = 'Select a category.';
  }
  if (!values.description || !values.description.trim()) {
    errors.description = 'Description is required.';
  }
  const amount = Number(values.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'Enter an amount greater than zero.';
  }
  if (!values.date) {
    errors.date = 'Date is required.';
  }
  return errors;
}

export function validateProfile(values) {
  const errors = {};
  if (!values.name || !values.name.trim()) {
    errors.name = 'Name is required.';
  }
  if (!isEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (values.phone && !isPhone(values.phone)) {
    errors.phone = 'Enter a valid phone number.';
  }
  return errors;
}

export function validateAssignment(values) {
  const errors = {};
  if (!values.partnerId) {
    errors.partnerId = 'Select a partner.';
  }
  const share = Number(values.profitSharePercentage);
  if (!Number.isFinite(share) || share <= 0 || share > 100) {
    errors.profitSharePercentage = 'Share must be between 1 and 100.';
  }
  const investment = Number(values.investment);
  if (!Number.isFinite(investment) || investment < 0) {
    errors.investment = 'Investment cannot be negative.';
  }
  return errors;
}
