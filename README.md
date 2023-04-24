# zenkigen-component

## インストール

当レポジトリは Public に公開していないため、使用したいプロジェクトの任意の場所に subtree として追加してください。
例）`packages/zenkigen-component`

subtree コマンド

```bash
git remote add -f zenkigen-component git@github.com:zenkigen/zenkigen-component.git
git subtree add --prefix=packages/zenkigen-component --squash zenkigen-component main
# zenkigen-component の更新
git subtree pull --prefix=packages/zenkigen-component --squash zenkigen-component main
```

package.json に以下を追記してください。

```json
{
  "dependencies": {
    ...
    "@zenkigen-component/components": "link:./packages/zenkigen-component/packages/components",
    "@zenkigen-component/config": "link:./packages/zenkigen-component/packages/config",
    "@zenkigen-component/theme": "link:./packages/zenkigen-component/packages/theme",
    ...
  }
}
```

このままでは使用できないので install と build を実行します

```bash
cd packages/zenkigen-component && yarn install && yarn build
```

zenkigen-component が更新されたら subtree の更新と install、build の再実行を行う必要があるので上記コマンドは package.json の script に登録しておいてください。

## 使用方法

```tsx
import { Button } from 'zenkigen-component';

const Component = () => {
  return <Button>ボタン</Button>;
};
```

## 開発者向け

### カラートークンを更新する

当ライブラリは Figma Tokens から export された tokens.json を token-transformer と Style Dictionary を用いてライブラリで使用できるよう変換しています。

1. Figma Tokens で `Include parent key` の チェックを ON で export する
1. `packages/config/style-dictionary/tokens.json` に上書きする
1. `yarn build:token` を実行する

### コンポーネントの雛形を生成する

hygen で雛形を生成することができるので、必ずこのコマンドから生成されたファイルを元に実装を始めてください。

```bash
yarn create-component
```

### 実装したコンポーネントを export する

使用する側の import を簡略化させるため root にある [packages/components/src/index.ts](https://github.com/zenkigen/zenkigen-component/blob/main/packages/components/src/index.ts) に実装したコンポーネントを export してください。

### コーディングガイドライン

開発する際は以下を参照してください。
https://www.notion.so/zenkigen/5d4ebd0d93b74124a533cf167b852ec0
