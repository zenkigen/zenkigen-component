import { PropsWithChildren } from 'react';

export function ModalBody({ children }: PropsWithChildren) {
  return <div className="flex items-center justify-center overflow-y-auto">{children}</div>;
}
