import clsx from 'clsx';
import type { PropsWithChildren, ReactNode } from 'react';
import { useContext } from 'react';

import { IconButton } from '../icon-button';
import { PopupContext } from './popup-context';

type Props = PropsWithChildren<{
  before?: ReactNode;
}>;

export function PopupHeader({ children, before }: Props) {
  const { onClose } = useContext(PopupContext);

  const headerClasses = clsx(
    'typography-h5 flex w-full shrink-0 items-start justify-between rounded-t-lg px-6 pt-3 text-text01',
    {
      'h-14': !onClose,
      'h-12': onClose,
    },
  );

  return (
    <div className={headerClasses}>
      <div className="flex items-center gap-1">
        {before}
        {children}
      </div>
      {onClose && <IconButton icon="close" size="small" variant="text" onClick={onClose} />}
    </div>
  );
}
