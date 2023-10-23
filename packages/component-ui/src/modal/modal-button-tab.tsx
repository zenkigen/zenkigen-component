import { useCallback, useContext } from 'react';

import clsx from 'clsx';

import { Button } from '../button';
import { Checkbox } from '../checkbox';

import { ModalContext } from './modal-context';

type Props = {
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  onClickPrimaryButton: () => void;
  onClickSecondaryButton: () => void;
  isDanger?: boolean;
  isNoBorder?: boolean;
} & (
  | {
      isWithCheckbox?: boolean;
      checkboxLabel?: string;
      isChecked?: boolean;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      subButtonLabel?: never;
      onClickSubButton?: never;
    }
  | {
      isWithCheckbox?: never;
      checkboxLabel?: never;
      isChecked?: never;
      onChange?: never;
      subButtonLabel?: string;
      onClickSubButton?: () => void;
    }
);

export function ModalButtonTab({
  primaryButtonLabel,
  secondaryButtonLabel,
  onClickPrimaryButton,
  onClickSecondaryButton,
  isDanger,
  isNoBorder,
  isWithCheckbox,
  checkboxLabel,
  isChecked,
  onChange,
  subButtonLabel,
  onClickSubButton,
}: Props) {
  const { width, widthLimit, setIsOpen } = useContext(ModalContext);
  const handleClickPrimaryButton = useCallback(() => {
    onClickPrimaryButton();
    setIsOpen(false);
  }, [onClickPrimaryButton, setIsOpen]);
  const handleClickSecondaryButton = useCallback(() => {
    onClickSecondaryButton();
    setIsOpen(false);
  }, [onClickSecondaryButton, setIsOpen]);
  const handleClickSubButton = useCallback(() => {
    onClickSubButton?.();
  }, [onClickSubButton]);

  const wrapperClasses = clsx('flex', 'shrink-0', 'items-center', 'w-full', 'rounded-b-lg', 'py-4', 'px-6', {
    'justify-between': isWithCheckbox || (subButtonLabel && widthLimit <= width),
    'justify-end': !isWithCheckbox || !subButtonLabel,
    'justify-center': subButtonLabel && width < widthLimit,
    'border-t-[1px] border-border-uiBorder01': !isNoBorder,
    'gap-y-4': width < widthLimit,
    'flex-wrap': width < widthLimit && isWithCheckbox,
    'flex-wrap-reverse': width < widthLimit && subButtonLabel,
  });
  const buttonContainerClasses = clsx('flex', 'items-center', {
    'w-full justify-center': width < widthLimit,
    'gap-x-2': width < widthLimit,
    'gap-x-4': widthLimit <= width,
  });
  return (
    <div className={wrapperClasses}>
      {isWithCheckbox ? (
        <div>
          <Checkbox id="modal-checkbox" label={checkboxLabel} isChecked={isChecked} onChange={onChange} />
        </div>
      ) : subButtonLabel && onClickSubButton ? (
        <Button key="0" variant="text" size="large" onClick={handleClickSubButton}>
          {subButtonLabel}
        </Button>
      ) : null}
      <div className={buttonContainerClasses}>
        <Button
          key="1"
          variant="outline"
          size="large"
          width={width < widthLimit ? 132 : 'auto'}
          onClick={handleClickSecondaryButton}
        >
          {secondaryButtonLabel}
        </Button>
        <Button
          key="2"
          variant={isDanger ? 'fillDanger' : 'fill'}
          size="large"
          width={width < widthLimit ? 132 : 'auto'}
          onClick={handleClickPrimaryButton}
        >
          {primaryButtonLabel}
        </Button>
      </div>
    </div>
  );
}
