import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { TextArea } from './text-area';

/**
 * TextArea テストについて
 *
 * readOnlyを指定している理由：
 * - TextAreaは`value`プロパティが必須のため、制御されたコンポーネントとして扱われる
 * - `value`のみ指定すると「onChange or readOnlyを指定せよ」というReact警告が発生
 * - 値変更が不要なテスト（スタイル・レンダリング等）では`readOnly`を指定
 * - 実際にイベントをテストする場合は`onChange`を指定
 */

describe('TextArea', () => {
  describe('基本機能', () => {
    it('正常にレンダリングされること', () => {
      render(<TextArea value="テストテキスト" readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('valueプロパティが正しく表示されること', () => {
      render(<TextArea value="テストテキスト" readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('テストテキスト');
    });

    it('onChangeイベントが正しく動作すること', () => {
      const handleChange = vi.fn();
      render(<TextArea value="" onChange={handleChange} data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      fireEvent.change(textarea, { target: { value: '新しいテキスト' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('placeholderが正しく表示されること', () => {
      const handleChange = vi.fn();
      render(<TextArea value="" placeholder="入力してください" onChange={handleChange} data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('placeholder', '入力してください');
    });
  });

  describe('サイズバリエーション', () => {
    it('mediumサイズ（デフォルト）のスタイルが適用されること', () => {
      render(<TextArea value="" readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toMatch(/typography-body14regular/);
      expect(textarea.className).toMatch(/px-2/);
      expect(textarea.className).toMatch(/pt-1\.5/);
      expect(textarea.className).toMatch(/pb-2/);
    });

    it('largeサイズのスタイルが適用されること', () => {
      render(<TextArea value="" size="large" readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toMatch(/text-4/);
      expect(textarea.className).toMatch(/leading-normal/);
      expect(textarea.className).toMatch(/px-3\.5/);
      expect(textarea.className).toMatch(/py-2\.5/);
    });
  });

  describe('状態管理', () => {
    it('通常状態のスタイルが適用されること', () => {
      render(<TextArea value="" readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toMatch(/border-uiBorder02/);
      expect(textarea.className).toMatch(/text-text01/);
      expect(textarea.className).not.toMatch(/border-supportError/);
    });

    it('エラー状態のスタイルが適用されること', () => {
      render(<TextArea value="" isError readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toMatch(/border-supportError/);
      expect(textarea.className).toMatch(/text-supportError/);
    });

    it('無効状態のスタイルが適用されること', () => {
      render(<TextArea value="" disabled data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeDisabled();
      expect(textarea.className).toMatch(/bg-disabled02/);
      expect(textarea.className).toMatch(/border-disabled01/);
      expect(textarea.className).toMatch(/text-textPlaceholder/);
    });

    it('無効状態がエラー状態よりも優先されること', () => {
      render(<TextArea value="" isError disabled data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeDisabled();
      expect(textarea.className).toMatch(/bg-disabled02/);
      expect(textarea.className).toMatch(/border-disabled01/);
      expect(textarea.className).not.toMatch(/border-supportError/);
    });
  });

  describe('高さとリサイズ機能', () => {
    it('height指定が正しく適用されること（通常モード）', () => {
      render(<TextArea value="" height="120px" readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.style.height).toBe('120px');
    });

    it('autoHeightモードでheight指定がminHeightとして適用されること', () => {
      render(<TextArea value="" autoHeight height="80px" readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.style.minHeight).toBe('80px');
      expect(textarea.className).toMatch(/field-sizing-content/);
    });

    it('autoHeightモードでmaxHeightが適用されること', () => {
      render(<TextArea value="" autoHeight maxHeight="200px" readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.style.maxHeight).toBe('200px');
      expect(textarea.className).toMatch(/field-sizing-content/);
    });

    it('isResizable=falseでresize-noneが適用されること', () => {
      render(<TextArea value="" isResizable={false} readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toMatch(/resize-none/);
    });

    it('isResizable=trueでresize-noneが適用されないこと', () => {
      render(<TextArea value="" isResizable readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).not.toMatch(/resize-none/);
    });
  });

  describe('アクセシビリティ', () => {
    it('disabled属性が正しく設定されること', () => {
      render(<TextArea value="" disabled data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeDisabled();
    });

    it('refが正しく転送されること', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<TextArea value="" ref={ref} readOnly data-testid="textarea" />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current?.tagName).toBe('TEXTAREA');
    });

    it('Tabキーでテキストエリアにフォーカスできること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(<TextArea value="" readOnly data-testid="textarea" />);
      (document.activeElement as HTMLElement)?.blur();
      await user.tab();
      expect(screen.getByTestId('textarea')).toHaveFocus();
    });

    it('無効状態ではフォーカスできないこと', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(<TextArea value="" disabled data-testid="textarea" />);
      (document.activeElement as HTMLElement)?.blur();
      await user.tab();
      expect(screen.getByTestId('textarea')).not.toHaveFocus();
    });
  });

  describe('HTMLTextAreaElement属性の継承', () => {
    it('rows属性が正しく設定されること', () => {
      render(<TextArea value="" rows={5} readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('rows', '5');
    });

    it('cols属性が正しく設定されること', () => {
      render(<TextArea value="" cols={40} readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('cols', '40');
    });

    it('readOnly属性が正しく設定されること', () => {
      render(<TextArea value="" readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('readonly');
    });

    it('maxLength属性が正しく設定されること', () => {
      render(<TextArea value="" maxLength={100} readOnly data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('maxlength', '100');
    });
  });

  describe('プレースホルダー', () => {
    it('プレースホルダーのスタイルが適用されること', () => {
      const handleChange = vi.fn();
      render(<TextArea value="" placeholder="入力してください" onChange={handleChange} data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea.className).toMatch(/placeholder:text-textPlaceholder/);
    });
  });

  describe('コンテナ要素', () => {
    it('div要素でラップされていること', () => {
      const { container } = render(<TextArea value="" readOnly data-testid="textarea" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe('DIV');
      expect(wrapper.className).toMatch(/flex/);
    });
  });
});
