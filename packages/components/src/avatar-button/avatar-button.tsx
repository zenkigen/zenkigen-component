import { buttonColors, typography, focusVisible } from '@zenkigen-component/theme';
import { clsx } from 'clsx';

import { Avatar } from '../avatar';

type Props =
  | {
      size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
      userId: number;
      firstName: string;
      lastName: string;
      isDisabled?: boolean;
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

export function AvatarButton({ size = 'medium', ...props }: Props) {
  const baseClasses = clsx(
    'rounded',
    'flex',
    'gap-1',
    'items-center',
    buttonColors['text'].base,
    buttonColors['text'].hover,
    buttonColors['text'].active,
    buttonColors['text'].disabled,
    focusVisible.normal,
    typography.label.label1regular,
    { 'py-1 px-1': size === 'small' || size === 'x-small' },
    { 'py-1 px-1': size === 'medium' },
    { 'py-2 px-2': size === 'large' || size === 'x-large' },
    { 'inline-flex': props.isAnchor },
    { 'pointer-events-none': props.isDisabled },
  );

  if (props.isAnchor) {
    return (
      <a className={baseClasses} href={props.href} target={props.target}>
        <Avatar
          size={size}
          userId={props.userId}
          firstName={props.firstName}
          lastName={props.lastName}
          isDisabled={props.isDisabled}
        />
      </a>
    );
  } else {
    return (
      <button type="button" className={baseClasses} disabled={props.isDisabled} onClick={props.onClick}>
        <Avatar
          size={size}
          userId={props.userId}
          firstName={props.firstName}
          lastName={props.lastName}
          isDisabled={props.isDisabled}
        />
      </button>
    );
  }
}
