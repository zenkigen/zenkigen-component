import { CSSProperties, ReactNode } from 'react';

import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  rows?: CSSProperties['gridTemplateRows'];
  columns?: CSSProperties['gridTemplateColumns'];
};

export function TableContainer({ children, rows, columns }: Props) {
  const containerClasses = clsx('grid w-full');
  return (
    <div
      className={containerClasses}
      style={{
        gridTemplateRows: rows,
        gridTemplateColumns: columns,
      }}
    >
      {children}
    </div>
  );
}
