# zenkigen-component

ZENKIGENのコンポーネントライブラリです。Reactコンポーネントと設定を提供し、ZENKIGENのデザインシステムに準拠したUIを簡単に構築できます。

## パッケージ構成

このリポジトリは以下のパッケージで構成されています：

- `@zenkigen-inc/component-ui` - コンポーネントライブラリ
- `@zenkigen-inc/component-theme` - テーマ関連の設定
- `@zenkigen-inc/component-config` - Tailwind CSSの設定
- `@zenkigen-inc/component-icons` - アイコンコンポーネント

## インストール

### 1. パッケージのインストール

```bash
# npmの場合
npm install @zenkigen-inc/component-ui @zenkigen-inc/component-config

# yarnの場合
yarn add @zenkigen-inc/component-ui @zenkigen-inc/component-config
```

### 2. Tailwind CSSの設定

`tailwind.config.js` に以下の設定を追加してください：

```js
module.exports = {
  content: [
    // 既存の設定...
    './node_modules/@zenkigen-inc/**/*.{js,ts,tsx}',
  ],
  presets: [
    // 既存のプリセット...
    require('@zenkigen-inc/component-config'),
  ],
};
```

## 基本的な使い方

```tsx
import { useState } from 'react';
import type { IconName } from '@zenkigen-inc/component-icons';
import { Button, TextInput, Select } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const optionsList = [
    { id: '1', label: '選択肢A', value: 'A', icon: 'add' as IconName },
    { id: '2', label: '選択肢B', value: 'B', icon: 'add' as IconName },
    { id: '3', label: '選択肢C', value: 'C', icon: 'add' as IconName },
  ];

  return (
    <div>
      <TextInput placeholder="入力してください" />
      <Button>送信</Button>
      <Select
        size="x-small"
        variant="outline"
        placeholder="選択"
        selectedOption={selectedOption}
        onChange={(option) => setSelectedOption(option)}
        optionListMaxHeight={120}
      >
        {optionsList.map((option) => (
          <Select.Option key={option.id} option={option} />
        ))}
      </Select>
    </div>
  );
};
```

## コンポーネント一覧・仕様書

以下は利用可能なコンポーネントの一覧です。リンクがあるコンポーネントは詳細な仕様書が参照できます。

- [Avatar](./docs/component/avatar-specification.md)
- Breadcrumb
- Button
- Checkbox
- Dropdown
- Evaluation Star
- [File Uploader](./docs/component/file-uploader-specification.md)
- Heading
- [Icon](./docs/component/icon-specification.md)
- [Icon Button](./docs/component/icon-button-specification.md)
- Loading
- [Modal](./docs/component/modal-specification.md)
- Notification Inline
- Pagination
- Pagination Select
- Radio
- Search
- [Segmented Control](./docs/component/segmented-control-specification.md)
- [Select](./docs/component/select-specification.md)
- Select Sort
- [Sort Button](./docs/component/sort-button-specification.md)
- [Tab](./docs/component/tab-specification.md)
- Table
- Tag
- [Text Area](./docs/component/text-area-specification.md)
- [Text Input](./docs/component/text-input-specification.md)
- [Password Input](./docs/component/password-input-specification.md)
- Toast
- Toggle
- Tooltip
- Typography

## プロジェクト詳細ドキュメント

プロジェクトの詳細な技術資料は以下のドキュメントを参照してください：

- [プロジェクト概要](./docs/README.md) - ドキュメント全体の概要
- [プロジェクト構造](./docs/project-structure.md) - パッケージ構成と相互関係
- [コンポーネント実装パターン](./docs/component-patterns.md) - 設計パターンと実装方針
- [テーマシステム](./docs/theme-system.md) - テーマとTailwind CSS設定
- [コーディングガイドライン](./docs/coding-guidelines.md) - 開発時のコーディング標準と規約

## Storybookでのコンポーネント確認

開発環境では、Storybookを使用してコンポーネントの確認ができます：

```bash
# リポジトリのクローン
git clone https://github.com/zenkigen/zenkigen-component.git
cd zenkigen-component

# 依存関係のインストール
yarn install

# build
yarn build-lib:all

# Storybook起動
yarn storybook
```

## ライセンス

zenkigen-component は [MIT](./LICENSE) ライセンスに基づいています。  
ただし、 @zenkigen-inc/component-icons の SVG ファイルは [Shape](https://shape.so/) の[利用規約](https://shape.so/terms)に準拠します。
