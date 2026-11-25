import { autoUpdate, flip, FloatingPortal, offset, size as sizeMiddleware, useFloating } from '@floating-ui/react';
import type { IconName } from '@zenkigen-inc/component-icons';
import { focusVisible, selectColors } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { AriaAttributes, CSSProperties, PropsWithChildren, RefObject } from 'react';
import { useRef, useState } from 'react';

import { useDismissOnModalOpen } from '../hooks/use-dismiss-on-modal-open';
import { useDismissOnScroll } from '../hooks/use-dismiss-on-scroll';
import { useOutsideClick } from '../hooks/use-outside-click';
import { Icon } from '../icon';
import { resolveListMaxHeight } from './resolve-list-max-height';
import { SelectContext } from './select-context';
import { SelectItem } from './select-item';
import { SelectList } from './select-list';
import type { SelectOption } from './type';

// Floating UI の定数
const FLOATING_OFFSET = 4;
/** オプションリストを画面の端からどれだけ内側に収めるか（Combobox と同じ値） */
const FLOATING_VIEWPORT_PADDING = 8;

/** オプション 1 件の高さ（select-item.tsx・select-list.tsx の h-8 / h-10 と対応） */
const OPTION_HEIGHT_PX = { 'x-small': 32, small: 32, medium: 32, large: 40 } as const;
/** 既定で表示するオプション数。末尾 0.5 個でスクロール可能であることを示す */
const DEFAULT_VISIBLE_OPTION_COUNT = 8.5;
/** リスト上端の余白（py-2 の片側 8px）と枠線（variant="outline" の上下 1px ずつ） */
const LIST_VERTICAL_CHROME_PX = 10;

/** optionListMaxHeight 未指定時の既定値（x-small / small / medium: 282px、large: 350px） */
const getDefaultOptionListMaxHeight = (size: keyof typeof OPTION_HEIGHT_PX) =>
  OPTION_HEIGHT_PX[size] * DEFAULT_VISIBLE_OPTION_COUNT + LIST_VERTICAL_CHROME_PX;

type Props = {
  /** コンポーネントのサイズ */
  size?: 'x-small' | 'small' | 'medium' | 'large';
  /** 表示スタイルのバリエーション */
  variant?: 'outline' | 'text';
  /** コンポーネントの幅 */
  width?: CSSProperties['width'];
  /** コンポーネントの最大幅 */
  maxWidth?: CSSProperties['maxWidth'];
  /** 未選択時に表示されるテキスト */
  placeholder?: string;
  /** プレースホルダー表示時のアイコン */
  placeholderIcon?: IconName;
  /** 現在選択されているオプション */
  selectedOption?: SelectOption | null;
  /**
   * オプションリストの最大高さの上限。未指定の場合はオプション 8.5 個分（x-small / small / medium: 282px、large: 350px）。
   * 画面内の空きのほうが小さいときは、空きの高さまで縮む。"none" で上限を外す（その場合も画面内には収まる）
   */
  optionListMaxHeight?: CSSProperties['height'];
  /** 無効状態の制御 */
  isDisabled?: boolean;
  /** エラー状態の制御 */
  isError?: boolean;
  /** 選択状態の見た目を適用するかどうか */
  isOptionSelected?: boolean;
  /** 「選択解除」を表示するかどうか。未指定の場合は後方互換の挙動（placeholder の有無に従う）となる */
  hasDeselectButton?: boolean;
  /** 選択変更時のコールバック関数 */
  onChange?: (option: SelectOption | null) => void;
  /** ドロップダウンリストの幅をトリガーボタンの幅に合わせる */
  matchListToTrigger?: boolean;
  /** トリガーボタンに設定する aria-label。TimePicker 等のコンポジットからラベルを付与するために使用する */
  'aria-label'?: AriaAttributes['aria-label'];
  /** トリガーボタンに設定する aria-describedby。エラーメッセージ等と関連付けるために使用する */
  'aria-describedby'?: AriaAttributes['aria-describedby'];
};

export function Select({
  children,
  size = 'medium',
  variant = 'outline',
  width,
  maxWidth,
  placeholder,
  placeholderIcon,
  selectedOption = null,
  isDisabled = false,
  isError = false,
  isOptionSelected = false,
  hasDeselectButton,
  onChange,
  optionListMaxHeight,
  matchListToTrigger = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}: PropsWithChildren<Props>) {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  // 画面内でオプションリストに使える高さ（px）。測れないときは null（高さを制限しない）
  const [availableListHeight, setAvailableListHeight] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  useOutsideClick(targetRef, () => setIsOptionListOpen(false));
  useDismissOnModalOpen(() => {
    if (isOptionListOpen) {
      setIsOptionListOpen(false);
    }
  });
  // トリガーを内側に含む領域（ページ全体・Modal の本文など）がスクロールされたら閉じる。
  // オプションリスト自身のスクロールと、トリガーを含まない無関係な領域のスクロールでは閉じない。
  // 閉じたときにフォーカスをトリガーへ戻す処理はしない（項目の選択・外側クリックなど、ほかの閉じ方と同じ）
  useDismissOnScroll(targetRef, () => setIsOptionListOpen(false), isOptionListOpen);

  // Floating UI の設定
  const { refs, floatingStyles } = useFloating({
    open: isOptionListOpen,
    onOpenChange: setIsOptionListOpen,
    placement: 'bottom-start',
    middleware: [
      offset(FLOATING_OFFSET),
      flip({ padding: FLOATING_VIEWPORT_PADDING }),
      sizeMiddleware({
        padding: FLOATING_VIEWPORT_PADDING,
        apply({ availableHeight, availableWidth, elements, rects }) {
          const referenceWidth = rects.reference.width;
          if (matchListToTrigger) {
            // トリガーボタンの幅に固定
            elements.floating.style.width = `${referenceWidth}px`;
          } else {
            // コンテンツに応じて幅が広がる（トリガーボタン幅が最小、ビューポート幅が最大）
            elements.floating.style.minWidth = `${referenceWidth}px`;
            elements.floating.style.maxWidth = `${availableWidth}px`;
          }
          // 高さは maxHeight を React の style で管理しているため、DOM を直接書き換えず state 経由で反映する。
          // （直接書き換えると、選択中のオプションへの自動スクロールが maxHeight の変化で再実行されない）
          // 同じ値なら React が再描画を省くので、autoUpdate で繰り返し呼ばれても描画は繰り返さない。
          // 0 以下（寸法を測れない・極端に狭い）は「制限なし」として扱う
          setAvailableListHeight(availableHeight > 0 ? availableHeight : null);
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const handleClickToggle = () => {
    if (!isOptionListOpen) {
      // 前回開いたときの空きの高さが、次に開いた直後の表示と 1 回目の位置計算に残らないようにする。
      // 閉じるときではなく開くときに戻すのは、閉じた後に終わった位置計算が値を書き戻すことがあるため
      setAvailableListHeight(null);
    }
    setIsOptionListOpen((prev) => !prev);
  };

  // 未指定のときのみ既定値を使う（0 を潰さないため ?? を使用する）
  const resolvedOptionListMaxHeight = optionListMaxHeight ?? getDefaultOptionListMaxHeight(size);
  // optionListMaxHeight は上限として扱い、画面内の空きのほうが小さいときは空きの高さに縮める
  const listMaxHeight = resolveListMaxHeight(resolvedOptionListMaxHeight, availableListHeight);

  const buttonVariant: 'outline' | 'text' | 'outlineError' | 'textError' =
    isError && !isDisabled ? (`${variant}Error` as 'outlineError' | 'textError') : variant;

  const isSelected = isOptionSelected && !isDisabled && selectedOption !== null && !isError;

  // 「選択解除」の表示可否。hasDeselectButton 未指定時は placeholder の有無に従うが、
  // これは hasDeselectButton 導入前の挙動を維持するための後方互換であり、表示制御には hasDeselectButton を使う
  const isDeselectVisible = hasDeselectButton ?? placeholder != null;

  const wrapperClasses = clsx('relative flex shrink-0 items-center gap-1 rounded bg-uiBackground01', {
    'h-6': size === 'x-small' || size === 'small',
    'h-8': size === 'medium',
    'h-10': size === 'large',
    'cursor-not-allowed': isDisabled,
  });

  const buttonClasses = clsx(
    'flex size-full items-center rounded',
    selectColors[buttonVariant].hover,
    selectColors[buttonVariant].active,
    selectColors[buttonVariant].disabled,
    focusVisible.normal,
    {
      [selectColors[buttonVariant].selected]: isSelected,
      [selectColors[buttonVariant].base]: !isSelected,
      'px-2': size === 'x-small' || size === 'small',
      'px-4': size === 'medium' || size === 'large',
      'pointer-events-none': isDisabled,
      'border-supportError': !isSelected && !isDisabled && isError,
    },
  );

  const labelClasses = clsx('overflow-hidden', {
    'mr-1': size === 'x-small',
    'mr-2': size !== 'x-small',
    'typography-label12regular': size === 'x-small',
    'typography-label14regular': size === 'small' || size === 'medium',
    'typography-label16regular': size === 'large',
  });

  // aria-invalid はエラー状態から内部導出し、isError のときのみ属性を出力する（他コンポーネントと同じ挙動）
  const ariaInvalidProps = isError ? { 'aria-invalid': true } : {};

  return (
    <SelectContext.Provider
      value={{
        size,
        variant,
        isDeselectVisible,
        setIsOptionListOpen,
        selectedOption,
        onChange,
        isError,
        floatingStyles,
        floatingRef: refs.floating as RefObject<HTMLUListElement | null>,
      }}
    >
      <div className={wrapperClasses} style={{ width, maxWidth }} ref={targetRef}>
        <button
          ref={refs.setReference}
          className={buttonClasses}
          type="button"
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          {...ariaInvalidProps}
          onClick={handleClickToggle}
          disabled={isDisabled}
        >
          {selectedOption?.icon ? (
            <div className="mr-1 flex">
              <Icon name={selectedOption.icon} size={size === 'large' ? 'medium' : 'small'} />
            </div>
          ) : (
            placeholder != null &&
            placeholderIcon && (
              <div className="mr-1 flex">
                <Icon name={placeholderIcon} size={size === 'large' ? 'medium' : 'small'} />
              </div>
            )
          )}
          <div className={labelClasses}>
            <div className="truncate">{selectedOption ? selectedOption.label : placeholder != null && placeholder}</div>
          </div>
          <div className="ml-auto flex items-center">
            <Icon
              name={isOptionListOpen ? 'angle-small-up' : 'angle-small-down'}
              size={size === 'large' ? 'medium' : 'small'}
            />
          </div>
        </button>
        {isOptionListOpen && !isDisabled && (
          <FloatingPortal>
            <div className="relative z-popover">
              <SelectList ref={refs.setFloating} maxHeight={listMaxHeight}>
                {children}
              </SelectList>
            </div>
          </FloatingPortal>
        )}
      </div>
    </SelectContext.Provider>
  );
}

Select.Option = SelectItem;
