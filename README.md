# zenkigen-component

## インストール

### インストールする際の準備
zenkigen-component はプライベートレポジトリのため、そのままではインストールできません。  
インストールするディレクトリに `.npmrc` ファイルを作成して以下を記述してください。
```
//npm.pkg.github.com/:_authToken=${GITHUB_READ_PACKAGES_TOKEN}
@zenkigen:registry="https://npm.pkg.github.com"
```

`read:packages` の権限が付与された Personal access token(PTA) を発行してください。  
発行されたトークンを `GITHUB_READ_PACKAGES_TOKEN` を環境変数として登録してください。

### インストールコマンド
```
npm install @zenkigen/zenkigen-component
```
```
yarn add @zenkigen/zenkigen-component
```

## 使用方法
```
import { Button } from '@zenkigen/zenkigen-component';

export const Component = () => (
  <div>
    <Button>ボタン</Button>
  </div>
)
```

### カラートークンを変更する
styled-components の theme 機能を使ってコンポーネントで定義しているカラートークンを変更することができます。

```
import { theme, Button } from '@zenkigen/zenkigen-component';

export const App = () => {
  return (
    <ThemeProvider theme={{ ...theme, TokensInteractiveInteractive01: 'green' }}>
      <Button>Themed</Button>
    </ThemeProvider>
  )
}
```
トークン名は [src/tokens/tokens.ts](https://github.com/zenkigen/zenkigen-component/blob/main/src/tokens/tokens.ts) を参照してください。

## 開発者向け

### カラートークンを更新する

当ライブラリは Figma Tokens から export された tokens.json を token-transformer と Style Dictionary を用いてライブラリで使用できるよう変換しています。

1. Figma Tokens で `Include parent key` の チェックを ON で export する
1. `style-dictionary/tokens.json` に上書きする
1. `yarn build:token` を実行する

### 実装したコンポーネントを export する
使用する側の import を簡略化させるため root にある [src/index.ts](https://github.com/zenkigen/zenkigen-component/blob/main/src/index.ts) に実装したコンポーネントを exportしてください。

### コーディングガイドライン

開発する際は以下を参照してください。  
https://www.notion.so/zenkigen/5d4ebd0d93b74124a533cf167b852ec0
