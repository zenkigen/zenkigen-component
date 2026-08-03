import type { ReactNode } from 'react';

import { useRadioCardContext } from './radio-card-context';

export type RadioCardGroupProps = {
  children: ReactNode;
};

export function RadioCardGroup({ children }: RadioCardGroupProps) {
  const { ariaLabel, ariaLabelledby, errorDescribedBy } = useRadioCardContext('RadioCard.Group');
  const describedByProps = errorDescribedBy != null ? { 'aria-describedby': errorDescribedBy } : {};

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className="flex flex-col gap-4"
      {...describedByProps}
    >
      {children}
    </div>
  );
}

RadioCardGroup.displayName = 'RadioCard.Group';
