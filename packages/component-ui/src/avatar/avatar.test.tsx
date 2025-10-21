import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './avatar';

describe('Avatar', () => {
  it('firstName と lastName が指定されている場合、イニシャルが表示されること', () => {
    render(<Avatar firstName="太郎" lastName="全機現" userId={1} />);
    expect(screen.getByText('全機')).toBeInTheDocument();
  });

  it('英語名の場合、姓と名の最初の文字が大文字で表示されること', () => {
    render(<Avatar firstName="John" lastName="Smith" userId={1} />);
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  it('firstName と lastName の両方が未定義の場合、user-oneアイコンが表示されること', () => {
    render(<Avatar userId={1} />);
    const icon = screen.getByRole('img', { name: 'userOne' });
    expect(icon).toBeInTheDocument();
  });

  it('firstName と lastName の両方が空文字の場合、user-oneアイコンが表示されること', () => {
    render(<Avatar firstName="" lastName="" userId={1} />);
    const icon = screen.getByRole('img', { name: 'userOne' });
    expect(icon).toBeInTheDocument();
  });

  it('firstName のみが指定されている場合、イニシャルが表示されること', () => {
    render(<Avatar firstName="太郎" userId={1} />);
    expect(screen.getByText('太郎')).toBeInTheDocument();
  });

  it('lastName のみが指定されている場合、イニシャルが表示されること', () => {
    render(<Avatar lastName="全機現" userId={1} />);
    expect(screen.getByText('全機')).toBeInTheDocument();
  });

  it('isDisabled が true の場合、無効状態のスタイルが適用されること', () => {
    render(<Avatar firstName="太郎" lastName="全機現" userId={1} isDisabled />);
    const avatar = screen.getByText('全機').closest('span');
    expect(avatar).toHaveClass('bg-disabled01');
  });

  it('userId が未定義の場合、デフォルトの背景色が適用されること', () => {
    render(<Avatar firstName="太郎" lastName="全機現" />);
    const avatar = screen.getByText('全機').closest('span');
    expect(avatar).toHaveClass('bg-icon01');
  });

  it('size が x-small の場合、適切なサイズクラスが適用されること', () => {
    render(<Avatar firstName="太郎" lastName="全機現" userId={1} size="x-small" />);
    const avatar = screen.getByText('全機').closest('span');
    expect(avatar).toHaveClass('w-6', 'h-6');
  });

  it('size が x-large の場合、適切なサイズクラスが適用されること', () => {
    render(<Avatar firstName="太郎" lastName="全機現" userId={1} size="x-large" />);
    const avatar = screen.getByText('全機').closest('span');
    expect(avatar).toHaveClass('w-16', 'h-16');
  });

  it('名前なしで isDisabled が true の場合、アイコンが表示され無効状態のスタイルが適用されること', () => {
    const { container } = render(<Avatar userId={1} isDisabled />);
    const icon = screen.getByRole('img', { name: 'userOne' });
    expect(icon).toBeInTheDocument();
    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toHaveClass('bg-disabled01');
  });
});
