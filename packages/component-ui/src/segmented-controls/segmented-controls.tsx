import type { IconName } from '@zenkigen-inc/component-icons';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import { useState } from 'react';

import { SegmentedControlItem } from './segmented-control-item';

export type SegmentedOption = { id: string; label?: string; value: string; icon?: IconName; isDisabled?: boolean };

export type SegmentedControlsProps = ComponentPropsWithoutRef<'div'> & {
  options: SegmentedOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  size?: 'small' | 'medium';
  isDisabled?: boolean;
  fullWidth?: boolean;
  variant?: 'default' | 'iconOnly';
};

export const SegmentedControls = ({
  options,
  selectedValue,
  onChange,
  size = 'medium',
  isDisabled = false,
  fullWidth = false,
  variant = 'default',
  className,
  ...props
}: SegmentedControlsProps) => {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const containerClasses = clsx(
    'inline-flex gap-1 rounded-lg bg-uiBackground02 p-1',
    { 'w-full': fullWidth },
    className,
  );

  const handleOptionClick = (value: string) => {
    if (!isDisabled) {
      onChange?.(value);
    }
  };

  const handleOptionMouseEnter = (value: string) => {
    if (!isDisabled) {
      setHoveredValue(value);
    }
  };

  const handleOptionMouseLeave = () => {
    setHoveredValue(null);
  };

  return (
    <div className={containerClasses} role="tablist" {...props}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        const isHovered = hoveredValue === option.value;
        const isOptionDisabled = isDisabled || option.isDisabled;

        return (
          <SegmentedControlItem
            key={option.id}
            label={option.label}
            value={option.value}
            icon={option.icon}
            isSelected={isSelected}
            isDisabled={isOptionDisabled}
            isHovered={isHovered}
            size={size}
            variant={variant}
            onMouseEnter={() => handleOptionMouseEnter(option.value)}
            onMouseLeave={handleOptionMouseLeave}
            onClick={handleOptionClick}
            className={fullWidth ? 'flex-1' : ''}
          />
        );
      })}
    </div>
  );
};
