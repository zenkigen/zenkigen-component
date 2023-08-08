import { ChangeEvent, FormEvent, useState, useEffect, useRef, forwardRef } from 'react';

import { typography } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';

import { Icon } from '../icon';

type Props = {
  size?: 'medium' | 'large';
  placeholder?: string;
  width?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onClickSearchModal?: () => void;
};

export const Search = forwardRef<HTMLDivElement, Props>(
  ({ width = '100%', size = 'medium', value: propValue, ...props }: Props, ref) => {
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

    const inputClasses = clsx('ml-3', 'h-full', 'flex-1', 'outline-0', 'placeholder:text-text-textPlaceholder', {
      [`${typography.label.label2regular}`]: size === 'medium',
      [`${typography.label.label1regular}`]: size === 'large',
    });

    const clearButtonClasses = clsx('flex', 'items-center', { 'h-4': size === 'medium' }, { 'h-8': size === 'large' });

    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClickClear = () => {
      setValue('');
    };

    useEffect(() => {
      propValue && setValue(propValue);
    }, [propValue]);

    return (
      <div className="relative" ref={ref}>
        <form onSubmit={props.onSubmit}>
          <div className={classes} style={{ width }}>
            <Icon name="search" color="icon01" size="medium" />
            <input
              type="text"
              size={1}
              value={value}
              className={inputClasses}
              placeholder={props.placeholder}
              onChange={(e) => {
                setValue(e.target.value);
                props.onChange && props.onChange(e);
              }}
              ref={inputRef}
            />
            {value && value.length !== 0 && (
              <button type="button" onClick={() => handleClickClear()} className={clearButtonClasses}>
                <Icon name="close" color="icon01" size={size === 'medium' ? 'small' : 'medium'} />
              </button>
            )}
          </div>
        </form>
      </div>
    );
  },
);
Search.displayName = 'Search';
