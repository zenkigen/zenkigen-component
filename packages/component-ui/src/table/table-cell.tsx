import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

export function TableCell({ children, className }: Props) {
  return <div className={clsx('border-b-[1px] border-uiBorder01', className)}>{children}</div>;
}
