import { IconName } from '@zenkigen-component/icons';
import { buttonColors, typography } from '@zenkigen-component/theme';
import { clsx } from 'clsx';

import { Icon } from '../icon/icon';

type Size = 'small' | 'medium' | 'large';

type Variant = 'outline' | 'text';

type Props =
  | {
      icon: IconName;
      size?: Size;
      isDisabled?: boolean;
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
    buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    typography.label.label1regular,
    { 'py-1 px-1': size === 'small' },
    { 'py-1 px-1': size === 'medium' },
    { 'py-2 px-2': size === 'large' },
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
      <button type="button" className={baseClasses} disabled={props.isDisabled}>
        <Icon name={props.icon} size={iconSize} />
      </button>
    );
  }
}
