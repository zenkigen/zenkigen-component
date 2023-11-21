import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { IconButton } from '../icon-button';

type Props = {
  isNoBorder?: boolean;
  onClickClose?: () => void;
};

export function ModalHeader({ children, isNoBorder, onClickClose }: PropsWithChildren<Props>) {
  const headerClasses = clsx(
    'typography-h5 flex w-full shrink-0 items-center justify-between rounded-t-lg px-6 text-text-text01',
    {
      'border-b-[1px] border-border-uiBorder01': !isNoBorder,
      'h-14': onClickClose,
      'h-12': !onClickClose,
    },
  );

  return (
    <div className={headerClasses}>
      <div>{children}</div>
      {onClickClose && <IconButton icon="close" size="small" variant="text" onClick={onClickClose} />}
    </div>
  );
}
