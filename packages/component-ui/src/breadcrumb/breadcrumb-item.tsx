import { PropsWithChildren } from 'react';

export const BreadcrumbItem = ({ children }: PropsWithChildren) => {
  return (
    <li className="flex gap-2 after:content-['/'] last:after:content-none [&_a]:text-interactive-interactive02 [&_a]:hover:underline">
      {children}
    </li>
  );
};
