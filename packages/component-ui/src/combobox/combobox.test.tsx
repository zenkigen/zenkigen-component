import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Combobox } from './combobox';

/**
 * Combobox テスト
 *
 * テストの構成：
 * - 基本レンダリング: Input / List / Item の描画
 * - open / close: focus / Escape / outside click
 * - 選択動作: クリック、Enter で onChange が呼ばれる
 * - キーボード操作: ArrowUp/Down/Enter/Escape/Alt
 * - activeIndex 初期化: selectedValue 優先 / 先頭 enabled / close → 再 open
 * - items 更新時の active 維持: 並び替え / フィルタ絞り込み / フィルタで消えた場合
 * - 選択済み視覚強調 (isSelected の DOM 伝搬)
 * - scrollIntoView / inputMode: keyboard のみで scroll、mouse では抑止、reopen で keyboard に戻る
 * - scrollTop リセット: open 直後に 0
 * - isError / isDisabled: 視覚 / 操作抑止
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

  return (
    <Combobox
      value={value}
      onChange={(next, meta) => {
        setValue(next);
        setInputValue(meta?.label ?? '');
        onSelectionChange?.(next);
      }}
      inputValue={inputValue}
      onInputChange={setInputValue}
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

const getCombobox = () => screen.getByRole('combobox') as HTMLInputElement;
const getListbox = () => screen.getByRole('listbox', { hidden: true });
const getOption = (name: string | RegExp) => screen.getByRole('option', { name, hidden: true });
const queryOptions = () => screen.queryAllByRole('option', { hidden: true });

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
});
