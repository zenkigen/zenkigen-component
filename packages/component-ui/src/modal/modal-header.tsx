import clsx from 'clsx';
import { PropsWithChildren, useContext } from 'react';

import { IconButton } from '../icon-button';
import { ModalContext } from './modal-context';

type Props = {
  isNoBorder?: boolean;
  isNoCloseButton?: boolean;
};

export function ModalHeader({ children, isNoBorder, isNoCloseButton }: PropsWithChildren<Props>) {
  const { setIsOpen } = useContext(ModalContext);
  const headerClasses = clsx(
    'typography-h5 flex w-full shrink-0 items-center justify-between rounded-t-lg px-6 text-text-text01',
    {
      'border-b-[1px] border-border-uiBorder01': !isNoBorder,
      'h-14': !isNoCloseButton,
      'h-12': isNoCloseButton,
    },
  );

  return (
    <div className={headerClasses}>
      <div>{children}</div>
      {!isNoCloseButton && <IconButton icon="close" size="small" variant="text" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
