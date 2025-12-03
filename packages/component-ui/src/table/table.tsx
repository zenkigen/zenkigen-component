import type { CSSProperties, PropsWithChildren } from 'react';

import { TableCell } from './table-cell';
import { TableRow } from './table-row';

type Props = {
  width?: CSSProperties['width'];
  templateRows?: CSSProperties['gridTemplateRows'];
  templateColumns?: CSSProperties['gridTemplateColumns'];
  autoColumns?: CSSProperties['gridAutoColumns'];
  autoRows?: CSSProperties['gridAutoRows'];
};

export function Table({
  width,
  templateRows,
  templateColumns,
  autoColumns,
  autoRows,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className="grid"
      style={{
        width,
        gridTemplateRows: templateRows,
        gridTemplateColumns: templateColumns,
        gridAutoColumns: autoColumns,
        gridAutoRows: autoRows,
      }}
    >
      {children}
    </div>
  );
}

Table.Row = TableRow;
Table.Cell = TableCell;
