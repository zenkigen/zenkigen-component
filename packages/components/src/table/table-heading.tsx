import { ReactNode } from 'react';

import { typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

type Props = {
  children?: ReactNode;
};

export function TableHeading({ children }: Props) {
  const headingClasses = clsx(
    'flex items-center',
    'px-2 pb-2 pt-6',
    'border-b-[1px] border-border-uiBorder01',
    'bg-background-uiBackground01',
    typography.label.label3bold,
  );
  return <div className={headingClasses}>{children}</div>;
}
