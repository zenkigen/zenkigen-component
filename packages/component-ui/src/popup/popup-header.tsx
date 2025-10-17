import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { useContext } from 'react';

import { IconButton } from '../icon-button';
import { PopupContext } from './popup-context';

export function PopupHeader({ children }: PropsWithChildren) {
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
      <div>{children}</div>
      {onClose && <IconButton icon="close" size="small" variant="text" onClick={onClose} />}
    </div>
  );
}
