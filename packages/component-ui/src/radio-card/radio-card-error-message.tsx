import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useRadioCardContext } from './radio-card-context';

export type RadioCardErrorMessageProps = {
  children: ReactNode;
};

export function RadioCardErrorMessage({ children }: RadioCardErrorMessageProps) {
  const { isError, errorId, registerError } = useRadioCardContext('RadioCard.ErrorMessage');

  useEffect(() => {
    registerError(true);

    return () => registerError(false);
  }, [registerError]);

  if (!isError) {
    return null;
  }

  return (
    <p id={errorId} className="typography-label13regular text-supportError" aria-live="assertive">
      {children}
    </p>
  );
}

RadioCardErrorMessage.displayName = 'RadioCard.ErrorMessage';
