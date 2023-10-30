import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  isHoverBackgroundVisible?: boolean;
};
export function TableRow({ children, isHoverBackgroundVisible }: Props) {
  const rowClasses = clsx('contents', isHoverBackgroundVisible && '[&:hover>div]:bg-hover-hoverUi02');

  return <div className={rowClasses}>{children}</div>;
}
