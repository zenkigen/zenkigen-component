import type { ReactNode } from 'react';

import { useRadioCardContext } from './radio-card-context';

export type RadioCardGroupProps = {
  children: ReactNode;
};

export function RadioCardGroup({ children }: RadioCardGroupProps) {
  const { ariaLabel, ariaLabelledby, isError, hasError, errorId } = useRadioCardContext('RadioCard.Group');
  const describedByProps = isError && hasError ? { 'aria-describedby': errorId } : {};

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className="flex flex-col gap-2"
      {...describedByProps}
    >
      {children}
    </div>
  );
}

RadioCardGroup.displayName = 'RadioCard.Group';
