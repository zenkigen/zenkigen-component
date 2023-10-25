import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';

type Props = {
  isNoBorder?: boolean;
};

export function ModalFooter({ children, isNoBorder }: PropsWithChildren<Props>) {
  const wrapperClasses = clsx('flex', 'shrink-0', 'items-center', 'w-full', 'rounded-b-lg', 'py-4', 'px-6', {
    'border-t-[1px] border-border-uiBorder01': !isNoBorder,
  });

  return <div className={wrapperClasses}>{children}</div>;
}
