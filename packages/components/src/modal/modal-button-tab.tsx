import { useContext } from 'react';

import clsx from 'clsx';

import { Button } from '../button';

import { ModalContext } from './modal-context';

type Props = {
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  onClickPrimaryButton: () => void;
  onClickSecondaryButton: () => void;
  isDanger?: boolean;
  isNoBorder?: boolean;
};

export function ModalButtonTab({
  primaryButtonLabel,
  secondaryButtonLabel,
  onClickPrimaryButton,
  onClickSecondaryButton,
  isDanger,
  isNoBorder,
}: Props) {
  const { size, setIsOpen } = useContext(ModalContext);
  const handleClickPrimaryButton = () => {
    onClickPrimaryButton();
    setIsOpen(false);
  };
  const handleClickSecondaryButton = () => {
    onClickSecondaryButton();
    setIsOpen(false);
  };

  const footerClasses = clsx(
    'flex',
    'shrink-0',
    'justify-end',
    'items-center',
    'w-full',
    'h-[72px]',
    'rounded-b-lg',
    'px-6',
    {
      'gap-x-2': size === 'small',
      'gap-x-4': size === 'medium' || size === 'large' || size === 'x-large',
      'border-t-[1px] border-border-uiBorder01': !isNoBorder,
    },
  );
  return (
    <div className={footerClasses}>
      <Button
        key="1"
        variant="outline"
        size="large"
        width={size === 'small' ? 132 : 'auto'}
        onClick={handleClickSecondaryButton}
      >
        {secondaryButtonLabel}
      </Button>
      <Button
        key="2"
        variant={isDanger ? 'fillDanger' : 'fill'}
        size="large"
        width={size === 'small' ? 132 : 'auto'}
        onClick={handleClickPrimaryButton}
      >
        {primaryButtonLabel}
      </Button>
    </div>
  );
}
