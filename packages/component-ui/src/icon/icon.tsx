import type { IconName } from '@zenkigen-inc/component-icons';
import { iconElements } from '@zenkigen-inc/component-icons';
import { clsx } from 'clsx';

import type { ColorToken } from '../color-types';

type Size = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

type Props = {
  name: IconName;
  size?: Size;
  color?: ColorToken;
  accentColor?: ColorToken;
  isDisabled?: boolean;
  className?: string;
};

export const Icon = ({ size = 'medium', isDisabled = false, ...props }: Props) => {
  const classes = clsx(
    'inline-block shrink-0',
    {
      'fill-disabled01': isDisabled,
      [`fill-${props.color}`]: !isDisabled && props.color != null,
      'w-3 h-3': size === 'x-small',
      'w-4 h-4': size === 'small',
      'w-6 h-6': size === 'medium',
      'w-8 h-8': size === 'large',
      'w-10 h-10': size === 'x-large',
    },
    props.className,
  );

  const IconComponent = iconElements[props.name];

  return (
    <>
      <span className={classes}>
        <IconComponent
          {...(isDisabled !== true && typeof props.accentColor === 'string'
            ? { accentClassName: `fill-${String(props.accentColor)}` }
            : {})}
        />
      </span>
    </>
  );
};
