import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { IconButton } from './icon-button';

/**
 * IconButton テストについて
 *
 * テストの構成：
 * - 基本機能：レンダリング、クリック、アイコン表示
 * - 状態管理：disabled状態、selected状態
 * - プロパティ反映：size、variant、isNoPadding
 * - アンカータグ切り替え：isAnchor、href、target
 * - アクセシビリティ：フォーカス管理
 */

describe('IconButton', () => {
  describe('基本機能', () => {
    it('正常にレンダリングされること', () => {
      render(<IconButton icon="add" data-testid="icon-button" />);
      const button = screen.getByTestId('icon-button');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    it('指定したアイコンが表示されること', () => {
      render(<IconButton icon="add" data-testid="icon-button" />);
      const button = screen.getByTestId('icon-button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('クリック時にonClickが呼ばれること', () => {
      const handleClick = vi.fn();
      render(<IconButton icon="add" onClick={handleClick} data-testid="icon-button" />);
      const button = screen.getByTestId('icon-button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('onClickが未指定でもエラーが発生しないこと', () => {
      render(<IconButton icon="add" data-testid="icon-button" />);
      const button = screen.getByTestId('icon-button');
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });

  describe('状態管理', () => {
    it('isDisabled=trueの場合、クリックできずonClickが呼ばれないこと', () => {
      const handleClick = vi.fn();
      render(<IconButton icon="add" isDisabled onClick={handleClick} data-testid="icon-button" />);
      const button = screen.getByTestId('icon-button');
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('isDisabled=trueの場合、pointer-events-noneクラスが付与されること', () => {
      render(<IconButton icon="add" isDisabled data-testid="icon-button" />);
      const button = screen.getByTestId('icon-button');
      expect(button.className).toMatch(/pointer-events-none/);
    });

    it('isSelected=trueの場合、selected用のクラスが付与されること', () => {
      render(<IconButton icon="add" isSelected data-testid="icon-button" />);
      const button = screen.getByTestId('icon-button');
      expect(button.className).toMatch(/selected/);
    });

    it('isSelected=falseの場合、base用のクラスが付与されること', () => {
      render(<IconButton icon="add" isSelected={false} data-testid="icon-button" />);
      const button = screen.getByTestId('icon-button');
      // selectedクラスが含まれていないことを確認
      expect(button.className).not.toMatch(/selected/);
    });
  });

  describe('プロパティ反映', () => {
    describe('size', () => {
      it('size="small"でisNoPadding=falseの場合、適切なサイズクラスが適用されること', () => {
        render(<IconButton icon="add" size="small" data-testid="icon-button" />);
        const button = screen.getByTestId('icon-button');
        expect(button.className).toMatch(/h-6|w-6/);
      });

      it('size="small"でisNoPadding=trueの場合、適切なサイズクラスが適用されること', () => {
        render(<IconButton icon="add" size="small" isNoPadding data-testid="icon-button" />);
        const button = screen.getByTestId('icon-button');
        expect(button.className).toMatch(/h-4|w-4/);
      });

      it('size="medium"でisNoPadding=falseの場合、適切なサイズクラスが適用されること', () => {
        render(<IconButton icon="add" size="medium" data-testid="icon-button" />);
        const button = screen.getByTestId('icon-button');
        expect(button.className).toMatch(/h-8|w-8/);
      });

      it('size="medium"でisNoPadding=trueの場合、適切なサイズクラスが適用されること', () => {
        render(<IconButton icon="add" size="medium" isNoPadding data-testid="icon-button" />);
        const button = screen.getByTestId('icon-button');
        expect(button.className).toMatch(/h-6|w-6/);
      });

      it('size="large"でisNoPadding=falseの場合、適切なサイズクラスが適用されること', () => {
        render(<IconButton icon="add" size="large" data-testid="icon-button" />);
        const button = screen.getByTestId('icon-button');
        expect(button.className).toMatch(/h-10|w-10/);
      });

      it('size="large"でisNoPadding=trueの場合、適切なサイズクラスが適用されること', () => {
        render(<IconButton icon="add" size="large" isNoPadding data-testid="icon-button" />);
        const button = screen.getByTestId('icon-button');
        expect(button.className).toMatch(/h-6|w-6/);
      });
    });

    describe('variant', () => {
      it('variant="outline"の場合、適切なクラスが適用されること', () => {
        render(<IconButton icon="add" variant="outline" data-testid="icon-button" />);
        const button = screen.getByTestId('icon-button');
        // outline variantのスタイルが適用されていることを確認
        expect(button.className).toContain('rounded');
      });

      it('variant="text"の場合、適切なクラスが適用されること', () => {
        render(<IconButton icon="add" variant="text" data-testid="icon-button" />);
        const button = screen.getByTestId('icon-button');
        // text variantのスタイルが適用されていることを確認
        expect(button.className).toContain('rounded');
      });
    });

    describe('アイコンサイズ', () => {
      it('size="small"の場合、アイコンサイズがsmallになること', () => {
        render(<IconButton icon="add" size="small" data-testid="icon-button" />);
        const button = screen.getByTestId('icon-button');
        const icon = button.querySelector('span');
        expect(icon).toBeInTheDocument();
        // アイコンのサイズクラスを確認（smallサイズ相当）
        expect(icon?.className).toContain('h-4');
      });

      it('size="medium"以上の場合、アイコンサイズがmediumになること', () => {
        render(<IconButton icon="add" size="medium" data-testid="icon-button" />);
        const button = screen.getByTestId('icon-button');
        const icon = button.querySelector('span');
        expect(icon).toBeInTheDocument();
        // アイコンのサイズクラスを確認（mediumサイズ相当）
        expect(icon?.className).toContain('h-6');
      });
    });
  });

  describe('アンカータグ切り替え', () => {
    it('isAnchor=falseまたは未指定の場合、buttonタグとしてレンダリングされること', () => {
      render(<IconButton icon="add" data-testid="icon-button" />);
      const element = screen.getByTestId('icon-button');
      expect(element.tagName).toBe('BUTTON');
    });

    it('isAnchor=trueの場合、aタグとしてレンダリングされること', () => {
      render(<IconButton icon="add" isAnchor href="/test" data-testid="icon-button" />);
      const element = screen.getByTestId('icon-button');
      expect(element.tagName).toBe('A');
    });

    it('isAnchor=trueの場合、href属性が正しく設定されること', () => {
      const href = '/test-path';
      render(<IconButton icon="add" isAnchor href={href} data-testid="icon-button" />);
      const link = screen.getByTestId('icon-button') as HTMLAnchorElement;
      expect(link.href).toContain(href);
    });

    it('isAnchor=trueの場合、target属性が正しく設定されること', () => {
      render(<IconButton icon="add" isAnchor href="/test" target="_blank" data-testid="icon-button" />);
      const link = screen.getByTestId('icon-button') as HTMLAnchorElement;
      expect(link.target).toBe('_blank');
    });

    it('isAnchor=trueの場合、inline-flexクラスが適用されること', () => {
      render(<IconButton icon="add" isAnchor href="/test" data-testid="icon-button" />);
      const link = screen.getByTestId('icon-button');
      expect(link.className).toMatch(/inline-flex/);
    });
  });

  describe('アクセシビリティ', () => {
    it('Tabキーでボタンにフォーカスできること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(<IconButton icon="add" data-testid="icon-button" />);
      (document.activeElement as HTMLElement)?.blur();
      await user.tab();
      const button = screen.getByTestId('icon-button');
      expect(button).toHaveFocus();
    });

    it('isAnchor=trueの場合もTabキーでフォーカスできること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(<IconButton icon="add" isAnchor href="/test" data-testid="icon-button" />);
      (document.activeElement as HTMLElement)?.blur();
      await user.tab();
      const link = screen.getByTestId('icon-button');
      expect(link).toHaveFocus();
    });

    it('isDisabled=trueの場合、フォーカスされないこと', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(
        <div>
          <IconButton icon="add" isDisabled data-testid="disabled-button" />
          <IconButton icon="add" data-testid="normal-button" />
        </div>,
      );
      (document.activeElement as HTMLElement)?.blur();
      await user.tab();
      const normalButton = screen.getByTestId('normal-button');
      const disabledButton = screen.getByTestId('disabled-button');
      expect(normalButton).toHaveFocus();
      expect(disabledButton).not.toHaveFocus();
    });
  });

  describe('CSS上書き防止', () => {
    it('TypeScript型レベルでclassNameプロパティが受け入れられないこと', () => {
      // このテストはTypeScript型安全性を確認するためのドキュメンテーション
      // 以下のコードはTypeScriptエラーになるため、コメントアウトしている

      // ❌ TypeScriptエラー: Argument of type '{ className: string; icon: IconName; }' is not assignable to parameter
      // render(<IconButton icon="add" className="custom-class" data-testid="icon-button" />);

      // ❌ アンカー版でもTypeScriptエラー
      // render(<IconButton icon="add" isAnchor href="/test" className="custom-class" data-testid="icon-button" />);

      // ✅ classNameを渡さない正常なパターンのみが許可される
      render(<IconButton icon="add" data-testid="icon-button" />);
      const button = screen.getByTestId('icon-button');
      expect(button).toBeInTheDocument();
    });

    it('強制的にclassNameを渡してもコンポーネント内部で除外されること', () => {
      // anyを使って強制的にclassNameを渡した場合でも、
      // コンポーネント内部で除外されるため外部クラスは適用されない
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const IconButtonWithAny = IconButton as any;
      render(
        // eslint-disable-next-line tailwindcss/no-custom-classname
        <IconButtonWithAny icon="add" className="malicious-custom-class external-override" data-testid="icon-button" />,
      );

      const button = screen.getByTestId('icon-button');

      // 外部から渡された悪意あるクラス名が適用されていないことを確認
      expect(button.className).not.toContain('malicious-custom-class');
      expect(button.className).not.toContain('external-override');

      // コンポーネント内部で定義された正規のクラスのみが適用されていることを確認
      expect(button.className).toContain('typography-label16regular');
      expect(button.className).toContain('flex');
      expect(button.className).toContain('items-center');
      expect(button.className).toContain('justify-center');
      expect(button.className).toContain('rounded');
    });

    it('アンカー版でもclassNameが除外されること', () => {
      // アンカー版でも同様にclassNameが除外される
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const IconButtonWithAny = IconButton as any;
      render(
        <IconButtonWithAny
          icon="add"
          isAnchor
          href="/test"
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="malicious-anchor-class"
          data-testid="icon-button"
        />,
      );

      const anchor = screen.getByTestId('icon-button');

      // 外部から渡されたクラス名が適用されていないことを確認
      expect(anchor.className).not.toContain('malicious-anchor-class');

      // アンカー版の正規クラスが適用されていることを確認
      expect(anchor.className).toContain('inline-flex');
      expect(anchor.tagName).toBe('A');
    });
  });
});
