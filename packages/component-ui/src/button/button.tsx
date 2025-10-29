import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, PropsWithChildren, ReactNode } from 'react';

type Size = 'small' | 'medium' | 'large';
type Variant = 'fill' | 'fillDanger' | 'outline' | 'text';
type JustifyContent = 'start' | 'center';

// 内部実装用の型（outlineDangerを含む）
type InternalVariant = Variant | 'outlineDanger';

export type ElementAs = ElementType;

export type AsProp<T extends ElementAs> = {
  elementAs?: T;
};

export type PolymorphicPropsWithoutRef<T extends ElementAs, P extends object> = PropsWithChildren<P> &
  ComponentPropsWithoutRef<T> &
  AsProp<T>;

// 共通のプロパティ型
type BaseProps<T extends ElementAs> = PolymorphicPropsWithoutRef<
  T,
  {
    size?: Size;
    width?: CSSProperties['width'];
    isSelected?: boolean;
    isDisabled?: boolean;
    before?: ReactNode;
    after?: ReactNode;
    borderRadius?: CSSProperties['borderRadius'];
    justifyContent?: JustifyContent;
  }
>;

// 公開API用の型（outlineDangerは含まない）
type PublicProps<T extends ElementAs> = BaseProps<T> & {
  variant?: Variant;
};

// 内部実装用の型（outlineDanger variantを含む）
type InternalProps<T extends ElementAs> = BaseProps<T> & {
  variant?: InternalVariant;
};

// 共通のButton実装
const createButton = <T extends ElementAs = 'button'>(props: InternalProps<T>) => {
  const {
    size = 'medium',
    variant = 'fill',
    isDisabled,
    isSelected = false,
    width,
    borderRadius,
    justifyContent = 'center',
    before,
    after,
    elementAs,
    children,
    ...restProps
  } = props;

  const baseClasses = clsx(
    'flex shrink-0 items-center gap-1',
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
        isSelected && variant !== 'outline' && variant !== 'text' && variant !== 'outlineDanger',
      'pointer-events-none': isDisabled,
      'rounded-button': borderRadius == null,
      'justify-start': justifyContent === 'start',
      'justify-center': justifyContent === 'center',
      'typography-label16regular': size === 'large',
      'typography-label14regular': size !== 'large',
    },
  );

  const Component = elementAs ?? 'button';

  return (
    <Component className={baseClasses} style={{ width, borderRadius }} disabled={isDisabled} {...restProps}>
      {before}
      {children}
      {after}
    </Component>
  );
};

// 公開API用のButtonコンポーネント
export const Button = <T extends ElementAs = 'button'>(props: PublicProps<T>) => {
  return createButton(props as InternalProps<T>);
};

// 内部実装用のButtonコンポーネント（outlineDanger variantを含む）
export const InternalButton = <T extends ElementAs = 'button'>(props: InternalProps<T>) => {
  return createButton(props);
};
