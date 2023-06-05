import { ReactNode } from 'react';

import { buttonColors, typography, focusVisible } from '@zenkigen-component/theme';
import { clsx } from 'clsx';

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
  const baseClasses = clsx(
    'rounded',
    'flex',
    'gap-1',
    'items-center',
    buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    size === 'large' ? typography.label.label1regular : typography.label.label2regular,
    { 'h-6 px-2': size === 'small' },
    { 'h-8 px-3': size === 'medium' },
    { 'h-10 px-4 leading-[24px]': size === 'large' },
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
      <button type="button" className={baseClasses} disabled={props.isDisabled} onClick={props.onClick}>
        {props.before}
        {props.children}
        {props.after}
      </button>
    );
  }
}
