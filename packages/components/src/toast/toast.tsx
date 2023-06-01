import { CSSProperties, ReactNode } from 'react';

import { typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';

type Props = {
  state?: 'success' | 'error' | 'warning' | 'information';
  width?: CSSProperties['width'];
  children?: ReactNode;
  onClickClose: () => void;
};

export function Toast({ state = 'information', width, children, onClickClose }: Props) {
  const wrapperClasses = clsx('flex items-start gap-1', 'p-4', 'shadow-componentShadow');

  const iconClasses = clsx('flex', 'items-center', {
    'fill-support-supportSuccess': state === 'success',
    'fill-support-supportError': state === 'error',
    'fill-support-supportWarning': state === 'warning',
    'fill-support-supportInfo': state === 'information',
  });

  const textClasses = clsx('flex-1', 'pt-[3px]', typography.body.body2regular, {
    'text-support-supportError': state === 'error',
    'text-text-text01': state === 'success' || state === 'warning' || state === 'information',
  });

  const iconName = {
    success: 'success-filled',
    error: 'attention',
    warning: 'warning',
    information: 'information-filled',
  } as const;

  return (
    <div className={wrapperClasses} style={{ width }}>
      <div className={iconClasses}>
        <Icon name={iconName[state]} />
      </div>
      <p className={textClasses}>{children}</p>
      <IconButton icon="close" size="medium" variant="text" onClick={onClickClose} isNoPadding />
    </div>
  );
}
