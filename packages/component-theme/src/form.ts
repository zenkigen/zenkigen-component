export const focusVisible = {
  normal:
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-focus focus-visible:outline-offset-1',
  /** 外部ライブラリのスタイルを上書きする必要がある場合に使用 */
  normalImportant:
    'focus-visible:!outline focus-visible:!outline-2 focus-visible:!outline-focus-focus focus-visible:!outline-offset-1',
  inset:
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-focus focus-visible:outline-offset-[-2px]',
  normalPeer:
    'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-focus-focus',
  insetPeer:
    'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[-2px] peer-focus-visible:outline-focus-focus',
};
