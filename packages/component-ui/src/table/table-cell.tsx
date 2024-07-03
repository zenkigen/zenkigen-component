import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  isHeader?: boolean;
};

export function TableCell({ children, className, isHeader }: Props) {
  return (
    <div className={clsx('border-b border-uiBorder01', isHeader && 'sticky top-0 z-10 bg-white', className)}>
      {children}
    </div>
  );
}
