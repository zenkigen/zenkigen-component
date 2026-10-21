import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { ComboboxEmptyProps, ComboboxLoadingProps } from './combobox.types';
import { useComboboxContext } from './combobox-context';
import { hasRenderableChildren } from './has-renderable-children';

/**
 * 単純な display 用の li ベース Compound。
 * Loading / Empty で共通の見た目（中央寄せ・グレー文字）を提供する。
 * 中身は各 Compound の children で差し替えられる（未指定時は各 Compound の既定文言）。
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

// `{isX && '文言'}` の boolean や、変数経由の空文字、それらだけの配列は未指定とみなし、既定文言を描画する（空の行にしない）
const hasCustomContent = (children: ReactNode) => hasRenderableChildren(children);

const DEFAULT_LOADING_MESSAGE = '読み込み中...';

export function ComboboxLoading({ children }: ComboboxLoadingProps) {
  return (
    <StatusItem componentName="Combobox.Loading">
      {hasCustomContent(children) ? children : DEFAULT_LOADING_MESSAGE}
    </StatusItem>
  );
}

const DEFAULT_EMPTY_MESSAGE = '一致する情報が見つかりません';

export function ComboboxEmpty({ children }: ComboboxEmptyProps) {
  return (
    <StatusItem componentName="Combobox.Empty">
      {hasCustomContent(children) ? children : DEFAULT_EMPTY_MESSAGE}
    </StatusItem>
  );
}
