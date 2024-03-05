import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, PropsWithChildren, ReactNode } from 'react';

type Size = 'small' | 'medium' | 'large';

type Variant = 'fill' | 'fillDanger' | 'outline' | 'text';

export type ElementAs = ElementType;

export type AsProp<T extends ElementAs> = {
  elementAs?: T;
};

export type PolymorphicPropsWithoutRef<T extends ElementAs, P extends object> = PropsWithChildren<P> &
  ComponentPropsWithoutRef<T> &
  AsProp<T>;

type Props<T extends ElementAs> = PolymorphicPropsWithoutRef<
  T,
  {
    size?: Size;
    width?: CSSProperties['width'];
    isSelected?: boolean;
    isDisabled?: boolean;
    variant?: Variant;
    before?: ReactNode;
    after?: ReactNode;
    borderRadius?: CSSProperties['borderRadius'];
  }
>;

export const Button = <T extends ElementAs = 'button'>({
  size = 'medium',
  variant = 'fill',
  isDisabled,
  isSelected = false,
  width,
  borderRadius,
  before,
  after,
  elementAs,
  children,
  ...props
}: Props<T>) => {
  const baseClasses = clsx(
    'flex shrink-0 items-center justify-center gap-1 transition-colors duration-hover-out hover:transition-colors hover:duration-hover-over [&:hover>*]:transition-colors [&:hover>*]:duration-hover-over [&>*]:transition-colors [&>*]:duration-hover-out',
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    {
      'h-6 px-2.5': size === 'small',
      'h-8 px-3': size === 'medium',
      'h-10 px-4 leading-[24px]': size === 'large',
      'inline-flex': elementAs === 'a',
      [buttonColors[variant].selected]: isSelected,
      [buttonColors[variant].base]: !isSelected,
      'hover:text-textOnColor active:text-textOnColor [&:hover>*]:fill-iconOnColor [&:active>*]:fill-iconOnColor':
        isSelected && variant !== 'outline' && variant !== 'text',
      'pointer-events-none': isDisabled,
      'rounded-button': borderRadius == null,
      'typography-label1regular': size === 'large',
      'typography-label2regular': size !== 'large',
    },
  );

  const Component = elementAs ?? 'button';

  return (
    <Component className={baseClasses} style={{ width, borderRadius }} disabled={isDisabled} {...props}>
      {before}
      {children}
      {after}
    </Component>
  );
};
