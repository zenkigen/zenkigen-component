import { CSSProperties, PropsWithChildren } from 'react';

type Props = {
  width?: CSSProperties['width'];
  rows?: CSSProperties['gridTemplateRows'];
  columns?: CSSProperties['gridTemplateColumns'];
};

export function TableContainer({ width, rows, columns, children }: PropsWithChildren<Props>) {
  return (
    <div
      className="grid"
      style={{
        width,
        gridTemplateRows: rows,
        gridTemplateColumns: columns,
      }}
    >
      {children}
    </div>
  );
}
