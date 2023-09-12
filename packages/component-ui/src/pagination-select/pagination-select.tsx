import { useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';

import { typography } from '../../../component-theme/dist';
import { IconButton } from '../icon-button';
import { SelectOption } from '../select';
import { Select } from '../select';

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
  pageLimit,
  countLabel = '件',
  pageLabel = 'ページ',
  onChange,
}: Props) {
  const pageMax = useMemo(() => {
    return Math.ceil(total / pageLimit);
  }, [pageLimit, total]);

  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

  const optionsList: SelectOption[] = useMemo(
    () =>
      [...Array(pageMax).fill(null)].map((_, index) => {
        const value = (index + 1).toString();
        return {
          id: value,
          value,
          label: value,
        };
      }),
    [pageMax],
  );

  const startNum: number = useMemo(() => {
    return (currentPage - 1) * pageLimit + 1;
  }, [currentPage, pageLimit]);

  const endNum: number = useMemo(() => {
    return currentPage * pageLimit > total ? total : currentPage * pageLimit;
  }, [currentPage, pageLimit, total]);

  useEffect(() => {
    const currentOption = optionsList.find((option) => option.value === currentPage.toString());
    if (currentOption) setSelectedOption(currentOption);
  }, [currentPage, optionsList]);

  const classes = clsx('flex', 'items-center', 'gap-x-1');
  const leftGroupClasses = clsx('flex', 'items-center', 'gap-x-2');
  const countClasses = clsx('text-text-text01', typography.label.label2regular);
  const pageClasses = clsx('text-text-text03', typography.label.label2regular);
  const navClasses = clsx('flex', 'items-center');

  return (
    <>
      <div className={classes}>
        <div className={leftGroupClasses}>
          <div className={countClasses}>
            {startNum} - {endNum}
            {countLabel}
          </div>
          <Select
            size="medium"
            variant="outline"
            selectedOption={selectedOption}
            optionListMaxHeight={190}
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
