import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Avatar } from '../avatar';
import { Tooltip } from '../tooltip';
import { AvatarGroup } from './avatar-group';

describe('AvatarGroup', () => {
  describe('レンダリング', () => {
    it('children の Avatar がすべて表示されること', () => {
      render(
        <AvatarGroup>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
        </AvatarGroup>,
      );
      expect(screen.getByText('田中')).toBeInTheDocument();
      expect(screen.getByText('鈴木')).toBeInTheDocument();
      expect(screen.getByText('佐藤')).toBeInTheDocument();
    });

    it('children が空の場合、何も表示されないこと', () => {
      const { container } = render(<AvatarGroup>{null}</AvatarGroup>);
      const group = container.querySelector('[role="group"]');
      expect(group?.children.length).toBe(0);
    });

    it('role="group" が設定されていること', () => {
      render(
        <AvatarGroup>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
        </AvatarGroup>,
      );
      expect(screen.getByRole('group')).toBeInTheDocument();
    });
  });

  describe('最大表示数', () => {
    it('max 以下の場合、すべての Avatar が表示されること', () => {
      render(
        <AvatarGroup max={3}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
        </AvatarGroup>,
      );
      expect(screen.getByText('田中')).toBeInTheDocument();
      expect(screen.getByText('鈴木')).toBeInTheDocument();
      expect(screen.getByText('佐藤')).toBeInTheDocument();
    });

    it('max を超える場合、max 個までの Avatar のみ表示されること', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          <AvatarGroup.Remain />
        </AvatarGroup>,
      );
      expect(screen.getByText('田中')).toBeInTheDocument();
      expect(screen.getByText('鈴木')).toBeInTheDocument();
      expect(screen.queryByText('佐藤')).not.toBeInTheDocument();
    });

    it('デフォルトの max は 5 であること', () => {
      render(
        <AvatarGroup>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          <Avatar userId={4} firstName="次郎" lastName="高橋" />
          <Avatar userId={5} firstName="三郎" lastName="渡辺" />
          <Avatar userId={6} firstName="四郎" lastName="伊藤" />
          <AvatarGroup.Remain />
        </AvatarGroup>,
      );
      expect(screen.getByText('田中')).toBeInTheDocument();
      expect(screen.getByText('渡辺')).toBeInTheDocument();
      expect(screen.queryByText('伊藤')).not.toBeInTheDocument();
    });
  });

  describe('カウンター表示', () => {
    it('AvatarGroup.Remain が +N 形式で残り人数を表示すること', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          <AvatarGroup.Remain />
        </AvatarGroup>,
      );
      expect(screen.getByText('+1')).toBeInTheDocument();
    });

    it('AvatarGroup.Counter が総数を表示すること', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          <AvatarGroup.Counter />
        </AvatarGroup>,
      );
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('max 以下の場合、Remain が非表示になること', () => {
      render(
        <AvatarGroup max={5}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <AvatarGroup.Remain />
        </AvatarGroup>,
      );
      expect(screen.queryByText('+0')).not.toBeInTheDocument();
    });

    it('max 以下の場合、Counter が非表示になること', () => {
      render(
        <AvatarGroup max={5}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <AvatarGroup.Counter />
        </AvatarGroup>,
      );
      expect(screen.queryByText('2')).not.toBeInTheDocument();
    });
  });

  describe('サイズ', () => {
    it('デフォルトの size は medium であること', () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
        </AvatarGroup>,
      );
      const wrapper = container.querySelector('[role="group"]')?.firstChild as HTMLElement;
      expect(wrapper).not.toHaveClass('-ml-1.5');
      expect(wrapper).not.toHaveClass('-ml-2');
    });

    it('カウンターにサイズに応じたスタイルが適用されること', () => {
      render(
        <AvatarGroup max={1} size="x-small">
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <AvatarGroup.Remain />
        </AvatarGroup>,
      );
      const counter = screen.getByText('+1');
      expect(counter).toBeInTheDocument();
    });
  });

  describe('ボーダー', () => {
    it('各 Avatar にボーダーが適用されること', () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
        </AvatarGroup>,
      );
      const wrapper = container.querySelector('[role="group"]')?.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('rounded-full');
      expect(wrapper).toHaveClass('border-white');
    });
  });

  describe('Label', () => {
    it('AvatarGroup.Label が渡されたテキストを表示すること', () => {
      render(
        <AvatarGroup max={5}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <AvatarGroup.Label>+995</AvatarGroup.Label>
        </AvatarGroup>,
      );
      expect(screen.getByText('+995')).toBeInTheDocument();
    });

    it('Label は max の計算に含まれないこと', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          <AvatarGroup.Label>1000</AvatarGroup.Label>
        </AvatarGroup>,
      );
      expect(screen.getByText('田中')).toBeInTheDocument();
      expect(screen.getByText('鈴木')).toBeInTheDocument();
      expect(screen.queryByText('佐藤')).not.toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
    });

    it('Label は isOverflow に関係なく常に表示されること', () => {
      render(
        <AvatarGroup max={5}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <AvatarGroup.Label>+999</AvatarGroup.Label>
        </AvatarGroup>,
      );
      expect(screen.getByText('+999')).toBeInTheDocument();
    });
  });

  describe('z-index', () => {
    it('左のアバターが前面に表示されるよう z-index が設定されること', () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
        </AvatarGroup>,
      );
      const group = container.querySelector('[role="group"]');
      const children = group?.children;
      expect((children?.[0] as HTMLElement).style.zIndex).toBe('1');
      expect((children?.[1] as HTMLElement).style.zIndex).toBe('2');
      expect((children?.[2] as HTMLElement).style.zIndex).toBe('3');
    });
  });

  describe('Tooltip ラップ', () => {
    it('Tooltip でラップされた Remain が正しく認識されること', () => {
      render(
        <AvatarGroup max={1}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Tooltip content="残り1名" verticalPosition="top">
            <AvatarGroup.Remain />
          </Tooltip>
        </AvatarGroup>,
      );
      expect(screen.getByText('+1')).toBeInTheDocument();
      expect(screen.queryByText('鈴木')).not.toBeInTheDocument();
    });

    it('Tooltip でラップされた Counter が正しく認識されること', () => {
      render(
        <AvatarGroup max={1}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Tooltip content="合計2名" verticalPosition="top">
            <AvatarGroup.Counter />
          </Tooltip>
        </AvatarGroup>,
      );
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('Tooltip でラップされた Label が正しく認識されること', () => {
      render(
        <AvatarGroup max={5}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Tooltip content="詳細" verticalPosition="top">
            <AvatarGroup.Label>+999</AvatarGroup.Label>
          </Tooltip>
        </AvatarGroup>,
      );
      expect(screen.getByText('+999')).toBeInTheDocument();
    });
  });

  describe('サイズ連携', () => {
    it('AvatarGroup の size が Avatar に伝搬すること', () => {
      render(
        <AvatarGroup size="x-small">
          <Avatar userId={1} firstName="太郎" lastName="田中" />
        </AvatarGroup>,
      );
      const avatar = screen.getByText('田中');
      expect(avatar).toHaveClass('w-6', 'h-6');
    });

    it('Avatar 個別の size 指定より AvatarGroup の size が優先されること', () => {
      render(
        <AvatarGroup size="x-small">
          <Avatar size="x-large" userId={1} firstName="太郎" lastName="田中" />
        </AvatarGroup>,
      );
      const avatar = screen.getByText('田中');
      expect(avatar).toHaveClass('w-6', 'h-6');
      expect(avatar).not.toHaveClass('w-16', 'h-16');
    });
  });

  describe('エラーハンドリング', () => {
    it('AvatarGroup 外で Remain を使用するとエラーが発生すること', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => null);
      expect(() => render(<AvatarGroup.Remain />)).toThrow(
        'AvatarGroup のサブコンポーネントは AvatarGroup 内で使用してください',
      );
      spy.mockRestore();
    });

    it('AvatarGroup 外で Counter を使用するとエラーが発生すること', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => null);
      expect(() => render(<AvatarGroup.Counter />)).toThrow(
        'AvatarGroup のサブコンポーネントは AvatarGroup 内で使用してください',
      );
      spy.mockRestore();
    });

    it('AvatarGroup 外で Label を使用するとエラーが発生すること', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => null);
      expect(() => render(<AvatarGroup.Label>テスト</AvatarGroup.Label>)).toThrow(
        'AvatarGroup のサブコンポーネントは AvatarGroup 内で使用してください',
      );
      spy.mockRestore();
    });
  });

  describe('Remain と Counter の同時使用', () => {
    it('両方が表示されること', () => {
      render(
        <AvatarGroup max={1}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <AvatarGroup.Remain />
          <AvatarGroup.Counter />
        </AvatarGroup>,
      );
      expect(screen.getByText('+1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });
});
