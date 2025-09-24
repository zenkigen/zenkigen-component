import type { PropsWithChildren } from 'react';

export function DialogBody({ children }: PropsWithChildren) {
  return <div className="overflow-y-auto">{children}</div>;
}
