import type { ReactNode } from 'react';

import { useRadioCardContext } from './radio-card-context';

export type RadioCardGroupProps =
  | {
      children: ReactNode;
      /** 並び方向。Steps の orientation と命名・基本2値を共有する */
      orientation?: 'vertical' | 'horizontal';
      className?: never;
    }
  | {
      children: ReactNode;
      /** grid 折り返しや等幅など、className でレイアウトを自由指定する */
      orientation: 'custom';
      className: string;
    };

function resolveGroupClassName(props: RadioCardGroupProps): string {
  if (props.orientation === 'custom') {
    return props.className;
  }
  if (props.orientation === 'horizontal') {
    return 'flex flex-row gap-2';
  }

  return 'flex flex-col gap-2';
}

export function RadioCardGroup(props: RadioCardGroupProps) {
  const { children } = props;
  const { ariaLabel, ariaLabelledby, isError, hasError, errorId } = useRadioCardContext('RadioCard.Group');
  const describedByProps = isError && hasError ? { 'aria-describedby': errorId } : {};

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={resolveGroupClassName(props)}
      {...describedByProps}
    >
      {children}
    </div>
  );
}

RadioCardGroup.displayName = 'RadioCard.Group';
