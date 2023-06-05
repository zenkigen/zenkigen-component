import { CSSProperties, useCallback, useRef, useState } from 'react';

import { IconName } from '@zenkigen-component/icons';
import { buttonColors, focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { useOutsideClick } from '../hooks/use-outside-click';
import { Icon } from '../icon';

import { SelectList } from './select-list';
import type { SelectOption } from './type';

type Props = {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  variant?: 'outline' | 'text';
  width?: CSSProperties['width'];
  placeholder?: string;
  placeholderIcon?: IconName;
  options: SelectOption[];
  selectedOptionId?: string | null;
  isDisabled?: boolean;
  onChange?: (id: string | null, index: number | null, value: string | null) => void;
};

export function Select({
  size = 'medium',
  variant = 'outline',
  width,
  placeholder,
  placeholderIcon,
  options,
  selectedOptionId = null,
  isDisabled = false,
  onChange,
}: Props) {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  useOutsideClick(targetRef, () => setIsOptionListOpen(false));

  const selectedOption = options.find((option) => option.id === selectedOptionId);

  const handleClickToggle = () => setIsOptionListOpen((prev) => !prev);
  const handleClickItem = useCallback(
    (id: string, index: number, value: string) => {
      onChange?.(id, index, value);
      setIsOptionListOpen(false);
    },
    [onChange],
  );
  const handleClickDeselect = useCallback(() => {
    onChange?.(null, null, null);
    setIsOptionListOpen(false);
  }, [onChange]);

  const wrapperClasses = clsx(
    'relative',
    'flex',
    'shrink-0',
    'gap-1',
    'items-center',
    'rounded',
    'bg-background-uiBackground01',
    {
      'h-6': size === 'x-small' || size === 'small',
      'h-8': size === 'medium',
      'h-10': size === 'large',
      'cursor-not-allowed': isDisabled,
    },
  );

  const buttonClasses = clsx(
    'flex',
    'items-center',
    'w-full',
    'h-full',
    'rounded',
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

  const labelClasses = clsx(
    'overflow-hidden',
    size === 'x-small' ? 'mr-1' : 'mr-2',
    typography.label[
      size === 'x-small' ? 'label3regular' : size === 'small' || size === 'medium' ? 'label2regular' : 'label1regular'
    ],
  );

  return (
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
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            {selectedOption ? selectedOption.label : placeholder && placeholder}
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <Icon name={isOptionListOpen ? 'angle-small-up' : 'angle-small-down'} size="small" />
        </div>
      </button>
      {isOptionListOpen && !isDisabled && (
        <SelectList
          size={size}
          variant={variant}
          options={options}
          placeholder={placeholder}
          selectedOptionId={selectedOptionId}
          onClickItem={handleClickItem}
          onClickDeselect={handleClickDeselect}
        />
      )}
    </div>
  );
}
