import { CSSProperties, useCallback, useRef, useState } from 'react';

import { IconName } from '@zenkigen-component/icons';
import { buttonColors, focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { useOutsideClick } from '../hooks/useOutsideClick';
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
  defaultOptionId?: string;
  isDisabled?: boolean;
  onChange?: (id: string, index: number, value: string) => void;
};

export function Select({
  size = 'medium',
  variant = 'outline',
  width,
  placeholder,
  placeholderIcon,
  options,
  defaultOptionId,
  isDisabled = false,
  onChange,
}: Props) {
  const [selectedOptionId, setSelectedOptionId] = useState(defaultOptionId ? defaultOptionId : null);
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  useOutsideClick(targetRef, () => setIsOptionListOpen(false));

  const selectedOption = options.find((option) => option.id === selectedOptionId);

  const handleClickToggle = () => setIsOptionListOpen((prev) => !prev);
  const handleClickItem = useCallback(
    (id: string, index: number, value: string) => {
      setSelectedOptionId(id);
      onChange?.(id, index, value);
      setIsOptionListOpen(false);
    },
    [onChange],
  );
  const handleClickDeselect = useCallback(() => {
    setSelectedOptionId(null);
    setIsOptionListOpen(false);
  }, []);

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
    'flex',
    'items-center',
    'ml-1',
    'mr-2',
    typography.label[
      size === 'x-small' ? 'label4regular' : size === 'small' || size === 'medium' ? 'label3regular' : 'label2regular'
    ],
    {
      'mr-1': size === 'small',
    },
  );

  return (
    <div className={wrapperClasses} style={{ width }} ref={targetRef}>
      <button className={buttonClasses} type="button" onClick={handleClickToggle} disabled={isDisabled}>
        {selectedOption?.icon ? (
          <Icon name={selectedOption.icon} size={size === 'large' ? 'medium' : 'small'} />
        ) : (
          placeholder && placeholderIcon && <Icon name={placeholderIcon} size={size === 'large' ? 'medium' : 'small'} />
        )}
        <span className={labelClasses}>{selectedOption ? selectedOption.label : placeholder && placeholder}</span>
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
