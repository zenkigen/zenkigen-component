import type { DatePickerTimeZone } from './date-picker.types';

const localDateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const timeZoneFormatters: Record<DatePickerTimeZone, Intl.DateTimeFormat> = {
  UTC: new Intl.DateTimeFormat('en-CA', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
  'Asia/Tokyo': new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
};

const toIsoOffset = (timeZone: DatePickerTimeZone) => (timeZone === 'UTC' ? 'Z' : '+09:00');

export const formatDateKey = (date: Date, timeZone: DatePickerTimeZone): string => {
  return timeZoneFormatters[timeZone].format(date);
};

export const formatLocalDateKey = (date: Date = new Date()): string => {
  return localDateFormatter.format(date);
};

export const createDateFromKey = (dateKey: string, timeZone: DatePickerTimeZone): Date => {
  return new Date(`${dateKey}T00:00:00${toIsoOffset(timeZone)}`);
};

export const normalizeDate = (date: Date, timeZone: DatePickerTimeZone): Date => {
  return createDateFromKey(formatDateKey(date, timeZone), timeZone);
};

export const getMonthStartDate = (date: Date, timeZone: DatePickerTimeZone): Date => {
  const [year, month] = formatDateKey(date, timeZone).split('-');

  return createDateFromKey(`${year}-${month}-01`, timeZone);
};

export const formatDisplayDate = (date: Date, timeZone: DatePickerTimeZone): string => {
  const [year, month, day] = formatDateKey(date, timeZone).split('-');

  return `${year}年${month}月${day}日`;
};
