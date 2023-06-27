import { CSSProperties, ReactNode, useEffect } from 'react';

import { typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';

import { ToastState } from './type';

const CLOSE_TIME_MSEC = 5000;

type Props = {
  state?: ToastState;
  width?: CSSProperties['width'];
  autoClose?: boolean;
  children?: ReactNode;
  onClickClose: () => void;
};

export function Toast({ state = 'information', width = 'auto', autoClose, children, onClickClose }: Props) {
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

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (autoClose) {
        onClickClose();
      }
    }, CLOSE_TIME_MSEC);

    return () => window.clearTimeout(timer);
  }, [autoClose, onClickClose]);

  return (
    <div className="pointer-events-auto flex items-start gap-1 bg-white p-4 shadow-componentShadow" style={{ width }}>
      <div className={iconClasses}>
        <Icon name={iconName[state]} />
      </div>
      <p className={textClasses}>{children}</p>
      <IconButton icon="close" size="medium" variant="text" onClick={onClickClose} isNoPadding />
    </div>
  );
}
