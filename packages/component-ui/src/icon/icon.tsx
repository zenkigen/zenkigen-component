import type { IconName } from '@zenkigen-inc/component-icons';
import { iconElements } from '@zenkigen-inc/component-icons';
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

export const Icon = ({ size = 'medium', isDisabled = false, ...props }: Props) => {
  const classes = clsx('inline-block shrink-0', {
    'fill-disabled01': isDisabled,
    [iconColors.icon01]: !isDisabled && props.color === 'icon01',
    [iconColors.icon01Dark]: !isDisabled && props.color === 'icon01Dark',
    [iconColors.icon02]: !isDisabled && props.color === 'icon02',
    [iconColors.icon02Dark]: !isDisabled && props.color === 'icon02Dark',
    [iconColors.icon03]: !isDisabled && props.color === 'icon03',
    [iconColors.icon03Dark]: !isDisabled && props.color === 'icon03Dark',
    [iconColors.iconOnColor]: !isDisabled && props.color === 'iconOnColor',
    [iconColors.black]: !isDisabled && props.color === 'black',
    [iconColors.white]: !isDisabled && props.color === 'white',
    [iconColors.blue10]: !isDisabled && props.color === 'blue10',
    [iconColors.blue20]: !isDisabled && props.color === 'blue20',
    [iconColors.blue30]: !isDisabled && props.color === 'blue30',
    [iconColors.blue40]: !isDisabled && props.color === 'blue40',
    [iconColors.blue50]: !isDisabled && props.color === 'blue50',
    [iconColors.blue60]: !isDisabled && props.color === 'blue60',
    [iconColors.blue70]: !isDisabled && props.color === 'blue70',
    [iconColors.blue80]: !isDisabled && props.color === 'blue80',
    [iconColors.blue90]: !isDisabled && props.color === 'blue90',
    [iconColors.blue100]: !isDisabled && props.color === 'blue100',
    [iconColors.gray10]: !isDisabled && props.color === 'gray10',
    [iconColors.gray20]: !isDisabled && props.color === 'gray20',
    [iconColors.gray30]: !isDisabled && props.color === 'gray30',
    [iconColors.gray40]: !isDisabled && props.color === 'gray40',
    [iconColors.gray50]: !isDisabled && props.color === 'gray50',
    [iconColors.gray60]: !isDisabled && props.color === 'gray60',
    [iconColors.gray70]: !isDisabled && props.color === 'gray70',
    [iconColors.gray80]: !isDisabled && props.color === 'gray80',
    [iconColors.gray90]: !isDisabled && props.color === 'gray90',
    [iconColors.gray100]: !isDisabled && props.color === 'gray100',
    [iconColors.red10]: !isDisabled && props.color === 'red10',
    [iconColors.red20]: !isDisabled && props.color === 'red20',
    [iconColors.red30]: !isDisabled && props.color === 'red30',
    [iconColors.red40]: !isDisabled && props.color === 'red40',
    [iconColors.red50]: !isDisabled && props.color === 'red50',
    [iconColors.red60]: !isDisabled && props.color === 'red60',
    [iconColors.red70]: !isDisabled && props.color === 'red70',
    [iconColors.red80]: !isDisabled && props.color === 'red80',
    [iconColors.red90]: !isDisabled && props.color === 'red90',
    [iconColors.red100]: !isDisabled && props.color === 'red100',
    [iconColors.yellow10]: !isDisabled && props.color === 'yellow10',
    [iconColors.yellow20]: !isDisabled && props.color === 'yellow20',
    [iconColors.yellow30]: !isDisabled && props.color === 'yellow30',
    [iconColors.yellow40]: !isDisabled && props.color === 'yellow40',
    [iconColors.yellow50]: !isDisabled && props.color === 'yellow50',
    [iconColors.yellow60]: !isDisabled && props.color === 'yellow60',
    [iconColors.yellow70]: !isDisabled && props.color === 'yellow70',
    [iconColors.yellow80]: !isDisabled && props.color === 'yellow80',
    [iconColors.yellow90]: !isDisabled && props.color === 'yellow90',
    [iconColors.yellow100]: !isDisabled && props.color === 'yellow100',
    [iconColors.green10]: !isDisabled && props.color === 'green10',
    [iconColors.green20]: !isDisabled && props.color === 'green20',
    [iconColors.green30]: !isDisabled && props.color === 'green30',
    [iconColors.green40]: !isDisabled && props.color === 'green40',
    [iconColors.green50]: !isDisabled && props.color === 'green50',
    [iconColors.green60]: !isDisabled && props.color === 'green60',
    [iconColors.green70]: !isDisabled && props.color === 'green70',
    [iconColors.green80]: !isDisabled && props.color === 'green80',
    [iconColors.green90]: !isDisabled && props.color === 'green90',
    [iconColors.green100]: !isDisabled && props.color === 'green100',
    [iconColors.purple10]: !isDisabled && props.color === 'purple10',
    [iconColors.purple20]: !isDisabled && props.color === 'purple20',
    [iconColors.purple30]: !isDisabled && props.color === 'purple30',
    [iconColors.purple40]: !isDisabled && props.color === 'purple40',
    [iconColors.purple50]: !isDisabled && props.color === 'purple50',
    [iconColors.purple60]: !isDisabled && props.color === 'purple60',
    [iconColors.purple70]: !isDisabled && props.color === 'purple70',
    [iconColors.purple80]: !isDisabled && props.color === 'purple80',
    [iconColors.purple90]: !isDisabled && props.color === 'purple90',
    [iconColors.purple100]: !isDisabled && props.color === 'purple100',
    [iconColors.blueGreen10]: !isDisabled && props.color === 'blueGreen10',
    [iconColors.blueGreen20]: !isDisabled && props.color === 'blueGreen20',
    [iconColors.blueGreen30]: !isDisabled && props.color === 'blueGreen30',
    [iconColors.blueGreen40]: !isDisabled && props.color === 'blueGreen40',
    [iconColors.blueGreen50]: !isDisabled && props.color === 'blueGreen50',
    [iconColors.blueGreen60]: !isDisabled && props.color === 'blueGreen60',
    [iconColors.blueGreen70]: !isDisabled && props.color === 'blueGreen70',
    [iconColors.blueGreen80]: !isDisabled && props.color === 'blueGreen80',
    [iconColors.blueGreen90]: !isDisabled && props.color === 'blueGreen90',
    [iconColors.blueGreen100]: !isDisabled && props.color === 'blueGreen100',
    'w-3 h-3': size === 'x-small',
    'w-4 h-4': size === 'small',
    'w-6 h-6': size === 'medium',
    'w-8 h-8': size === 'large',
    'w-10 h-10': size === 'x-large',
  });

  return <span className={classes}>{iconElements[props.name]}</span>;
};
