import { ReactNode } from 'react';

import { buttonColors, typography } from '@zenkigen-component/theme';
import classNames from 'classnames';

type Size = 'small' | 'medium' | 'large';

type Variant = 'fill' | 'outline' | 'text';

type Props =
  | {
      size?: Size;
      isDisabled?: boolean;
      variant?: Variant;
      before?: ReactNode;
      after?: ReactNode;
      children: ReactNode;
    } & (
      | {
          isAnchor: true;
          href: string;
          target?: HTMLAnchorElement['target'];
        }
      | {
          isAnchor?: false;
          onClick?: () => void;
        }
    );

export function Button({ size = 'medium', variant = 'fill', ...props }: Props) {
  const baseClasses = classNames(
    'rounded',
    'flex',
    'gap-1',
    'items-center',
    buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    typography.label.label1regular,
    { 'py-1 px-2': size === 'small' },
    { 'py-2 px-3': size === 'medium' },
    { 'py-2 px-4 leading-[24px]': size === 'large' },
    { 'inline-flex': props.isAnchor },
    { 'pointer-events-none': props.isDisabled },
  );

  if (props.isAnchor) {
    return (
      <a className={baseClasses} href={props.href} target={props.target}>
        {props.before}
        {props.children}
        {props.after}
      </a>
    );
  } else {
    return (
      <button type="button" className={baseClasses} disabled={props.isDisabled}>
        {props.before}
        {props.children}
        {props.after}
      </button>
    );
  }
}
