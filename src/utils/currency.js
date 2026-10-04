const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatCurrency(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value)) {
    return formatter.format(0);
  }
  return formatter.format(Math.round(value));
}

export function formatSignedCurrency(amount) {
  const value = Number(amount) || 0;
  const formatted = formatCurrency(Math.abs(value));
  if (value > 0) {
    return `+${formatted}`;
  }
  if (value < 0) {
    return `−${formatted}`;
  }
  return formatted;
}

export function parseAmount(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }
  const cleaned = String(value || '').replace(/[₹,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}
