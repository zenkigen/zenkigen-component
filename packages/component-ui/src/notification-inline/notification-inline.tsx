import { clsx } from 'clsx';
import type { ReactNode } from 'react';

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
  const wrapperClasses = clsx('typography-body13regular flex items-center gap-1 rounded text-text01', {
    'bg-uiBackgroundError': state === 'attention',
    'bg-uiBackgroundWarning': state === 'warning',
    'bg-uiBackgroundBlue': state === 'information',
    'bg-uiBackgroundSuccess': state === 'success',
    'bg-uiBackgroundGray': state === 'default',
    'p-2': size === 'small',
    'p-3': size === 'medium',
  });

  const iconClasses = clsx('flex items-center', {
    'fill-supportError': state === 'attention',
    'fill-supportWarning': state === 'warning',
    'fill-blue-blue50': state === 'information',
    'fill-supportSuccess': state === 'success',
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
      {props.showClose === true && (
        <div className="flex items-center">
          <IconButton icon="close" size="small" variant="text" />
        </div>
      )}
    </div>
  );
}
