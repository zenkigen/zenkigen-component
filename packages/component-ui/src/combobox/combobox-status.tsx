import clsx from 'clsx';

import type { ComboboxStatusProps } from './combobox.types';
import { useComboboxContext } from './combobox-context';

/**
 * 単純な display 用の li ベース Compound。
 * Loading / Empty で共通の見た目（中央寄せ・グレー文字）を提供する。
 */
function StatusItem({ children, componentName }: ComboboxStatusProps & { componentName: string }) {
  const { size } = useComboboxContext(componentName);

  const classes = clsx('flex w-full items-center justify-center px-3 text-text02', {
    'h-8 typography-label14regular': size === 'medium',
    'h-10 typography-label16regular': size === 'large',
  });

  return (
    <li role="presentation" className={classes}>
      {children}
    </li>
  );
}

export function ComboboxLoading({ children }: ComboboxStatusProps) {
  return <StatusItem componentName="Combobox.Loading">{children}</StatusItem>;
}

const DEFAULT_EMPTY_MESSAGE = '一致する情報が見つかりません';

export function ComboboxEmpty({ children }: ComboboxStatusProps) {
  return <StatusItem componentName="Combobox.Empty">{children ?? DEFAULT_EMPTY_MESSAGE}</StatusItem>;
}
