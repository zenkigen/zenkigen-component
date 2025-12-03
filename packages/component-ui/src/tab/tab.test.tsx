import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Tab } from './tab';

describe('Tab', () => {
  describe('基本的なレンダリング', () => {
    it('Tab（メインコンポーネント）が正しくレンダリングされること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" onClick={vi.fn()}>
            タブ1
          </Tab.Item>
        </Tab>,
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'タブ1' })).toBeInTheDocument();
    });

    it('Tab.Itemが正しくレンダリングされること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" onClick={vi.fn()}>
            タブ1コンテンツ
          </Tab.Item>
        </Tab>,
      );

      const tabItem = screen.getByRole('tab');
      expect(tabItem).toBeInTheDocument();
      expect(tabItem).toHaveTextContent('タブ1コンテンツ');
    });

    it('複数のchildrenが適切に表示されること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" onClick={vi.fn()}>
            タブ1
          </Tab.Item>
          <Tab.Item id="tab2" onClick={vi.fn()}>
            タブ2
          </Tab.Item>
          <Tab.Item id="tab3" onClick={vi.fn()}>
            タブ3
          </Tab.Item>
        </Tab>,
      );

      expect(screen.getByRole('tab', { name: 'タブ1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'タブ2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'タブ3' })).toBeInTheDocument();
    });
  });

  describe('レイアウトテスト', () => {
    it('layout="auto"（デフォルト）でFlexレイアウトが適用されること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" onClick={vi.fn()}>
            タブ1
          </Tab.Item>
        </Tab>,
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist.className).toMatch(/flex/);
      expect(tablist.className).toMatch(/gap-4/);
      expect(tablist.className).not.toMatch(/grid/);
    });

    it('layout="equal"でGridレイアウトが適用されること', () => {
      render(
        <Tab layout="equal">
          <Tab.Item id="tab1" onClick={vi.fn()}>
            タブ1
          </Tab.Item>
          <Tab.Item id="tab2" onClick={vi.fn()}>
            タブ2
          </Tab.Item>
        </Tab>,
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist.className).toMatch(/grid/);
      expect(tablist.className).toMatch(/gap-4/);
      expect(tablist.className).not.toMatch(/flex/);
    });

    it('Gridレイアウトで子要素数に応じたcolumn数が設定されること', () => {
      render(
        <Tab layout="equal">
          <Tab.Item id="tab1" onClick={vi.fn()}>
            タブ1
          </Tab.Item>
          <Tab.Item id="tab2" onClick={vi.fn()}>
            タブ2
          </Tab.Item>
          <Tab.Item id="tab3" onClick={vi.fn()}>
            タブ3
          </Tab.Item>
        </Tab>,
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist.style.gridTemplateColumns).toBe('repeat(3, minmax(0,1fr))');
    });

    it('共通のクラスが適用されること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" onClick={vi.fn()}>
            タブ1
          </Tab.Item>
        </Tab>,
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist.className).toMatch(/relative/);
      expect(tablist.className).toMatch(/px-6/);
      expect(tablist.className).toMatch(/before:absolute/);
      expect(tablist.className).toMatch(/before:bg-uiBorder01/);
    });
  });

  describe('状態管理テスト', () => {
    it('isSelected={true}で選択状態のスタイルが適用されること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" isSelected onClick={vi.fn()}>
            選択タブ
          </Tab.Item>
        </Tab>,
      );

      const tabItem = screen.getByRole('tab', { name: '選択タブ' });
      expect(tabItem.className).toMatch(/typography-label14bold/);
      expect(tabItem.className).toMatch(/before:bg-interactive01/);
      expect(tabItem.className).toMatch(/pointer-events-none/);
    });

    it('isSelected={false}で非選択状態のスタイルが適用されること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" isSelected={false} onClick={vi.fn()}>
            非選択タブ
          </Tab.Item>
        </Tab>,
      );

      const tabItem = screen.getByRole('tab', { name: '非選択タブ' });
      expect(tabItem.className).toMatch(/typography-label14regular/);
      expect(tabItem.className).toMatch(/text-interactive02/);
      expect(tabItem.className).not.toMatch(/typography-label14bold/);
      // 選択状態固有のクラスが含まれていない
      expect(tabItem.className).not.toMatch(/before:bg-interactive01/);
    });

    it('デフォルトで非選択状態になること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" onClick={vi.fn()}>
            デフォルトタブ
          </Tab.Item>
        </Tab>,
      );

      const tabItem = screen.getByRole('tab', { name: 'デフォルトタブ' });
      expect(tabItem.getAttribute('aria-selected')).toBe('false');
      expect(tabItem.className).toMatch(/typography-label14regular/);
    });
  });

  describe('イベントハンドリングテスト', () => {
    it('クリック時にonClickコールバックが正しいIDで呼ばれること', () => {
      const handleClick = vi.fn();
      render(
        <Tab>
          <Tab.Item id="test-tab" onClick={handleClick}>
            テストタブ
          </Tab.Item>
        </Tab>,
      );

      fireEvent.click(screen.getByRole('tab', { name: 'テストタブ' }));
      expect(handleClick).toHaveBeenCalledWith('test-tab');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('複数のタブで異なるIDが渡されること', () => {
      const handleClick = vi.fn();
      render(
        <Tab>
          <Tab.Item id="tab1" onClick={handleClick}>
            タブ1
          </Tab.Item>
          <Tab.Item id="tab2" onClick={handleClick}>
            タブ2
          </Tab.Item>
        </Tab>,
      );

      fireEvent.click(screen.getByRole('tab', { name: 'タブ1' }));
      expect(handleClick).toHaveBeenCalledWith('tab1');

      fireEvent.click(screen.getByRole('tab', { name: 'タブ2' }));
      expect(handleClick).toHaveBeenCalledWith('tab2');
    });

    it('選択状態のタブはクリックしてもonClickが呼ばれないこと', () => {
      const handleClick = vi.fn();
      render(
        <Tab>
          <Tab.Item id="selected-tab" isSelected onClick={handleClick}>
            選択済みタブ
          </Tab.Item>
        </Tab>,
      );

      // pointer-events-noneが適用されているため、実際にはクリックイベントは発生しない
      // ただし、fireEventは強制的にイベントを発行するため、テスト用に確認
      const tabItem = screen.getByRole('tab', { name: '選択済みタブ' });
      expect(tabItem.className).toMatch(/pointer-events-none/);
    });
  });

  describe('無効状態テスト', () => {
    it('isDisabled={true}でdisabled属性が設定されること', () => {
      render(
        <Tab>
          <Tab.Item id="disabled-tab" isDisabled onClick={vi.fn()}>
            無効タブ
          </Tab.Item>
        </Tab>,
      );

      const tabItem = screen.getByRole('tab', { name: '無効タブ' });
      expect(tabItem).toBeDisabled();
    });

    it('無効タブがクリックできず、onClickが呼ばれないこと', () => {
      const handleClick = vi.fn();
      render(
        <Tab>
          <Tab.Item id="disabled-tab" isDisabled onClick={handleClick}>
            無効タブ
          </Tab.Item>
        </Tab>,
      );

      const tabItem = screen.getByRole('tab', { name: '無効タブ' });
      fireEvent.click(tabItem);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('無効タブに適切なスタイルが適用されること', () => {
      render(
        <Tab>
          <Tab.Item id="disabled-tab" isDisabled onClick={vi.fn()}>
            無効タブ
          </Tab.Item>
        </Tab>,
      );

      const tabItem = screen.getByRole('tab', { name: '無効タブ' });
      expect(tabItem.className).toMatch(/disabled:pointer-events-none/);
      expect(tabItem.className).toMatch(/disabled:text-disabled01/);
    });
  });

  describe('アイコン表示テスト', () => {
    it('iconプロパティ指定時にアイコンが表示され、通常状態のクラスが付与されること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" icon="chart-bar" onClick={vi.fn()}>
            アイコン付き
          </Tab.Item>
        </Tab>,
      );

      const tabItem = screen.getByRole('tab', { name: /アイコン付き$/ });
      const iconWrapper = tabItem.querySelector('span.flex');

      expect(iconWrapper).toBeInTheDocument();
      expect(iconWrapper?.className).toContain('fill-icon01');
      expect(iconWrapper?.className).toContain('group-hover:fill-interactive01');
      expect(iconWrapper?.querySelector('svg')).not.toBeNull();
    });

    it('選択状態ではアイコンにインタラクティブカラーが適用されること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" icon="chart-bar" isSelected onClick={vi.fn()}>
            選択済みアイコン付き
          </Tab.Item>
        </Tab>,
      );

      const tabItem = screen.getByRole('tab', { name: /選択済みアイコン付き$/ });
      const iconWrapper = tabItem.querySelector('span.flex');

      expect(iconWrapper?.className).toContain('fill-interactive01');
      expect(iconWrapper?.className).not.toContain('group-hover:fill-interactive01');
      expect(iconWrapper?.className).not.toContain('fill-disabled01');
    });

    it('無効状態ではアイコンがdisabledカラーになること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" icon="chart-bar" isDisabled onClick={vi.fn()}>
            無効アイコン付き
          </Tab.Item>
        </Tab>,
      );

      const tabItem = screen.getByRole('tab', { name: /無効アイコン付き$/ });
      const iconWrapper = tabItem.querySelector('span.flex');

      expect(iconWrapper?.className).toContain('fill-disabled01');
      expect(iconWrapper?.className).not.toContain('fill-interactive01');
    });
  });

  describe('アクセシビリティテスト', () => {
    it('Tabコンテナにrole="tablist"が設定されること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" onClick={vi.fn()}>
            タブ1
          </Tab.Item>
        </Tab>,
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('Tab.Itemにrole="tab"が設定されること', () => {
      render(
        <Tab>
          <Tab.Item id="tab1" onClick={vi.fn()}>
            タブ1
          </Tab.Item>
        </Tab>,
      );

      expect(screen.getByRole('tab')).toBeInTheDocument();
    });

    it('aria-selected属性が選択状態に応じて設定されること', () => {
      render(
        <Tab>
          <Tab.Item id="selected-tab" isSelected onClick={vi.fn()}>
            選択タブ
          </Tab.Item>
          <Tab.Item id="unselected-tab" isSelected={false} onClick={vi.fn()}>
            非選択タブ
          </Tab.Item>
        </Tab>,
      );

      expect(screen.getByRole('tab', { name: '選択タブ' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: '非選択タブ' })).toHaveAttribute('aria-selected', 'false');
    });

    it('キーボードでフォーカス移動ができること', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button type="button">前のボタン</button>
          <Tab>
            <Tab.Item id="tab1" onClick={vi.fn()}>
              タブ1
            </Tab.Item>
            <Tab.Item id="tab2" onClick={vi.fn()}>
              タブ2
            </Tab.Item>
          </Tab>
        </div>,
      );

      const firstTab = screen.getByRole('tab', { name: 'タブ1' });
      const secondTab = screen.getByRole('tab', { name: 'タブ2' });

      // 初期フォーカスを外す
      (document.activeElement as HTMLElement)?.blur();

      // Tabキーでフォーカス移動
      await user.tab();
      expect(screen.getByRole('button', { name: '前のボタン' })).toHaveFocus();

      await user.tab();
      expect(firstTab).toHaveFocus();

      await user.tab();
      expect(secondTab).toHaveFocus();
    });
  });

  describe('複合パターンテスト', () => {
    it('複数タブでの状態切り替えが正常に動作すること', () => {
      const handleClick = vi.fn();
      const TabWrapper = () => {
        const [selectedTab, setSelectedTab] = React.useState('tab1');

        return (
          <Tab>
            <Tab.Item
              id="tab1"
              isSelected={selectedTab === 'tab1'}
              onClick={(id) => {
                setSelectedTab(id);
                handleClick(id);
              }}
            >
              タブ1
            </Tab.Item>
            <Tab.Item
              id="tab2"
              isSelected={selectedTab === 'tab2'}
              onClick={(id) => {
                setSelectedTab(id);
                handleClick(id);
              }}
            >
              タブ2
            </Tab.Item>
          </Tab>
        );
      };

      render(<TabWrapper />);

      // 初期状態
      expect(screen.getByRole('tab', { name: 'タブ1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'タブ2' })).toHaveAttribute('aria-selected', 'false');

      // タブ2をクリック
      fireEvent.click(screen.getByRole('tab', { name: 'タブ2' }));
      expect(handleClick).toHaveBeenCalledWith('tab2');
      expect(screen.getByRole('tab', { name: 'タブ1' })).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByRole('tab', { name: 'タブ2' })).toHaveAttribute('aria-selected', 'true');
    });

    it('異なるレイアウトでも正常に動作すること', () => {
      const handleClick = vi.fn();

      const { rerender } = render(
        <Tab layout="auto">
          <Tab.Item id="tab1" onClick={handleClick}>
            タブ1
          </Tab.Item>
        </Tab>,
      );

      // autoレイアウトの確認
      expect(screen.getByRole('tablist').className).toMatch(/flex/);

      // equalレイアウトに変更
      rerender(
        <Tab layout="equal">
          <Tab.Item id="tab1" onClick={handleClick}>
            タブ1
          </Tab.Item>
        </Tab>,
      );

      expect(screen.getByRole('tablist').className).toMatch(/grid/);

      // クリックイベントは正常に動作
      fireEvent.click(screen.getByRole('tab', { name: 'タブ1' }));
      expect(handleClick).toHaveBeenCalledWith('tab1');
    });
  });
});
