import type { ReactElement, ReactNode } from 'react';
import { Children, cloneElement, isValidElement, useId, useMemo } from 'react';

import type { RadioCardContextValue } from './radio-card-context';
import { RadioCardContext } from './radio-card-context';
import type { RadioCardErrorMessageProps } from './radio-card-error-message';
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

  // TextInput と同じ方式: 直下の RadioCard.ErrorMessage に連番 id を採番して注入し、
  // 表示中のメッセージ id 群を radiogroup の aria-describedby に張る（非表示時は参照しない）
  const errorIds: string[] = [];
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    if (child.type === RadioCardErrorMessage && isError) {
      const errorChild = child as ReactElement<RadioCardErrorMessageProps>;
      const assignedId = errorChild.props.id ?? `${baseId}-error-${errorIds.length + 1}`;
      errorIds.push(assignedId);

      return cloneElement(errorChild, { id: assignedId });
    }

    return child;
  });

  const errorDescribedBy = errorIds.length > 0 ? errorIds.join(' ') : null;

  const contextValue = useMemo<RadioCardContextValue>(
    () => ({
      value,
      onChange,
      name: resolvedName,
      isDisabled,
      isError,
      errorDescribedBy,
      ariaLabel,
      ariaLabelledby,
    }),
    [value, onChange, resolvedName, isDisabled, isError, errorDescribedBy, ariaLabel, ariaLabelledby],
  );

  return (
    <RadioCardContext.Provider value={contextValue}>
      <div className="flex flex-col gap-2">{enhancedChildren}</div>
    </RadioCardContext.Provider>
  );
}

export const RadioCard = Object.assign(RadioCardRoot, {
  Group: RadioCardGroup,
  Item: RadioCardItem,
  ErrorMessage: RadioCardErrorMessage,
  displayName: 'RadioCard',
});
