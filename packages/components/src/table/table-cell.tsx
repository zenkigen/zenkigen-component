import { ReactNode } from 'react';

import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
};

export function TableCell({ children, align = 'left', className }: Props) {
  const cellClasses = clsx('flex items-center', 'border-b-[1px] border-border-uiBorder01', {
    'justify-start': align === 'left',
    'justify-center': align === 'center',
    'justify-end': align === 'right',
  });
  return <div className={clsx(cellClasses, className)}>{children}</div>;
}
