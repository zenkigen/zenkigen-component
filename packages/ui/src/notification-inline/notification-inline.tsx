import { ReactNode } from 'react';

import { typography } from '@zenkigen-component/theme';
import { clsx } from 'clsx';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';

type Props = {
  state?: 'success' | 'warning' | 'information' | 'attention' | 'default';
  size?: 'small' | 'medium';
  children?: ReactNode;
} & (
  | { showClose?: false }
  | {
      showClose: true;
      onClickClose: () => void;
    }
);

export function NotificationInline({ state = 'default', size = 'medium', ...props }: Props) {
  const wrapperClasses = clsx(
    'rounded',
    'text-text-text01',
    'flex',
    'gap-1',
    'items-center',
    typography.body.body2regular,
    {
      'bg-background-uiBackgroundError': state === 'attention',
      'bg-background-uiBackgroundWarning': state === 'warning',
      'bg-background-uiBackgroundBlue': state === 'information',
      'bg-background-uiBackgroundSuccess': state === 'success',
      'bg-background-uiBackgroundGray': state === 'default',
      'p-2': size === 'small',
      'p-3': size === 'medium',
    },
  );

  const iconClasses = clsx('flex', 'items-center', {
    'fill-support-supportError': state === 'attention',
    'fill-support-supportWarning': state === 'warning',
    'fill-blue-blue50': state === 'information',
    'fill-support-supportSuccess': state === 'success',
  });

  const iconName = {
    attention: 'attention',
    success: 'success-filled',
    warning: 'warning',
    information: 'information-filled',
  } as const;

  const iconSize = {
    small: 'small',
    medium: 'medium',
  } as const;

  return (
    <div className={wrapperClasses}>
      {state !== 'default' && (
        <div className={iconClasses}>
          <Icon name={iconName[state]} size={iconSize[size]} />
        </div>
      )}
      <p className="flex-1">{props.children}</p>
      {props.showClose && (
        <div className="flex items-center">
          <IconButton icon="close" size="small" variant="text" />
        </div>
      )}
    </div>
  );
}
