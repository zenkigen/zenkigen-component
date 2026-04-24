import clsx from 'clsx';
import type { ReactNode } from 'react';

import { useComboboxContext } from './combobox-context';

/**
 * 単純な display 用の li ベース Compound。
 * Loading / Empty で共通の見た目（中央寄せ・グレー文字）を提供する。
 * 文言は各 Compound のデフォルト固定で、利用者によるカスタマイズには現時点では対応しない。
 */
function StatusItem({ children, componentName }: { children: ReactNode; componentName: string }) {
  const { size } = useComboboxContext(componentName);

  const liClasses = clsx('flex w-full items-center px-3 text-text02', {
    'h-8': size === 'medium',
    'h-10': size === 'large',
  });
  // 幅が狭い場合に ... で truncate されるよう、中身は flex-1 + min-w-0 + truncate の span で包む
  const textClasses = clsx('min-w-0 flex-1 truncate text-center', {
    'typography-label14regular': size === 'medium',
    'typography-label16regular': size === 'large',
  });

  return (
    <li role="presentation" className={liClasses}>
      <span className={textClasses}>{children}</span>
    </li>
  );
}

const DEFAULT_LOADING_MESSAGE = '読み込み中...';

export function ComboboxLoading() {
  return <StatusItem componentName="Combobox.Loading">{DEFAULT_LOADING_MESSAGE}</StatusItem>;
}

const DEFAULT_EMPTY_MESSAGE = '一致する情報が見つかりません';

export function ComboboxEmpty() {
  return <StatusItem componentName="Combobox.Empty">{DEFAULT_EMPTY_MESSAGE}</StatusItem>;
}
