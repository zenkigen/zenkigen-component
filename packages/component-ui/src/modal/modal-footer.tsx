import React, { ReactNode, useContext } from 'react';

import clsx from 'clsx';

import { ModalContext } from './modal-context';

type Props = {
  children: ReactNode;
  abc?: boolean;
  isNoBorder?: boolean;
};

export function ModalFooter({ children, abc = false, isNoBorder }: Props) {
  const childCount = React.Children.count(children);
  const { width, widthLimit } = useContext(ModalContext);
  const wrapperClasses = clsx('flex', 'shrink-0', 'items-center', 'w-full', 'rounded-b-lg', 'py-4', 'px-6', {
    // 'justify-between': isWithCheckbox || (subButtonLabel && widthLimit <= width),
    // 'justify-end': !isWithCheckbox || !subButtonLabel,
    // 'justify-center': subButtonLabel && width < widthLimit,
    // 'justify-end': true,
    'border-t-[1px] border-border-uiBorder01': !isNoBorder,
    'justify-between': width >= widthLimit && childCount === 2,
    'justify-start': width < widthLimit && childCount === 2,
    'justify-end': childCount === 1,
    'flex-wrap gap-y-4': width < widthLimit,
    'flex-wrap-reverse': abc,
    // 'gap-y-4': width < widthLimit,
    // 'flex-wrap': width < widthLimit && isWithCheckbox,
    // 'flex-wrap-reverse': width < widthLimit && subButtonLabel,
  });

  return <div className={wrapperClasses}>{children}</div>;
}
