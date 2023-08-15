import { ChangeEvent, FormEvent, forwardRef } from 'react';

import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';

type Props = {
  size?: 'medium' | 'large';
  placeholder?: string;
  width?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onClickClearButton?: () => void;
};

export const Search = forwardRef<HTMLDivElement, Props>(({ width = '100%', size = 'medium', ...props }: Props, ref) => {
  const classes = clsx(
    'flex',
    'items-center',
    'rounded-full',
    'border',
    'border-border-uiBorder02',
    'focus-within:border-active-activeInput',
    { 'h-8 px-3': size === 'medium' },
    { 'h-10 px-4': size === 'large' },
  );

  const inputClasses = clsx(
    'ml-2.5',
    'mr-2.5',
    'h-full',
    'flex-1',
    'outline-0',
    'text-text-text01',
    'placeholder:text-text-textPlaceholder',
    {
      [`${typography.label.label2regular}`]: size === 'medium',
      [`${typography.label.label1regular}`]: size === 'large',
    },
  );

  return (
    <div className="relative" ref={ref}>
      <form onSubmit={props.onSubmit}>
        <div className={classes} style={{ width }}>
          <Icon name="search" color="icon01" size="medium" />
          <input
            type="text"
            size={1}
            value={props.value}
            className={inputClasses}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
          {props.value && props.value.length !== 0 && (
            <IconButton
              variant="text"
              icon="close"
              size={size === 'medium' ? 'small' : 'medium'}
              isNoPadding
              onClick={props.onClickClearButton}
            />
          )}
        </div>
      </form>
    </div>
  );
});
Search.displayName = 'Search';
