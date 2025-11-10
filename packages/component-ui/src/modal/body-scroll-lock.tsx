import { useLayoutEffect } from 'react';

/**
 * モーダル表示時にバックグラウンドのスクロールを防止するコンポーネント。
 * コンポーネントがマウントされている間、position: fixedアプローチを使用して
 * body要素にスクロールロックを適用します。
 * 縦横両方のスクロール位置を保存し、コンポーネントのアンマウント時に復元します。
 * スクロールバーの有無を検出し、その幅を考慮してレイアウトシフトを防止します。
 * position、top、left、width、overflow、padding-rightを変更し、
 * 最小限の変更でスクロールを防止します。
 * グローバルCSSに依存せず、すべてインラインスタイルで実装されています。
 * このコンポーネントは実際のDOM要素をレンダリングせず、効果のみを適用します。
 *
 * @example
 * // モーダルコンポーネント内で使用する例
 * const Modal = ({ isOpen, children }) => {
 *   return (
 *     <>
 *       {isOpen && <BodyScrollLock />}
 *       {isOpen && (
 *         <div className="modal">
 *           {children}
 *         </div>
 *       )}
 *     </>
 *   );
 * };
 */
export const BodyScrollLock = (): null => {
  useLayoutEffect(() => {
    // 現在の縦横スクロール位置を記録
    const { scrollX, scrollY } = window;
    const { body } = document;

    // スクロールバーの有無と幅を検出
    const hasVerticalScrollbar = document.documentElement.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = hasVerticalScrollbar ? window.innerWidth - document.documentElement.clientWidth : 0;

    // 元のインラインスタイルの値を保存
    const originalInlineStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    // スクロールロックスタイルを適用
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    // スクロールバーがある場合、その幅分だけpadding-rightを調整
    if (hasVerticalScrollbar && scrollbarWidth > 0) {
      // 現在のpadding-rightの値を取得
      const { paddingRight } = window.getComputedStyle(body);
      const paddingRightValue = paddingRight !== '' ? parseInt(paddingRight, 10) : 0;

      // スクロールバーの幅を加算
      body.style.paddingRight = `${paddingRightValue + scrollbarWidth}px`;
    }

    // クリーンアップ関数
    return () => {
      // 元のスタイル値を取得
      const { position, top, left, width, overflow, paddingRight } = originalInlineStyles;

      // プロパティごとに元の値を復元
      restoreProperty(body, 'position', position);
      restoreProperty(body, 'top', top);
      restoreProperty(body, 'left', left);
      restoreProperty(body, 'width', width);
      restoreProperty(body, 'overflow', overflow);
      restoreProperty(body, 'padding-right', paddingRight);

      // スクロール位置を復元
      window.scrollTo(scrollX, scrollY);
    };
  }, []); // 空の依存配列を指定して初回のみ実行

  // DOM要素をレンダリングせず、nullを返す
  return null;
};

/**
 * 元のスタイル値を復元するヘルパー関数
 * @param element スタイルを復元する要素
 * @param property 復元するCSSプロパティ名
 * @param value 復元する値
 */
function restoreProperty(element: HTMLElement, property: string, value: string): void {
  if (value !== '') {
    element.style.setProperty(property, value);
  } else {
    element.style.removeProperty(property);
  }
}
