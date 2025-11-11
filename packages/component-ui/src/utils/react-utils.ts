import type * as React from 'react';

/**
 * 複数の ref を結合するユーティリティ関数
 *
 * @description
 * 複数のrefを1つのDOM要素に設定したい場合に使用します。
 * 親コンポーネントから受け取ったrefと、内部で使用するrefを同時に設定する場合などに便利です。
 *
 * @example
 * ```tsx
 * const Component = forwardRef<HTMLDivElement>((props, ref) => {
 *   const internalRef = useRef<HTMLDivElement>(null);
 *   return <div ref={composeRefs(ref, internalRef)} />;
 * });
 * ```
 */
export function composeRefs<T>(...refs: Array<React.Ref<T> | undefined | null>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (ref == null) {
        continue;
      }
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}

/**
 * React要素かどうかを判定するユーティリティ関数
 *
 * @description
 * React.ReactNodeが実際にReact.ReactElementかどうかを型安全に判定します。
 * childrenプロパティが文字列や数値ではなく、実際のReact要素かどうかを確認する場合などに使用します。
 *
 * @example
 * ```tsx
 * if (isElement(children)) {
 *   // children は React.ReactElement として扱える
 *   console.log(children.type);
 * }
 * ```
 */
export function isElement(node: React.ReactNode): node is React.ReactElement {
  return node != null && typeof node === 'object' && 'type' in (node as object);
}
