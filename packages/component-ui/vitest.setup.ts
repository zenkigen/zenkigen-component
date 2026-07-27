import '@testing-library/jest-dom';

// jsdom は Element.prototype.scrollTo を実装していないため no-op で補う。
// 選択済みの状態で候補リストを開くコンポーネント（Select 等）が選択項目へスクロールする際に呼び出す。
if (typeof Element.prototype.scrollTo !== 'function') {
  Element.prototype.scrollTo = () => {};
}
