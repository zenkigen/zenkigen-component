import { ReactNode } from 'react';

import { typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

type Props = {
  children?: ReactNode;
};

export function TableCell({ children }: Props) {
  const cellClasses = clsx('flex items-center', 'p-2', typography.label.label2regular);
  return <div className={cellClasses}>{children}</div>;
}
