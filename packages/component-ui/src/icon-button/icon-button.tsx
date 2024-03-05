import type { IconName } from '@zenkigen-inc/component-icons';
import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';
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

export function IconButton({
  size = 'medium',
  variant = 'outline',
  isNoPadding = false,
  isDisabled = false,
  ...props
}: Props) {
  const baseClasses = clsx(
    'typography-label1regular flex items-center justify-center gap-1 rounded transition-colors duration-hover-out hover:transition-colors hover:duration-hover-over [&:hover>*]:transition-colors [&:hover>*]:duration-hover-over [&>*]:transition-colors [&>*]:duration-hover-out',
    buttonColors[variant].base,
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
    },
  );

  const iconSize = size === 'small' ? 'small' : 'medium';

  if (props.isAnchor === true) {
    return (
      <a className={baseClasses} href={props.href} target={props.target}>
        <Icon name={props.icon} size={iconSize} />
      </a>
    );
  } else {
    return (
      <button type="button" className={baseClasses} disabled={isDisabled} onClick={props.onClick}>
        <Icon name={props.icon} size={iconSize} />
      </button>
    );
  }
}
