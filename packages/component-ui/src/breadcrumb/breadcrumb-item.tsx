import type { ReactNode } from 'react';

type BreadcrumbItemProps = {
  /** パンくずの1階層分の内容。リンクまたはテキストを渡す。 */
  children: ReactNode;
};

export const BreadcrumbItem = ({ children }: BreadcrumbItemProps) => {
  return (
    <li className="flex gap-2 after:content-['/'] last:after:content-none [&_a]:text-interactive02 [&_a]:hover:underline">
      {children}
    </li>
  );
};
