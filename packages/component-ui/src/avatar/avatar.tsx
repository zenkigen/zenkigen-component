import { userColors } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';

import { Icon } from '../icon';

export const isAsciiString = (str: string) => {
  return str.charCodeAt(0) < 256;
};

type Props = {
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
  userId?: number;
  firstName?: string;
  lastName?: string;
  isDisabled?: boolean;
};

export function Avatar({ size = 'medium', ...props }: Props) {
  const classes = clsx('flex items-center justify-center rounded-full text-textOnColor', {
    'w-16 h-16 typography-label16regular': size === 'x-large',
    'w-12 h-12 typography-label14regular': size === 'large',
    'w-10 h-10 typography-label14regular': size === 'medium',
    'w-8 h-8 typography-label11regular': size === 'small',
    'w-6 h-6 typography-label11regular': size === 'x-small',
    'bg-disabled01': props.isDisabled,
    'bg-icon01': props.userId == null,
    [userColors[(props.userId ?? 0) % userColors.length] as string]:
      props.userId != null && !(props.isDisabled ?? false),
  });

  // firstName と lastName の両方が未定義または空文字の場合はアイコンを表示
  const hasName =
    (props.firstName != null && props.firstName.trim() !== '') ||
    (props.lastName != null && props.lastName.trim() !== '');

  if (hasName === false) {
    // アイコンサイズのマッピング
    const iconSizeMap = {
      'x-small': 'x-small' as const,
      small: 'small' as const,
      medium: 'medium' as const,
      large: 'large' as const,
      'x-large': 'x-large' as const,
    };

    return (
      <span className={classes}>
        <Icon name="user-one" size={iconSizeMap[size]} color="iconOnColor" />
      </span>
    );
  }

  const trimmedFirstName = (props.firstName ?? '').replace('　', ' ').trim();
  const trimmedLastName = (props.lastName ?? '').replace('　', ' ').trim();
  const nameOnIcon = isAsciiString(trimmedLastName)
    ? trimmedFirstName.slice(0, 1).toUpperCase() + trimmedLastName.slice(0, 1).toUpperCase()
    : (trimmedLastName + trimmedFirstName).slice(0, 2);

  return <span className={classes}>{nameOnIcon}</span>;
}
