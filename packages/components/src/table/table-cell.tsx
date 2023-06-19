import { ReactNode } from 'react';

import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  className?: string;
};

export function TableCell({ children, className }: Props) {
  const cellClasses = clsx('border-b-[1px] border-border-uiBorder01');
  return <div className={clsx(cellClasses, className)}>{children}</div>;
}
