import { ReactNode } from 'react';

import { buttonColors } from '@zenkigen-component/theme';

type Props = {
  isAnchor?: boolean;
  children?: ReactNode;
};

export function Button({ isAnchor, children }: Props) {
  if (isAnchor) {
    return <a>{children}</a>;
  } else {
    return <button className={buttonColors.primary.base}>{children}</button>;
  }
}
