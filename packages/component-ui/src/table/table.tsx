import { CSSProperties, PropsWithChildren } from 'react';

import { TableCell } from './table-cell';
import { TableRow } from './table-row';

type Props = {
  width?: CSSProperties['width'];
  rows?: CSSProperties['gridTemplateRows'];
  columns?: CSSProperties['gridTemplateColumns'];
};

export function Table({ width, rows, columns, children }: PropsWithChildren<Props>) {
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

Table.Row = TableRow;
Table.Cell = TableCell;
