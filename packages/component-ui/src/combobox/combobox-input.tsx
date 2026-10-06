import type { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { Children, isValidElement, useCallback, useRef } from 'react';

import { IconButton } from '../icon-button';
import { InternalTextInput } from '../text-input/text-input';
import type { ComboboxInputProps } from './combobox.types';
import { ComboboxChip } from './combobox-chip';
import { useComboboxContext } from './combobox-context';

// children を Chip とそれ以外（HelperMessage / ErrorMessage）に分ける。直接の子のみを見る（Fragment 等で包むと認識しない）。
function splitChildren(children: ReactNode) {
  const chips: ReactNode[] = [];
  const others: ReactNode[] = [];
  Children.toArray(children).forEach((child) => {
    if (isValidElement(child) && child.type === ComboboxChip) {
      chips.push(child);
    } else {
      others.push(child);
    }
  });

  return { chips, others };
}

export function ComboboxInput({
  autoFocus,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  children,
}: ComboboxInputProps) {
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
    hasOpenableContent,
    inputRef,
    setInputElementRef,
    setFrameRef,
    handleKeyDown,
    handleInputBlur,
    onClickClearButton,
    isMultiple,
    selectedValues,
    chipsRef,
  } = useComboboxContext('Combobox.Input');

  // クリアボタンは onClickClearButton が渡されたときのみ表示する（TextInput と同一仕様）。複数選択では提供しない。
  const isClearButtonVisible = !isMultiple && onClickClearButton != null && inputValue.length > 0 && !isDisabled;

  // 単一選択では Chip を描画しない（捨てる）。
  const { chips, others } = splitChildren(children);

  // 複数選択で選択がある間はプレースホルダーを出さない（チップの後ろに出さない）。判定は Chip 数ではなく value で行う。
  const isPlaceholderHidden = isMultiple && selectedValues.length > 0;

  // List に Item/Loading/Empty のいずれも無い場合 popup は描画されない (visibility hidden)。
  // 画面上の開閉状態と aria-expanded / aria-controls を一致させるため、両方の AND を「実効 open」として使う。
  const isEffectivelyOpen = isOpen && hasOpenableContent;

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const activeId = activeItem != null ? `${baseId}-option-${activeItem.value}` : null;
  const conditionalAriaProps = {
    ...(isEffectivelyOpen ? { 'aria-controls': listId } : {}),
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
    // 値のクリアは利用者ハンドラに委ねる。内部の active 系リセットは
    // inputValue が空になったことを useCombobox 側の useEffect が検知して行う。
    onClickClearButton?.();
  }, [onClickClearButton]);

  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      setInputElementRef(node);
    },
    [setInputElementRef],
  );

  // 複数選択: チップが折り返して縦に伸びた枠の余白をクリックしたら input にフォーカスする。
  // 枠 div は InternalTextInput 内にあり React のハンドラを渡せないため、frameRef で受けて native listener を付ける。
  const handleFrameMouseDown = useCallback(
    (event: globalThis.MouseEvent) => {
      const target = event.target;
      // input 自身（キャレット操作）と、ボタン（✗ / 開閉）上の操作は対象外
      if (!(target instanceof Element) || target === inputRef.current || target.closest('button') != null) {
        return;
      }
      event.preventDefault();
      inputRef.current?.focus();
    },
    [inputRef],
  );
  // HelperMessage の有無などで InternalTextInput の構造が変わると枠 div が別ノードに入れ替わるため、
  // effect ではなく callback ref でノードの変化に追従する。React 18 も対象のため ref callback の cleanup は使わず、
  // listener を付けたノードを保持して自前で外す（unmount 時は null が来て外れる。isMultiple の変化では ref が作り直されて付け直す）。
  const listeningFrameRef = useRef<{ node: HTMLDivElement; listener: (event: globalThis.MouseEvent) => void } | null>(
    null,
  );
  const handleFrameRef = useCallback(
    (node: HTMLDivElement | null) => {
      setFrameRef(node);
      const listening = listeningFrameRef.current;
      if (listening !== null) {
        listening.node.removeEventListener('mousedown', listening.listener);
        listeningFrameRef.current = null;
      }
      if (isMultiple && node !== null) {
        node.addEventListener('mousedown', handleFrameMouseDown);
        listeningFrameRef.current = { node, listener: handleFrameMouseDown };
      }
    },
    [setFrameRef, isMultiple, handleFrameMouseDown],
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
      frameRef={handleFrameRef}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      size={size}
      variant={variant}
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onBlur={handleInputBlur}
      isError={isError}
      disabled={isDisabled}
      {...(isPlaceholderHidden ? {} : { placeholder })}
      role="combobox"
      aria-expanded={isEffectivelyOpen}
      aria-autocomplete="list"
      {...conditionalAriaProps}
      autoFocus={autoFocus}
      autoComplete="off"
      // 複数選択では件数に関係なく常に before を渡す。before の有無で DOM 構造が変わると、
      // 0↔1 件の遷移で input が再マウントされフォーカスが外れるため（構造の切り替えはモードのみで行う）。
      {...(isMultiple
        ? {
            before: (
              <div ref={chipsRef} className="contents">
                {chips}
              </div>
            ),
          }
        : {})}
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
            isDisabled={isDisabled || !hasOpenableContent}
          />
        </>
      }
    >
      {others}
    </InternalTextInput>
  );
}
