import { IconName, iconElements } from '@zenkigen-component/icons';
import { iconColors } from '@zenkigen-component/theme';
import classNames from 'classnames';

type Size = 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'mega';

type Color = keyof typeof iconColors;

type Props = {
  name: IconName;
  size?: Size;
  color?: Color;
};

export const Icon = ({ size = 'medium', ...props }: Props) => {
  return (
    <span
      className={classNames('inline-block', {
        [iconColors.icon01]: props.color === 'icon01',
        [iconColors.icon01Dark]: props.color === 'icon01Dark',
        [iconColors.icon02]: props.color === 'icon02',
        [iconColors.icon02Dark]: props.color === 'icon02Dark',
        [iconColors.icon03]: props.color === 'icon03',
        [iconColors.icon03Dark]: props.color === 'icon03Dark',
        [iconColors.iconOnColor]: props.color === 'iconOnColor',
        'w-2.5 h-2.5': size === 'mini',
        'w-3.5 h-3.5': size === 'tiny',
        'w-4 h-4': size === 'small',
        'w-5 h-5': size === 'medium',
        'w-6 h-6': size === 'large',
        'w-8 h-8': size === 'huge',
        'w-16 h-16': size === 'mega',
      })}
    >
      {iconElements[props.name]}
    </span>
  );
};
