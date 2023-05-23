import { ReactNode } from 'react';

import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
};

export function TableCell({ children, align = 'left' }: Props) {
  const cellClasses = clsx('flex items-center', 'border-b-[1px] border-border-uiBorder01', {
    'justify-start': align === 'left',
    'justify-center': align === 'center',
    'justify-end': align === 'right',
  });
  return <div className={cellClasses}>{children}</div>;
}
