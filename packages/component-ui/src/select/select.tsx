import { IconName } from '@zenkigen-inc/component-icons';
import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { CSSProperties, PropsWithChildren, useRef, useState } from 'react';

import { useOutsideClick } from '../hooks/use-outside-click';
import { Icon } from '../icon';
import { SelectContext } from './select-context';
import { SelectItem } from './select-item';
import { SelectList } from './select-list';
import type { SelectOption } from './type';

type Props = {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  variant?: 'outline' | 'text';
  width?: CSSProperties['width'];
  placeholder?: string;
  placeholderIcon?: IconName;
  selectedOption?: SelectOption | null;
  optionListMaxHeight?: CSSProperties['height'];
  isDisabled?: boolean;
  onChange?: (option: SelectOption | null) => void;
};

export function Select({
  children,
  size = 'medium',
  variant = 'outline',
  width,
  placeholder,
  placeholderIcon,
  selectedOption = null,
  isDisabled = false,
  onChange,
  optionListMaxHeight,
}: PropsWithChildren<Props>) {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  useOutsideClick(targetRef, () => setIsOptionListOpen(false));

  const handleClickToggle = () => setIsOptionListOpen((prev) => !prev);

  const wrapperClasses = clsx('relative flex shrink-0 items-center gap-1 rounded', {
    'h-6': size === 'x-small' || size === 'small',
    'h-8': size === 'medium',
    'h-10': size === 'large',
    'cursor-not-allowed': isDisabled,
  });

  const buttonClasses = clsx(
    'flex h-full w-full items-center rounded',
    buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    {
      'px-2': size === 'x-small' || size === 'small',
      'px-4': size === 'medium' || size === 'large',
      'pointer-events-none': isDisabled,
    },
  );

  const labelClasses = clsx('overflow-hidden', {
    'mr-1': size === 'x-small',
    'mr-2': size !== 'x-small',
    'typography-label3regular': size === 'x-small',
    'typography-label2regular': size === 'small' || size === 'medium',
    'typography-label1regular': size === 'large',
  });

  return (
    <SelectContext.Provider
      value={{
        size,
        variant,
        placeholder,
        setIsOptionListOpen,
        selectedOption,
        onChange,
      }}
    >
      <div className={wrapperClasses} style={{ width }} ref={targetRef}>
        <button className={buttonClasses} type="button" onClick={handleClickToggle} disabled={isDisabled}>
          {selectedOption?.icon ? (
            <div className="mr-1 flex">
              <Icon name={selectedOption.icon} size={size === 'large' ? 'medium' : 'small'} />
            </div>
          ) : (
            placeholder &&
            placeholderIcon && (
              <div className="mr-1 flex">
                <Icon name={placeholderIcon} size={size === 'large' ? 'medium' : 'small'} />
              </div>
            )
          )}
          <div className={labelClasses}>
            <div className="truncate">{selectedOption ? selectedOption.label : placeholder && placeholder}</div>
          </div>
          <div className="ml-auto flex items-center">
            <Icon
              name={isOptionListOpen ? 'angle-small-up' : 'angle-small-down'}
              size={size === 'large' ? 'medium' : 'small'}
            />
          </div>
        </button>
        {isOptionListOpen && !isDisabled && <SelectList maxHeight={optionListMaxHeight}>{children}</SelectList>}
      </div>
    </SelectContext.Provider>
  );
}

Select.Option = SelectItem;
