import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type DatePickerTimeZone = 'UTC' | 'Asia/Tokyo';

type DatePickerButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled' | 'onChange' | 'style' | 'value'
>;

export type DatePickerProps = DatePickerButtonProps & {
  value: Date | null;
  onChange: (value: Date | null) => void;
  isDisabled?: boolean;
  isError?: boolean;
  min?: Date;
  max?: Date;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  timeZone?: DatePickerTimeZone;
  children?: ReactNode;
};
