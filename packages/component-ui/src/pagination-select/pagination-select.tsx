import { IconButton } from '../icon-button';
import type { SelectOption } from '../select';
import { Select } from '../select';

type Props = {
  /** データの総件数。Selectのオプション数と件数表示の上下限計算に用いる。 */
  totalSize: number;
  /** 1ページに表示する件数。pageMax = Math.ceil(totalSize / sizePerPage) の計算に利用する。 */
  sizePerPage: number;
  /** 現在のページ番号（1起算）。Selectの選択状態と前後ボタンの活性状態を決定する。 */
  currentPage: number;
  /** 件数範囲表示の末尾に付与する単位ラベル（例: 件 / results）。 */
  countLabel?: string;
  /** 「/ pageMax」表示に付与する単位ラベル（例: ページ）。 */
  pageLabel?: string;
  /** Selectのドロップダウンリストに設定する最大高さ(px)。 */
  optionListMaxHeight?: number;
  /** 戻るボタンクリック時のイベントハンドラ。呼び出し側でcurrentPageを減算する。 */
  onClickPrevButton: () => void;
  /** 進むボタンクリック時のイベントハンドラ。呼び出し側でcurrentPageを加算する。 */
  onClickNextButton: () => void;
  /** Selectが別のページに切り替わった時のイベントハンドラ。引数は選択されたページ番号。 */
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

  const minCount = totalSize ? (currentPage - 1) * sizePerPage + 1 : 0;
  const maxCount = currentPage * sizePerPage > totalSize ? totalSize : currentPage * sizePerPage;

  return (
    <nav aria-label="pagination" className="flex items-center gap-x-1">
      <div className="flex items-center gap-x-2">
        <div className="typography-label14regular flex gap-1 text-text01">
          <span className=" ">
            {minCount > 0 && `${minCount} - `}
            {maxCount}
          </span>
          <span>/ {totalSize}</span>
          <span>{countLabel}</span>
        </div>
        <Select
          size="medium"
          variant="outline"
          selectedOption={optionsList.find((option) => option.value === currentPage.toString())}
          optionListMaxHeight={optionListMaxHeight}
          onChange={(option) => option && onChange(Number(option.value))}
          isDisabled={pageMax === 0}
        >
          {optionsList.map((option) => (
            <Select.Option key={option.id} option={option} />
          ))}
        </Select>
        <div className="typography-label14regular text-text02">
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
          isDisabled={currentPage === pageMax || pageMax === 0}
          onClick={onClickNextButton}
        />
      </div>
    </nav>
  );
}
