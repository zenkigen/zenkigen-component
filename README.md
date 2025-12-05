# zenkigen-component

ZENKIGENのコンポーネントライブラリです。Reactコンポーネントと設定を提供し、ZENKIGENのデザインシステムに準拠したUIを簡単に構築できます。

## 目次

- [インストール](#インストール)
- [基本的な使い方](#基本的な使い方)
- [ライブラリの更新](#ライブラリの更新)
- [コンポーネント一覧・仕様書](#コンポーネント一覧仕様書)
- [Storybook](#storybook)
- [開発者向け](#開発者向け)
  - [プロジェクト詳細ドキュメント](#プロジェクト詳細ドキュメント)
  - [ローカル開発環境でのStorybook](#ローカル開発環境でのstorybook)
- [ライセンス](#ライセンス)

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

## ライブラリの更新

**重要**: このライブラリのすべてのパッケージは、必ず**同じバージョン**で使用してください。

### 更新方法

最新バージョンに更新する場合：

```bash
# npmの場合
npm update @zenkigen-inc/component-ui @zenkigen-inc/component-config

# yarnの場合
yarn upgrade @zenkigen-inc/component-ui @zenkigen-inc/component-config
```

特定のバージョンにアップデートする場合：

```bash
# npmの場合（例: バージョン1.2.3にアップデート）
npm install @zenkigen-inc/component-ui@1.2.3 @zenkigen-inc/component-config@1.2.3

# yarnの場合（例: バージョン1.2.3にアップデート）
yarn add @zenkigen-inc/component-ui@1.2.3 @zenkigen-inc/component-config@1.2.3
```

依存パッケージ（`component-theme`、`component-icons`）も同じバージョンに自動的に更新されます。

### バージョンの確認

インストールされているバージョンを確認するには：

```bash
# npmの場合
npm list @zenkigen-inc/component-ui @zenkigen-inc/component-config

# yarnの場合
yarn list --pattern "@zenkigen-inc/component-*"
```

または、`package.json` の `dependencies` セクションを確認してください。

## コンポーネント一覧・仕様書

以下は利用可能なコンポーネントの一覧です。リンクがあるコンポーネントは詳細な仕様書が参照できます。

- [Avatar](./docs/component/avatar-specification.md)
- Breadcrumb
- [Button](./docs/component/button-specification.md)
- Checkbox
- Dropdown
- Evaluation Star
- [File Input](./docs/component/file-input-specification.md)
- Heading
- [Icon](./docs/component/icon-specification.md)
- [Icon Button](./docs/component/icon-button-specification.md)
- Loading
- [Modal](./docs/component/modal-specification.md)
- [Notification Inline](./docs/component/notification-inline-specification.md)
- Pagination
- Pagination Select
- [Popover](./docs/component/popover-specification.md)
- [Popup](./docs/component/popup-specification.md)
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
- [Popover](./docs/component/popover-specification.md)
- Toast
- Toggle
- Tooltip
- Typography

## Storybook

各コンポーネントの実装例とインタラクティブなデモは、Storybookで確認できます：

**[https://storybook.zenkigen.co.jp/](https://storybook.zenkigen.co.jp/)**

## 開発者向け

### プロジェクト詳細ドキュメント

プロジェクトの詳細な技術資料は以下のドキュメントを参照してください：

- [プロジェクト概要](./docs/README.md) - ドキュメント全体の概要
- [プロジェクト構造](./docs/project-structure.md) - パッケージ構成と相互関係
- [コンポーネント実装パターン](./docs/component-patterns.md) - 設計パターンと実装方針
- [テーマシステム](./docs/theme-system.md) - テーマとTailwind CSS設定
- [コーディングガイドライン](./docs/coding-guidelines.md) - 開発時のコーディング標準と規約

### ローカル開発環境でのStorybook

ローカル開発環境でStorybookを起動してコンポーネントの確認ができます：

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
