import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { useContext } from 'react';

import { IconButton } from '../icon-button';
import { DialogContext } from './dialog-context';

type Props = {
  isNoBorder?: boolean;
};

export function DialogHeader({ children, isNoBorder = false }: PropsWithChildren<Props>) {
  const { onClose } = useContext(DialogContext);

  const headerClasses = clsx(
    'typography-h5 flex w-full shrink-0 items-center justify-between rounded-t-lg px-6 text-text01',
    {
      'border-b border-uiBorder01': !isNoBorder,
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
