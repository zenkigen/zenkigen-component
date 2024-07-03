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
      className={clsx(isHeader === true ? 'sticky top-0 bg-white z-10' : '', 'border-b border-uiBorder01', className)}
    >
      {children}
    </div>
  );
}
