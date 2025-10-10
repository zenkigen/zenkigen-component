import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { PasswordInput } from './password-input';

describe('PasswordInput', () => {
  it('初期状態ではtype="password"であること', () => {
    render(<PasswordInput value="password123" onChange={() => {}} />);
    const input = screen.getByDisplayValue('password123');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('表示/非表示ボタンをクリックするとtype属性が切り替わること', () => {
    render(<PasswordInput value="password123" onChange={() => {}} />);
    const input = screen.getByDisplayValue('password123');
    const toggleButton = screen.getByRole('button', { name: 'パスワードを表示する' });

    // 初期状態は非表示
    expect(input).toHaveAttribute('type', 'password');

    // 表示ボタンをクリック
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    // 非表示ボタンをクリック
    const hideButton = screen.getByRole('button', { name: 'パスワードを非表示にする' });
    fireEvent.click(hideButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('表示/非表示ボタンのアイコンが状態に応じて変わること', () => {
    render(<PasswordInput value="password123" onChange={() => {}} />);

    // 初期状態: checkアイコン（表示ボタン）
    const showButton = screen.getByRole('button', { name: 'パスワードを表示する' });
    expect(showButton.querySelector('svg')).toHaveAttribute('aria-label', 'visibility');

    // 表示状態: closeアイコン（非表示ボタン）
    fireEvent.click(showButton);
    const hideButton = screen.getByRole('button', { name: 'パスワードを非表示にする' });
    expect(hideButton.querySelector('svg')).toHaveAttribute('aria-label', 'visibilityOff');
  });

  it('disabled状態では表示/非表示ボタンも無効になること', () => {
    render(<PasswordInput value="password123" onChange={() => {}} disabled />);
    const toggleButton = screen.getByRole('button', { name: 'パスワードを表示する' });
    expect(toggleButton).toBeDisabled();
  });

  it('onChangeイベントが正しく動作すること', () => {
    const handleChange = vi.fn();
    render(<PasswordInput value="initial" onChange={handleChange} />);
    const input = screen.getByDisplayValue('initial');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('値が存在してもクリアボタンは表示されないこと', () => {
    render(<PasswordInput value="password123" onChange={() => {}} />);

    const buttons = screen.getAllByRole('button');
    const hasClearButton = buttons.some(
      (button) => button.querySelector('svg')?.getAttribute('aria-label') === 'close',
    );

    expect(hasClearButton).toBe(false);
  });

  it('TextInputの全ての機能を継承していること（size, isError, placeholder等）', () => {
    render(<PasswordInput value="test" onChange={() => {}} size="large" isError placeholder="Enter password" />);

    const input = screen.getByDisplayValue('test');
    expect(input).toHaveAttribute('placeholder', 'Enter password');
    expect(input).toHaveClass('typography-label16regular'); // large sizeのクラス
    expect(input).toHaveClass('text-supportError'); // isErrorのクラス
  });
});
