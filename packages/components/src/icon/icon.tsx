import { IconName, iconElements } from '@zenkigen-component/icons';
import { iconColors } from '@zenkigen-component/theme';
import { clsx } from 'clsx';

type Size = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

type Color = keyof typeof iconColors;

type Props = {
  name: IconName;
  size?: Size;
  color?: Color;
  isDisabled?: boolean;
};

export const Icon = ({ size = 'medium', ...props }: Props) => {
  return (
    <span
      className={clsx(
        'inline-block',
        'shrink-0',
        props.isDisabled
          ? 'fill-disabled-disabled01'
          : {
              [iconColors.icon01]: props.color === 'icon01',
              [iconColors.icon01Dark]: props.color === 'icon01Dark',
              [iconColors.icon02]: props.color === 'icon02',
              [iconColors.icon02Dark]: props.color === 'icon02Dark',
              [iconColors.icon03]: props.color === 'icon03',
              [iconColors.icon03Dark]: props.color === 'icon03Dark',
              [iconColors.iconOnColor]: props.color === 'iconOnColor',
            },
        {
          'w-3 h-3': size === 'x-small',
          'w-4 h-4': size === 'small',
          'w-6 h-6': size === 'medium',
          'w-8 h-8': size === 'large',
          'w-10 h-10': size === 'x-large',
        },
      )}
    >
      {iconElements[props.name]}
    </span>
  );
};
