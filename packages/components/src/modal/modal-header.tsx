import { useContext } from 'react';

import clsx from 'clsx';

import { IconButton } from '../icon-button';

import { ModalContext } from './modal-context';

type Props = {
  isNoBorder?: boolean;
};

export function ModalHeader({ isNoBorder }: Props) {
  const { onClose } = useContext(ModalContext);
  const headerClasses = clsx('flex', 'items-center', 'justify-between', 'w-full', 'h-14', 'rounded-t-lg', 'px-6', {
    'border border-b-[1px] border-border-uiBorder01': !isNoBorder,
  });
  return (
    <div className={headerClasses}>
      Title
      <IconButton icon="close" size="small" variant="text" onClick={onClose} />
    </div>
  );
}
