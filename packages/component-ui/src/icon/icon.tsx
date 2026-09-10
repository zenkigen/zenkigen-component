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
      // stroke-width はサイズ別に上書きする（stroke 系アイコンは viewBox 24 基準で一様スケールされるため、
      // 小サイズでは太く・大サイズでは細くして実効線幅を補正する。fill 系アイコンは stroke 不使用のため無害）
      'w-3 h-3 [&_svg]:[stroke-width:2.5]': size === 'x-small',
      'w-4 h-4 [&_svg]:[stroke-width:2.35]': size === 'small',
      'w-6 h-6 [&_svg]:[stroke-width:2]': size === 'medium',
      'w-8 h-8 [&_svg]:[stroke-width:1.65]': size === 'large',
      'w-10 h-10 [&_svg]:[stroke-width:1.4]': size === 'x-large',
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
