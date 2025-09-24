import clsx from 'clsx';
import type { ReactNode } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type CornerBoxProps = {
  position: Corner;
  isShow: boolean;
  children: ReactNode;
};

export const CornerBox: React.FC<CornerBoxProps> = ({ position, isShow, children }) => {
  if (isShow !== true) {
    return null;
  }

  const baseClass = clsx(
    'fixed',
    position === 'top-left' && 'left-4 top-4',
    position === 'top-right' && 'right-4 top-4',
    position === 'bottom-left' && 'bottom-4 left-4',
    position === 'bottom-right' && 'bottom-4 right-4',
  );

  return createPortal(<div className={baseClass}>{children}</div>, document.body);
};
