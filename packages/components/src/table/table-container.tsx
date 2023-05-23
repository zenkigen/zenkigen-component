import { CSSProperties, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  rows?: CSSProperties['gridTemplateRows'];
  columns?: CSSProperties['gridTemplateColumns'];
};

export function TableContainer({ children, rows, columns }: Props) {
  return (
    <div
      className="grid w-full"
      style={{
        gridTemplateRows: rows,
        gridTemplateColumns: columns,
      }}
    >
      {children}
    </div>
  );
}
