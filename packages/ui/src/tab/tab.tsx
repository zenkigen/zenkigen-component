import { ReactNode } from 'react';

import { clsx } from 'clsx';

type Props = {
  children?: ReactNode;
};

export function Tab({ children }: Props) {
  const classes = clsx(
    'flex',
    'px-6',
    'gap-4',
    'relative',
    'before:bg-border-uiBorder01',
    'before:h-px',
    'before:bottom-0',
    'before:left-0',
    'before:right-0',
    'before:absolute',
    {},
  );

  return (
    <div role="tablist" className={classes}>
      {children}
    </div>
  );
}
