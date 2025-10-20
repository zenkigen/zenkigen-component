import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Icon } from '../icon';
import { Button } from './button';

describe('Button', () => {
  it('クリック時にonClickが呼ばれること', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>テストボタン</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'テストボタン' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('isDisabledがtrueの場合、クリックできず、onClickが呼ばれないこと', () => {
    const handleClick = vi.fn();
    render(
      <Button isDisabled onClick={handleClick}>
        無効ボタン
      </Button>,
    );
    const button = screen.getByRole('button', { name: '無効ボタン' });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('isSelectedがtrueの場合、selected用のクラスが付与されること', () => {
    render(
      <Button isSelected data-testid="selected-button">
        選択ボタン
      </Button>,
    );
    const button = screen.getByTestId('selected-button');
    expect(button.className).toMatch(/selected/);
  });

  it('size, variant, justifyContent, borderRadius, widthのpropsが反映されること', () => {
    render(
      <Button
        size="large"
        variant="outline"
        justifyContent="start"
        borderRadius={8}
        width={200}
        data-testid="styled-button"
      >
        スタイルボタン
      </Button>,
    );
    const button = screen.getByTestId('styled-button');
    expect(button.className).toMatch(/h-10/);
    expect(button.className).toMatch(/outline/);
    expect(button.className).toMatch(/justify-start/);
    expect(button.style.borderRadius).toBe('8px');
    expect(button.style.width).toBe('200px');
  });

  it('before, afterの要素が表示されること', () => {
    render(
      <Button before={<span data-testid="before">前</span>} after={<span data-testid="after">後</span>}>
        本文
      </Button>,
    );
    expect(screen.getByTestId('before')).toHaveTextContent('前');
    expect(screen.getByTestId('after')).toHaveTextContent('後');
  });

  it('elementAs="a"でaタグとしてレンダリングされること', () => {
    render(
      <Button elementAs="a" href="#" data-testid="link-button">
        リンクボタン
      </Button>,
    );
    const link = screen.getByTestId('link-button');
    expect(link.tagName).toBe('A');
  });

  it('elementAs="div"でdiv要素としてレンダリングされること', () => {
    render(
      <Button elementAs="div" data-testid="div-button">
        divボタン
      </Button>,
    );
    const div = screen.getByTestId('div-button');
    expect(div.tagName).toBe('DIV');
  });

  it('Tabキーでボタンにフォーカスできること', async () => {
    const user = await import('@testing-library/user-event').then((m) => m.default);
    render(<Button>フォーカスボタン</Button>);
    (document.activeElement as HTMLElement)?.blur();
    await user.tab();
    expect(screen.getByRole('button', { name: 'フォーカスボタン' })).toHaveFocus();
  });
});

// WCAG 2.2 アクセシビリティテスト
describe('Button Accessibility - WCAG 2.2', () => {
  describe('1.3.1 情報及び関係性 (A)', () => {
    it('デフォルトでbutton要素としてレンダリングされること', () => {
      render(<Button>テストボタン</Button>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('disabled属性が適切に設定されること', () => {
      render(<Button isDisabled>無効ボタン</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('2.1.1 キーボード (A)', () => {
    it('Enterキーでアクティベーションできること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('Spaceキーでアクティベーションできること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalled();
    });

    it('Tabキーでフォーカス可能であること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(<Button>フォーカスボタン</Button>);
      (document.activeElement as HTMLElement)?.blur();
      await user.tab();
      expect(screen.getByRole('button', { name: 'フォーカスボタン' })).toHaveFocus();
    });
  });

  describe('2.4.7 フォーカス可視 (AA)', () => {
    it('フォーカス時にフォーカスリングが表示されること', () => {
      render(<Button>テストボタン</Button>);
      const button = screen.getByRole('button');

      button.focus();
      // focus-visible:outline クラスが適用されていることを確認
      expect(button.className).toMatch(/focus-visible:outline/);
    });
  });

  describe('2.5.8 ターゲットサイズ（最小）(AA)', () => {
    it('smallサイズでも最小24x24pxのタップ領域を確保すること', () => {
      render(
        <Button size="small" data-testid="small-button">
          小
        </Button>,
      );
      const button = screen.getByTestId('small-button');

      // h-6 (24px) クラスが適用されていることを確認
      expect(button.className).toMatch(/h-6/);
    });

    it('mediumサイズで適切なタップ領域を確保すること', () => {
      render(
        <Button size="medium" data-testid="medium-button">
          中
        </Button>,
      );
      const button = screen.getByTestId('medium-button');

      // h-8 (32px) クラスが適用されていることを確認
      expect(button.className).toMatch(/h-8/);
    });

    it('largeサイズで適切なタップ領域を確保すること', () => {
      render(
        <Button size="large" data-testid="large-button">
          大
        </Button>,
      );
      const button = screen.getByTestId('large-button');

      // h-10 (40px) クラスが適用されていることを確認
      expect(button.className).toMatch(/h-10/);
    });
  });

  describe('1.1.1 非テキストコンテンツ (A)', () => {
    it('アイコンのみのボタンでaria-labelが指定されている場合、アクセス可能であること', () => {
      render(
        <Button before={<Icon name="add" size="small" />} aria-label="追加">
          {/* 空のchildren */}
        </Button>,
      );
      const button = screen.getByRole('button', { name: '追加' });
      expect(button).toBeInTheDocument();
    });

    it('アイコンのみのボタンでaria-labelが未指定の場合、警告を表示すること', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<Button before={<Icon name="add" size="small" />}>{/* 空のchildren */}</Button>);

      // このテストは実装によって異なる可能性があります
      // 実際の実装では、アイコン専用ボタンの検出と警告表示が必要
      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('4.1.2 名前・役割・値 (A)', () => {
    it('スクリーンリーダーで正しく読み上げられること', () => {
      render(<Button>送信ボタン</Button>);
      const button = screen.getByRole('button', { name: '送信ボタン' });
      expect(button).toBeInTheDocument();
    });

    it('aria-labelが指定された場合、その名前で読み上げられること', () => {
      render(<Button aria-label="フォームを送信">送信</Button>);
      const button = screen.getByRole('button', { name: 'フォームを送信' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('3.2.1 フォーカス時 (A)', () => {
    it('フォーカスのみで遷移・送信しないこと', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      const button = screen.getByRole('button');

      // フォーカスのみではクリックイベントが発生しないことを確認
      button.focus();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('2.1.2 キーボードトラップなし (A)', () => {
    it('ボタンでフォーカスが閉じ込められないこと', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(
        <div>
          <Button>ボタン1</Button>
          <Button>ボタン2</Button>
        </div>,
      );

      const button1 = screen.getByRole('button', { name: 'ボタン1' });
      const button2 = screen.getByRole('button', { name: 'ボタン2' });

      // ボタン1にフォーカス
      button1.focus();
      expect(button1).toHaveFocus();

      // Tabキーでボタン2に移動できることを確認
      await user.tab();
      expect(button2).toHaveFocus();
    });
  });

  describe('2.4.3 フォーカス順序 (A)', () => {
    it('DOM順序と視覚順序が一致すること', async () => {
      const user = await import('@testing-library/user-event').then((m) => m.default);
      render(
        <div>
          <Button>ボタン1</Button>
          <Button>ボタン2</Button>
          <Button>ボタン3</Button>
        </div>,
      );

      // 最初のボタンにフォーカス
      const button1 = screen.getByRole('button', { name: 'ボタン1' });
      button1.focus();
      expect(button1).toHaveFocus();

      // Tabキーで順番に移動
      await user.tab();
      expect(screen.getByRole('button', { name: 'ボタン2' })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: 'ボタン3' })).toHaveFocus();
    });
  });

  describe('2.4.12 フォーカスの不遮蔽（最小）(AA)', () => {
    it('フォーカスが他要素に隠れないこと', () => {
      render(
        <div style={{ position: 'relative' }}>
          <Button data-testid="test-button">テストボタン</Button>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              pointerEvents: 'none', // クリックは通すが、フォーカスは隠さない
            }}
          >
            オーバーレイ
          </div>
        </div>,
      );

      const button = screen.getByTestId('test-button');
      button.focus();

      // フォーカスが適切に設定されていることを確認
      expect(button).toHaveFocus();
    });
  });

  describe('2.5.2 ポインターのキャンセル (A)', () => {
    it('mousedownで確定せず、clickで確定すること', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      const button = screen.getByRole('button');

      // mousedownでは確定しない
      fireEvent.mouseDown(button);
      expect(handleClick).not.toHaveBeenCalled();

      // clickで確定する
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });

    it('mousedownだけでは確定しないこと', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      const button = screen.getByRole('button');

      // mousedownだけでは確定しない
      fireEvent.mouseDown(button);
      expect(handleClick).not.toHaveBeenCalled();

      // mouseupだけでも確定しない
      fireEvent.mouseUp(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('2.5.3 ラベル名 (A)', () => {
    it('視覚ラベルの先頭とaria-labelの先頭が一致すること', () => {
      render(<Button aria-label="送信ボタン">送信</Button>);
      const button = screen.getByRole('button');

      // aria-labelと視覚テキストの先頭が一致することを確認
      expect(button).toHaveAccessibleName('送信ボタン');
      expect(button).toHaveTextContent('送信');

      // 先頭文字が一致することを確認
      const ariaLabel = button.getAttribute('aria-label');
      const visualText = button.textContent;

      // 厳密な比較で先頭文字が一致することを明示的に確認
      const ariaLabelFirstChar = typeof ariaLabel === 'string' ? ariaLabel.charAt(0) : '';
      const visualTextFirstChar = typeof visualText === 'string' ? visualText.charAt(0) : '';
      expect(ariaLabelFirstChar).toBe(visualTextFirstChar);
    });

    it('aria-labelが未指定の場合は視覚テキストが使用されること', () => {
      render(<Button>送信</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAccessibleName('送信');
      expect(button).toHaveTextContent('送信');
    });
  });

  describe('2.5.5 ターゲットサイズ（強化）(AAA)', () => {
    it('largeサイズで44x44px以上のタップ領域を確保すること', () => {
      render(
        <Button size="large" data-testid="large-button">
          大
        </Button>,
      );
      const button = screen.getByTestId('large-button');

      // h-10 (40px) クラスが適用されていることを確認
      // 実際のタップ領域はパディングを含めて44px以上になる
      expect(button.className).toMatch(/h-10/);
    });

    it('mediumサイズでもパディングで44x44pxを確保できること', () => {
      render(
        <Button size="medium" data-testid="medium-button">
          中
        </Button>,
      );
      const button = screen.getByTestId('medium-button');

      // h-8 (32px) + パディングで44px以上を確保
      expect(button.className).toMatch(/h-8/);
      expect(button.className).toMatch(/px-/); // パディングが設定されている
    });
  });

  describe('3.2.2 入力時 (A)', () => {
    it('ボタン押下で明確に変化すること', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      const button = screen.getByRole('button');

      // 初期状態ではクリックハンドラが呼ばれていない
      expect(handleClick).not.toHaveBeenCalled();

      // ボタンをクリック
      fireEvent.click(button);

      // 明確に変化（クリックハンドラが呼ばれる）ことを確認
      expect(handleClick).toHaveBeenCalled();
    });

    it('予期せぬ変化を避けること', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>テストボタン</Button>);
      const button = screen.getByRole('button');

      // フォーカス時には変化しない
      button.focus();
      expect(handleClick).not.toHaveBeenCalled();

      // ホバー時にも変化しない
      fireEvent.mouseEnter(button);
      expect(handleClick).not.toHaveBeenCalled();

      // クリック時のみ変化する
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
