import type { PropsWithChildren } from 'react';

export function PopupBody({ children }: PropsWithChildren) {
  return <div className="overflow-y-auto">{children}</div>;
}
