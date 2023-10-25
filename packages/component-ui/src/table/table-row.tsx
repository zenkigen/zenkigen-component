import { ReactNode } from 'react';

import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  isHoverBackgroundVisible?: boolean;
};
export function TableRow({ children, isHoverBackgroundVisible }: Props) {
  const rowClasses = clsx('contents', isHoverBackgroundVisible && '[&:hover>div]:bg-hover-hoverUi02');

  return <div className={rowClasses}>{children}</div>;
}
