import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};
export function TableRowContainer({ children }: Props) {
  return <div className="contents">{children}</div>;
}
