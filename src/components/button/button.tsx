import { ReactNode } from 'react';

type Props = {
  isAnchor?: boolean;
  children?: ReactNode;
};

export function Button({ isAnchor, children }: Props) {
  if (isAnchor) {
    return <a>{children}</a>;
  } else {
    return <button>{children}</button>;
  }
}
