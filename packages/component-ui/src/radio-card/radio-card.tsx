import type { ReactNode } from 'react';
import { useCallback, useId, useMemo, useState } from 'react';

import type { RadioCardContextValue } from './radio-card-context';
import { RadioCardContext } from './radio-card-context';
import { RadioCardErrorMessage } from './radio-card-error-message';
import { RadioCardGroup } from './radio-card-group';
import { RadioCardItem } from './radio-card-item';

export type RadioCardProps = {
  /** RadioCard.Group と任意で RadioCard.ErrorMessage */
  children: ReactNode;
  /** 選択されている値（controlled） */
  value: string;
  /** 選択変更時のハンドラー */
  onChange: (value: string) => void;
  /** input の name。未指定なら自動生成 */
  name?: string;
  /** グループ全体を無効化するか */
  isDisabled?: boolean;
  /** グループ全体をエラー状態にするか */
  isError?: boolean;
  /** radiogroup の aria-label（推奨） */
  'aria-label'?: string;
  /** radiogroup の aria-labelledby */
  'aria-labelledby'?: string;
};

function RadioCardRoot({
  children,
  value,
  onChange,
  name,
  isDisabled = false,
  isError = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: RadioCardProps) {
  const autoName = useId();
  const baseId = useId();
  const resolvedName = name ?? autoName;
  const errorId = `${baseId}-error`;

  const [hasError, setHasError] = useState(false);

  const registerError = useCallback((present: boolean) => {
    setHasError(present);
  }, []);

  const contextValue = useMemo<RadioCardContextValue>(
    () => ({
      value,
      onChange,
      name: resolvedName,
      isDisabled,
      isError,
      errorId,
      hasError,
      registerError,
      ariaLabel,
      ariaLabelledby,
    }),
    [value, onChange, resolvedName, isDisabled, isError, errorId, hasError, registerError, ariaLabel, ariaLabelledby],
  );

  return (
    <RadioCardContext.Provider value={contextValue}>
      <div className="flex flex-col gap-2">{children}</div>
    </RadioCardContext.Provider>
  );
}

export const RadioCard = Object.assign(RadioCardRoot, {
  Group: RadioCardGroup,
  Item: RadioCardItem,
  ErrorMessage: RadioCardErrorMessage,
  displayName: 'RadioCard',
});
