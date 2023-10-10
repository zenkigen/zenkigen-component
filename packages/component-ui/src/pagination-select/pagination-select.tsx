import { useEffect, useState } from 'react';

import { typography } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';

import { IconButton } from '../icon-button';
import { SelectOption } from '../select';
import { Select } from '../select';

type Props = {
  /** トータル件数 */
  totalSize: number;
  /** ページあたり件数 */
  sizePerPage: number;
  /** 現在のページ番号 */
  currentPage: number;
  /** 件数表示単位ラベル */
  countLabel?: string;
  /** ページ表示単位ラベル */
  pageLabel?: string;
  /** Selectのリストの最大の高さ */
  optionListMaxHeight?: number;
  /** 戻るボタンクリック時のイベントハンドラ */
  onClickPrevButton: () => void;
  /** 進むボタンクリック時のイベントハンドラ */
  onClickNextButton: () => void;
  /** Selectが切り替わった時のイベントハンドラ */
  onChange: (value: number) => void;
};

export function PaginationSelect({
  totalSize,
  currentPage,
  sizePerPage,
  countLabel = '件',
  pageLabel = 'ページ',
  optionListMaxHeight = 190,
  onClickPrevButton,
  onClickNextButton,
  onChange,
}: Props) {
  const pageMax = Math.ceil(totalSize / sizePerPage);

  const optionsList: SelectOption[] = [...Array(pageMax)].map((_, index) => {
    const value = (index + 1).toString();
    return {
      id: value,
      value,
      label: value,
    };
  });

  return (
    <>
      <nav aria-label="pagination" className="flex items-center gap-x-1">
        <div className="flex items-center gap-x-2">
          <div className={clsx('text-text-text01', typography.label.label2regular)}>
            {(currentPage - 1) * sizePerPage + 1} -{' '}
            {currentPage * sizePerPage > totalSize ? totalSize : currentPage * sizePerPage}
            {countLabel}
          </div>
          <Select
            size="medium"
            variant="outline"
            selectedOption={optionsList.find((option) => option.value === currentPage.toString())}
            optionListMaxHeight={optionListMaxHeight}
            onChange={(option) => onChange && option && onChange(Number(option.value))}
          >
            {optionsList && optionsList.map((option) => <Select.Option key={option.id} option={option} />)}
          </Select>
          <div className={clsx('text-text-text03', typography.label.label2regular)}>
            / {pageMax}
            {pageLabel}
          </div>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            icon="angle-left"
            size="small"
            isDisabled={currentPage === 1}
            onClick={onClickPrevButton}
          />
          <IconButton
            variant="text"
            icon="angle-right"
            size="small"
            isDisabled={currentPage === pageMax}
            onClick={onClickNextButton}
          />
        </div>
      </nav>
    </>
  );
}
