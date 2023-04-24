import { typography, userColors } from '@zenkigen-component/theme';
import classNames from 'classnames';

export const isAsciiString = (str: string) => {
  return str.charCodeAt(0) < 256;
};

type Props = {
  size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
  userId: number;
  firstName: string;
  lastName: string;
};

export function Avatar({ size, userId, firstName, lastName }: Props) {
  const classes = classNames(
    'text-text-textOnColor',
    'rounded-full',
    'flex items-center justify-center',
    userColors[userId % userColors.length],
    {
      [`w-16 h-16 ${typography.label.label1regular}`]: size === 'x-large',
      [`w-12 h-12 ${typography.label.label2regular}`]: size === 'large',
      [`w-10 h-10 ${typography.label.label2regular}`]: size === 'medium',
      [`w-8 h-8 ${typography.label.label4regular}`]: size === 'small',
      [`w-6 h-6 ${typography.label.label4regular}`]: size === 'x-small',
    },
  );

  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();
  const nameOnIcon = isAsciiString(trimmedLastName)
    ? trimmedFirstName.slice(0, 1).toUpperCase() + trimmedLastName.slice(0, 1).toUpperCase()
    : (trimmedLastName + trimmedFirstName).slice(0, 2);

  return <span className={classes}>{nameOnIcon}</span>;
}
