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
  const { setIsOpen } = useContext(ModalContext);
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
    'gap-x-4',
    'w-full',
    'h-[72px]',
    'rounded-b-lg',
    'px-6',
    {
      'border-t-[1px] border-border-uiBorder01': !isNoBorder,
    },
  );
  return (
    <div className={footerClasses}>
      <Button key="1" variant="outline" size="large" onClick={handleClickSecondaryButton}>
        {secondaryButtonLabel}
      </Button>
      <Button key="2" variant={isDanger ? 'fillDanger' : 'fill'} size="large" onClick={handleClickPrimaryButton}>
        {primaryButtonLabel}
      </Button>
    </div>
  );
}
