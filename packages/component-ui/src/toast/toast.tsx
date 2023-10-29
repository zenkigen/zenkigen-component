import { typography } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { AnimationEvent, CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';
import { ToastState } from './type';

const CLOSE_TIME_MSEC = 5000;

type Props = {
  state?: ToastState;
  width?: CSSProperties['width'];
  isAutoClose?: boolean;
  isAnimation?: boolean;
  children?: ReactNode;
  onClickClose: () => void;
};

export function Toast({
  state = 'information',
  width = 'auto',
  isAutoClose,
  isAnimation,
  children,
  onClickClose,
}: Props) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleClose = useCallback(() => {
    if (isAnimation) {
      setIsRemoving(true);
    } else {
      onClickClose();
    }
  }, [isAnimation, onClickClose]);

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    window.getComputedStyle(e.currentTarget).opacity === '0' && onClickClose();
  };

  const wrapperClasses = clsx('pointer-events-auto flex items-start gap-1 bg-white p-4 shadow-floatingShadow', {
    ['animate-toast-in']: isAnimation && !isRemoving,
    ['animate-toast-out opacity-0']: isAnimation && isRemoving,
  });
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
      if (isAutoClose) {
        setIsRemoving(true);
      }
    }, CLOSE_TIME_MSEC);

    return () => window.clearTimeout(timer);
  }, [isAutoClose]);

  return (
    <div className={wrapperClasses} style={{ width }} onAnimationEnd={handleAnimationEnd}>
      <div className={iconClasses}>
        <Icon name={iconName[state]} />
      </div>
      <p className={textClasses}>{children}</p>
      <IconButton icon="close" size="medium" variant="text" onClick={handleClose} isNoPadding />
    </div>
  );
}
