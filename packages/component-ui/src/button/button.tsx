import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import { CSSProperties, PropsWithChildren, ReactNode } from 'react';

type Size = 'small' | 'medium' | 'large';

type Variant = 'fill' | 'fillDanger' | 'outline' | 'text';

type Props = {
  size?: Size;
  width?: CSSProperties['width'];
  isSelected?: boolean;
  isDisabled?: boolean;
  variant?: Variant;
  before?: ReactNode;
  after?: ReactNode;
  borderRadius?: CSSProperties['borderRadius'];
} & (
  | {
      type?: 'anchor';
      href: string;
      target?: HTMLAnchorElement['target'];
      onClick?: never;
    }
  | {
      type?: 'button';
      href?: never;
      target?: never;
      onClick?: () => void;
    }
  | {
      type?: 'submit';
      href?: never;
      target?: never;
      onClick?: () => void;
    }
);

export function Button({
  size = 'medium',
  variant = 'fill',
  type = 'button',
  href,
  target,
  onClick,
  ...props
}: PropsWithChildren<Props>) {
  const baseClasses = clsx(
    'flex shrink-0 items-center justify-center gap-1',
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    {
      'h-6 px-2.5': size === 'small',
      'h-8 px-3': size === 'medium',
      'h-10 px-4 leading-[24px]': size === 'large',
      'inline-flex': type === 'anchor',
      [buttonColors[variant].selected]: props.isSelected,
      [buttonColors[variant].base]: !props.isSelected,
      'hover:text-text-textOnColor active:text-text-textOnColor [&:hover>*]:fill-icon-iconOnColor [&:active>*]:fill-icon-iconOnColor':
        props.isSelected && variant !== 'outline' && variant !== 'text',
      'pointer-events-none': props.isDisabled,
      'rounded-button': !props.borderRadius,
      'typography-label1regular': size === 'large',
      'typography-label2regular': size !== 'large',
    },
  );

  if (type === 'anchor') {
    return (
      <a className={baseClasses} href={href} target={target} style={{ borderRadius: props.borderRadius }}>
        {props.before}
        {props.children}
        {props.after}
      </a>
    );
  } else {
    return (
      <button
        type={type === 'submit' ? 'submit' : 'button'}
        className={baseClasses}
        disabled={props.isDisabled}
        onClick={onClick}
        style={{ width: props.width, borderRadius: props.borderRadius }}
      >
        {props.before}
        {props.children}
        {props.after}
      </button>
    );
  }
}
