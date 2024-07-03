import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  isHeader?: boolean | null;
};

export function TableCell({ children, className, isHeader }: Props) {
  return (
    <div
      className={clsx('border-b border-uiBorder01', isHeader === true ? 'bg-white sticky top-0 z-10' : '', className)}
    >
      {children}
    </div>
  );
}
