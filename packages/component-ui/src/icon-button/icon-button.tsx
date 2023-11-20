import { IconName } from '@zenkigen-inc/component-icons';
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

export function IconButton({ size = 'medium', variant = 'outline', ...props }: Props) {
  const baseClasses = clsx(
    'typography-label1regular flex items-center justify-center gap-1 rounded',
    buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    {
      'h-4 w-4': size === 'small' && props.isNoPadding,
      'h-6 w-6':
        (size === 'small' && !props.isNoPadding) || ((size === 'medium' || size === 'large') && props.isNoPadding),
      'h-8 w-8': size === 'medium' && !props.isNoPadding,
      'h-10 w-10': size === 'large' && !props.isNoPadding,
      'inline-flex': props.isAnchor,
      'pointer-events-none': props.isDisabled,
    },
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
