import { iconElements, IconName } from '@zenkigen-inc/component-icons';
import { iconColors } from '@zenkigen-inc/component-theme';
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
  const classes = clsx('inline-block shrink-0', {
    'fill-disabled-disabled01': props.isDisabled,
    [iconColors.icon01]: !props.isDisabled && props.color === 'icon01',
    [iconColors.icon01Dark]: !props.isDisabled && props.color === 'icon01Dark',
    [iconColors.icon02]: !props.isDisabled && props.color === 'icon02',
    [iconColors.icon02Dark]: !props.isDisabled && props.color === 'icon02Dark',
    [iconColors.icon03]: !props.isDisabled && props.color === 'icon03',
    [iconColors.icon03Dark]: !props.isDisabled && props.color === 'icon03Dark',
    [iconColors.iconOnColor]: !props.isDisabled && props.color === 'iconOnColor',
    'w-3 h-3': size === 'x-small',
    'w-4 h-4': size === 'small',
    'w-6 h-6': size === 'medium',
    'w-8 h-8': size === 'large',
    'w-10 h-10': size === 'x-large',
  });

  return <span className={classes}>{iconElements[props.name]}</span>;
};
