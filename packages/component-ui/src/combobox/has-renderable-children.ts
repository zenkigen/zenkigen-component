import type { ReactNode } from 'react';
import { Children } from 'react';

/**
 * children に描画されるものがあるか。
 * `Children.toArray` で配列を平らにし、null / undefined / boolean を除いたうえで空文字も除く。
 * `{a && <X />}{b && <Y />}` が両方 false の `[false, false]` や、空の `map` 結果 `[]`、`''` は描画されるものが無いとみなす。
 * フラグメントで包んだ場合（`<>{cond && 'text'}</>`）はフラグメント自体が残るため、中身が空でも true になる。
 */
export const hasRenderableChildren = (children: ReactNode) => Children.toArray(children).some((child) => child !== '');
