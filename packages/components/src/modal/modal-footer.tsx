import clsx from 'clsx';

import { Button } from '../button';

type Props = {
  isNoBorder?: boolean;
};

export function ModalFooter({ isNoBorder }: Props) {
  const footerClasses = clsx(
    'flex',
    'justify-end',
    'items-center',
    'gap-x-4',
    'w-full',
    'h-[72px]',
    'rounded-b-lg',
    'px-6',
    {
      'border border-t-[1px] border-border-uiBorder01': !isNoBorder,
    },
  );
  return (
    <div className={footerClasses}>
      <Button key="1" variant="outline" size="large">
        キャンセル
      </Button>
      <Button key="2" variant="fill" size="large">
        保存する
      </Button>
    </div>
  );
}
