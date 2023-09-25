import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { typography } from '../../../component-theme/dist';
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
  onClickPrevButton?: () => void;
  /** 進むボタンクリック時のイベントハンドラ */
  onClickNextButton?: () => void;
  /** Selectが切り替わった時のイベントハンドラ */
  onChange?: (value: number) => void;
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

  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

  const optionsList: SelectOption[] = (() =>
    [...Array(pageMax).fill(null)].map((_, index) => {
      const value = (index + 1).toString();
      return {
        id: value,
        value,
        label: value,
      };
    }))();

  const startNum: number = (currentPage - 1) * sizePerPage + 1;
  const endNum: number = currentPage * sizePerPage > totalSize ? totalSize : currentPage * sizePerPage;

  useEffect(() => {
    const currentOption = optionsList.find((option) => option.value === currentPage.toString());
    if (currentOption) setSelectedOption(currentOption);
  }, [currentPage, optionsList]);

  const classes = 'flex items-center gap-x-1';
  const leftGroupClasses = 'flex items-center gap-x-2';
  const countClasses = clsx('text-text-text01', typography.label.label2regular);
  const pageClasses = clsx('text-text-text03', typography.label.label2regular);
  const navClasses = 'flex items-center';

  return (
    <>
      <nav aria-label="pagination" className={classes}>
        <div className={leftGroupClasses}>
          <div className={countClasses}>
            {startNum} - {endNum}
            {countLabel}
          </div>
          <Select
            size="medium"
            variant="outline"
            selectedOption={selectedOption}
            optionListMaxHeight={optionListMaxHeight}
            onChange={(option) => onChange && option && onChange(Number(option.value))}
          >
            {optionsList && optionsList.map((option) => <Select.Option key={option.id} option={option} />)}
          </Select>
          <div className={pageClasses}>
            / {pageMax}
            {pageLabel}
          </div>
        </div>
        <div className={navClasses}>
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
