export const APP_NAME = 'SiteLedger';
export const APP_VERSION = '1.0.0';

export const PROJECT_STATUS = {
  ONGOING: 'ongoing',
  ON_HOLD: 'on_hold',
  COMPLETED: 'completed',
};

export const PROJECT_STATUS_LABELS = {
  ongoing: 'Ongoing',
  on_hold: 'On hold',
  completed: 'Completed',
};

export const TRANSACTION_TYPE = {
  REVENUE: 'revenue',
  EXPENSE: 'expense',
};

export const PAYMENT_METHODS = ['Bank transfer', 'UPI', 'Cheque', 'Cash', 'NEFT/RTGS'];

export const REVENUE_CATEGORIES = [
  'Client payment',
  'Milestone',
  'Lease / deposit',
  'Other income',
];

export const EXPENSE_CATEGORIES = [
  'Materials',
  'Labour',
  'Electrical',
  'Contractor',
  'Equipment',
  'Professional fees',
  'Utilities',
  'Other',
];

export const APPEARANCE_OPTIONS = [
  { id: 'light', label: 'Light', icon: 'white-balance-sunny' },
  { id: 'dark', label: 'Dark', icon: 'moon-waning-crescent' },
  { id: 'system', label: 'System', icon: 'theme-light-dark' },
];

export const DATE_PRESETS = [
  { id: 'this_month', label: 'This Month' },
  { id: 'last_month', label: 'Last Month' },
  { id: 'this_quarter', label: 'This Quarter' },
  { id: 'this_year', label: 'This Year' },
  { id: 'last_year', label: 'Last Year' },
  { id: 'custom', label: 'Custom' },
];

export const AVATAR_COLORS = ['#e8ab3f', '#57b98a', '#e0765a', '#8b7ef0', '#4aa8c9', '#c9862a', '#3c4a6b'];

export const FAQS = [
  {
    q: "How is each partner's profit share calculated?",
    a: "Profit is split by each partner's investment percentage for the project. Net profit is revenue minus expenses, then multiplied by that partner's profit-share percentage.",
  },
  {
    q: 'What happens when a partner joins a project mid-way?',
    a: 'Their share applies from the assignment date onward. Earlier transactions on that project are not counted against them.',
  },
  {
    q: 'Can I use the app without a live backend?',
    a: 'Yes. Mock mode ships with local data, Redux, and AsyncStorage caching so every primary flow works before an API is connected.',
  },
  {
    q: 'Are passwords stored on this device?',
    a: 'No. Only the session token and non-sensitive preferences are persisted. Passwords are never written to AsyncStorage.',
  },
];

export const DEMO_CREDENTIALS = {
  email: 'karan@siteledger.app',
  password: 'siteledger123',
};
