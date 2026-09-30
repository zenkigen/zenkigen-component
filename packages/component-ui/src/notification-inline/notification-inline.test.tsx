import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { NotificationInline } from './notification-inline';

// wrapper 直下にはアイコンとメッセージのグループ div があるため、p 要素の 2 つ上が wrapper となる
const getWrapper = (text: string) => screen.getByText(text).parentElement?.parentElement as HTMLElement;

describe('NotificationInline', () => {
  describe('基本機能', () => {
    it('childrenのメッセージが表示されること', () => {
      render(<NotificationInline>テストメッセージ</NotificationInline>);
      expect(screen.getByText('テストメッセージ')).toBeInTheDocument();
    });

    it('メッセージがp要素で描画されること', () => {
      render(<NotificationInline>テストメッセージ</NotificationInline>);
      expect(screen.getByText('テストメッセージ').tagName).toBe('P');
    });
  });

  describe('stateバリエーション', () => {
    it.each([
      ['attention', 'bg-uiBackgroundError'],
      ['warning', 'bg-uiBackgroundWarning'],
      ['information', 'bg-uiBackgroundBlue'],
      ['success', 'bg-uiBackgroundSuccess'],
      ['default', 'bg-uiBackgroundGray'],
    ] as const)('state="%s" で背景色クラス %s が適用されること', (state, expectedClass) => {
      render(<NotificationInline state={state}>メッセージ</NotificationInline>);
      expect(getWrapper('メッセージ').className).toContain(expectedClass);
    });

    it('state="default"（デフォルト）でアイコンが表示されないこと', () => {
      const { container } = render(<NotificationInline>メッセージ</NotificationInline>);
      expect(container.querySelector('svg')).toBeNull();
    });

    it.each([['attention'], ['warning'], ['information'], ['success']] as const)(
      'state="%s" でアイコンが表示されること',
      (state) => {
        const { container } = render(<NotificationInline state={state}>メッセージ</NotificationInline>);
        expect(container.querySelector('svg')).not.toBeNull();
      },
    );
  });

  describe('sizeバリエーション', () => {
    it('smallサイズでpaddingクラスが適用されること', () => {
      render(<NotificationInline size="small">メッセージ</NotificationInline>);
      expect(getWrapper('メッセージ').className).toContain('p-[calc(0.75rem_-_1px)]');
    });

    it('mediumサイズ（デフォルト）でpaddingクラスが適用されること', () => {
      render(<NotificationInline>メッセージ</NotificationInline>);
      expect(getWrapper('メッセージ').className).toContain('p-[calc(1rem_-_1px)]');
    });

    it('mediumサイズでアイコン非表示時も高さを揃えるmin-h-14が適用されること', () => {
      render(<NotificationInline>メッセージ</NotificationInline>);
      expect(getWrapper('メッセージ').className).toContain('min-h-14');
    });

    it('smallサイズではmin-h-14が適用されないこと', () => {
      render(<NotificationInline size="small">メッセージ</NotificationInline>);
      expect(getWrapper('メッセージ').className).not.toContain('min-h-14');
    });

    it('smallサイズで閉じるボタン非表示時も高さを揃えるmin-h-12が適用されること', () => {
      render(<NotificationInline size="small">メッセージ</NotificationInline>);
      expect(getWrapper('メッセージ').className).toContain('min-h-12');
    });

    it('mediumサイズではmin-h-12が適用されないこと', () => {
      render(<NotificationInline>メッセージ</NotificationInline>);
      expect(getWrapper('メッセージ').className).not.toContain('min-h-12');
    });

    it('mediumサイズでメッセージ1行目とアイコンの中心を揃えるpt-[3px]がテキストに適用されること', () => {
      render(<NotificationInline state="attention">メッセージ</NotificationInline>);
      expect(screen.getByText('メッセージ').className).toContain('pt-[3px]');
    });

    it('mediumサイズでもアイコンの無いdefaultではテキストに下げ幅が適用されないこと', () => {
      render(<NotificationInline>メッセージ</NotificationInline>);
      expect(screen.getByText('メッセージ').className).not.toContain('pt-[3px]');
      expect(screen.getByText('メッセージ').className).not.toContain('pt-[1px]');
    });

    it('smallサイズでは文字の光学中心を揃えるpt-[1px]がテキストに適用されること', () => {
      render(
        <NotificationInline size="small" state="attention">
          メッセージ
        </NotificationInline>,
      );
      expect(screen.getByText('メッセージ').className).toContain('pt-[1px]');
    });

    it('smallサイズでもアイコンの無いdefaultではテキストに下げ幅が適用されないこと', () => {
      render(<NotificationInline size="small">メッセージ</NotificationInline>);
      expect(screen.getByText('メッセージ').className).not.toContain('pt-[1px]');
    });
  });

  describe('レイアウト', () => {
    it('アイコンとメッセージのグループが上揃え(items-start)であること', () => {
      render(<NotificationInline state="attention">メッセージ</NotificationInline>);
      expect((screen.getByText('メッセージ').parentElement as HTMLElement).className).toContain('items-start');
    });

    it('smallサイズのアイコンコンテナに1行分の高さ(h-5)と縮み防止(shrink-0)が適用されること', () => {
      render(
        <NotificationInline size="small" state="attention">
          メッセージ
        </NotificationInline>,
      );
      const iconContainer = screen.getByText('メッセージ').previousElementSibling as HTMLElement;
      expect(iconContainer.className).toContain('h-5');
      expect(iconContainer.className).toContain('shrink-0');
    });

    it('mediumサイズのアイコンコンテナにshrink-0が適用され、h-5は適用されないこと', () => {
      render(<NotificationInline state="attention">メッセージ</NotificationInline>);
      const iconContainer = screen.getByText('メッセージ').previousElementSibling as HTMLElement;
      expect(iconContainer.className).toContain('shrink-0');
      expect(iconContainer.className).not.toContain('h-5');
    });
  });

  describe('variantバリエーション', () => {
    it('variant未指定（default）でborder-transparentが適用され、実色のborderクラスが付かないこと', () => {
      render(<NotificationInline state="attention">メッセージ</NotificationInline>);
      const wrapper = getWrapper('メッセージ');
      expect(wrapper.className).toContain('border-transparent');
      expect(wrapper.className).not.toContain('border-support');
      expect(wrapper.className).not.toContain('border-uiBorder04');
    });

    it.each([
      ['attention', 'border-supportError'],
      ['warning', 'border-supportWarning'],
      ['information', 'border-supportInfo'],
      ['success', 'border-supportSuccess'],
      ['default', 'border-uiBorder04'],
    ] as const)('variant="outline" × state="%s" で枠線色クラス %s が適用されること', (state, expectedClass) => {
      render(
        <NotificationInline state={state} variant="outline">
          メッセージ
        </NotificationInline>,
      );
      const wrapper = getWrapper('メッセージ');
      expect(wrapper.className).toContain(expectedClass);
      expect(wrapper.className).not.toContain('border-transparent');
    });

    it('variant="outline" でも背景色クラスがdefaultと同一であること', () => {
      render(
        <NotificationInline state="attention" variant="outline">
          メッセージ
        </NotificationInline>,
      );
      expect(getWrapper('メッセージ').className).toContain('bg-uiBackgroundError');
    });

    it('variantによらずpaddingクラスが同一であること', () => {
      render(
        <NotificationInline size="small" variant="outline">
          メッセージ
        </NotificationInline>,
      );
      expect(getWrapper('メッセージ').className).toContain('p-[calc(0.75rem_-_1px)]');
    });
  });

  describe('閉じるボタン', () => {
    it('showClose未指定でボタンが表示されないこと', () => {
      render(<NotificationInline>メッセージ</NotificationInline>);
      expect(screen.queryByRole('button')).toBeNull();
    });

    it('showClose=trueでボタンが表示されること', () => {
      render(
        <NotificationInline showClose onClickClose={vi.fn()}>
          メッセージ
        </NotificationInline>,
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('閉じるボタンのラッパーにメッセージとの間隔を広げるml-2が適用されること', () => {
      render(
        <NotificationInline showClose onClickClose={vi.fn()}>
          メッセージ
        </NotificationInline>,
      );
      expect((screen.getByRole('button').parentElement as HTMLElement).className).toContain('ml-2');
    });

    it('閉じるボタンのクリックでonClickCloseが呼ばれること', async () => {
      const user = userEvent.setup();
      const handleClickClose = vi.fn();
      render(
        <NotificationInline showClose onClickClose={handleClickClose}>
          メッセージ
        </NotificationInline>,
      );
      await user.click(screen.getByRole('button'));
      expect(handleClickClose).toHaveBeenCalledTimes(1);
    });
  });
});
