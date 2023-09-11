import { useCallback, useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';

import { typography } from '../../../component-theme/dist';
import { IconButton } from '../icon-button';
import { SelectOption } from '../select';
import { Select } from '../select';

const arrayRange = (start: number, stop: number, step: number): Array<number> =>
  Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

type Props = {
  total: number;
  currentPage: number;
  pageLimit: number;
  countLabel?: string;
  pageLabel?: string;
  onChange?: (value: number) => void;
};

export function PaginationSelect({
  total,
  currentPage,
  pageLimit = 10,
  countLabel = '',
  pageLabel = 'ページ',
  onChange,
}: Props) {
  const pageMax = useMemo(() => {
    return Math.ceil(total / pageLimit);
  }, [pageLimit, total]);

  const [optionsList, setOptionsList] = useState<SelectOption[] | null>();
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

  const classes = clsx('flex', 'items-center', 'gap-x-1');
  const leftGroupClasses = clsx('flex', 'items-center', 'gap-x-2');
  const countClasses = clsx('text-text-text01', typography.label.label2regular);
  const pageClasses = clsx('text-text-text03', typography.label.label2regular);
  const navClasses = clsx('flex', 'items-center');

  const handleOnChange = useCallback(
    (option: SelectOption | null) => {
      if (option) {
        onChange && onChange(Number(option.value));
      }
    },
    [onChange],
  );

  useEffect(() => {
    const pageNoList: Array<number> = arrayRange(1, pageMax, 1);
    const optionsList: Array<SelectOption> = [];
    pageNoList.map((pageNo) => {
      const pageNoStr = pageNo.toString();
      optionsList.push({ id: pageNoStr, value: pageNoStr, label: pageNoStr });
    });
    setOptionsList(optionsList);
    setSelectedOption(optionsList[0] ? optionsList[0] : null);
  }, [pageMax]);

  useEffect(() => {
    const currentOption = optionsList?.find((option) => option.value === currentPage.toString());
    if (currentOption) setSelectedOption(currentOption);
  }, [currentPage, optionsList]);

  return (
    <>
      <div className={classes}>
        <div className={leftGroupClasses}>
          <div className={countClasses}>
            {(currentPage - 1) * pageLimit + 1} - {currentPage * pageLimit > total ? total : currentPage * pageLimit}
            {countLabel}
          </div>
          <Select size="medium" variant="outline" selectedOption={selectedOption} onChange={handleOnChange}>
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
            onClick={() => onChange && onChange(currentPage - 1)}
          />
          <IconButton
            variant="text"
            icon="angle-right"
            size="small"
            isDisabled={currentPage === pageMax}
            onClick={() => onChange && onChange(currentPage + 1)}
          />
        </div>
      </div>
      <div></div>
    </>
  );
}
