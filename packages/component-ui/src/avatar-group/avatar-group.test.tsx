import { render, screen } from '@testing-library/react';
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

    it('aria-label が設定できること', () => {
      render(
        <AvatarGroup aria-label="参加者一覧">
          <Avatar userId={1} firstName="太郎" lastName="田中" />
        </AvatarGroup>,
      );
      expect(screen.getByRole('group', { name: '参加者一覧' })).toBeInTheDocument();
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
        </AvatarGroup>,
      );
      expect(screen.getByText('田中')).toBeInTheDocument();
      expect(screen.getByText('渡辺')).toBeInTheDocument();
      expect(screen.queryByText('伊藤')).not.toBeInTheDocument();
    });

    it('max に 0 が渡された場合、最低1つは Avatar が表示されること', () => {
      render(
        <AvatarGroup max={0}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
        </AvatarGroup>,
      );
      expect(screen.getByText('田中')).toBeInTheDocument();
      expect(screen.queryByText('鈴木')).not.toBeInTheDocument();
      expect(screen.getByText('+1')).toBeInTheDocument();
    });

    it('max に負値が渡された場合、最低1つは Avatar が表示されること', () => {
      render(
        <AvatarGroup max={-3}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
        </AvatarGroup>,
      );
      expect(screen.getByText('田中')).toBeInTheDocument();
      expect(screen.queryByText('鈴木')).not.toBeInTheDocument();
    });
  });

  describe('デフォルトのサプライズバッジ', () => {
    it('max を超える場合、デフォルトで +N バッジが自動表示されること', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
        </AvatarGroup>,
      );
      expect(screen.getByText('+1')).toBeInTheDocument();
    });

    it('max 以下の場合、+N バッジは表示されないこと', () => {
      render(
        <AvatarGroup max={5}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
        </AvatarGroup>,
      );
      expect(screen.queryByText('+0')).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/残り/)).not.toBeInTheDocument();
    });

    it('デフォルトバッジに aria-label="残りN人" が付与されること', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          <Avatar userId={4} firstName="次郎" lastName="高橋" />
        </AvatarGroup>,
      );
      expect(screen.getByLabelText('残り2人')).toBeInTheDocument();
    });
  });

  describe('total prop', () => {
    it('total を指定すると total - max の値が +N で表示されること', () => {
      render(
        <AvatarGroup max={5} total={1000}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          <Avatar userId={4} firstName="次郎" lastName="高橋" />
          <Avatar userId={5} firstName="三郎" lastName="渡辺" />
        </AvatarGroup>,
      );
      expect(screen.getByText('+995')).toBeInTheDocument();
    });

    it('total 未指定時は children.length - max が表示されること', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          <Avatar userId={4} firstName="次郎" lastName="高橋" />
        </AvatarGroup>,
      );
      expect(screen.getByText('+2')).toBeInTheDocument();
    });

    it('total が children 件数以下の場合は +N が表示されないこと', () => {
      render(
        <AvatarGroup max={5} total={3}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
        </AvatarGroup>,
      );
      expect(screen.queryByLabelText(/残り/)).not.toBeInTheDocument();
    });
  });

  describe('条件付きレンダリング', () => {
    it('null / false が children に混在しても件数・描画が一致すること', () => {
      const shouldShow = false;
      render(
        <AvatarGroup max={3}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          {shouldShow && <Avatar userId={2} firstName="花子" lastName="鈴木" />}
          {null}
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
        </AvatarGroup>,
      );
      expect(screen.getByText('田中')).toBeInTheDocument();
      expect(screen.getByText('佐藤')).toBeInTheDocument();
      expect(screen.queryByLabelText(/残り/)).not.toBeInTheDocument();
    });
  });

  describe('renderSurplus', () => {
    it('renderSurplus が指定されたときに呼び出され、返した ReactNode が描画されること', () => {
      render(
        <AvatarGroup max={2} renderSurplus={({ remain }) => <span>custom+{remain}</span>}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          <Avatar userId={4} firstName="次郎" lastName="高橋" />
        </AvatarGroup>,
      );
      expect(screen.getByText('custom+2')).toBeInTheDocument();
    });

    it('renderSurplus に渡る remain / total が正しいこと', () => {
      const renderSurplus = vi.fn(() => <span>custom</span>);
      render(
        <AvatarGroup max={2} total={10} renderSurplus={renderSurplus}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
        </AvatarGroup>,
      );
      expect(renderSurplus).toHaveBeenCalledWith(expect.objectContaining({ remain: 8, total: 10 }));
    });

    it('renderSurplus に渡る defaultBadge をそのまま描画するとデフォルトと同等の内容になること', () => {
      render(
        <AvatarGroup max={2} renderSurplus={({ defaultBadge }) => <div data-testid="wrap">{defaultBadge}</div>}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
        </AvatarGroup>,
      );
      const wrap = screen.getByTestId('wrap');
      expect(wrap).toHaveTextContent('+1');
      expect(wrap.querySelector('[aria-label="残り1人"]')).not.toBeNull();
    });

    it('max 以下の場合、renderSurplus は呼ばれないこと', () => {
      const renderSurplus = vi.fn(() => <span>custom</span>);
      render(
        <AvatarGroup max={5} renderSurplus={renderSurplus}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
        </AvatarGroup>,
      );
      expect(renderSurplus).not.toHaveBeenCalled();
    });

    it('renderSurplus が null を返した場合、何も描画されないこと', () => {
      render(
        <AvatarGroup max={2} renderSurplus={() => null}>
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
        </AvatarGroup>,
      );
      expect(screen.queryByLabelText(/残り/)).not.toBeInTheDocument();
      expect(screen.queryByText('+1')).not.toBeInTheDocument();
    });
  });

  describe('Tooltip ラップ', () => {
    it('Tooltip でラップされた Avatar を children に入れても max / slice / +N 計算が正しく動くこと', () => {
      render(
        <AvatarGroup max={2}>
          <Tooltip content="田中 太郎" verticalPosition="top">
            <Avatar userId={1} firstName="太郎" lastName="田中" />
          </Tooltip>
          <Tooltip content="鈴木 花子" verticalPosition="top">
            <Avatar userId={2} firstName="花子" lastName="鈴木" />
          </Tooltip>
          <Tooltip content="佐藤 一郎" verticalPosition="top">
            <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          </Tooltip>
        </AvatarGroup>,
      );
      expect(screen.getByText('田中')).toBeInTheDocument();
      expect(screen.getByText('鈴木')).toBeInTheDocument();
      expect(screen.queryByText('佐藤')).not.toBeInTheDocument();
      expect(screen.getByText('+1')).toBeInTheDocument();
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
});
