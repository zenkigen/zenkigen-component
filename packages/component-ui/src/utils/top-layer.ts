/**
 * Modal 表示中も操作可能・読み上げ可能に保つ要素に付与する属性（ライブラリ内部専用）。
 * Modal は FloatingFocusManager の getInsideElements でこの属性を持つ要素を除外し、
 * inert / aria-hidden の対象から外す。
 *
 * - 付けてよいのは自コンポーネントが描画した要素だけ
 * - document.body / <html> / 利用側から渡されたコンテナには付けない
 *   （ページ全体が除外され、Modal のフォーカストラップが無効化される）
 * - パッケージの公開エントリ（src/index.ts）からは export しない
 *   （属性名を利用側に約束しないことで、後から名前や方式を変えられるようにする）
 */
export const TOP_LAYER_ATTRIBUTE = 'data-zenkigen-top-layer';
