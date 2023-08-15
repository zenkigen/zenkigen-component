import { ReactNode } from 'react';

import clsx from 'clsx';

type Props = {
  isLast: boolean;
  children?: ReactNode;
};

export const BreadcrumbItem = ({ children, isLast }: Props) => {
  return (
    <>
      <li className={clsx('[&_a]:text-interactive-interactive02', '[&_a]:hover:underline')}>{children}</li>
      {!isLast && (
        <li aria-hidden="true" className="text-interactive-interactive02">
          /
        </li>
      )}
    </>
  );
};
