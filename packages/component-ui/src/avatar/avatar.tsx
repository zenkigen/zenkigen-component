import { userColors } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';

export const isAsciiString = (str: string) => {
  return str.charCodeAt(0) < 256;
};

type Props = {
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
  userId?: number;
  firstName: string;
  lastName: string;
  isDisabled?: boolean;
};

export function Avatar({ size = 'medium', ...props }: Props) {
  const classes = clsx('flex items-center justify-center rounded-full text-text-textOnColor', {
    'w-16 h-16 typography-label1regular': size === 'x-large',
    'w-12 h-12 typography-label2regular': size === 'large',
    'w-10 h-10 typography-label2regular': size === 'medium',
    'w-8 h-8 typography-label4regular': size === 'small',
    'w-6 h-6 typography-label4regular': size === 'x-small',
    'bg-disabled-disabled01': props.isDisabled,
    'bg-icon-icon01': !props.userId,
    [userColors[(props.userId ?? 0) % userColors.length] as string]: props.userId && !props.isDisabled,
  });

  const trimmedFirstName = props.firstName.replace('　', ' ').trim();
  const trimmedLastName = props.lastName.replace('　', ' ').trim().trim();
  const nameOnIcon = isAsciiString(trimmedLastName)
    ? trimmedFirstName.slice(0, 1).toUpperCase() + trimmedLastName.slice(0, 1).toUpperCase()
    : (trimmedLastName + trimmedFirstName).slice(0, 2);

  return <span className={classes}>{nameOnIcon}</span>;
}
