import { forwardRef, useState } from 'react';

import { typography } from '@zenkigen-component/theme';
import { clsx } from 'clsx';

import { Icon } from '../icon';

type Props = {
  placeholder?: string;
  width?: string;
  onSubmit: (name: string) => void;
  onClickSearchModal?: () => void;
};

export const Search = forwardRef<HTMLDivElement, Props>(({ width = '100%', ...props }: Props, ref) => {
  const [text, setText] = useState('');
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(text);
  };

  const wrapperClasses = clsx('relative');
  const searchAreaClasses = clsx(
    'flex',
    'items-center',
    'h-8',
    'px-3',
    'rounded-full',
    'border',
    'border-border-uiBorder02',
    'focus-within:border-active-activeInput',
  );
  const searchInputClasses = clsx(
    typography.label.label2regular,
    'placeholder:text-text-textPlaceholder',
    'ml-3',
    'outline-0',
    'flex-1',
    'h-full',
  );

  return (
    <div className={wrapperClasses} ref={ref}>
      <form onSubmit={handleOnSubmit}>
        <div className={searchAreaClasses} style={{ width }}>
          <Icon name="search" color="icon01" size="small" />
          <input
            type="text"
            size={1}
            className={searchInputClasses}
            placeholder={props.placeholder}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
});
Search.displayName = 'Search';
