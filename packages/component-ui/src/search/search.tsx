import { clsx } from 'clsx';
import { ChangeEvent, FormEvent, forwardRef } from 'react';

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
    'flex items-center rounded-full border border-uiBorder02 focus-within:border-activeInput',
    { 'h-8 px-3': size === 'medium' },
    { 'h-10 px-4': size === 'large' },
  );

  const inputClasses = clsx('mx-2.5 h-full flex-1 text-text01 outline-0 placeholder:text-textPlaceholder', {
    ['typography-label2regular']: size === 'medium',
    ['typography-label1regular']: size === 'large',
  });

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
          {props.onClickClearButton && props.value && props.value.length !== 0 && (
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
