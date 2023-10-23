import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export function ModalBody({ children }: Props) {
  return <div className="flex items-center justify-center overflow-y-auto">{children}</div>;
}
