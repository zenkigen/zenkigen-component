import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  /** input 要素と label を紐付けるためのユニークな ID */
  id: string;
  /** トラックとインジケータの物理サイズおよびラベルのタイポグラフィを切り替えます */
  size: 'small' | 'medium' | 'large';
  /** ON/OFF の状態。true でインジケータを右端に表示します */
  isChecked: boolean;
  /** ユーザー操作ごとに呼ばれるコールバック。親側で状態を反転させます */
  onChange: () => void;
  /** トグルの対象を説明するラベル。任意の ReactNode を渡せます */
  label?: ReactNode;
  /** ラベルをトラックの左右どちらに配置するか。デフォルトは right */
  labelPosition?: 'left' | 'right';
  /** true の場合は操作を無効化し、淡色スタイルにします */
  isDisabled?: boolean;
};

export function Toggle({
  id,
  size = 'medium',
  isChecked,
  onChange,
  label,
  labelPosition = 'right',
  isDisabled = false,
}: Props) {
  const baseClasses = clsx('relative flex items-center rounded-full', {
    'bg-disabledOn': isDisabled && isChecked,
    'bg-disabled01': isDisabled && !isChecked,
    'bg-interactive01 peer-hover:bg-hover01': !isDisabled && isChecked,
    'bg-interactive02 peer-hover:bg-hoverGray': !isDisabled && !isChecked,
    'w-8 h-4 px-[3px]': size === 'small',
    'w-12 h-6 px-1': size === 'medium' || size === 'large',
  });
  const inputClasses = clsx(
    'peer absolute inset-0 z-[1] opacity-0',
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
  );
  const indicatorClasses = clsx('rounded-full bg-iconOnColor', {
    'w-2.5 h-2.5': size === 'small',
    'w-4 h-4': size === 'medium' || size === 'large',
    'ml-auto': isChecked,
  });
  const labelClasses = clsx('break-all', {
    'mr-2': labelPosition === 'left',
    'ml-2': labelPosition === 'right',
    'typography-label14regular': size === 'small' || size === 'medium',
    'typography-label16regular': size === 'large',
    'pointer-events-none cursor-not-allowed text-disabled01': isDisabled,
    'cursor-pointer text-text01': !isDisabled,
  });

  return (
    <div className="relative flex flex-[0_0_auto] items-center">
      {label != null && labelPosition === 'left' && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        type="checkbox"
        name={id}
        id={id}
        checked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
      />
      <div className={baseClasses}>
        <span className={indicatorClasses} />
      </div>
      {label != null && labelPosition === 'right' && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
    </div>
  );
}
