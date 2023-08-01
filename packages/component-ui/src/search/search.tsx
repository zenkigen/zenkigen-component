import { ChangeEvent, FormEvent, forwardRef } from 'react';

import { typography } from '@zenkigen-inc/component-theme';

import { Icon } from '../icon';

type Props = {
  placeholder?: string;
  width?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onClickSearchModal?: () => void;
};

export const Search = forwardRef<HTMLDivElement, Props>(({ width = '100%', value = '', ...props }: Props, ref) => (
  <div className="relative" ref={ref}>
    <form onSubmit={props.onSubmit}>
      <div
        className="flex h-8 items-center rounded-full border border-border-uiBorder02 px-3 focus-within:border-active-activeInput"
        style={{ width }}
      >
        <Icon name="search" color="icon01" size="small" />
        <input
          type="text"
          size={1}
          value={value}
          className={`${typography.label.label2regular} ml-3 h-full flex-1 outline-0 placeholder:text-text-textPlaceholder`}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </div>
    </form>
  </div>
));
Search.displayName = 'Search';
