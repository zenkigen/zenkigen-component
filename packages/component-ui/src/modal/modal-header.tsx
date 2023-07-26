import { ReactNode, useContext } from 'react';

import { typography } from '@zenkigen/component-theme';
import clsx from 'clsx';

import { IconButton } from '../icon-button';

import { ModalContext } from './modal-context';

type Props = {
  children: ReactNode;
  isNoBorder?: boolean;
  isNoCloseButton?: boolean;
};

export function ModalHeader({ children, isNoBorder, isNoCloseButton }: Props) {
  const { setIsOpen } = useContext(ModalContext);
  const headerClasses = clsx(
    'flex',
    'shrink-0',
    'items-center',
    'justify-between',
    'w-full',
    'rounded-t-lg',
    'px-6',
    'text-text-text01',
    typography.heading.h5,
    {
      'border-b-[1px] border-border-uiBorder01': !isNoBorder,
      'h-14': !isNoCloseButton,
      'h-12': isNoCloseButton,
    },
  );
  return (
    <div className={headerClasses}>
      {children}
      {!isNoCloseButton && <IconButton icon="close" size="small" variant="text" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
