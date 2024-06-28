# @zenkigen-inc/component-config

## 開発者向け

### カラートークンを更新する

Tokens Studio for Figma (旧 Figma Tokens) から export された tokens.json を token-transformer と Style Dictionary を用いてライブラリで使用できるよう変換しています。

1. Tokens Studio で `Include parent key` の チェックを ON で export する
1. `style-dictionary/tokens.json` に上書きする
1. `yarn build:tokens` を実行する

## ライセンス

@zenkigen-inc/component-config は MIT ライセンスに基づいています。
