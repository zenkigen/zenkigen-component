import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { useContext, useLayoutEffect } from 'react';

import { IconButton } from '../icon-button';
import { ModalContext } from './modal-context';

type Props = {
  isNoBorder?: boolean;
};

export function ModalHeader({ children, isNoBorder = false }: PropsWithChildren<Props>) {
  const { onClose, titleId, setHasTitle } = useContext(ModalContext);

  // Header の内容をダイアログのアクセシブルネーム（aria-labelledby）にするため、マウント中であることを Modal へ通知する
  useLayoutEffect(() => {
    setHasTitle?.(true);

    return () => {
      setHasTitle?.(false);
    };
  }, [setHasTitle]);

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
      <div id={titleId}>{children}</div>
      {onClose && <IconButton icon="close" size="small" variant="text" onClick={onClose} />}
    </div>
  );
}
