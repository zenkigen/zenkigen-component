import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Popover } from '../popover';
import { Combobox } from './combobox';
import type { ComboboxInputProps, ComboboxMultipleChangeMeta, ComboboxProps } from './combobox.types';

/**
 * Combobox テスト
 *
 * テストの構成：
 * - 基本レンダリング: Input / List / Item の描画
 * - open / close: focus / Escape / outside click
 * - 選択動作: クリック、Enter で onChange が呼ばれる
 * - キーボード操作: ArrowUp/Down/Enter/Escape/Alt
 * - IME 変換中のキー操作: ArrowUp/Down/Enter/Escape を Combobox では扱わない
 * - activeIndex 初期化: selectedValue 優先 / 先頭 enabled / close → 再 open
 * - items 更新時の active 維持: 並び替え / フィルタ絞り込み / フィルタで消えた場合
 * - 選択済み視覚強調 (isSelected の DOM 伝搬)
 * - Combobox.Item の children: 見た目のみ。選択値・input 表示は label、accessible name は children のテキスト
 * - scrollIntoView / inputMode: keyboard のみで scroll、mouse では抑止、reopen で keyboard に戻る
 * - scrollTop リセット: open 直後に 0
 * - isError / isDisabled: 視覚 / 操作抑止
 * - multiple: 追加 / toggle 削除 / Backspace / revert / aria-multiselectable / aria-live / 型
 * - Combobox.Chip: 描画 / 長いラベルの省略 / ✗ での削除（マウス・キーボード）/ 外せないチップ / フォーカス維持 / blur・Escape / disabled
 * - Combobox.Input の id / aria-label / aria-labelledby
 *
 * 注意: popup は常時 DOM にあり visibility で制御するため、Testing Library の
 * `getByRole` にはデフォルトで hidden な要素が除外される。`{ hidden: true }` を渡す。
 */

type Fruit = { value: string; label: string };

const defaultFruits: Fruit[] = [
  { value: 'apple', label: 'りんご' },
  { value: 'orange', label: 'みかん' },
  { value: 'peach', label: 'もも' },
  { value: 'melon', label: 'メロン' },
];

/**
 * Controlled な Combobox をラップするテスト用コンポーネント。
 * value / inputValue は独立させる (input 削除で value を保持する挙動を再現)。
 */
function ControlledCombobox({
  items: externalItems,
  initialValue = null,
  initialInputValue = '',
  filterItems,
  isError,
  isDisabled,
  listMaxHeight,
  extraChildren,
  onSelectionChange,
  onOpenChange,
  onInputValueChange,
  enableClearButton,
  onClearButtonClick,
}: {
  items?: Fruit[];
  initialValue?: string | null;
  initialInputValue?: string;
  filterItems?: (inputValue: string, items: Fruit[]) => Fruit[];
  isError?: boolean;
  isDisabled?: boolean;
  listMaxHeight?: string | number;
  extraChildren?: ReactNode;
  onSelectionChange?: (value: string | null) => void;
  onOpenChange?: (isOpen: boolean) => void;
  onInputValueChange?: (inputValue: string) => void;
  enableClearButton?: boolean;
  onClearButtonClick?: () => void;
}) {
  const [value, setValue] = useState<string | null>(initialValue);
  const [inputValue, setInputValue] = useState(initialInputValue);
  const items = externalItems ?? defaultFruits;

  const visibleItems = useMemo(() => {
    if (filterItems != null) {
      return filterItems(inputValue, items);
    }

    return items;
  }, [filterItems, inputValue, items]);

  // クリアの値リセットは利用者責務（onChange(null, null) / onInputChange('')）。
  const clearButtonProps =
    enableClearButton === true
      ? {
          onClickClearButton: () => {
            setValue(null);
            setInputValue('');
            onClearButtonClick?.();
          },
        }
      : {};

  return (
    <Combobox
      value={value}
      onChange={(next, meta) => {
        setValue(next);
        setInputValue(meta?.label ?? '');
        onSelectionChange?.(next);
      }}
      inputValue={inputValue}
      onInputChange={(next) => {
        setInputValue(next);
        onInputValueChange?.(next);
      }}
      {...clearButtonProps}
      onOpenChange={onOpenChange}
      isError={isError}
      isDisabled={isDisabled}
      listMaxHeight={listMaxHeight}
    >
      <Combobox.Input />
      <Combobox.List>
        {visibleItems.map((opt) => (
          <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
        ))}
        {extraChildren}
      </Combobox.List>
    </Combobox>
  );
}

/**
 * 複数選択モードの Controlled Combobox。候補は選択済みも含めて全件表示する（toggle 削除の検証用）。
 */
function ControlledMultipleCombobox({
  initialValue = [],
  initialInputValue = '',
  isDisabled,
  onChange,
  onOpenChange,
  onInputValueChange,
}: {
  initialValue?: string[];
  initialInputValue?: string;
  isDisabled?: boolean;
  onChange?: (value: string[], meta: ComboboxMultipleChangeMeta) => void;
  onOpenChange?: (isOpen: boolean) => void;
  onInputValueChange?: (inputValue: string) => void;
}) {
  const [value, setValue] = useState<string[]>(initialValue);
  const [inputValue, setInputValue] = useState(initialInputValue);

  return (
    <Combobox
      isMultiple
      value={value}
      onChange={(next, meta) => {
        setValue(next);
        onChange?.(next, meta);
      }}
      inputValue={inputValue}
      onInputChange={(next) => {
        setInputValue(next);
        onInputValueChange?.(next);
      }}
      onOpenChange={onOpenChange}
      isDisabled={isDisabled}
    >
      <Combobox.Input />
      <Combobox.List>
        {defaultFruits.map((opt) => (
          <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
        ))}
      </Combobox.List>
    </Combobox>
  );
}

/**
 * 複数選択モードで Combobox.Chip を value の順に描画する Controlled Combobox。
 * - fixedValues: isRemovable={false} にする値
 * - chipLabels: Chip の label を Item の label から差し替える（aria-live の label の出所の検証用）
 * - chipValues: Chip を描画する値（未指定時は value と同じ。value に無い値の Chip の検証用）
 */
function MultipleComboboxWithChips({
  initialValue = [],
  fixedValues = [],
  chipLabels = {},
  chipValues,
  isDisabled,
  isError,
  placeholder,
  inputChildren,
  onChange,
  onOpenChange,
  onInputValueChange,
}: {
  initialValue?: string[];
  fixedValues?: string[];
  chipLabels?: Record<string, string>;
  chipValues?: string[];
  isDisabled?: boolean;
  isError?: boolean;
  placeholder?: string;
  inputChildren?: ReactNode;
  onChange?: (value: string[], meta: ComboboxMultipleChangeMeta) => void;
  onOpenChange?: (isOpen: boolean) => void;
  onInputValueChange?: (inputValue: string) => void;
}) {
  const [value, setValue] = useState<string[]>(initialValue);
  const [inputValue, setInputValue] = useState('');
  const labelOf = (target: string) =>
    chipLabels[target] ?? defaultFruits.find((fruit) => fruit.value === target)?.label ?? target;

  return (
    <Combobox
      isMultiple
      value={value}
      onChange={(next, meta) => {
        setValue(next);
        onChange?.(next, meta);
      }}
      inputValue={inputValue}
      onInputChange={(next) => {
        setInputValue(next);
        onInputValueChange?.(next);
      }}
      onOpenChange={onOpenChange}
      isDisabled={isDisabled}
      isError={isError}
      placeholder={placeholder}
    >
      <Combobox.Input aria-label="果物">
        {(chipValues ?? value).map((chipValue) => (
          <Combobox.Chip
            key={chipValue}
            value={chipValue}
            label={labelOf(chipValue)}
            isRemovable={!fixedValues.includes(chipValue)}
          />
        ))}
        {inputChildren}
      </Combobox.Input>
      <Combobox.List>
        {defaultFruits.map((opt) => (
          <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
        ))}
      </Combobox.List>
    </Combobox>
  );
}

const getCombobox = () => screen.getByRole('combobox') as HTMLInputElement;
const getListbox = () => screen.getByRole('listbox', { hidden: true });
const getOption = (name: string | RegExp) => screen.getByRole('option', { name, hidden: true });
const queryOptions = () => screen.queryAllByRole('option', { hidden: true });
const getDeleteButton = (label: string) => screen.getByRole('button', { name: `${label}を削除` });
const queryDeleteButton = (label: string) => screen.queryByRole('button', { name: `${label}を削除` });

beforeEach(() => {
  // scrollIntoView は jsdom で未実装。spy で検証するため vitest mock を差す
  Element.prototype.scrollIntoView = vi.fn();

  // jsdom では getBoundingClientRect が常に 0 を返すため、Floating UI の availableHeight が
  // 負値になり listMaxHeight 等のテストが安定しない。要素別に意味のある rect を返す mock を入れる:
  // - documentElement / body: viewport サイズ (clipping boundary 用)
  // - その他: input の参照位置 (reference / floating 寸法用)
  const viewportRect = {
    width: 1024,
    height: 768,
    top: 0,
    left: 0,
    right: 1024,
    bottom: 768,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect;
  const referenceRect = {
    width: 200,
    height: 32,
    top: 100,
    left: 0,
    right: 200,
    bottom: 132,
    x: 0,
    y: 100,
    toJSON: () => ({}),
  } as DOMRect;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mocked(this: Element) {
    if (this === document.documentElement || this === document.body) {
      return viewportRect;
    }

    return referenceRect;
  });

  // Floating UI の clipping boundary 計算は document.documentElement.clientHeight / clientWidth を
  // 参照する。jsdom はデフォルトで 0 を返すため明示的に viewport サイズを設定する。
  Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 768 });
  Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1024 });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Combobox', () => {
  describe('基本レンダリング', () => {
    it('role=combobox の input と role=listbox の ul が描画される', () => {
      render(<ControlledCombobox />);
      expect(getCombobox().tagName).toBe('INPUT');
      // popup は closed 時でも DOM に存在するが visibility:hidden
      const listbox = getListbox();
      expect(listbox.tagName).toBe('UL');
      expect(listbox).toHaveStyle({ visibility: 'hidden' });
    });

    it('aria 属性が正しく付与される (aria-expanded / aria-autocomplete / aria-controls)', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);
      const input = getCombobox();

      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');

      await user.click(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(input).toHaveAttribute('aria-controls', expect.any(String));
    });

    it('Combobox.Item ごとに role=option が 1 つ描画される', () => {
      render(<ControlledCombobox />);
      expect(queryOptions()).toHaveLength(defaultFruits.length);
    });
  });

  describe('open / close', () => {
    it('input focus で open し、visibility が visible になる', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);
      await user.click(getCombobox());
      expect(getListbox()).toHaveStyle({ visibility: 'visible' });
    });

    it('Escape で close する', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);
      await user.click(getCombobox());
      await user.keyboard('{Escape}');
      expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
    });

    it('open 中の Escape は親要素に伝搬しない（Popover/Modal の二重 close 防止）', async () => {
      const user = userEvent.setup();
      const handleParentEscape = vi.fn();
      render(
        <div onKeyDown={(e) => e.key === 'Escape' && handleParentEscape()}>
          <ControlledCombobox />
        </div>,
      );
      await user.click(getCombobox());
      await user.keyboard('{Escape}');
      expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
      expect(handleParentEscape).not.toHaveBeenCalled();
    });

    it('close 中の Escape は親要素に伝搬する（Popover/Modal を閉じられるように）', async () => {
      const user = userEvent.setup();
      const handleParentEscape = vi.fn();
      render(
        <div onKeyDown={(e) => e.key === 'Escape' && handleParentEscape()}>
          <ControlledCombobox />
        </div>,
      );
      // focus したあと Escape で List を閉じ、もう一度 Escape を押すと親に伝搬する
      await user.click(getCombobox());
      await user.keyboard('{Escape}');
      await user.keyboard('{Escape}');
      expect(handleParentEscape).toHaveBeenCalledTimes(1);
    });

    it('候補外 click で close する', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <ControlledCombobox />
          <button type="button">outside</button>
        </div>,
      );
      await user.click(getCombobox());
      expect(getListbox()).toHaveStyle({ visibility: 'visible' });

      await user.click(screen.getByRole('button', { name: 'outside' }));
      expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
    });

    // これは「複数 Combobox を並べて他方のトグルを押すと先に開いた側が閉じる」という
    // ユーザー観点の正常系シナリオの確認。
    // useOutsideClick の `isConnected` 早期 return 廃止に伴う回帰
    //（再レンダリングで target が detach されたときの内側/外側判定）の本質的なガードは
    // `hooks/use-outside-click.test.tsx` のフック単体テストが担う。
    // jsdom + userEvent の同期ディスパッチでは svg の detach が再現されないため、
    // この統合テスト単体ではバグの再現はできない点に注意。
    it('別の Combobox のトグルを押すと、先に開いていた Combobox が閉じる', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <ControlledCombobox />
          <ControlledCombobox />
        </div>,
      );
      const inputs = screen.getAllByRole('combobox') as HTMLInputElement[];
      const listboxes = screen.getAllByRole('listbox', { hidden: true });
      const toggles = screen.getAllByRole('button', { name: '候補を表示' });

      await user.click(toggles[0]!);
      expect(inputs[0]).toHaveAttribute('aria-expanded', 'true');
      expect(listboxes[0]).toHaveStyle({ visibility: 'visible' });

      await user.click(toggles[1]!);
      expect(inputs[0]).toHaveAttribute('aria-expanded', 'false');
      expect(listboxes[0]).toHaveStyle({ visibility: 'hidden' });
      expect(inputs[1]).toHaveAttribute('aria-expanded', 'true');
      expect(listboxes[1]).toHaveStyle({ visibility: 'visible' });
    });

    // useOutsideClick の `isConnected` 早期 return を廃止したことで最も再発を警戒すべきは、
    // 「自身のトグル押下時に icon の svg が再レンダリングで detach され、誤って外部クリック扱いになり
    // 開いた直後に閉じてしまう」回帰（過去に PR #543 で `isConnected` を入れて直したバグ）。
    // composedPath による内側判定でこれが防がれていることを結合レベルで担保する。
    // （フック単体の本質的ガードは `hooks/use-outside-click.test.tsx` 側）
    it('自身のトグルを押すと開閉が交互に切り替わり、開いた直後に即閉じしない', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);
      const input = getCombobox();

      // 1回目: トグルで open し、外部クリック誤検出で即閉じしないこと
      await user.click(screen.getByRole('button', { name: '候補を表示' }));
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(getListbox()).toHaveStyle({ visibility: 'visible' });

      // 2回目: トグルで close すること
      await user.click(screen.getByRole('button', { name: '候補を閉じる' }));
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(getListbox()).toHaveStyle({ visibility: 'hidden' });

      // 3回目: 再度トグルで open でき、繰り返しトグル可能なこと
      await user.click(screen.getByRole('button', { name: '候補を表示' }));
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(getListbox()).toHaveStyle({ visibility: 'visible' });
    });
  });

  describe('選択動作', () => {
    it('option クリックで input に label が入り、popup が閉じる', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      render(<ControlledCombobox onSelectionChange={onSelectionChange} />);

      await user.click(getCombobox());
      await user.click(getOption('みかん'));

      expect(getCombobox()).toHaveValue('みかん');
      expect(onSelectionChange).toHaveBeenCalledWith('orange');
      expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
    });

    it('option 選択時に onOpenChange(false) が二重発火しない', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(<ControlledCombobox onOpenChange={onOpenChange} />);

      await user.click(getCombobox());
      onOpenChange.mockClear();

      await user.click(getOption('みかん'));

      // 候補リストは FloatingPortal 経由で描画されるため、option クリックを「外部クリック」と
      // 誤判定すると onClick 経由と outside-click で onOpenChange(false) が二重に飛ぶ。1 回だけを保証する。
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('Enter で active の項目が選択される', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      render(<ControlledCombobox onSelectionChange={onSelectionChange} />);

      await user.click(getCombobox());
      // 先頭 (りんご) が active。ArrowDown で 2 番目 (みかん) へ
      await user.keyboard('{ArrowDown}{Enter}');

      expect(onSelectionChange).toHaveBeenLastCalledWith('orange');
      expect(getCombobox()).toHaveValue('みかん');
    });

    it('IME 変換確定の Enter（isComposing）では選択されない', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      render(<ControlledCombobox onSelectionChange={onSelectionChange} />);

      await user.click(getCombobox());
      const input = getCombobox();
      // 日本語入力の変換確定 Enter は keydown 時点で isComposing=true。
      // これを選択として扱うと「(候補ラベル)(入力中の文字)」の二重入力になるため無視する。
      fireEvent.keyDown(input, { key: 'Enter', isComposing: true });

      expect(onSelectionChange).not.toHaveBeenCalled();
      expect(getCombobox()).toHaveValue('');
      // 候補リストも開いたままであること
      expect(getListbox()).toHaveStyle({ visibility: 'visible' });
    });

    it('isDisabled な Item はクリックしても選択されない', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      function DisabledItemCombobox() {
        const [value, setValue] = useState<string | null>(null);
        const [inputValue, setInputValue] = useState('');

        return (
          <Combobox
            value={value}
            onChange={(next, meta) => {
              setValue(next);
              setInputValue(meta?.label ?? '');
              onSelectionChange(next);
            }}
            inputValue={inputValue}
            onInputChange={setInputValue}
          >
            <Combobox.Input />
            <Combobox.List>
              <Combobox.Item value="a" label="A" />
              <Combobox.Item value="b" label="B (disabled)" isDisabled />
            </Combobox.List>
          </Combobox>
        );
      }

      render(<DisabledItemCombobox />);
      await user.click(getCombobox());
      await user.click(getOption('B (disabled)'));
      expect(onSelectionChange).not.toHaveBeenCalled();
    });
  });

  describe('未確定入力の取り消し (revert)', () => {
    const filterByInclude = (input: string, items: Fruit[]) => items.filter((i) => i.label.includes(input));

    it('未確定入力のまま外側をクリックすると選択値のラベルへ戻る', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <ControlledCombobox filterItems={filterByInclude} />
          <button type="button">outside</button>
        </div>,
      );
      const input = getCombobox();

      await user.click(input);
      await user.click(getOption('りんご'));
      expect(input).toHaveValue('りんご');

      await user.click(input);
      await user.clear(input);
      await user.type(input, 'にんじん');
      expect(input).toHaveValue('にんじん');

      await user.click(screen.getByRole('button', { name: 'outside' }));
      // 候補から確定していない入力は破棄され、選択値 (apple=りんご) の表示へ戻る
      expect(input).toHaveValue('りんご');
    });

    it('未選択のまま入力して外側をクリックすると空に戻る', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <ControlledCombobox filterItems={filterByInclude} />
          <button type="button">outside</button>
        </div>,
      );
      const input = getCombobox();

      await user.click(input);
      await user.type(input, 'にんじん');
      expect(input).toHaveValue('にんじん');

      await user.click(screen.getByRole('button', { name: 'outside' }));
      // value=null（未選択）なので空に戻る
      expect(input).toHaveValue('');
    });

    it('未確定入力のまま Escape すると選択値のラベルへ戻る', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox filterItems={filterByInclude} />);
      const input = getCombobox();

      await user.click(input);
      await user.click(getOption('りんご'));
      await user.click(input);
      await user.clear(input);
      await user.type(input, 'にん');
      expect(input).toHaveValue('にん');

      await user.keyboard('{Escape}');
      expect(input).toHaveValue('りんご');
    });

    it('候補トグルボタン押下ではフォーカスが維持され revert されない', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox filterItems={filterByInclude} />);
      const input = getCombobox();

      await user.click(input);
      await user.type(input, 'り'); // 「りんご」が候補に残る（未確定）
      expect(input).toHaveValue('り');

      await user.click(screen.getByRole('button', { name: '候補を閉じる' }));
      // toggle は preventBlur でフォーカスを奪わないため revert されない
      expect(input).toHaveValue('り');
    });

    it('外側クリックで close する際 onOpenChange(false) は 1 回だけ', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(
        <div>
          <ControlledCombobox onOpenChange={onOpenChange} />
          <button type="button">outside</button>
        </div>,
      );

      await user.click(getCombobox());
      onOpenChange.mockClear();

      await user.click(screen.getByRole('button', { name: 'outside' }));
      // blur と outside-click が両方走っても idempotent な setIsOpen で 1 回だけ
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('relatedTarget=null の blur でも revert される', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox filterItems={filterByInclude} />);
      const input = getCombobox();

      await user.click(input);
      await user.click(getOption('りんご'));
      await user.click(input);
      await user.clear(input);
      await user.type(input, 'にん');

      fireEvent.blur(input, { relatedTarget: null });
      expect(input).toHaveValue('りんご');
    });
  });

  describe('キーボード操作', () => {
    it('ArrowDown で次の enabled item が active になる', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);
      await user.click(getCombobox());
      await user.keyboard('{ArrowDown}');

      const activeId = getCombobox().getAttribute('aria-activedescendant');
      expect(activeId).toContain('orange');
    });

    it('ArrowUp で前の enabled item が active になる (先頭では末尾へループ)', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);
      await user.click(getCombobox());
      // 初期は先頭 apple → ArrowUp で末尾 melon
      await user.keyboard('{ArrowUp}');

      const activeId = getCombobox().getAttribute('aria-activedescendant');
      expect(activeId).toContain('melon');
    });

    it('Alt+ArrowDown で明示的に open、Alt+ArrowUp で close', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);
      const input = getCombobox();
      act(() => {
        input.focus();
      });
      // focus で open してしまうので、一旦 Escape で閉じる
      await user.keyboard('{Escape}');
      expect(getListbox()).toHaveStyle({ visibility: 'hidden' });

      await user.keyboard('{Alt>}{ArrowDown}{/Alt}');
      expect(getListbox()).toHaveStyle({ visibility: 'visible' });

      await user.keyboard('{Alt>}{ArrowUp}{/Alt}');
      expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
    });
  });

  describe('IME 変換中のキー操作', () => {
    // 日本語入力の変換中は keydown 時点で isComposing=true（一部環境では keyCode=229 のみ）。
    // ↑↓ は変換候補の移動、Enter は確定、Escape は変換の取り消しに使われるため Combobox では扱わない。
    const composingCases = [
      { name: 'isComposing=true', init: { isComposing: true } },
      { name: 'keyCode=229', init: { keyCode: 229 } },
    ];

    describe.each(composingCases)('$name', ({ init }) => {
      it('ArrowDown / ArrowUp で active が動かない', async () => {
        const user = userEvent.setup();
        render(<ControlledCombobox />);
        await user.click(getCombobox());
        const input = getCombobox();
        const initialActiveId = input.getAttribute('aria-activedescendant');
        expect(initialActiveId).toContain('apple');

        fireEvent.keyDown(input, { key: 'ArrowDown', ...init });
        expect(input).toHaveAttribute('aria-activedescendant', initialActiveId);

        fireEvent.keyDown(input, { key: 'ArrowUp', ...init });
        expect(input).toHaveAttribute('aria-activedescendant', initialActiveId);
      });

      it('ArrowDown / ArrowUp の既定動作を妨げない（preventDefault しない）', async () => {
        const user = userEvent.setup();
        render(<ControlledCombobox />);
        await user.click(getCombobox());
        const input = getCombobox();

        // fireEvent は preventDefault されると false を返す
        expect(fireEvent.keyDown(input, { key: 'ArrowDown', ...init })).toBe(true);
        expect(fireEvent.keyDown(input, { key: 'ArrowUp', ...init })).toBe(true);
      });

      it('閉じている状態の ArrowDown / ArrowUp でリストが開かない', async () => {
        const user = userEvent.setup();
        render(<ControlledCombobox />);
        await user.click(getCombobox());
        await user.keyboard('{Escape}');
        const input = getCombobox();
        expect(getListbox()).toHaveStyle({ visibility: 'hidden' });

        fireEvent.keyDown(input, { key: 'ArrowDown', ...init });
        expect(getListbox()).toHaveStyle({ visibility: 'hidden' });

        fireEvent.keyDown(input, { key: 'ArrowUp', ...init });
        expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
      });

      it('Enter で選択しない', async () => {
        const user = userEvent.setup();
        const onSelectionChange = vi.fn();
        render(<ControlledCombobox onSelectionChange={onSelectionChange} />);
        await user.click(getCombobox());

        fireEvent.keyDown(getCombobox(), { key: 'Enter', ...init });
        expect(onSelectionChange).not.toHaveBeenCalled();
        expect(getListbox()).toHaveStyle({ visibility: 'visible' });
      });

      it('Escape でリストが閉じず、入力も選択値の表示へ戻らない', async () => {
        const user = userEvent.setup();
        const onInputValueChange = vi.fn();
        render(<ControlledCombobox onInputValueChange={onInputValueChange} />);
        const input = getCombobox();
        await user.click(input);
        await user.click(getOption('りんご'));
        await user.click(input);
        await user.clear(input);
        await user.type(input, 'にん');
        onInputValueChange.mockClear();

        fireEvent.keyDown(input, { key: 'Escape', ...init });
        expect(getListbox()).toHaveStyle({ visibility: 'visible' });
        expect(onInputValueChange).not.toHaveBeenCalled();
        expect(input).toHaveValue('にん');
      });

      it('Escape は親要素に伝搬しない（変換の取り消しで Popover 等が閉じないように）', async () => {
        const user = userEvent.setup();
        const handleParentEscape = vi.fn();
        render(
          <div onKeyDown={(e) => e.key === 'Escape' && handleParentEscape()}>
            <ControlledCombobox />
          </div>,
        );
        await user.click(getCombobox());
        // List を閉じた状態でも、変換中の Escape は親に伝搬しない
        await user.keyboard('{Escape}');

        fireEvent.keyDown(getCombobox(), { key: 'Escape', ...init });
        expect(handleParentEscape).not.toHaveBeenCalled();
      });
    });

    it('Popover 内の Combobox で変換中に Escape を押しても Popover は閉じない', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Popover isOpen onClose={onClose}>
          <Popover.Trigger>
            <button type="button">trigger</button>
          </Popover.Trigger>
          <Popover.Content>
            <div>
              <ControlledCombobox />
            </div>
          </Popover.Content>
        </Popover>,
      );
      await user.click(getCombobox());

      fireEvent.keyDown(getCombobox(), { key: 'Escape', isComposing: true });
      expect(onClose).not.toHaveBeenCalled();

      // 変換していない Escape は従来どおり: 1 回目で List を閉じ、2 回目で Popover を閉じる
      await user.keyboard('{Escape}');
      expect(onClose).not.toHaveBeenCalled();
      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalledWith({ reason: 'escape-key-down' });
    });
  });

  describe('activeIndex 初期化', () => {
    it('selectedValue 一致の item が初期 active になる', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox initialValue="peach" initialInputValue="もも" />);
      await user.click(getCombobox());

      const activeId = getCombobox().getAttribute('aria-activedescendant');
      expect(activeId).toContain('peach');
    });

    it('selectedValue 非一致の場合は先頭 enabled が active', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox initialValue={null} />);
      await user.click(getCombobox());

      const activeId = getCombobox().getAttribute('aria-activedescendant');
      expect(activeId).toContain('apple');
    });

    it('close → 再 open で selectedValue を active に復元する', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);

      await user.click(getCombobox());
      await user.click(getOption('もも'));
      // close 済。ArrowDown で再 open (move しない)
      await user.keyboard('{ArrowDown}');

      const activeId = getCombobox().getAttribute('aria-activedescendant');
      expect(activeId).toContain('peach');
    });

    it('input 削除後も selectedValue 位置が active に維持される (value と inputValue の独立)', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);

      await user.click(getCombobox());
      await user.click(getOption('もも'));

      // ArrowDown で再 open → peach が active
      await user.keyboard('{ArrowDown}');
      expect(getCombobox().getAttribute('aria-activedescendant')).toContain('peach');

      // input を削除（value は保持）→ onChange で popup は open のまま、active 維持
      await user.keyboard('{Control>}a{/Control}{Delete}');
      expect(getCombobox()).toHaveValue('');

      expect(getCombobox().getAttribute('aria-activedescendant')).toContain('peach');
    });
  });

  describe('選択済み視覚強調', () => {
    it('selectedValue と一致する option に aria-selected=true と bg-selectedUi が付く', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox initialValue="orange" initialInputValue="みかん" />);
      await user.click(getCombobox());

      const selected = getOption('みかん');
      expect(selected).toHaveAttribute('aria-selected', 'true');
      expect(selected.className).toMatch(/bg-selectedUi/);
    });

    it('selectedValue と非一致の option は aria-selected=false', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox initialValue="orange" initialInputValue="みかん" />);
      await user.click(getCombobox());

      const other = getOption('りんご');
      expect(other).toHaveAttribute('aria-selected', 'false');
    });

    it('再 open 直後、selected + active が同一 item に重なり border accent が付く', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox initialValue="peach" initialInputValue="もも" />);
      await user.click(getCombobox());

      const selected = getOption('もも');
      expect(selected.className).toMatch(/bg-selectedUi/);
      expect(selected.className).toMatch(/border-l-interactive03/);
    });
  });

  describe('items 更新時の active 維持 (value 単位)', () => {
    function FilteredCombobox({ initialInput = '' }: { initialInput?: string }) {
      const [value, setValue] = useState<string | null>(null);
      const [inputValue, setInputValue] = useState(initialInput);
      const visibleItems = useMemo(() => defaultFruits.filter((f) => f.label.includes(inputValue)), [inputValue]);

      return (
        <Combobox
          value={value}
          onChange={(next, meta) => {
            setValue(next);
            setInputValue(meta?.label ?? '');
          }}
          inputValue={inputValue}
          onInputChange={setInputValue}
        >
          <Combobox.Input />
          <Combobox.List>
            {visibleItems.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      );
    }

    it('フィルタで active item が残る場合、active は維持される', async () => {
      const user = userEvent.setup();
      render(<FilteredCombobox />);

      await user.click(getCombobox());
      // ArrowDown を 2 回で peach (もも) へ
      await user.keyboard('{ArrowDown}{ArrowDown}');
      expect(getCombobox().getAttribute('aria-activedescendant')).toContain('peach');

      // "も" を入力 → items は ["もも", "メロン"] が残る想定 ("もも", "メロン" ともに 'も' 含む)
      await user.keyboard('も');

      // peach はまだ items 内にあるので維持される
      expect(getCombobox().getAttribute('aria-activedescendant')).toContain('peach');
    });

    it('フィルタで active item が消えた場合は先頭 enabled にフォールバック', async () => {
      const user = userEvent.setup();
      render(<FilteredCombobox />);

      await user.click(getCombobox());
      // ArrowDown を 2 回 → peach が active
      await user.keyboard('{ArrowDown}{ArrowDown}');
      // "りん" を入力 → items は ["りんご"] のみ残り、peach は消える
      await user.keyboard('りん');

      const activeId = getCombobox().getAttribute('aria-activedescendant');
      expect(activeId).toContain('apple'); // 先頭 enabled = apple にフォールバック
    });

    it('同じ open セッション中の items 並び替えで active が value 追従する', async () => {
      const user = userEvent.setup();
      const reversed = [...defaultFruits].reverse();

      // 'z' を入力したら items が逆順になる仕掛け (outside click を避けるため input 経由で誘発)
      function ReorderableCombobox() {
        const [value, setValue] = useState<string | null>(null);
        const [inputValue, setInputValue] = useState('');

        const visibleItems = useMemo(() => {
          if (inputValue === 'z') return reversed;

          return defaultFruits;
        }, [inputValue]);

        return (
          <Combobox
            value={value}
            onChange={(next, meta) => {
              setValue(next);
              setInputValue(meta?.label ?? '');
            }}
            inputValue={inputValue}
            onInputChange={setInputValue}
          >
            <Combobox.Input />
            <Combobox.List>
              {visibleItems.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        );
      }

      render(<ReorderableCombobox />);

      await user.click(getCombobox());
      await user.keyboard('{ArrowDown}{ArrowDown}');
      expect(getCombobox().getAttribute('aria-activedescendant')).toContain('peach');

      // 'z' 入力で items を逆順に差し替え (popup open 状態を維持)
      await user.keyboard('z');

      // 並び替え後、peach の value は維持されているはず (index は変わる)
      expect(getCombobox().getAttribute('aria-activedescendant')).toContain('peach');
    });
  });

  describe('scrollIntoView / inputMode', () => {
    it('ArrowDown で scrollIntoView が呼ばれる (keyboard mode)', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);

      await user.click(getCombobox());
      const spy = Element.prototype.scrollIntoView as ReturnType<typeof vi.fn>;
      spy.mockClear();

      await user.keyboard('{ArrowDown}');
      expect(spy).toHaveBeenCalled();
    });

    it('mouseEnter では scrollIntoView が呼ばれない (mouse mode)', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);

      await user.click(getCombobox());
      const spy = Element.prototype.scrollIntoView as ReturnType<typeof vi.fn>;
      spy.mockClear();

      await user.hover(getOption('みかん'));
      expect(spy).not.toHaveBeenCalled();
    });

    it('mouse mode 中に close → reopen で inputMode が keyboard に戻り、初回 active で scrollIntoView が呼ばれる', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);

      await user.click(getCombobox());
      await user.hover(getOption('みかん'));
      // この時点で mouse mode
      await user.keyboard('{Escape}');

      const spy = Element.prototype.scrollIntoView as ReturnType<typeof vi.fn>;
      spy.mockClear();

      // 再 open: ArrowDown で isOpen false → true (inputMode keyboard にリセット)
      await user.keyboard('{ArrowDown}');
      // 初期 active への scrollIntoView が呼ばれるはず
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('scrollTop リセット', () => {
    it('close → reopen で listbox.scrollTop が 0 にリセットされる', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox listMaxHeight={80} />);

      await user.click(getCombobox());
      const listbox = getListbox();

      // scrollTop を人工的に動かしてから close → reopen
      act(() => {
        listbox.scrollTop = 50;
      });
      expect(listbox.scrollTop).toBe(50);

      await user.keyboard('{Escape}');
      // 再 open: ArrowDown で isOpen false → true (scrollTop リセット effect 発火)
      await user.keyboard('{ArrowDown}');

      expect(listbox.scrollTop).toBe(0);
    });
  });

  describe('Floating UI の reference', () => {
    it('候補リストの最小幅が入力欄の枠 div の幅に揃う', async () => {
      const user = userEvent.setup();
      // beforeEach の mock は全要素に同じ rect を返すため、枠 div だけ幅の異なる rect を返す mock に差し替える
      const rectOf = (width: number, height: number, top: number) =>
        ({
          width,
          height,
          top,
          left: 0,
          right: width,
          bottom: top + height,
          x: 0,
          y: top,
          toJSON: () => ({}),
        }) as DOMRect;
      let frameElement: Element | null = null;
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mocked(this: Element) {
        if (this === document.documentElement || this === document.body) {
          return rectOf(1024, 768, 0);
        }
        if (frameElement != null && this === frameElement) {
          return rectOf(320, 32, 100);
        }

        return rectOf(200, 32, 100);
      });
      render(<ControlledCombobox />);
      frameElement = getCombobox().parentElement;

      await user.click(getCombobox());

      const listWrapper = getListbox().parentElement;
      await vi.waitFor(() => {
        expect(listWrapper?.style.minWidth).toBe('320px');
      });
    });
  });

  describe('listMaxHeight', () => {
    // listbox は内側 ul、その親 div が外側 wrapper。
    // wrapper の inline style に maxHeight が Floating UI の size middleware 経由で反映される。
    const getListWrapper = () => {
      const wrapper = getListbox().parentElement;
      if (wrapper == null) {
        throw new Error('list wrapper not found');
      }

      return wrapper;
    };

    it('指定した listMaxHeight が候補リストの wrapper の maxHeight に反映される', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox listMaxHeight={200} />);

      await user.click(getCombobox());

      // 利用可能高 (>= 200) より listMaxHeight が小さいので 200px が採用される
      await vi.waitFor(() => {
        expect(getListWrapper().style.maxHeight).toBe('200px');
      });
    });

    it('listMaxHeight が利用可能高より大きい場合は利用可能高が採用される', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox listMaxHeight={5000} />);

      await user.click(getCombobox());

      // viewport 高さ 768、reference の bottom 132、offset 4、padding 8 で availableHeight = 624。
      // size middleware は min(availableHeight, listMaxHeight) を採用するため、
      // listMaxHeight=5000 を渡しても availableHeight (624px) が上限となる。
      await vi.waitFor(() => {
        expect(getListWrapper().style.maxHeight).toBe('624px');
      });
    });

    it('listMaxHeight に "200px" のような単位付き文字列を渡しても 200px が反映される', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox listMaxHeight="200px" />);

      await user.click(getCombobox());

      await vi.waitFor(() => {
        expect(getListWrapper().style.maxHeight).toBe('200px');
      });
    });

    it('listMaxHeight に "200" のような単位なし文字列を渡しても 200px が反映される', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox listMaxHeight="200" />);

      await user.click(getCombobox());

      await vi.waitFor(() => {
        expect(getListWrapper().style.maxHeight).toBe('200px');
      });
    });

    it('listMaxHeight に空文字を渡した場合は利用可能高が採用される (NaN ガード)', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox listMaxHeight="" />);

      await user.click(getCombobox());

      await vi.waitFor(() => {
        expect(getListWrapper().style.maxHeight).toBe('624px');
      });
    });

    it('listMaxHeight にパース不能な文字列を渡した場合は利用可能高が採用される (NaN ガード)', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox listMaxHeight="invalid" />);

      await user.click(getCombobox());

      await vi.waitFor(() => {
        expect(getListWrapper().style.maxHeight).toBe('624px');
      });
    });

    it('mount 後に listMaxHeight を変更すると候補リストの maxHeight が再計算される', async () => {
      const user = userEvent.setup();

      function DynamicCombobox() {
        // eslint-disable-next-line no-undefined
        const [maxH, setMaxH] = useState<number | undefined>(undefined);
        const [value, setValue] = useState<string | null>(null);
        const [inputValue, setInputValue] = useState('');

        return (
          <>
            <button type="button" onClick={() => setMaxH(150)} data-testid="set-150">
              set 150
            </button>
            <Combobox
              value={value}
              onChange={(next, meta) => {
                setValue(next);
                setInputValue(meta?.label ?? '');
              }}
              inputValue={inputValue}
              onInputChange={setInputValue}
              listMaxHeight={maxH}
            >
              <Combobox.Input />
              <Combobox.List>
                {defaultFruits.map((opt) => (
                  <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
                ))}
              </Combobox.List>
            </Combobox>
          </>
        );
      }

      render(<DynamicCombobox />);
      await user.click(getCombobox());

      // 初期は listMaxHeight 未指定なので availableHeight (624px) が採用される
      await vi.waitFor(() => {
        expect(getListWrapper().style.maxHeight).toBe('624px');
      });

      // listMaxHeight=150 に変更すると Floating UI が再計算され 150px が反映される
      await user.click(screen.getByTestId('set-150'));
      await vi.waitFor(() => {
        expect(getListWrapper().style.maxHeight).toBe('150px');
      });
    });
  });

  describe('Combobox.Item の label レンダリング', () => {
    it('label を truncate span で自動レンダリングする', async () => {
      const user = userEvent.setup();

      function SlimCombobox() {
        const [value, setValue] = useState<string | null>(null);
        const [inputValue, setInputValue] = useState('');

        return (
          <Combobox
            value={value}
            onChange={(next, meta) => {
              setValue(next);
              setInputValue(meta?.label ?? '');
            }}
            inputValue={inputValue}
            onInputChange={setInputValue}
          >
            <Combobox.Input />
            <Combobox.List>
              <Combobox.Item value="apple" label="りんご" />
            </Combobox.List>
          </Combobox>
        );
      }

      render(<SlimCombobox />);
      await user.click(getCombobox());

      const option = getOption('りんご');
      const textSpan = option.querySelector('span');
      expect(textSpan).not.toBeNull();
      expect(textSpan?.textContent).toBe('りんご');
      expect(textSpan?.className).toMatch(/truncate/);
      expect(textSpan?.className).toMatch(/min-w-0/);
    });
  });

  describe('Combobox.Item の children', () => {
    type FruitOrigin = { value: string; label: string; origin: string };

    const fruitOrigins: FruitOrigin[] = [
      { value: 'apple', label: 'りんご', origin: '青森県' },
      { value: 'banana', label: 'バナナ', origin: 'フィリピン' },
    ];

    function ChildrenCombobox({
      initialValue = null,
      initialInputValue = '',
      onChange,
      onInputChange,
    }: {
      initialValue?: string | null;
      initialInputValue?: string;
      onChange?: (value: string | null, meta: { label: string } | null) => void;
      onInputChange?: (value: string) => void;
    }) {
      const [value, setValue] = useState<string | null>(initialValue);
      const [inputValue, setInputValue] = useState(initialInputValue);

      return (
        <Combobox
          value={value}
          onChange={(next, meta) => {
            setValue(next);
            onChange?.(next, meta);
          }}
          inputValue={inputValue}
          onInputChange={(next) => {
            setInputValue(next);
            onInputChange?.(next);
          }}
        >
          <Combobox.Input />
          <Combobox.List>
            {fruitOrigins.map((item) => (
              <Combobox.Item key={item.value} value={item.value} label={item.label}>
                <span className="truncate" data-testid={`label-${item.value}`}>
                  {item.label}
                </span>
                {/* 読み上げ不要な装飾の区切り記号 */}
                <span aria-hidden="true">・</span>
                <span className="shrink-0">{item.origin}</span>
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox>
      );
    }

    it('children 未指定のとき option の直下は label の span と選択チェックのみ（DOM 不変）', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);
      await user.click(getCombobox());

      const option = getOption('りんご');
      const childSpans = Array.from(option.children);
      expect(childSpans).toHaveLength(2);
      expect(childSpans[0]?.className).toBe('min-w-0 flex-1 truncate');
      expect(childSpans[0]?.textContent).toBe('りんご');
      expect(childSpans[1]).toHaveAttribute('data-selection-indicator');
    });

    it('children が行内のラッパー span に描画される', async () => {
      const user = userEvent.setup();
      render(<ChildrenCombobox />);
      await user.click(getCombobox());

      const labelSpan = screen.getByTestId('label-apple');
      const wrapper = labelSpan.parentElement;
      expect(wrapper?.tagName).toBe('SPAN');
      expect(wrapper?.className).toBe('flex min-w-0 flex-1 items-center');
      expect(wrapper?.parentElement).toHaveAttribute('role', 'option');
      expect(wrapper?.textContent).toContain('青森県');
    });

    it('children が boolean（条件付き描画で false）のときは未指定とみなし label を描画する', async () => {
      const user = userEvent.setup();
      const hasBadge = false;
      render(
        <Combobox value={null} onChange={vi.fn()} inputValue="" onInputChange={vi.fn()}>
          <Combobox.Input />
          <Combobox.List>
            <Combobox.Item value="apple" label="りんご">
              {hasBadge && <span>バッジ</span>}
            </Combobox.Item>
          </Combobox.List>
        </Combobox>,
      );
      await user.click(getCombobox());

      const option = getOption('りんご');
      expect(option.children[0]?.className).toBe('min-w-0 flex-1 truncate');
      expect(option.children[0]?.textContent).toBe('りんご');
    });

    it('option の accessible name は children のテキストの連結になり、aria-hidden の要素は含まれない', async () => {
      const user = userEvent.setup();
      render(<ChildrenCombobox />);
      await user.click(getCombobox());

      const option = getOption('りんご 青森県');
      expect(option).toHaveAttribute('id', expect.stringContaining('apple'));
      expect(screen.queryByRole('option', { name: /・/, hidden: true })).toBeNull();
    });

    it('選択時の onChange の meta と onInputChange には children のテキストではなく label が渡る', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const handleInputChange = vi.fn();
      render(<ChildrenCombobox onChange={handleChange} onInputChange={handleInputChange} />);
      await user.click(getCombobox());
      await user.click(getOption('バナナ フィリピン'));

      expect(handleChange).toHaveBeenCalledWith('banana', { label: 'バナナ' });
      expect(handleInputChange).toHaveBeenLastCalledWith('バナナ');
      expect(getCombobox().value).toBe('バナナ');
    });

    it('Enter で選択したときも label が使われる', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<ChildrenCombobox onChange={handleChange} />);
      await user.click(getCombobox());
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith('apple', { label: 'りんご' });
      expect(getCombobox().value).toBe('りんご');
    });

    it('children 指定時もハイライトと選択状態（aria-selected・選択チェック）が表示される', async () => {
      const user = userEvent.setup();
      render(<ChildrenCombobox initialValue="banana" initialInputValue="バナナ" />);
      await user.click(getCombobox());

      const selected = getOption('バナナ フィリピン');
      expect(selected).toHaveAttribute('aria-selected', 'true');
      expect(selected.className).toMatch(/bg-selectedUi/);
      expect(selected.className).toMatch(/border-l-interactive03/);
      expect(selected.querySelector('[data-selection-indicator] svg')).not.toBeNull();

      await user.keyboard('{ArrowDown}');
      const active = getOption('りんご 青森県');
      expect(active.className).toMatch(/bg-hover02/);
      expect(active.className).toMatch(/border-l-interactive03/);
      expect(active).toHaveAttribute('aria-selected', 'false');
      expect(active.querySelector('[data-selection-indicator] svg')).toBeNull();
    });
  });

  describe('size の連動', () => {
    function ControlledWithSize({ size }: { size: 'medium' | 'large' }) {
      const [value, setValue] = useState<string | null>(null);
      const [inputValue, setInputValue] = useState('');

      return (
        <Combobox
          value={value}
          onChange={(next, meta) => {
            setValue(next);
            setInputValue(meta?.label ?? '');
          }}
          inputValue={inputValue}
          onInputChange={setInputValue}
          size={size}
        >
          <Combobox.Input />
          <Combobox.List>
            {defaultFruits.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      );
    }

    it('size=medium のとき Item の高さが h-8', async () => {
      const user = userEvent.setup();
      render(<ControlledWithSize size="medium" />);
      await user.click(getCombobox());
      const option = getOption('りんご');
      expect(option.className).toMatch(/h-8/);
      expect(option.className).toMatch(/typography-label14regular/);
    });

    it('size=large のとき Item の高さが h-10 (List に size が伝搬)', async () => {
      const user = userEvent.setup();
      render(<ControlledWithSize size="large" />);
      await user.click(getCombobox());
      const option = getOption('りんご');
      expect(option.className).toMatch(/h-10/);
      expect(option.className).toMatch(/typography-label16regular/);
    });
  });

  describe('状態', () => {
    it('isError の場合、input に error 用のクラスが付く', () => {
      render(<ControlledCombobox isError />);
      const input = getCombobox();
      // TextInput の error スタイル (赤系) が付いていることを確認
      expect(input.className).toMatch(/border-supportError|text-supportError|bg-supportError/);
    });

    it('isDisabled の場合、input が disabled で操作不能', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox isDisabled />);
      const input = getCombobox();
      expect(input).toBeDisabled();

      // クリックしても open しない
      await user.click(input);
      expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
    });
  });

  describe('toggle ボタンの disable', () => {
    function EmptyCombobox({ inputValue = '' }: { inputValue?: string }) {
      const [value, setValue] = useState<string | null>(null);
      const [input, setInput] = useState(inputValue);

      return (
        <Combobox
          value={value}
          onChange={(next, meta) => {
            setValue(next);
            setInput(meta?.label ?? '');
          }}
          inputValue={input}
          onInputChange={setInput}
        >
          <Combobox.Input />
          <Combobox.List>{/* Item/Loading/Empty いずれも無い */}</Combobox.List>
        </Combobox>
      );
    }

    it('List 直下に Item / Loading / Empty が無いとき toggle ボタンが disabled', () => {
      render(<EmptyCombobox />);
      const toggle = screen.getByRole('button', { name: '候補を表示' });
      expect(toggle).toBeDisabled();
    });

    it('Loading が存在するときは toggle ボタンが有効（非同期ロード中を想定）', () => {
      function LoadingCombobox() {
        const [value, setValue] = useState<string | null>(null);
        const [input, setInput] = useState('abc');

        return (
          <Combobox
            value={value}
            onChange={(next, meta) => {
              setValue(next);
              setInput(meta?.label ?? '');
            }}
            inputValue={input}
            onInputChange={setInput}
          >
            <Combobox.Input />
            <Combobox.List>
              <Combobox.Loading />
            </Combobox.List>
          </Combobox>
        );
      }

      render(<LoadingCombobox />);
      const toggle = screen.getByRole('button', { name: '候補を表示' });
      expect(toggle).not.toBeDisabled();
    });

    it('Empty が存在するときは toggle ボタンが有効（該当なし表示）', () => {
      function EmptyLabelCombobox() {
        const [value, setValue] = useState<string | null>(null);
        const [input, setInput] = useState('xxx');

        return (
          <Combobox
            value={value}
            onChange={(next, meta) => {
              setValue(next);
              setInput(meta?.label ?? '');
            }}
            inputValue={input}
            onInputChange={setInput}
          >
            <Combobox.Input />
            <Combobox.List>
              <Combobox.Empty />
            </Combobox.List>
          </Combobox>
        );
      }

      render(<EmptyLabelCombobox />);
      const toggle = screen.getByRole('button', { name: '候補を表示' });
      expect(toggle).not.toBeDisabled();
    });

    it('Item があるときは toggle ボタンが有効', () => {
      render(<ControlledCombobox />);
      const toggle = screen.getByRole('button', { name: '候補を表示' });
      expect(toggle).not.toBeDisabled();
    });
  });

  describe('aria 属性と hasOpenableContent の連動', () => {
    function EmptyListCombobox() {
      const [value, setValue] = useState<string | null>(null);
      const [input, setInput] = useState('');

      return (
        <Combobox
          value={value}
          onChange={(next, meta) => {
            setValue(next);
            setInput(meta?.label ?? '');
          }}
          inputValue={input}
          onInputChange={setInput}
        >
          <Combobox.Input />
          <Combobox.List>{/* 空 */}</Combobox.List>
        </Combobox>
      );
    }

    it('List が空のとき、input focus しても aria-expanded は false のまま', async () => {
      const user = userEvent.setup();
      render(<EmptyListCombobox />);
      const input = getCombobox();

      await user.click(input);
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    it('List が空のとき、aria-controls は付与されない', async () => {
      const user = userEvent.setup();
      render(<EmptyListCombobox />);
      const input = getCombobox();

      await user.click(input);
      expect(input).not.toHaveAttribute('aria-controls');
    });

    it('Item があるときは focus 後に aria-expanded=true / aria-controls が付与される', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox />);
      const input = getCombobox();

      await user.click(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(input).toHaveAttribute('aria-controls', expect.any(String));
    });
  });

  describe('クリアボタン', () => {
    const getClearButton = () => screen.queryByRole('button', { name: '入力をクリア' });

    it('onClickClearButton 未指定のときは入力値があってもクリアボタンを表示しない', () => {
      render(<ControlledCombobox initialInputValue="りんご" />);

      expect(getClearButton()).toBeNull();
    });

    it('onClickClearButton 指定 + 入力値ありでクリアボタンを表示する', () => {
      render(<ControlledCombobox enableClearButton initialInputValue="りんご" />);

      expect(getClearButton()).not.toBeNull();
    });

    it('入力値が空のときはクリアボタンを表示しない', () => {
      render(<ControlledCombobox enableClearButton initialInputValue="" />);

      expect(getClearButton()).toBeNull();
    });

    it('isDisabled のときはクリアボタンを表示しない', () => {
      render(<ControlledCombobox enableClearButton initialInputValue="りんご" isDisabled />);

      expect(getClearButton()).toBeNull();
    });

    it('クリックで onClickClearButton が呼ばれ、入力値がクリアされる', async () => {
      const user = userEvent.setup();
      const onClearButtonClick = vi.fn();
      render(
        <ControlledCombobox enableClearButton initialInputValue="りんご" onClearButtonClick={onClearButtonClick} />,
      );

      const clearButton = getClearButton();
      expect(clearButton).not.toBeNull();
      await user.click(clearButton as HTMLElement);

      expect(onClearButtonClick).toHaveBeenCalledTimes(1);
      expect(getCombobox()).toHaveValue('');
      // 値が空になったのでクリアボタン自体も消える
      expect(getClearButton()).toBeNull();
    });

    it('クリックしても popup は閉じず、input のフォーカスが維持される', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox enableClearButton initialInputValue="りんご" />);

      const input = getCombobox();
      await user.click(input);
      expect(getListbox()).toHaveStyle({ visibility: 'visible' });

      const clearButton = getClearButton();
      // クリアボタンは onMouseDown で preventDefault するため input フォーカスが外れない。
      await user.click(clearButton as HTMLElement);

      expect(getListbox()).toHaveStyle({ visibility: 'visible' });
      expect(input).toHaveFocus();
    });

    it('選択済みで open 中にクリアすると aria-activedescendant が残らない', async () => {
      const user = userEvent.setup();
      render(<ControlledCombobox enableClearButton initialValue="apple" initialInputValue="りんご" />);

      const input = getCombobox();
      await user.click(input);
      // 選択済みの apple が active になり aria-activedescendant が付与される
      expect(input).toHaveAttribute('aria-activedescendant');

      await user.click(getClearButton() as HTMLElement);

      // 内部の active 状態がリセットされ、クリア前の item が active に残らない
      expect(input).not.toHaveAttribute('aria-activedescendant');
    });

    it('open 中にクリアした直後の Enter で旧選択が復活しない', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      render(
        <ControlledCombobox
          enableClearButton
          initialValue="apple"
          initialInputValue="りんご"
          onSelectionChange={onSelectionChange}
        />,
      );

      const input = getCombobox();
      await user.click(input);
      await user.click(getClearButton() as HTMLElement);
      onSelectionChange.mockClear();

      // active が null のため Enter は選択を発火しない（クリア前の apple が再選択されない）
      await user.keyboard('{Enter}');

      expect(onSelectionChange).not.toHaveBeenCalled();
    });
  });

  describe('Combobox.Input の accessible name', () => {
    const noop = () => {
      // intentionally empty
    };
    const renderCombobox = (isMultiple: boolean, inputProps: ComboboxInputProps, before?: ReactNode) =>
      render(
        <>
          {before}
          {isMultiple ? (
            <Combobox isMultiple value={[]} onChange={noop} inputValue="" onInputChange={noop}>
              <Combobox.Input {...inputProps} />
              <Combobox.List>
                <Combobox.Item value="apple" label="りんご" />
              </Combobox.List>
            </Combobox>
          ) : (
            <Combobox value={null} onChange={noop} inputValue="" onInputChange={noop}>
              <Combobox.Input {...inputProps} />
              <Combobox.List>
                <Combobox.Item value="apple" label="りんご" />
              </Combobox.List>
            </Combobox>
          )}
        </>,
      );

    describe.each([
      { mode: '単一選択', isMultiple: false },
      { mode: '複数選択', isMultiple: true },
    ])('$mode', ({ isMultiple }) => {
      it('id を指定すると input に反映され、<label htmlFor> で名前が付く', () => {
        renderCombobox(isMultiple, { id: 'fruit-input' }, <label htmlFor="fruit-input">好きな果物</label>);

        expect(getCombobox()).toHaveAttribute('id', 'fruit-input');
        expect(screen.getByRole('combobox', { name: '好きな果物' })).toBe(getCombobox());
      });

      it('aria-label を指定すると input の名前になる', () => {
        renderCombobox(isMultiple, { 'aria-label': '果物' });

        expect(screen.getByRole('combobox', { name: '果物' })).toBe(getCombobox());
      });

      it('aria-labelledby を指定すると、参照先の要素のテキストが input の名前になる', () => {
        renderCombobox(isMultiple, { 'aria-labelledby': 'fruit-heading' }, <span id="fruit-heading">果物の選択</span>);

        expect(getCombobox()).toHaveAttribute('aria-labelledby', 'fruit-heading');
        expect(screen.getByRole('combobox', { name: '果物の選択' })).toBe(getCombobox());
      });

      it('未指定のときは id / aria-label / aria-labelledby を付けない（従来どおり）', () => {
        renderCombobox(isMultiple, {});

        expect(getCombobox()).not.toHaveAttribute('id');
        expect(getCombobox()).not.toHaveAttribute('aria-label');
        expect(getCombobox()).not.toHaveAttribute('aria-labelledby');
      });
    });

    it('id を指定しても aria-activedescendant / aria-controls は内部の id のまま', async () => {
      const user = userEvent.setup();
      renderCombobox(false, { id: 'fruit-input' });

      await user.click(getCombobox());

      expect(getCombobox().getAttribute('aria-controls')).toBe(getListbox().id);
      expect(getCombobox().getAttribute('aria-activedescendant')).toBe(getOption('りんご').id);
      expect(getOption('りんご').id).not.toBe('fruit-input');
    });
  });

  describe('multiple', () => {
    const getLiveRegion = (container: HTMLElement) => container.querySelector('[aria-live="polite"]');

    describe('追加（add）', () => {
      it('Item クリックで次の配列と add の meta を渡し、入力を空にし、リストは開いたまま', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const onOpenChange = vi.fn();
        const onInputValueChange = vi.fn();
        render(
          <ControlledMultipleCombobox
            initialValue={['orange']}
            onChange={onChange}
            onOpenChange={onOpenChange}
            onInputValueChange={onInputValueChange}
          />,
        );
        await user.click(getCombobox());
        await user.type(getCombobox(), 'り');
        onInputValueChange.mockClear();
        onOpenChange.mockClear();

        await user.click(getOption('りんご'));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(['orange', 'apple'], { type: 'add', value: 'apple' });
        expect(onInputValueChange).toHaveBeenCalledWith('');
        expect(getCombobox()).toHaveValue('');
        expect(onOpenChange).not.toHaveBeenCalledWith(false);
        expect(getListbox()).toHaveStyle({ visibility: 'visible' });
      });

      it('Enter で active な Item を追加し、リストは開いたまま', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const onOpenChange = vi.fn();
        render(<ControlledMultipleCombobox onChange={onChange} onOpenChange={onOpenChange} />);
        await user.click(getCombobox());
        onOpenChange.mockClear();

        await user.keyboard('{Enter}');

        expect(onChange).toHaveBeenCalledWith(['apple'], { type: 'add', value: 'apple' });
        expect(onOpenChange).not.toHaveBeenCalledWith(false);
        expect(getListbox()).toHaveStyle({ visibility: 'visible' });
      });

      it('入力が空のときは onInputChange を呼ばない', async () => {
        const user = userEvent.setup();
        const onInputValueChange = vi.fn();
        render(<ControlledMultipleCombobox onInputValueChange={onInputValueChange} />);
        await user.click(getCombobox());

        await user.click(getOption('りんご'));

        expect(onInputValueChange).not.toHaveBeenCalled();
      });

      it('選択値と一致しない先頭の有効 Item が open 時の active になる', async () => {
        const user = userEvent.setup();
        render(<ControlledMultipleCombobox initialValue={['peach']} />);

        await user.click(getCombobox());

        expect(getCombobox().getAttribute('aria-activedescendant')).toContain('apple');
      });
    });

    describe('選択済みの再選択（toggle）', () => {
      it('選択済みの Item をクリックすると remove の meta で外し、入力を空にする', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const onInputValueChange = vi.fn();
        render(
          <ControlledMultipleCombobox
            initialValue={['apple', 'orange']}
            onChange={onChange}
            onInputValueChange={onInputValueChange}
          />,
        );
        await user.click(getCombobox());
        await user.type(getCombobox(), 'り');

        await user.click(getOption('りんご'));

        expect(onChange).toHaveBeenCalledWith(['orange'], { type: 'remove', value: 'apple' });
        expect(onInputValueChange).toHaveBeenLastCalledWith('');
        expect(getListbox()).toHaveStyle({ visibility: 'visible' });
      });

      it('選択済みの Item を Enter で選ぶと remove になる', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ControlledMultipleCombobox initialValue={['apple']} onChange={onChange} />);
        await user.click(getCombobox());

        await user.keyboard('{Enter}');

        expect(onChange).toHaveBeenCalledWith([], { type: 'remove', value: 'apple' });
      });
    });

    describe('Backspace', () => {
      it('入力が空のとき value の末尾を削除する', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ControlledMultipleCombobox initialValue={['peach', 'apple', 'orange']} onChange={onChange} />);
        await user.click(getCombobox());

        await user.keyboard('{Backspace}');
        expect(onChange).toHaveBeenLastCalledWith(['peach', 'apple'], { type: 'remove', value: 'orange' });

        await user.keyboard('{Backspace}');
        expect(onChange).toHaveBeenLastCalledWith(['peach'], { type: 'remove', value: 'apple' });
      });

      it('入力が空でなければ文字の削除だけ行い、value は変えない', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ControlledMultipleCombobox initialValue={['apple']} onChange={onChange} />);
        await user.click(getCombobox());
        await user.type(getCombobox(), 'み');

        await user.keyboard('{Backspace}');

        expect(getCombobox()).toHaveValue('');
        expect(onChange).not.toHaveBeenCalled();
      });

      it('value が 0 件のときは何もしない', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ControlledMultipleCombobox onChange={onChange} />);
        await user.click(getCombobox());

        await user.keyboard('{Backspace}');

        expect(onChange).not.toHaveBeenCalled();
      });

      it.each([
        { name: 'isComposing=true', init: { isComposing: true } },
        { name: 'keyCode=229', init: { keyCode: 229 } },
      ])('IME 変換中（$name）は削除しない', async ({ init }) => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ControlledMultipleCombobox initialValue={['apple']} onChange={onChange} />);
        await user.click(getCombobox());

        fireEvent.keyDown(getCombobox(), { key: 'Backspace', ...init });

        expect(onChange).not.toHaveBeenCalled();
      });

      it('isDisabled のときは削除しない', () => {
        const onChange = vi.fn();
        render(<ControlledMultipleCombobox initialValue={['apple']} onChange={onChange} isDisabled />);

        fireEvent.keyDown(getCombobox(), { key: 'Backspace' });

        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('未確定入力の取り消し (revert)', () => {
      it('blur で入力が空に戻り、value は変わらない', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const onOpenChange = vi.fn();
        render(<ControlledMultipleCombobox initialValue={['apple']} onChange={onChange} onOpenChange={onOpenChange} />);
        await user.click(getCombobox());
        await user.type(getCombobox(), 'み');

        await user.tab();

        expect(getCombobox()).toHaveValue('');
        expect(onOpenChange).toHaveBeenLastCalledWith(false);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('Escape でリストが閉じ、入力が空に戻り、value は変わらない', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ControlledMultipleCombobox initialValue={['apple']} onChange={onChange} />);
        await user.click(getCombobox());
        await user.type(getCombobox(), 'み');

        await user.keyboard('{Escape}');

        expect(getCombobox()).toHaveValue('');
        expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('active の維持', () => {
      it('すべての選択を外しても、開いているリストの active は維持される', async () => {
        const user = userEvent.setup();
        render(<ControlledMultipleCombobox initialValue={['apple']} />);
        await user.click(getCombobox());
        await user.keyboard('{ArrowDown}');
        const activeId = getCombobox().getAttribute('aria-activedescendant');
        expect(activeId).toContain('orange');

        await user.keyboard('{Backspace}');

        expect(getCombobox()).toHaveAttribute('aria-activedescendant', activeId);
      });
    });

    describe('aria 属性', () => {
      it('listbox に aria-multiselectable="true" が付く', () => {
        render(<ControlledMultipleCombobox />);

        expect(getListbox()).toHaveAttribute('aria-multiselectable', 'true');
      });

      it('単一選択では aria-multiselectable が付かない', () => {
        render(<ControlledCombobox />);

        expect(getListbox()).not.toHaveAttribute('aria-multiselectable');
      });

      it('aria-selected が value 配列を反映する', async () => {
        const user = userEvent.setup();
        render(<ControlledMultipleCombobox initialValue={['apple', 'peach']} />);
        await user.click(getCombobox());

        expect(getOption('りんご')).toHaveAttribute('aria-selected', 'true');
        expect(getOption('もも')).toHaveAttribute('aria-selected', 'true');
        expect(getOption('みかん')).toHaveAttribute('aria-selected', 'false');

        await user.click(getOption('みかん'));

        expect(getOption('みかん')).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('aria-live 通知', () => {
      it('mount 時は空', () => {
        const { container } = render(<ControlledMultipleCombobox initialValue={['apple']} />);

        expect(getLiveRegion(container)).toHaveTextContent('');
      });

      it('単一選択では aria-live 領域を描画しない', () => {
        const { container } = render(<ControlledCombobox />);

        expect(getLiveRegion(container)).toBeNull();
      });

      it('追加は Item の label で、削除は登録済みの label で通知する', async () => {
        const user = userEvent.setup();
        const { container } = render(<ControlledMultipleCombobox />);
        await user.click(getCombobox());

        await user.click(getOption('りんご'));
        expect(getLiveRegion(container)).toHaveTextContent('「りんご」を追加しました');

        await user.keyboard('{Backspace}');
        expect(getLiveRegion(container)).toHaveTextContent('「りんご」を削除しました');
      });

      it('label が登録されていない値は value 文字列で通知する', async () => {
        const user = userEvent.setup();
        const { container } = render(<ControlledMultipleCombobox initialValue={['apple']} />);
        await user.click(getCombobox());

        await user.keyboard('{Backspace}');

        expect(getLiveRegion(container)).toHaveTextContent('「apple」を削除しました');
      });

      it('利用側が value を差し替えた場合も差分を通知する（複数は「、」で連結）', () => {
        const noop = vi.fn();
        const renderMultiple = (value: string[]) => (
          <Combobox isMultiple value={value} onChange={noop} inputValue="" onInputChange={noop}>
            <Combobox.Input />
            <Combobox.List>
              <Combobox.Item value="apple" label="りんご" />
            </Combobox.List>
          </Combobox>
        );
        const { container, rerender } = render(renderMultiple(['apple']));
        expect(getLiveRegion(container)).toHaveTextContent('');

        rerender(renderMultiple(['orange', 'peach']));

        expect(getLiveRegion(container)).toHaveTextContent(
          '「apple」を削除しました、「orange」、「peach」を追加しました',
        );
      });

      describe('同じ label の別の値を続けて追加・削除しても、毎回新しい通知として描画し直す', () => {
        const noop = vi.fn();
        const renderSameLabel = (value: string[]) => (
          <Combobox isMultiple value={value} onChange={noop} inputValue="" onInputChange={noop}>
            <Combobox.Input>
              {value.map((chipValue) => (
                <Combobox.Chip key={chipValue} value={chipValue} label="同名" />
              ))}
            </Combobox.Input>
            <Combobox.List>
              <Combobox.Item value="a" label="同名" />
              <Combobox.Item value="b" label="同名" />
            </Combobox.List>
          </Combobox>
        );

        it('連続追加', () => {
          const { container, rerender } = render(renderSameLabel([]));
          const liveRegion = getLiveRegion(container);

          rerender(renderSameLabel(['a']));
          const firstMessage = liveRegion?.firstChild;
          expect(liveRegion).toHaveTextContent('「同名」を追加しました');

          rerender(renderSameLabel(['a', 'b']));
          // live 領域そのものは入れ替えず、中身のノードだけが入れ替わる
          expect(getLiveRegion(container)).toBe(liveRegion);
          expect(liveRegion).toHaveTextContent('「同名」を追加しました');
          expect(liveRegion?.firstChild).not.toBeNull();
          expect(liveRegion?.firstChild).not.toBe(firstMessage);
        });

        it('連続削除', () => {
          const { container, rerender } = render(renderSameLabel(['a', 'b']));
          const liveRegion = getLiveRegion(container);

          rerender(renderSameLabel(['a']));
          const firstMessage = liveRegion?.firstChild;
          expect(liveRegion).toHaveTextContent('「同名」を削除しました');

          rerender(renderSameLabel([]));
          expect(getLiveRegion(container)).toBe(liveRegion);
          expect(liveRegion).toHaveTextContent('「同名」を削除しました');
          expect(liveRegion?.firstChild).not.toBeNull();
          expect(liveRegion?.firstChild).not.toBe(firstMessage);
        });
      });
    });

    describe('Combobox.Chip の描画', () => {
      it('Chip が children の順に、label と gray の Tag で描画される', () => {
        render(<MultipleComboboxWithChips initialValue={['peach', 'apple']} />);

        const peach = screen.getByText('もも', { selector: 'span[title]' });
        const apple = screen.getByText('りんご', { selector: 'span[title]' });
        expect(peach.compareDocumentPosition(apple) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(peach.parentElement).toHaveClass('bg-gray-gray10');
        expect(getDeleteButton('もも')).toBeInTheDocument();
        expect(getDeleteButton('りんご')).toBeInTheDocument();
      });

      it('Chip は input と同じ枠の中（input の前）に描画される', () => {
        render(<MultipleComboboxWithChips initialValue={['apple']} />);

        const chip = getDeleteButton('りんご');
        const input = getCombobox();
        expect(input.parentElement?.contains(chip)).toBe(true);
        expect(chip.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      });

      it('value が 1 件以上あるとき placeholder を出さず、0 件のときは出す', async () => {
        const user = userEvent.setup();
        render(<MultipleComboboxWithChips initialValue={['apple']} placeholder="果物を検索" />);
        expect(getCombobox()).not.toHaveAttribute('placeholder');

        await user.click(getDeleteButton('りんご'));

        expect(getCombobox()).toHaveAttribute('placeholder', '果物を検索');
      });

      it('value に Chip が描画されていなくても、value があれば placeholder を出さない', () => {
        render(<MultipleComboboxWithChips initialValue={['apple']} chipValues={[]} placeholder="果物を検索" />);

        expect(getCombobox()).not.toHaveAttribute('placeholder');
      });

      it('チップの折り返し領域の余白を押すと input にフォーカスする', () => {
        render(<MultipleComboboxWithChips initialValue={['apple']} />);
        const chipArea = getCombobox().parentElement;
        expect(chipArea).not.toBeNull();

        if (chipArea != null) {
          fireEvent.mouseDown(chipArea);
        }

        expect(document.activeElement).toBe(getCombobox());
      });

      it('HelperMessage の表示・非表示で枠が入れ替わっても、余白を押すと input にフォーカスし、古い枠の listener は外れる', () => {
        // 枠 = チップの折り返し領域（input の親）のさらに親
        const getFrame = () => getCombobox().parentElement?.parentElement ?? null;
        const { rerender } = render(<MultipleComboboxWithChips initialValue={['apple']} />);
        const initialFrame = getFrame();
        expect(initialFrame).not.toBeNull();
        const removeSpy = initialFrame != null ? vi.spyOn(initialFrame, 'removeEventListener') : null;

        rerender(
          <MultipleComboboxWithChips
            initialValue={['apple']}
            inputChildren={<Combobox.HelperMessage>補足</Combobox.HelperMessage>}
          />,
        );
        const frameWithMessage = getFrame();
        expect(frameWithMessage).not.toBe(initialFrame);
        expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

        rerender(<MultipleComboboxWithChips initialValue={['apple']} />);
        const frameWithoutMessage = getFrame();
        expect(frameWithoutMessage).not.toBe(frameWithMessage);

        const chipArea = getCombobox().parentElement;
        if (chipArea != null) {
          fireEvent.mouseDown(chipArea);
        }

        expect(document.activeElement).toBe(getCombobox());
      });

      it('単一選択では枠の余白を押しても input にフォーカスしない（従来どおり）', () => {
        render(<ControlledCombobox />);
        const frame = getCombobox().parentElement;

        if (frame != null) {
          fireEvent.mouseDown(frame);
        }

        expect(document.activeElement).not.toBe(getCombobox());
      });

      it('クリアボタンを描画しない', async () => {
        const user = userEvent.setup();
        render(<MultipleComboboxWithChips initialValue={['apple']} />);
        await user.type(getCombobox(), 'み');

        expect(screen.queryByRole('button', { name: '入力をクリア' })).toBeNull();
      });

      it('単一選択では Chip を描画せず、DOM は Chip を置かない場合と同じ', () => {
        const noop = vi.fn();
        const renderSingle = (withChip: boolean) => (
          <Combobox value="apple" onChange={noop} inputValue="りんご" onInputChange={noop} placeholder="果物を検索">
            <Combobox.Input>{withChip && <Combobox.Chip value="apple" label="りんご" />}</Combobox.Input>
            <Combobox.List>
              <Combobox.Item value="apple" label="りんご" />
            </Combobox.List>
          </Combobox>
        );
        // useId の採番差を除いて比較する
        const normalize = (html: string) => html.replace(/(«|:)r[0-9a-z]+(»|:)/g, 'ID');

        const { container, unmount } = render(renderSingle(false));
        const htmlWithoutChip = normalize(container.innerHTML);
        unmount();
        const { container: containerWithChip } = render(renderSingle(true));

        expect(queryDeleteButton('りんご')).toBeNull();
        expect(normalize(containerWithChip.innerHTML)).toBe(htmlWithoutChip);
      });

      it('HelperMessage / ErrorMessage を Chip と併記しても aria-describedby が従来どおり配線される', () => {
        render(
          <MultipleComboboxWithChips
            initialValue={['apple']}
            isError
            inputChildren={[
              <Combobox.HelperMessage key="helper">補足</Combobox.HelperMessage>,
              <Combobox.ErrorMessage key="error">エラー</Combobox.ErrorMessage>,
            ]}
          />,
        );

        const describedBy = getCombobox().getAttribute('aria-describedby') ?? '';
        const describedTexts = describedBy.split(' ').map((id) => document.getElementById(id)?.textContent);
        expect(describedTexts).toEqual(['補足', 'エラー']);
        expect(getDeleteButton('りんご')).toBeInTheDocument();
      });
    });

    describe('Combobox.Chip の長いラベル', () => {
      const longLabel = 'シャインマスカット（長い名前の表示確認用・とても長いラベル）';

      it('文字を省略用の span に入れて title に全文を出し、Tag と Chip の外側に幅の制限クラスを付ける', () => {
        render(<MultipleComboboxWithChips initialValue={['apple']} chipLabels={{ apple: longLabel }} />);

        const text = screen.getByText(longLabel, { selector: 'span[title]' });
        expect(text).toHaveClass('truncate');
        expect(text).toHaveAttribute('title', longLabel);

        const tag = text.parentElement;
        expect(tag).toHaveClass('min-w-0', 'max-w-full');
        expect(tag?.parentElement).toHaveClass('flex', 'min-w-0', 'max-w-full');
      });

      it('✗ の accessible name は全文の「{label}を削除」になり、✗ は縮まない', () => {
        render(<MultipleComboboxWithChips initialValue={['apple']} chipLabels={{ apple: longLabel }} />);

        const deleteButton = getDeleteButton(longLabel);
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).toHaveClass('shrink-0');
      });

      it('✗ で削除したときの aria-live 通知も全文で行う', async () => {
        const user = userEvent.setup();
        const { container } = render(
          <MultipleComboboxWithChips initialValue={['apple']} chipLabels={{ apple: longLabel }} />,
        );

        await user.click(getDeleteButton(longLabel));

        expect(getLiveRegion(container)).toHaveTextContent(`「${longLabel}」を削除しました`);
      });

      it('短いラベルでも同じ構造で描画する（省略されないだけ）', () => {
        render(<MultipleComboboxWithChips initialValue={['apple']} />);

        const text = screen.getByText('りんご', { selector: 'span[title]' });
        expect(text).toHaveClass('truncate');
        expect(text).toHaveAttribute('title', 'りんご');
        expect(text.parentElement?.parentElement).toHaveClass('flex', 'min-w-0', 'max-w-full');
        expect(getDeleteButton('りんご')).toHaveClass('shrink-0');
      });
    });

    describe('Combobox.Chip の ✗ で削除', () => {
      it('✗ クリックでその値だけを外し、input のフォーカスを保ち、リストの開閉は変えない', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const onOpenChange = vi.fn();
        render(
          <MultipleComboboxWithChips
            initialValue={['apple', 'orange', 'peach']}
            onChange={onChange}
            onOpenChange={onOpenChange}
          />,
        );
        await user.click(getCombobox());
        await user.keyboard('{Escape}');
        onOpenChange.mockClear();

        await user.click(getDeleteButton('みかん'));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(['apple', 'peach'], { type: 'remove', value: 'orange' });
        expect(document.activeElement).toBe(getCombobox());
        expect(onOpenChange).not.toHaveBeenCalled();
        expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
      });

      it('input が未フォーカスのときの ✗ クリックはフォーカスを移さず、リストも開かない', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const onOpenChange = vi.fn();
        render(<MultipleComboboxWithChips initialValue={['apple']} onChange={onChange} onOpenChange={onOpenChange} />);

        await user.click(getDeleteButton('りんご'));

        expect(onChange).toHaveBeenCalledWith([], { type: 'remove', value: 'apple' });
        expect(document.activeElement).not.toBe(getCombobox());
        expect(onOpenChange).not.toHaveBeenCalled();
      });

      it('value に無い値の Chip の ✗ は onChange を呼ばない', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
          <MultipleComboboxWithChips initialValue={['apple']} chipValues={['apple', 'peach']} onChange={onChange} />,
        );

        await user.click(getDeleteButton('もも'));

        expect(onChange).not.toHaveBeenCalled();
      });

      it('同じ value の Chip が 2 つあっても、どちらの ✗ でもその値が 1 回削除される', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const noop = vi.fn();
        render(
          <Combobox isMultiple value={['apple', 'peach']} onChange={onChange} inputValue="" onInputChange={noop}>
            <Combobox.Input aria-label="果物">
              <Combobox.Chip key="first" value="apple" label="りんご" />
              <Combobox.Chip key="second" value="apple" label="りんご" />
            </Combobox.Input>
            <Combobox.List>
              <Combobox.Item value="apple" label="りんご" />
            </Combobox.List>
          </Combobox>,
        );
        const [, secondButton] = screen.getAllByRole('button', { name: 'りんごを削除' });
        expect(secondButton).toBeDefined();

        if (secondButton != null) {
          await user.click(secondButton);
        }

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(['peach'], { type: 'remove', value: 'apple' });
      });

      it.each([
        { key: '{Enter}', name: 'Enter' },
        { key: ' ', name: 'Space' },
      ])(
        'キーボード（Shift+Tab → $name）で任意のチップを削除でき、削除後は input にフォーカスが戻る',
        async ({ key }) => {
          const user = userEvent.setup();
          const onChange = vi.fn();
          render(<MultipleComboboxWithChips initialValue={['apple', 'orange', 'peach']} onChange={onChange} />);
          await user.click(getCombobox());

          await user.tab({ shift: true });
          await user.tab({ shift: true });
          expect(document.activeElement).toBe(getDeleteButton('みかん'));

          await user.keyboard(key);

          expect(onChange).toHaveBeenCalledTimes(1);
          expect(onChange).toHaveBeenCalledWith(['apple', 'peach'], { type: 'remove', value: 'orange' });
          expect(getDeleteButton('りんご')).toBeInTheDocument();
          expect(getDeleteButton('もも')).toBeInTheDocument();
          expect(document.activeElement).toBe(getCombobox());
        },
      );

      it('リストを開いた状態で ✗ にフォーカスを移すと、リストが閉じ入力が空に戻る', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const onOpenChange = vi.fn();
        render(<MultipleComboboxWithChips initialValue={['apple']} onChange={onChange} onOpenChange={onOpenChange} />);
        await user.click(getCombobox());
        await user.type(getCombobox(), 'み');
        expect(getListbox()).toHaveStyle({ visibility: 'visible' });

        await user.tab({ shift: true });

        expect(document.activeElement).toBe(getDeleteButton('りんご'));
        expect(onOpenChange).toHaveBeenLastCalledWith(false);
        expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
        expect(getCombobox()).toHaveValue('');
        expect(onChange).not.toHaveBeenCalled();
      });

      it('Popover 内で ✗ にフォーカスがあるときの Escape は、リストを閉じた状態で親に伝搬する', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();
        const onChange = vi.fn();
        const onOpenChange = vi.fn();
        render(
          <Popover isOpen onClose={onClose}>
            <Popover.Trigger>
              <button type="button">trigger</button>
            </Popover.Trigger>
            <Popover.Content>
              <div>
                <MultipleComboboxWithChips initialValue={['apple']} onChange={onChange} onOpenChange={onOpenChange} />
              </div>
            </Popover.Content>
          </Popover>,
        );
        await user.click(getCombobox());
        expect(getListbox()).toHaveStyle({ visibility: 'visible' });

        await user.tab({ shift: true });
        expect(getListbox()).toHaveStyle({ visibility: 'hidden' });
        onOpenChange.mockClear();

        await user.keyboard('{Escape}');

        expect(onClose).toHaveBeenCalledWith({ reason: 'escape-key-down' });
        expect(onOpenChange).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
      });

      it('isDisabled のときは ✗ を描画せず、Tab 順にも出ない', async () => {
        const user = userEvent.setup();
        render(
          <>
            <button type="button">前</button>
            <MultipleComboboxWithChips initialValue={['apple', 'orange']} isDisabled />
          </>,
        );
        expect(screen.getByText('りんご', { selector: 'span[title]' })).toBeInTheDocument();

        expect(queryDeleteButton('りんご')).toBeNull();
        expect(queryDeleteButton('みかん')).toBeNull();
        await user.tab();
        await user.tab();
        expect(document.body).toBe(document.activeElement);
      });
    });

    describe('入力欄の同一性とフォーカス（0 ↔ 1 件）', () => {
      it('最初の追加（クリック / Enter）で input が同じ DOM ノードのままフォーカスを保つ', async () => {
        const user = userEvent.setup();
        render(<MultipleComboboxWithChips />);
        await user.click(getCombobox());
        const input = getCombobox();

        await user.click(getOption('りんご'));
        expect(getCombobox()).toBe(input);
        expect(document.activeElement).toBe(input);

        await user.keyboard('{Backspace}');
        await user.keyboard('{Enter}');
        expect(getDeleteButton('りんご')).toBeInTheDocument();
        expect(getCombobox()).toBe(input);
        expect(document.activeElement).toBe(input);
      });

      it('最後の削除（✗ クリック）で input が同じ DOM ノードのままフォーカスを保つ', async () => {
        const user = userEvent.setup();
        render(<MultipleComboboxWithChips initialValue={['apple']} />);
        await user.click(getCombobox());
        const input = getCombobox();

        await user.click(getDeleteButton('りんご'));

        expect(getCombobox()).toBe(input);
        expect(document.activeElement).toBe(input);
      });

      it('最後の削除（✗ をキーボード）で input が同じ DOM ノードのままフォーカスが戻る', async () => {
        const user = userEvent.setup();
        render(<MultipleComboboxWithChips initialValue={['apple']} />);
        await user.click(getCombobox());
        const input = getCombobox();

        await user.tab({ shift: true });
        await user.keyboard('{Enter}');

        expect(queryDeleteButton('りんご')).toBeNull();
        expect(getCombobox()).toBe(input);
        expect(document.activeElement).toBe(input);
      });

      it('最後の削除（Backspace）で input が同じ DOM ノードのままフォーカスを保つ', async () => {
        const user = userEvent.setup();
        render(<MultipleComboboxWithChips initialValue={['apple']} />);
        await user.click(getCombobox());
        const input = getCombobox();

        await user.keyboard('{Backspace}');

        expect(queryDeleteButton('りんご')).toBeNull();
        expect(getCombobox()).toBe(input);
        expect(document.activeElement).toBe(input);
      });
    });

    describe('外せないチップ（isRemovable={false}）', () => {
      it('✗ を描画せず、Tab 順にも出ない', async () => {
        const user = userEvent.setup();
        render(<MultipleComboboxWithChips initialValue={['apple', 'orange']} fixedValues={['orange']} />);
        expect(screen.getByText('みかん', { selector: 'span[title]' })).toBeInTheDocument();
        expect(queryDeleteButton('みかん')).toBeNull();
        await user.click(getCombobox());

        await user.tab({ shift: true });

        expect(document.activeElement).toBe(getDeleteButton('りんご'));
      });

      it('Backspace は末尾から外せる値を探して削除する（[A(固定), B, C(固定)] → B）', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
          <MultipleComboboxWithChips
            initialValue={['apple', 'orange', 'peach']}
            fixedValues={['apple', 'peach']}
            onChange={onChange}
          />,
        );
        await user.click(getCombobox());

        await user.keyboard('{Backspace}');

        expect(onChange).toHaveBeenCalledWith(['apple', 'peach'], { type: 'remove', value: 'orange' });
      });

      it('すべて外せないときの Backspace は何もしない', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
          <MultipleComboboxWithChips
            initialValue={['apple', 'orange']}
            fixedValues={['apple', 'orange']}
            onChange={onChange}
          />,
        );
        await user.click(getCombobox());

        await user.keyboard('{Backspace}');

        expect(onChange).not.toHaveBeenCalled();
      });

      it('外せない値の候補を再選択しても外れない', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<MultipleComboboxWithChips initialValue={['apple']} fixedValues={['apple']} onChange={onChange} />);
        await user.click(getCombobox());

        await user.click(getOption('りんご'));

        expect(onChange).not.toHaveBeenCalled();
        expect(getOption('りんご')).toHaveAttribute('aria-selected', 'true');
      });

      it('Chip を unmount すると固定が解除され、Backspace の対象に戻る', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const noop = vi.fn();
        const renderWithChip = (hasChip: boolean) => (
          <Combobox isMultiple value={['apple']} onChange={onChange} inputValue="" onInputChange={noop}>
            <Combobox.Input aria-label="果物">
              {hasChip && <Combobox.Chip value="apple" label="りんご" isRemovable={false} />}
            </Combobox.Input>
            <Combobox.List>
              <Combobox.Item value="apple" label="りんご" />
            </Combobox.List>
          </Combobox>
        );
        const { rerender } = render(renderWithChip(true));
        await user.click(getCombobox());
        await user.keyboard('{Backspace}');
        expect(onChange).not.toHaveBeenCalled();

        rerender(renderWithChip(false));
        await user.keyboard('{Backspace}');

        expect(onChange).toHaveBeenCalledWith([], { type: 'remove', value: 'apple' });
      });
    });

    describe('Combobox.Chip と aria-live 通知', () => {
      it('削除通知に Chip の label を使う', async () => {
        const user = userEvent.setup();
        const { container } = render(
          <MultipleComboboxWithChips initialValue={['apple']} chipLabels={{ apple: '青森のりんご' }} />,
        );

        await user.click(getDeleteButton('青森のりんご'));

        expect(getLiveRegion(container)).toHaveTextContent('「青森のりんご」を削除しました');
      });

      it('Chip の label を変更した後に削除すると、新しい label で通知する', () => {
        const noop = vi.fn();
        const renderWithLabel = (value: string[], label: string) => (
          <Combobox isMultiple value={value} onChange={noop} inputValue="" onInputChange={noop}>
            <Combobox.Input aria-label="果物">
              {value.map((chipValue) => (
                <Combobox.Chip key={chipValue} value={chipValue} label={label} />
              ))}
            </Combobox.Input>
            <Combobox.List>
              <Combobox.Item value="apple" label="りんご" />
            </Combobox.List>
          </Combobox>
        );
        const { container, rerender } = render(renderWithLabel(['apple'], '旧名称'));
        rerender(renderWithLabel(['apple'], '新名称'));
        expect(getDeleteButton('新名称')).toBeInTheDocument();

        rerender(renderWithLabel([], '新名称'));

        expect(getLiveRegion(container)).toHaveTextContent('「新名称」を削除しました');
      });
    });

    describe('型', () => {
      it('isMultiple 無しの配列 value と、multiple での onClickClearButton は型エラーになる', () => {
        const noop = vi.fn();
        const common = { inputValue: '', onInputChange: noop, onChange: noop };
        // @ts-expect-error isMultiple を指定しない場合、value に配列は渡せない
        const singleWithArray: ComboboxProps = { ...common, value: ['apple'] };
        // @ts-expect-error 複数選択ではクリアボタンを指定できない
        const multipleWithClear: ComboboxProps = { ...common, isMultiple: true, value: [], onClickClearButton: noop };
        const multiple: ComboboxProps = { ...common, isMultiple: true, value: ['apple'] };

        expect([singleWithArray, multipleWithClear, multiple]).toHaveLength(3);
      });
    });
  });
});
