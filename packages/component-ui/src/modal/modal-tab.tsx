import { ReactNode } from 'react';

import { Tab } from '../tab';

type Props = {
  children: ReactNode;
};

export function ModalTab({ children }: Props) {
  return (
    <div className="mt-2 w-full">
      <Tab>
        {children}
      </Tab>
    </div>
  );
}
