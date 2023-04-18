# zenkigen-component

## インストール

TBD

## 使用方法

TBD

トークン名は [src/tokens/tokens.ts](https://github.com/zenkigen/zenkigen-component/blob/main/src/tokens/tokens.ts) を参照してください。

## 開発者向け

### カラートークンを更新する

当ライブラリは Figma Tokens から export された tokens.json を token-transformer と Style Dictionary を用いてライブラリで使用できるよう変換しています。

1. Figma Tokens で `Include parent key` の チェックを ON で export する
1. `style-dictionary/tokens.json` に上書きする
1. `yarn build:token` を実行する

### 実装したコンポーネントを export する

使用する側の import を簡略化させるため root にある [src/index.ts](https://github.com/zenkigen/zenkigen-component/blob/main/src/index.ts) に実装したコンポーネントを export してください。

### コンポーネントの雛形を生成する

hygen で雛形を生成することができるので、必ずこのコマンドから生成されたファイルを元に実装を始めてください。

```
npx hygen generator components
```

### コーディングガイドライン

開発する際は以下を参照してください。
https://www.notion.so/zenkigen/5d4ebd0d93b74124a533cf167b852ec0
