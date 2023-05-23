import { ReactNode } from 'react';

import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
};

export function TableHeading({ children, align = 'left' }: Props) {
  const headingClasses = clsx(
    'flex items-center',
    'border-b-[1px] border-border-uiBorder01',
    'bg-background-uiBackground01',
    {
      'justify-start': align === 'left',
      'justify-center': align === 'center',
      'justify-end': align === 'right',
    },
  );
  return <div className={headingClasses}>{children}</div>;
}
