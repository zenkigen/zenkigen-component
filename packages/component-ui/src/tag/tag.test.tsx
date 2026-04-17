import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Tag } from './tag';

/**
 * Tag テストについて
 *
 * テストの構成：
 * - 基本機能：レンダリング、children 反映
 * - size：x-small / small / medium のクラス反映、デフォルト値
 * - variant：normal / light のクラストークン反映
 * - isEditable：編集可能モードでの削除ボタン描画とサイズ・形状クラス
 * - 削除インタラクション：onDelete に id が渡ること、複数 Tag での id 区別
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
      expect(wrapper.className).toMatch(/h-\[18px\]/);
    });

    it('size 未指定時は medium がデフォルトになること', () => {
      const { container } = render(
        <Tag id="tag-1" color="default">
          ラベル
        </Tag>,
      );
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toMatch(/h-\[18px\]/);
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
      expect(wrapper.className).toMatch(/h-\[22px\]/);
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
});
