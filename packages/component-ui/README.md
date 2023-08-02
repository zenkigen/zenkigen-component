# @zenkigen-inc/component-ui

## インストール

```bash
yarn add @zenkigen-inc/component-ui
```

## 利用方法

```tsx
import { Button } from '@zenkigen-inc/component-ui';

const Component = () => {
  return <Button>ボタン</Button>;
};
```

## 開発者向け

### コンポーネントの雛形を生成する

hygen で雛形を生成することができるので、必ずこのコマンドから生成されたファイルを元に実装を始めてください。

```bash
yarn generate-component
```

### 実装したコンポーネントを export する

使用する側の import を簡略化させるため root にある [packages/component-ui/src/index.ts](https://github.com/zenkigen/zenkigen-component/blob/main/packages/components/src/index.ts) に実装したコンポーネントを export してください。

### コーディングガイドライン（社内のみ）

開発する際は以下を参照してください。
https://www.notion.so/zenkigen/5d4ebd0d93b74124a533cf167b852ec0

## ライセンス

@zenkigen-inc/component-ui は MIT ライセンスに基づいています。
