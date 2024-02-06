import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

type Props = {
  isNoBorder?: boolean;
};

export function ModalFooter({ children, isNoBorder }: PropsWithChildren<Props>) {
  const wrapperClasses = clsx('flex w-full shrink-0 items-center rounded-b-lg px-6 py-4', {
    'border-t-[1px] border-uiBorder01': !isNoBorder,
  });

  return <div className={wrapperClasses}>{children}</div>;
}
