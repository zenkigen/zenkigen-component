import type { ReactNode } from 'react';

import { useRadioCardContext } from './radio-card-context';

export type RadioCardErrorMessageProps = {
  children: ReactNode;
  /** エラーメッセージ要素の id。未指定なら RadioCard が自動採番して注入する */
  id?: string;
};

export function RadioCardErrorMessage({ children, id }: RadioCardErrorMessageProps) {
  const { isError } = useRadioCardContext('RadioCard.ErrorMessage');

  if (!isError) {
    return null;
  }

  return (
    <p id={id} className="typography-label13regular text-supportError" aria-live="assertive">
      {children}
    </p>
  );
}

RadioCardErrorMessage.displayName = 'RadioCard.ErrorMessage';
