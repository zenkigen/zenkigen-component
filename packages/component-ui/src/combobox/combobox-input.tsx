import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback } from 'react';

import { IconButton } from '../icon-button';
import { InternalTextInput } from '../text-input/text-input';
import type { ComboboxInputProps } from './combobox.types';
import { useComboboxContext } from './combobox-context';

export function ComboboxInput({ autoFocus, children }: ComboboxInputProps) {
  const {
    baseId,
    listId,
    size,
    variant,
    isError,
    isDisabled,
    placeholder,
    inputValue,
    onInputChange,
    isOpen,
    setIsOpen,
    activeIndex,
    items,
    inputRef,
    setInputElementRef,
    handleKeyDown,
    clearValue,
  } = useComboboxContext('Combobox.Input');

  const isClearButtonVisible = inputValue.length > 0 && !isDisabled;

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const activeId = activeItem != null ? `${baseId}-option-${activeItem.value}` : null;
  const conditionalAriaProps = {
    ...(isOpen ? { 'aria-controls': listId } : {}),
    ...(activeId !== null ? { 'aria-activedescendant': activeId } : {}),
  };

  const preventBlur = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    // input フォーカスを失わないため preventDefault
    event.preventDefault();
  }, []);

  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
    inputRef.current?.focus();
  }, [isOpen, setIsOpen, inputRef]);

  const handleClear = useCallback(() => {
    clearValue();
  }, [clearValue]);

  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      setInputElementRef(node);
    },
    [setInputElementRef],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onInputChange(event.target.value);
      if (!isOpen) {
        setIsOpen(true);
      }
    },
    [onInputChange, isOpen, setIsOpen],
  );

  return (
    <InternalTextInput
      ref={setRef}
      size={size}
      variant={variant}
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      isError={isError}
      disabled={isDisabled}
      placeholder={placeholder}
      role="combobox"
      aria-expanded={isOpen}
      aria-autocomplete="list"
      {...conditionalAriaProps}
      autoFocus={autoFocus}
      autoComplete="off"
      after={
        <>
          {isClearButtonVisible && (
            <IconButton
              variant="text"
              icon="close"
              size="small"
              onClick={handleClear}
              onMouseDown={preventBlur}
              aria-label="入力をクリア"
              tabIndex={-1}
            />
          )}
          <IconButton
            variant="text"
            icon={isOpen ? 'angle-up' : 'angle-down'}
            size="small"
            onClick={handleToggle}
            onMouseDown={preventBlur}
            aria-label={isOpen ? '候補を閉じる' : '候補を表示'}
            tabIndex={-1}
            isDisabled={isDisabled}
          />
        </>
      }
    >
      {children}
    </InternalTextInput>
  );
}
