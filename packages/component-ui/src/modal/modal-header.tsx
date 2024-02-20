import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { useContext } from 'react';

import { IconButton } from '../icon-button';
import { ModalContext } from './modal-context';

type Props = {
  isNoBorder?: boolean;
};

export function ModalHeader({ children, isNoBorder = false }: PropsWithChildren<Props>) {
  const { onClose } = useContext(ModalContext);

  const headerClasses = clsx(
    'typography-h5 flex w-full shrink-0 items-center justify-between rounded-t-lg px-6 text-text01',
    {
      'border-b-[1px] border-uiBorder01': !isNoBorder,
      'h-14': !onClose,
      'h-12': onClose,
    },
  );

  return (
    <div className={headerClasses}>
      <div>{children}</div>
      {onClose && <IconButton icon="close" size="small" variant="text" onClick={onClose} />}
    </div>
  );
}
