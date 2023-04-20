import { ReactNode } from 'react';

import { buttonColors, typography } from '@zenkigen-component/theme';
import classNames from 'classnames';

type Size = 'large' | 'medium' | 'small';

type Style = 'fill' | 'outline' | 'text';

type Props =
  | {
      size?: Size;
      isDisabled?: boolean;
      style?: Style;
      children?: ReactNode;
    } & (
      | {
          isAnchor: true;
          href: string;
          target?: HTMLAnchorElement['target'];
        }
      | {
          isAnchor: false;
          onClick: () => void;
        }
    );

export function Button({ size = 'medium', style = 'fill', ...props }: Props) {
  const baseClasses = classNames(
    'rounded',
    buttonColors[style].base,
    buttonColors[style].hover,
    buttonColors[style].active,
    buttonColors[style].focus,
    buttonColors[style].disabled,
    typography.label.label1regular,
    { 'py-1 px-2': size === 'small' },
    { 'py-2 px-3': size === 'medium' },
    { 'py-3 px-4': size === 'large' },
    { 'inline-block': props.isAnchor },
  );

  if (props.isAnchor) {
    return (
      <a className={baseClasses} href={props.href}>
        {props.children}
      </a>
    );
  } else {
    return (
      <button className={baseClasses} disabled={props.isDisabled}>
        {props.children}
      </button>
    );
  }
}
