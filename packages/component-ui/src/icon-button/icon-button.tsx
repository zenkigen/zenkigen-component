import type { IconName } from '@zenkigen-inc/component-icons';
import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';

import { Icon } from '../icon/icon';

type Size = 'small' | 'medium' | 'large';

type Variant = 'outline' | 'text';

type Props = {
  /** 表示するアイコン名 */
  icon: IconName;
  /** ボタンのサイズ */
  size?: Size;
  /** ボタンが無効かどうか */
  isDisabled?: boolean;
  /** ボタンが選択されているかどうか */
  isSelected?: boolean;
  /** パディングを無効にするかどうか */
  isNoPadding?: boolean;
  /** ボタンのバリアント */
  variant?: Variant;
} & (
  | ({
      isAnchor: true;
      href: string;
      target?: HTMLAnchorElement['target'];
    } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'className'>)
  | ({
      isAnchor?: false;
      onClick?: () => void;
    } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'className'>)
);

export function IconButton({
  icon,
  size = 'medium',
  variant = 'outline',
  isNoPadding = false,
  isDisabled = false,
  isSelected = false,
  ...props
}: Props) {
  const baseClasses = clsx(
    'typography-label16regular flex items-center justify-center gap-1 rounded',
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    {
      'h-4 w-4': size === 'small' && isNoPadding,
      'h-6 w-6': (size === 'small' && !isNoPadding) || ((size === 'medium' || size === 'large') && isNoPadding),
      'h-8 w-8': size === 'medium' && !isNoPadding,
      'h-10 w-10': size === 'large' && !isNoPadding,
      'inline-flex': props.isAnchor,
      'pointer-events-none': isDisabled,
      [buttonColors[variant].selected]: isSelected,
      [buttonColors[variant].base]: !isSelected,
    },
  );

  const iconSize = size === 'small' ? 'small' : 'medium';

  if (props.isAnchor === true) {
    const buttonProps = Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'isAnchor')) as Omit<
      typeof props,
      'isAnchor'
    >;

    return (
      <a className={baseClasses} {...buttonProps}>
        <Icon name={icon} size={iconSize} />
      </a>
    );
  } else {
    const buttonProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => key !== 'isAnchor' && key !== 'onClick'),
    ) as Omit<typeof props, 'isAnchor' | 'onClick'>;

    return (
      <button type="button" className={baseClasses} disabled={isDisabled} onClick={props.onClick} {...buttonProps}>
        <Icon name={icon} size={iconSize} />
      </button>
    );
  }
}
