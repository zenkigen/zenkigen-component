import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Pagination } from './pagination';

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ナビゲーション', () => {
    it('端のページでは前後ボタンの無効状態が切り替わること', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { rerender } = render(<Pagination currentPage={1} totalPage={10} onClick={handleClick} />);

      const prevButton = screen.getByRole('button', { name: 'angleLeft' });
      const nextButton = screen.getByRole('button', { name: 'angleRight' });

      await user.click(prevButton);
      expect(handleClick).not.toHaveBeenCalled();
      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeEnabled();

      await user.click(nextButton);
      expect(handleClick).toHaveBeenCalledWith(2);

      rerender(<Pagination currentPage={10} totalPage={10} onClick={handleClick} />);

      expect(screen.getByRole('button', { name: 'angleLeft' })).toBeEnabled();
      expect(screen.getByRole('button', { name: 'angleRight' })).toBeDisabled();

      await user.click(screen.getByRole('button', { name: 'angleLeft' }));
      expect(handleClick).toHaveBeenCalledWith(9);
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('currentPageが範囲外でも1〜totalPageにクランプされること', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { rerender } = render(<Pagination currentPage={0} totalPage={3} onClick={handleClick} />);

      expect(screen.getByRole('button', { name: '1' })).toHaveClass('border-uiBorder02');
      expect(screen.getByRole('button', { name: 'angleLeft' })).toBeDisabled();

      rerender(<Pagination currentPage={10} totalPage={3} onClick={handleClick} />);

      expect(screen.getByRole('button', { name: '3' })).toHaveClass('border-uiBorder02');
      expect(screen.getByRole('button', { name: 'angleRight' })).toBeDisabled();

      await user.click(screen.getByRole('button', { name: 'angleLeft' }));
      expect(handleClick).toHaveBeenCalledWith(2);
    });
  });

  describe('ページ番号', () => {
    it('クリックで選択中のページが切り替わること', async () => {
      const user = userEvent.setup();

      const Wrapper = () => {
        const [page, setPage] = useState(1);

        return <Pagination currentPage={page} totalPage={10} onClick={(value) => setPage(value)} />;
      };

      render(<Wrapper />);

      expect(screen.getByRole('button', { name: '1' })).toHaveClass('border-uiBorder02');

      await user.click(screen.getByRole('button', { name: '4' }));

      expect(screen.getByRole('button', { name: '4' })).toHaveClass('border-uiBorder02');
      expect(screen.getByRole('button', { name: '1' })).toHaveClass('border-transparent');
    });

    it('sideNumPagesToShowで表示範囲が制御されること', () => {
      render(<Pagination currentPage={10} totalPage={20} sideNumPagesToShow={1} onClick={() => {}} />);

      expect(screen.getByRole('button', { name: '9' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '11' })).toBeInTheDocument();

      expect(screen.queryByRole('button', { name: '8' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '12' })).not.toBeInTheDocument();
    });

    it('先頭ページでは余った枠が右側に寄せられ、sideNumPagesToShowの2倍分だけ表示されること', () => {
      render(<Pagination currentPage={1} totalPage={200} sideNumPagesToShow={4} onClick={() => {}} />);

      const pageButtons = ['2', '3', '4', '5', '6', '7', '8', '9'];
      pageButtons.forEach((page) => {
        expect(screen.getByRole('button', { name: page })).toBeInTheDocument();
      });
      expect(screen.queryByRole('button', { name: '10' })).not.toBeInTheDocument();
    });

    it('totalPageが少なくsideNumPagesToShowが大きい場合でも範囲外のページが描画されないこと', () => {
      render(<Pagination currentPage={1} totalPage={3} sideNumPagesToShow={5} onClick={() => {}} />);

      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();

      expect(screen.queryByRole('button', { name: '0' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '4' })).not.toBeInTheDocument();
      expect(screen.queryByRole('img', { name: 'more' })).not.toBeInTheDocument();
    });
  });

  describe('省略記号', () => {
    it('ページ位置に応じて省略記号の数が変わること', () => {
      const { rerender } = render(<Pagination currentPage={1} totalPage={20} onClick={() => {}} />);
      expect(screen.queryAllByRole('img', { name: 'more' })).toHaveLength(1);

      rerender(<Pagination currentPage={10} totalPage={20} onClick={() => {}} />);
      expect(screen.queryAllByRole('img', { name: 'more' })).toHaveLength(2);

      rerender(<Pagination currentPage={20} totalPage={20} onClick={() => {}} />);
      expect(screen.queryAllByRole('img', { name: 'more' })).toHaveLength(1);
    });
  });

  describe('表示ガード', () => {
    it('totalPageが1の場合でもページ1が選択状態で表示され、前後ボタンが非活性であること', () => {
      render(<Pagination currentPage={1} totalPage={1} onClick={() => {}} />);

      expect(screen.getAllByRole('button', { name: '1' })).toHaveLength(1);
      expect(screen.getByRole('button', { name: '1' })).toHaveClass('border-uiBorder02');
      expect(screen.getByRole('button', { name: 'angleLeft' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'angleRight' })).toBeDisabled();
      expect(screen.queryAllByRole('img', { name: 'more' })).toHaveLength(0);
    });
  });
});
