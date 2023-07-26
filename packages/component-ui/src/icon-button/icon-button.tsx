import { IconName } from '@zenkigen/component-icons';
import { buttonColors, typography, focusVisible } from '@zenkigen/component-theme';
import { clsx } from 'clsx';

import { Icon } from '../icon/icon';

type Size = 'small' | 'medium' | 'large';

type Variant = 'outline' | 'text';

type Props = {
  icon: IconName;
  size?: Size;
  isDisabled?: boolean;
  isNoPadding?: boolean;
  variant?: Variant;
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

export function IconButton({ size = 'medium', variant = 'outline', ...props }: Props) {
  const baseClasses = clsx(
    'rounded',
    'flex',
    'gap-1',
    'items-center',
    'justify-center',
    buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    typography.label.label1regular,
    { 'h-6 w-6': size === 'small' && !props.isNoPadding },
    { 'h-8 w-8': size === 'medium' && !props.isNoPadding },
    { 'h-10 w-10': size === 'large' && !props.isNoPadding },
    { 'h-4 w-4': size === 'small' && props.isNoPadding },
    { 'h-6 w-6': size === 'medium' && props.isNoPadding },
    { 'h-6 w-6': size === 'large' && props.isNoPadding },
    { 'inline-flex': props.isAnchor },
    { 'pointer-events-none': props.isDisabled },
  );

  const iconSize = size === 'small' ? 'small' : 'medium';

  if (props.isAnchor) {
    return (
      <a className={baseClasses} href={props.href} target={props.target}>
        <Icon name={props.icon} size={iconSize} />
      </a>
    );
  } else {
    return (
      <button type="button" className={baseClasses} disabled={props.isDisabled} onClick={props.onClick}>
        <Icon name={props.icon} size={iconSize} />
      </button>
    );
  }
}
