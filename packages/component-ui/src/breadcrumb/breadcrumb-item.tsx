import { PropsWithChildren } from 'react';

import clsx from 'clsx';

type Props = {
  isLast?: boolean;
};

export const BreadcrumbItem = ({ children, isLast = false }: PropsWithChildren<Props>) => {
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
