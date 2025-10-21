import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import React, { Children, useRef } from 'react';

import { useRovingFocus } from '../hooks/use-roving-focus';
import type { SegmentedControlContextValue } from './segmented-control-context';
import { SegmentedControlContext } from './segmented-control-context';
import { SegmentedControlItem } from './segmented-control-item';

export type SegmentedControlProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'className'> & {
  children: ReactNode;
  value?: string;
  size?: 'small' | 'medium';
  'aria-label': string;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
};

export const SegmentedControl = ({
  children,
  value,
  onChange,
  size = 'medium',
  isDisabled = false,
  'aria-label': ariaLabel,
  ...rest
}: SegmentedControlProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 子要素からidのリストを抽出（isDisabled: trueの要素は除外）
  const itemIds = Children.toArray(children)
    .filter((child): child is React.ReactElement<{ value: string; isDisabled?: boolean }> => {
      if (
        !React.isValidElement(child) ||
        typeof child.props !== 'object' ||
        child.props === null ||
        !('value' in child.props)
      ) {
        return false;
      }
      const props = child.props as { value: string; isDisabled?: boolean };

      return props.isDisabled !== true;
    })
    .map((child) => child.props.value);

  const childrenCount = Children.count(children);
  const containerStyle = { gridTemplateColumns: `repeat(${childrenCount}, minmax(0,1fr))` };

  const {
    focusedValue,
    handleFocusChange,
    handleKeyDown,
    handleBlur: handleBlurRovingFocus,
  } = useRovingFocus({
    values: itemIds,
    isDisabled,
  });

  const handleFocusAndChange = (newValue: string) => {
    handleFocusChange(newValue);
    if (!isDisabled && typeof onChange === 'function' && newValue !== value) {
      onChange(newValue);
    }
  };

  const contextValue: SegmentedControlContextValue = {
    value,
    onChange,
    size,
    isDisabled,
    focusedValue,
    onFocusChange: handleFocusAndChange,
    onBlur: handleBlurRovingFocus,
    values: itemIds,
  };

  return (
    <>
      <SegmentedControlContext.Provider value={contextValue}>
        <div
          ref={containerRef}
          className="grid gap-1 rounded-lg bg-uiBackground02 p-1"
          style={containerStyle}
          role="tablist"
          aria-label={ariaLabel}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          {children}
        </div>
      </SegmentedControlContext.Provider>
    </>
  );
};

SegmentedControl.Item = SegmentedControlItem;
