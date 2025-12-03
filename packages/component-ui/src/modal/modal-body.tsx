import type { PropsWithChildren } from 'react';

export function ModalBody({ children }: PropsWithChildren) {
  return <div className="overflow-y-auto">{children}</div>;
}
