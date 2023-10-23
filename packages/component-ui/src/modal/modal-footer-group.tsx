import { ReactNode, useContext } from 'react';

import clsx from 'clsx';

import { ModalContext } from './modal-context';

type Props = {
  children: ReactNode;
  type?: 'button' | 'checkbox';
};

export function ModalFooterGroup({ children, type }: Props) {
  const { width, widthLimit } = useContext(ModalContext);
  const buttonContainerClasses = clsx('flex', 'items-center', 'flex-wrap', {
    'w-full': width < widthLimit,
    'justify-center': width < widthLimit && type !== 'checkbox',
    'flex-start': width < widthLimit && type === 'checkbox',
    'gap-2': width < widthLimit,
    'gap-4': widthLimit <= width,
  });

  return <div className={buttonContainerClasses}>{children}</div>;
}
