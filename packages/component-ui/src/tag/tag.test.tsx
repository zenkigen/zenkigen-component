import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { InternalTag, Tag } from './tag';

/**
 * Tag テストについて
 *
 * テストの構成：
 * - 基本機能：レンダリング、children 反映
 * - size：x-small / small / medium のクラス反映、デフォルト値
 * - variant：normal / light のクラストークン反映
 * - isEditable：編集可能モードでの削除ボタン描画とサイズ・形状クラス
 * - 削除インタラクション：onDelete に id が渡ること、複数 Tag での id 区別
 * - アクセシビリティ：削除ボタンの accessible name
 * - isDisabled（InternalTag）：削除ボタン非表示・文字色の置き換え・編集モードの形の維持
 * - isDeletable（InternalTag）：削除ボタン非表示・編集モードの形と文字色の維持
 * - isTruncated（InternalTag）：文字の省略・title での全文表示・削除ボタンを縮めないこと・accessible name の維持
 * - 型：公開 Tag に isDisabled / isDeletable / isTruncated を渡せないこと、InternalTag の表示専用タグに isDisabled / isDeletable を渡せないこと
 */

describe('Tag', () => {
  describe('基本機能', () => {
    it('children に渡したテキストが表示されること', () => {
      render(
        <Tag id="tag-1" color="default">
          タグテキスト
        </Tag>,
      );
      expect(screen.getByText('タグテキスト')).toBeInTheDocument();
    });

    it('color を変えると tagColors のクラスが付与されること', () => {
      const { container } = render(
        <Tag id="tag-1" color="supportError">
          ラベル
        </Tag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toMatch(/bg-supportError/);
    });
  });

  describe('size', () => {
    it('size="x-small" の場合、対応する高さクラスが付与されること', () => {
      const { container } = render(
        <Tag id="tag-1" color="default" size="x-small">
          ラベル
        </Tag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toMatch(/h-\[14px\]/);
    });

    it('size="small" の場合、対応する高さクラスが付与されること', () => {
      const { container } = render(
        <Tag id="tag-1" color="default" size="small">
          ラベル
        </Tag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toMatch(/h-4/);
    });

    it('size="medium" の場合、対応する高さクラスが付与されること', () => {
      const { container } = render(
        <Tag id="tag-1" color="default" size="medium">
          ラベル
        </Tag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toMatch(/h-5/);
    });

    it('size 未指定時は medium がデフォルトになること', () => {
      const { container } = render(
        <Tag id="tag-1" color="default">
          ラベル
        </Tag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toMatch(/h-5/);
    });
  });

  describe('variant', () => {
    it('variant 未指定時は tagColors（normal）のクラスが付与されること', () => {
      const { container } = render(
        <Tag id="tag-1" color="supportError">
          ラベル
        </Tag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toMatch(/bg-supportError(?!Light)/);
    });

    it('variant="light" の場合、tagLightColors のクラスが付与されること', () => {
      const { container } = render(
        <Tag id="tag-1" color="supportError" variant="light">
          ラベル
        </Tag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toMatch(/bg-supportErrorLight/);
    });
  });

  describe('isEditable', () => {
    it('isEditable 未指定の場合、削除ボタンが描画されないこと', () => {
      render(
        <Tag id="tag-1" color="default">
          ラベル
        </Tag>,
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('isEditable=true の場合、削除ボタンが 1 つ描画されること', () => {
      const handleDelete = vi.fn();
      render(
        <Tag id="tag-1" color="default" isEditable onDelete={handleDelete}>
          ラベル
        </Tag>,
      );
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1);
    });

    it('isEditable=true の場合、rounded-full クラスが付与されること', () => {
      const handleDelete = vi.fn();
      const { container } = render(
        <Tag id="tag-1" color="default" isEditable onDelete={handleDelete}>
          ラベル
        </Tag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toMatch(/rounded-full/);
    });

    it('isEditable=true の場合、編集モード固有の高さクラスが付与されること', () => {
      const handleDelete = vi.fn();
      const { container } = render(
        <Tag id="tag-1" color="default" isEditable onDelete={handleDelete}>
          ラベル
        </Tag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toMatch(/h-5/);
    });
  });

  describe('削除インタラクション', () => {
    it('削除ボタンクリック時に onDelete が呼ばれること', async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();
      render(
        <Tag id="tag-1" color="default" isEditable onDelete={handleDelete}>
          ラベル
        </Tag>,
      );
      await user.click(screen.getByRole('button'));
      expect(handleDelete).toHaveBeenCalledTimes(1);
    });

    it('onDelete には Tag に渡した id が引数として渡ること', async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();
      render(
        <Tag id="tag-1" color="default" isEditable onDelete={handleDelete}>
          ラベル
        </Tag>,
      );
      await user.click(screen.getByRole('button'));
      expect(handleDelete).toHaveBeenCalledWith('tag-1');
    });

    it('複数 Tag のうち、クリックされた Tag の id のみが渡ること', async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();
      render(
        <div>
          <Tag id="tag-a" color="default" isEditable onDelete={handleDelete}>
            A
          </Tag>
          <Tag id="tag-b" color="gray" isEditable onDelete={handleDelete}>
            B
          </Tag>
        </div>,
      );
      const buttons = screen.getAllByRole('button');
      const secondButton = buttons[1];
      if (secondButton == null) {
        throw new Error('2 つ目の削除ボタンが見つかりません');
      }
      await user.click(secondButton);
      expect(handleDelete).toHaveBeenCalledTimes(1);
      expect(handleDelete).toHaveBeenCalledWith('tag-b');
    });
  });

  describe('アクセシビリティ', () => {
    it('削除ボタンに「children を削除」という accessible name が付くこと', () => {
      render(
        <Tag id="tag-1" color="default" isEditable onDelete={vi.fn()}>
          営業
        </Tag>,
      );
      expect(screen.getByRole('button', { name: '営業を削除' })).toBeInTheDocument();
    });

    it('複数 Tag の削除ボタンを accessible name で区別できること', () => {
      render(
        <div>
          <Tag id="tag-a" color="default" isEditable onDelete={vi.fn()}>
            A
          </Tag>
          <Tag id="tag-b" color="gray" isEditable onDelete={vi.fn()}>
            B
          </Tag>
        </div>,
      );
      expect(screen.getByRole('button', { name: 'Aを削除' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Bを削除' })).toBeInTheDocument();
    });
  });

  describe('公開 Tag に内部用 props が届かないこと', () => {
    it('isDisabled / isDeletable をオブジェクトの展開で渡しても、削除ボタンと文字色は変わらないこと', () => {
      // 型にない props がオブジェクトの展開で実行時に紛れ込むケース
      const internalProps = { isDisabled: true, isDeletable: false };
      render(
        <Tag id="tag-1" color="default" isEditable onDelete={vi.fn()} {...internalProps}>
          営業
        </Tag>,
      );

      expect(screen.getByRole('button', { name: '営業を削除' })).toBeInTheDocument();
      const tag = screen.getByText('営業');
      expect(tag).toHaveClass('text-textOnColor');
      expect(tag).not.toHaveClass('text-disabled01');
    });

    it('isTruncated をオブジェクトの展開で渡しても、文字が span に包まれず幅の制限クラスも付かないこと', () => {
      const internalProps = { isTruncated: true };
      const { container } = render(
        <div>
          <Tag id="tag-1" color="default" isEditable onDelete={vi.fn()} {...internalProps}>
            営業
          </Tag>
          <Tag id="tag-2" color="default" {...internalProps}>
            開発
          </Tag>
        </div>,
      );

      const editableTag = screen.getByText('営業');
      expect(editableTag.tagName).toBe('DIV');
      expect(editableTag).not.toHaveClass('min-w-0');
      expect(editableTag).not.toHaveClass('max-w-full');
      expect(editableTag).not.toHaveAttribute('title');
      expect(screen.getByRole('button', { name: '営業を削除' })).not.toHaveClass('shrink-0');

      const displayTag = screen.getByText('開発');
      expect(displayTag.tagName).toBe('DIV');
      expect(displayTag).not.toHaveClass('min-w-0');
      expect(displayTag).not.toHaveClass('max-w-full');
      expect(container.querySelector('span')).toBeNull();
    });
  });

  describe('isDisabled（InternalTag）', () => {
    it('isDisabled=true の場合、削除ボタンが描画されないこと', () => {
      render(
        <InternalTag id="tag-1" color="default" isEditable onDelete={vi.fn()} isDisabled>
          ラベル
        </InternalTag>,
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('isDisabled=true の場合、isDeletable=true を指定しても削除ボタンが描画されないこと', () => {
      render(
        <InternalTag id="tag-1" color="default" isEditable onDelete={vi.fn()} isDisabled isDeletable>
          ラベル
        </InternalTag>,
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('isDisabled=true の場合、文字色が text-disabled01 になり元の文字色クラスが付かないこと（normal）', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="supportError" isEditable onDelete={vi.fn()} isDisabled>
          ラベル
        </InternalTag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper).toHaveClass('text-disabled01');
      expect(wrapper).not.toHaveClass('text-textOnColor');
      expect(wrapper).toHaveClass('bg-supportError');
    });

    it('isDisabled=true の場合、文字色が text-disabled01 になり元の文字色クラスが付かないこと（light）', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="supportError" variant="light" isEditable onDelete={vi.fn()} isDisabled>
          ラベル
        </InternalTag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper).toHaveClass('text-disabled01');
      expect(wrapper).not.toHaveClass('text-text01');
      expect(wrapper).toHaveClass('bg-supportErrorLight');
    });

    it('isDisabled=true の場合、文字色クラスが text-disabled01 の 1 つだけになること', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="gray" isEditable onDelete={vi.fn()} isDisabled>
          ラベル
        </InternalTag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      const textColorClasses = wrapper.className.split(' ').filter((className) => className.startsWith('text-'));
      expect(textColorClasses).toEqual(['text-disabled01']);
    });

    it('isDisabled=true の場合、形・余白は削除ボタン付きの編集モードと同じであること', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="default" isEditable onDelete={vi.fn()} isDisabled>
          ラベル
        </InternalTag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper).toHaveClass('rounded-full', 'px-2', 'h-5');
      expect(wrapper).not.toHaveClass('rounded');
      expect(wrapper).not.toHaveClass('px-1');
    });

    it('isDisabled 未指定の場合、文字色は通常のままで text-disabled01 が付かないこと', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="supportError" isEditable onDelete={vi.fn()}>
          ラベル
        </InternalTag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper).toHaveClass('text-textOnColor');
      expect(wrapper).not.toHaveClass('text-disabled01');
    });
  });

  describe('isDeletable（InternalTag）', () => {
    it('isDeletable=false の場合、削除ボタンが描画されないこと', () => {
      render(
        <InternalTag id="tag-1" color="default" isEditable onDelete={vi.fn()} isDeletable={false}>
          ラベル
        </InternalTag>,
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('isDeletable=false の場合、形・余白は削除ボタン付きの編集モードと同じであること', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="default" isEditable onDelete={vi.fn()} isDeletable={false}>
          ラベル
        </InternalTag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper).toHaveClass('rounded-full', 'px-2', 'h-5');
      expect(wrapper).not.toHaveClass('rounded');
      expect(wrapper).not.toHaveClass('px-1');
    });

    it('isDeletable=false の場合、文字色は通常のままであること', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="supportError" variant="light" isEditable onDelete={vi.fn()} isDeletable={false}>
          ラベル
        </InternalTag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper).toHaveClass('text-text01', 'bg-supportErrorLight');
      expect(wrapper).not.toHaveClass('text-disabled01');
    });
  });

  describe('isTruncated（InternalTag）', () => {
    const longLabel = 'とても長い名前のくだものドラゴンフルーツとパッションフルーツの盛り合わせ';

    it('編集可能なタグで、文字が truncate の span に入り title に全文が入ること', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="default" isEditable onDelete={vi.fn()} isTruncated>
          {longLabel}
        </InternalTag>,
      );
      const text = screen.getByText(longLabel);
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass('truncate');
      expect(text).toHaveAttribute('title', longLabel);

      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper).toHaveClass('min-w-0', 'max-w-full');
    });

    it('編集可能なタグで、削除ボタンが縮まず accessible name が全文の「children を削除」のままであること', () => {
      render(
        <InternalTag id="tag-1" color="default" isEditable onDelete={vi.fn()} isTruncated>
          {longLabel}
        </InternalTag>,
      );
      const button = screen.getByRole('button', { name: `${longLabel}を削除` });
      expect(button).toHaveClass('shrink-0');
    });

    it('編集可能なタグで、高さ・余白・形は変わらないこと', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="default" isEditable onDelete={vi.fn()} isTruncated>
          {longLabel}
        </InternalTag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper).toHaveClass('h-5', 'px-2', 'rounded-full');
    });

    it('表示専用のタグで、文字が truncate の span に入り title に全文が入ること', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="default" size="small" isTruncated>
          {longLabel}
        </InternalTag>,
      );
      const text = screen.getByText(longLabel);
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass('truncate');
      expect(text).toHaveAttribute('title', longLabel);

      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper).toHaveClass('min-w-0', 'max-w-full', 'h-4', 'px-1', 'rounded');
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('isTruncated 未指定の場合、文字は span に包まれず幅の制限クラスも付かないこと', () => {
      const { container } = render(
        <InternalTag id="tag-1" color="default" isEditable onDelete={vi.fn()}>
          ラベル
        </InternalTag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(screen.getByText('ラベル')).toBe(wrapper);
      expect(wrapper).not.toHaveClass('min-w-0');
      expect(wrapper).not.toHaveClass('max-w-full');
      expect(container.querySelector('span')).toBeNull();
      expect(screen.getByRole('button', { name: 'ラベルを削除' })).not.toHaveClass('shrink-0');
    });
  });

  describe('型', () => {
    it('公開 Tag には isEditable の有無に関わらず isDisabled / isDeletable を渡せないこと', () => {
      render(
        <div>
          {/* @ts-expect-error 公開 Tag には isDisabled を渡せない */}
          <Tag id="tag-a" color="default" isDisabled>
            A
          </Tag>
          {/* @ts-expect-error 公開 Tag には isDeletable を渡せない */}
          <Tag id="tag-b" color="default" isDeletable={false}>
            B
          </Tag>
          {/* @ts-expect-error 公開 Tag には isEditable 指定時も isDisabled を渡せない */}
          <Tag id="tag-c" color="default" isEditable onDelete={vi.fn()} isDisabled>
            C
          </Tag>
          {/* @ts-expect-error 公開 Tag には isEditable 指定時も isDeletable を渡せない */}
          <Tag id="tag-d" color="default" isEditable onDelete={vi.fn()} isDeletable={false}>
            D
          </Tag>
        </div>,
      );
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('公開 Tag には isEditable の有無に関わらず isTruncated を渡せないこと', () => {
      render(
        <div>
          {/* @ts-expect-error 公開 Tag には isTruncated を渡せない */}
          <Tag id="tag-a" color="default" isTruncated>
            A
          </Tag>
          {/* @ts-expect-error 公開 Tag には isEditable 指定時も isTruncated を渡せない */}
          <Tag id="tag-b" color="default" isEditable onDelete={vi.fn()} isTruncated>
            B
          </Tag>
        </div>,
      );
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('InternalTag でも表示専用タグには isDisabled / isDeletable を渡せないこと', () => {
      render(
        <div>
          {/* @ts-expect-error isEditable 未指定のタグには isDisabled を渡せない */}
          <InternalTag id="tag-a" color="default" isDisabled>
            A
          </InternalTag>
          {/* @ts-expect-error isEditable 未指定のタグには isDeletable を渡せない */}
          <InternalTag id="tag-b" color="default" isDeletable={false}>
            B
          </InternalTag>
        </div>,
      );
      expect(screen.getByText('A')).toBeInTheDocument();
    });
  });
});
