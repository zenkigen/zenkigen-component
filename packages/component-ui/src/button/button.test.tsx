import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

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

  it('Tabキーでボタンにフォーカスできること', async () => {
    const user = await import('@testing-library/user-event').then((m) => m.default);
    render(<Button>フォーカスボタン</Button>);
    (document.activeElement as HTMLElement)?.blur();
    await user.tab();
    expect(screen.getByRole('button', { name: 'フォーカスボタン' })).toHaveFocus();
  });
});
