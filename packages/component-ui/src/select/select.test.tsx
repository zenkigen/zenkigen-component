import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './select';
import type { SelectOption } from './type';

/**
 * Select テストについて
 *
 * テストの構成：
 * - 基本機能：レンダリング、プロパティ反映、オプション表示
 * - イベント処理：選択、選択解除、外部クリック
 * - 状態管理：エラー状態、無効状態、選択状態
 * - サイズ・バリアント：各サイズとバリアントの表示
 * - アクセシビリティ：フォーカス管理、キーボード操作
 * - 特殊機能：アイコン表示、自動スクロール、幅制御
 */

// テスト用のオプションデータ
const testOptions: SelectOption[] = [
  { id: '1', label: '選択肢A', value: 'option-a' },
  { id: '2', label: '選択肢B', value: 'option-b' },
  { id: '3', label: '選択肢C', value: 'option-c' },
];

const testOptionsWithIcons: SelectOption[] = [
  { id: '1', label: '追加', value: 'add', icon: 'add' },
  { id: '2', label: '警告', value: 'warning', icon: 'warning' },
  { id: '3', label: 'ユーザー', value: 'user', icon: 'user' },
];

// テスト用のコンポーネント
const SelectTestComponent = ({
  options = testOptions,
  initialOption = null,
  'data-testid': dataTestId,
  ...props
}: {
  options?: SelectOption[];
  initialOption?: SelectOption | null;
  'data-testid'?: string;
} & Record<string, unknown>) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(initialOption);

  return (
    <div data-testid={dataTestId}>
      <Select selectedOption={selectedOption} onChange={setSelectedOption} {...props}>
        {options.map((option) => (
          <Select.Option key={option.id} option={option} />
        ))}
      </Select>
    </div>
  );
};

describe('Select', () => {
  describe('基本機能', () => {
    it('正常にレンダリングされること', () => {
      render(<SelectTestComponent placeholder="選択してください" data-testid="select" />);
      const selectButton = screen.getByRole('button');
      expect(selectButton).toBeInTheDocument();
      expect(selectButton).toHaveTextContent('選択してください');
    });

    it('プレースホルダーが正しく表示されること', () => {
      render(<SelectTestComponent placeholder="テストプレースホルダー" />);
      const selectButton = screen.getByRole('button');
      expect(selectButton).toHaveTextContent('テストプレースホルダー');
    });

    it('クリックでオプションリストが表示されること', () => {
      render(<SelectTestComponent placeholder="選択" />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);

      expect(screen.getByText('選択肢A')).toBeInTheDocument();
      expect(screen.getByText('選択肢B')).toBeInTheDocument();
      expect(screen.getByText('選択肢C')).toBeInTheDocument();
    });

    it('オプションを選択できること', () => {
      render(<SelectTestComponent placeholder="選択" />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);
      fireEvent.click(screen.getByText('選択肢B'));

      expect(selectButton).toHaveTextContent('選択肢B');
    });

    it('onChangeコールバックが呼ばれること', () => {
      const handleChange = vi.fn();
      render(
        <Select onChange={handleChange}>
          {testOptions.map((option) => (
            <Select.Option key={option.id} option={option} />
          ))}
        </Select>,
      );

      const selectButton = screen.getByRole('button');
      fireEvent.click(selectButton);
      fireEvent.click(screen.getByText('選択肢A'));

      expect(handleChange).toHaveBeenCalledWith(testOptions[0]);
    });
  });

  describe('選択解除機能', () => {
    it('プレースホルダーがあり何かが選択されている場合、選択解除ボタンが表示されること', () => {
      render(<SelectTestComponent placeholder="選択" initialOption={testOptions[1]} />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);

      expect(screen.getByText('選択解除')).toBeInTheDocument();
    });

    it('プレースホルダーがない場合、選択解除ボタンが表示されないこと', () => {
      render(<SelectTestComponent initialOption={testOptions[1]} />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);

      expect(screen.queryByText('選択解除')).not.toBeInTheDocument();
    });

    it('選択解除ボタンで選択を解除できること', () => {
      render(<SelectTestComponent placeholder="選択" initialOption={testOptions[1]} />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);
      fireEvent.click(screen.getByText('選択解除'));

      expect(selectButton).toHaveTextContent('選択');
    });
  });

  describe('外部クリック検知', () => {
    it('外部をクリックするとオプションリストが閉じること', async () => {
      render(
        <div>
          <SelectTestComponent placeholder="選択" />
          <div data-testid="outside">外部要素</div>
        </div>,
      );

      const selectButton = screen.getByRole('button');
      fireEvent.click(selectButton);

      // オプションリストが表示されることを確認
      expect(screen.getByRole('list')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('outside'));

      await waitFor(() => {
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
      });
    });
  });

  describe('サイズバリエーション', () => {
    it('x-smallサイズのスタイルが適用されること', () => {
      render(<SelectTestComponent size="x-small" data-testid="select" />);
      const selectContainer = screen.getByTestId('select');
      const wrapper = selectContainer.querySelector('div');
      expect(wrapper?.className).toMatch(/h-6/);
    });

    it('smallサイズのスタイルが適用されること', () => {
      render(<SelectTestComponent size="small" data-testid="select" />);
      const selectContainer = screen.getByTestId('select');
      const wrapper = selectContainer.querySelector('div');
      expect(wrapper?.className).toMatch(/h-6/);
    });

    it('mediumサイズ（デフォルト）のスタイルが適用されること', () => {
      render(<SelectTestComponent data-testid="select" />);
      const selectContainer = screen.getByTestId('select');
      const wrapper = selectContainer.querySelector('div');
      expect(wrapper?.className).toMatch(/h-8/);
    });

    it('largeサイズのスタイルが適用されること', () => {
      render(<SelectTestComponent size="large" data-testid="select" />);
      const selectContainer = screen.getByTestId('select');
      const wrapper = selectContainer.querySelector('div');
      expect(wrapper?.className).toMatch(/h-10/);
    });
  });

  describe('バリアント', () => {
    it('outlineバリアント（デフォルト）でボーダーが表示されること', () => {
      render(<SelectTestComponent />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);
      const optionList = screen.getByRole('list');
      expect(optionList.className).toMatch(/border-uiBorder01/);
    });

    it('textバリアントでボーダーが表示されないこと', () => {
      render(<SelectTestComponent variant="text" />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);
      const optionList = screen.getByRole('list');
      expect(optionList.className).not.toMatch(/border-uiBorder01/);
    });
  });

  describe('状態管理', () => {
    it('エラー状態のスタイルが適用されること', () => {
      render(<SelectTestComponent isError data-testid="select" />);
      const selectContainer = screen.getByTestId('select');
      const selectButton = selectContainer.querySelector('button');
      expect(selectButton?.className).toMatch(/border-supportError/);
    });

    it('選択状態のスタイルが適用されること', () => {
      render(<SelectTestComponent isOptionSelected initialOption={testOptions[0]} data-testid="select" />);
      const selectContainer = screen.getByTestId('select');
      const selectButton = selectContainer.querySelector('button');
      expect(selectButton?.className).toMatch(/bg-selectedUi/);
    });

    it('無効状態ではクリックできないこと', () => {
      render(<SelectTestComponent isDisabled />);
      const selectButton = screen.getByRole('button');

      expect(selectButton).toBeDisabled();
      fireEvent.click(selectButton);
      expect(screen.queryByText('選択肢A')).not.toBeInTheDocument();
    });

    it('無効状態では選択状態スタイルが適用されないこと', () => {
      render(<SelectTestComponent isDisabled isOptionSelected initialOption={testOptions[0]} data-testid="select" />);
      const selectContainer = screen.getByTestId('select');
      const selectButton = selectContainer.querySelector('button');
      expect(selectButton?.className).not.toMatch(/bg-selectedUi/);
    });

    it('エラー状態 + 無効状態では無効状態が優先されること', () => {
      render(<SelectTestComponent isError isDisabled data-testid="select" />);
      const selectContainer = screen.getByTestId('select');
      const selectButton = selectContainer.querySelector('button');

      // 無効状態のスタイルが適用される
      expect(selectButton).toBeDisabled();
      expect(selectButton?.className).toMatch(/pointer-events-none/);

      // ラッパーに無効状態のカーソルスタイルが適用される
      const wrapper = selectContainer.querySelector('div');
      expect(wrapper?.className).toMatch(/cursor-not-allowed/);
    });

    it('エラー状態 + 無効状態ではクリックできないこと', () => {
      render(<SelectTestComponent isError isDisabled />);
      const selectButton = screen.getByRole('button');

      expect(selectButton).toBeDisabled();
      fireEvent.click(selectButton);

      // オプションリストが表示されない
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('エラー状態 + 無効状態 + 選択状態では無効状態が最優先されること', () => {
      render(
        <SelectTestComponent isError isDisabled isOptionSelected initialOption={testOptions[0]} data-testid="select" />,
      );
      const selectContainer = screen.getByTestId('select');
      const selectButton = selectContainer.querySelector('button');

      // 無効状態が適用される
      expect(selectButton).toBeDisabled();
      expect(selectButton?.className).toMatch(/pointer-events-none/);

      // 選択状態のスタイルは適用されない（無効状態が優先）
      expect(selectButton?.className).not.toMatch(/bg-selectedUi/);

      // エラー状態のスタイルも適用されない（無効状態が優先）
      expect(selectButton?.className).not.toMatch(/border-supportError/);
    });
  });

  describe('アイコン機能', () => {
    it('選択されたオプションのアイコンが表示されること', () => {
      render(<SelectTestComponent options={testOptionsWithIcons} initialOption={testOptionsWithIcons[0]} />);
      const selectButton = screen.getByRole('button');

      // アイコンが表示されていることを確認（aria-labelでアイコンを識別）
      const icon = selectButton.querySelector('[aria-label="add"]');
      expect(icon).toBeInTheDocument();
    });

    it('プレースホルダーアイコンが表示されること', () => {
      render(<SelectTestComponent placeholder="選択" placeholderIcon="filter" />);
      const selectButton = screen.getByRole('button');

      const icon = selectButton.querySelector('[aria-label="filter"]');
      expect(icon).toBeInTheDocument();
    });

    it('選択後はプレースホルダーアイコンではなく選択オプションのアイコンが表示されること', () => {
      render(<SelectTestComponent options={testOptionsWithIcons} placeholder="選択" placeholderIcon="filter" />);
      const selectButton = screen.getByRole('button');

      // 初期状態ではプレースホルダーアイコン
      expect(selectButton.querySelector('[aria-label="filter"]')).toBeInTheDocument();

      // オプションを選択 - 最初のオプション「追加」を選択
      fireEvent.click(selectButton);
      const addOptionButton = screen.getByText('追加').closest('button');
      if (addOptionButton !== null) {
        fireEvent.click(addOptionButton);
      }

      // 選択後は選択オプションのアイコン
      expect(selectButton.querySelector('[aria-label="add"]')).toBeInTheDocument();
      const filterIcon = selectButton.querySelector('[aria-label="filter"]');
      expect(filterIcon).toBe(null);
    });
  });

  describe('幅制御', () => {
    it('width プロパティが適用されること', () => {
      render(<SelectTestComponent width="200px" data-testid="select" />);
      const selectContainer = screen.getByTestId('select');
      const wrapper = selectContainer.querySelector('div');
      expect(wrapper?.style.width).toBe('200px');
    });

    it('maxWidth プロパティが適用されること', () => {
      render(<SelectTestComponent maxWidth="150px" data-testid="select" />);
      const selectContainer = screen.getByTestId('select');
      const wrapper = selectContainer.querySelector('div');
      expect(wrapper?.style.maxWidth).toBe('150px');
    });
  });

  describe('オプションリスト高さ制御', () => {
    it('optionListMaxHeight プロパティが適用されること', () => {
      render(<SelectTestComponent optionListMaxHeight="120px" />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);
      const optionList = screen.getByRole('list');
      expect(optionList.style.maxHeight).toBe('120px');
    });
  });

  describe('アクセシビリティ', () => {
    it('button要素として認識されること', () => {
      render(<SelectTestComponent />);
      const selectButton = screen.getByRole('button');
      expect(selectButton).toBeInTheDocument();
      expect(selectButton.tagName).toBe('BUTTON');
    });

    it('type="button"が設定されていること', () => {
      render(<SelectTestComponent />);
      const selectButton = screen.getByRole('button');
      expect(selectButton).toHaveAttribute('type', 'button');
    });

    it('disabled属性が正しく設定されること', () => {
      render(<SelectTestComponent isDisabled />);
      const selectButton = screen.getByRole('button');
      expect(selectButton).toBeDisabled();
    });

    it('Tabキーでフォーカスできること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(<SelectTestComponent />);

      (document.activeElement as HTMLElement)?.blur();
      await user.tab();

      const selectButton = screen.getByRole('button');
      expect(selectButton).toHaveFocus();
    });

    it('無効状態ではフォーカスできないこと', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(<SelectTestComponent isDisabled />);

      (document.activeElement as HTMLElement)?.blur();
      await user.tab();

      const selectButton = screen.getByRole('button');
      expect(selectButton).not.toHaveFocus();
    });
  });

  describe('選択されたオプションの表示', () => {
    it('選択されたオプションにチェックマークが表示されること', () => {
      render(<SelectTestComponent initialOption={testOptions[1]} />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);

      // 選択されたオプションの行を取得（オプションリスト内の選択肢Bを取得）
      const selectedOptionButton = screen.getAllByText('選択肢B')[1]?.closest('button');
      const checkIcon = selectedOptionButton?.querySelector('[aria-label="check"]');
      expect(checkIcon).toBeInTheDocument();
    });

    it('選択されていないオプションにはチェックマークが表示されないこと', () => {
      render(<SelectTestComponent initialOption={testOptions[1]} />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);

      // 選択されていないオプションの行を取得
      const unselectedOptionButton = screen.getByText('選択肢A').closest('button');
      const checkIcon = unselectedOptionButton?.querySelector('[aria-label="check"]');
      expect(checkIcon).not.toBeInTheDocument();
    });
  });

  describe('ドロップダウンアイコン', () => {
    it('閉じている時は下向き矢印が表示されること', () => {
      render(<SelectTestComponent />);
      const selectButton = screen.getByRole('button');

      const downIcon = selectButton.querySelector('[aria-label="angleSmallDown"]');
      expect(downIcon).toBeInTheDocument();
    });

    it('開いている時は上向き矢印が表示されること', () => {
      render(<SelectTestComponent />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);

      const upIcon = selectButton.querySelector('[aria-label="angleSmallUp"]');
      expect(upIcon).toBeInTheDocument();

      const downIcon = selectButton.querySelector('[aria-label="angleSmallDown"]');
      expect(downIcon).not.toBeInTheDocument();
    });
  });

  describe('エラー状態での選択', () => {
    it('エラー状態で選択されたオプションがエラー色で表示されること', () => {
      render(<SelectTestComponent isError initialOption={testOptions[1]} />);
      const selectButton = screen.getByRole('button');

      fireEvent.click(selectButton);

      const selectedOptionButton = screen.getAllByText('選択肢B')[1]?.closest('button');
      expect(selectedOptionButton?.className).toMatch(/text-supportError/);
      expect(selectedOptionButton?.className).toMatch(/bg-uiBackgroundError/);
    });
  });
});
