import moment from 'moment';

export const DATE_FORMAT = 'DD MMM YYYY';
export const DATETIME_FORMAT = 'DD MMM YYYY, hh:mm A';
export const TIME_FORMAT = 'hh:mm A';
export const MONTH_FORMAT = 'MMMM';
export const YEAR_FORMAT = 'YYYY';
export const ISO_DATE_FORMAT = 'YYYY-MM-DD';

function toMoment(value) {
  if (!value) {
    return moment.invalid();
  }
  if (moment.isMoment(value)) {
    return value.clone();
  }
  return moment(value);
}

export function formatDate(date) {
  const m = toMoment(date);
  return m.isValid() ? m.format(DATE_FORMAT) : '';
}

export function formatDateTime(date) {
  const m = toMoment(date);
  return m.isValid() ? m.format(DATETIME_FORMAT) : '';
}

export function formatTime(date) {
  const m = toMoment(date);
  return m.isValid() ? m.format(TIME_FORMAT) : '';
}

export function formatMonth(date) {
  const m = toMoment(date);
  return m.isValid() ? m.format(MONTH_FORMAT) : '';
}

export function formatYear(date) {
  const m = toMoment(date);
  return m.isValid() ? m.format(YEAR_FORMAT) : '';
}

export function formatIsoDate(date) {
  const m = toMoment(date);
  return m.isValid() ? m.format(ISO_DATE_FORMAT) : '';
}

export function isToday(date) {
  const m = toMoment(date);
  return m.isValid() && m.isSame(moment(), 'day');
}

export function isThisMonth(date) {
  const m = toMoment(date);
  return m.isValid() && m.isSame(moment(), 'month');
}

export function getStartOfMonth(date = moment()) {
  return toMoment(date).startOf('month');
}

export function getEndOfMonth(date = moment()) {
  return toMoment(date).endOf('month');
}

export function getStartOfYear(date = moment()) {
  return toMoment(date).startOf('year');
}

export function getEndOfYear(date = moment()) {
  return toMoment(date).endOf('year');
}

export function formatRelativeTime(date) {
  const m = toMoment(date);
  return m.isValid() ? m.fromNow() : '';
}

export function getDateRange(preset, customStart, customEnd) {
  const now = moment();
  switch (preset) {
    case 'this_month':
      return { start: now.clone().startOf('month'), end: now.clone().endOf('month') };
    case 'last_month': {
      const last = now.clone().subtract(1, 'month');
      return { start: last.clone().startOf('month'), end: last.clone().endOf('month') };
    }
    case 'this_quarter':
      return { start: now.clone().startOf('quarter'), end: now.clone().endOf('quarter') };
    case 'this_year':
      return { start: now.clone().startOf('year'), end: now.clone().endOf('year') };
    case 'last_year': {
      const lastYear = now.clone().subtract(1, 'year');
      return { start: lastYear.clone().startOf('year'), end: lastYear.clone().endOf('year') };
    }
    case 'custom':
      return {
        start: customStart ? toMoment(customStart).startOf('day') : now.clone().startOf('year'),
        end: customEnd ? toMoment(customEnd).endOf('day') : now.clone().endOf('day'),
      };
    default:
      return { start: now.clone().startOf('year'), end: now.clone().endOf('year') };
  }
}

export function isDateInRange(date, start, end) {
  const m = toMoment(date);
  if (!m.isValid()) {
    return false;
  }
  return m.isBetween(start, end, 'day', '[]');
}

export function todayIso() {
  return moment().format(ISO_DATE_FORMAT);
}

export function nowIso() {
  return moment().toISOString();
}
