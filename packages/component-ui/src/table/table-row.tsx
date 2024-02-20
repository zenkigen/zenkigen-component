import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  isHoverBackgroundVisible?: boolean;
};
export function TableRow({ children, isHoverBackgroundVisible = false }: Props) {
  const rowClasses = clsx('contents', isHoverBackgroundVisible && '[&:hover>div]:bg-hoverUi02');

  return <div className={rowClasses}>{children}</div>;
}
