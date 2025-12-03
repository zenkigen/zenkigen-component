# Tag コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [排他的プロパティグループ](#排他的プロパティグループ)
   - [継承プロパティ](#継承プロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [その他のスタイル仕様](#その他のスタイル仕様)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズとバリアント](#サイズとバリアント)
   - [編集可能なタグリスト](#編集可能なタグリスト)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Tagコンポーネントは、アイテムを分類・整理するための短いラベルを表示するUIコンポーネントである。サポートカラーとユーザーカラーを含む16色のカラーパレットと2種類のバリアントを備え、編集可能なタグでは削除ボタンを備える。

## インポート

```typescript
import { Tag } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { Tag } from '@zenkigen-inc/component-ui';

const Example = () => {
  return (
    <div className="flex gap-2">
      <Tag id="project" color="supportSuccess" size="small">
        進行中
      </Tag>
      <Tag id="assignee" color="userBlue" variant="light" size="small">
        山田太郎
      </Tag>
    </div>
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型                                                                                                                                                                                                                                                                                      | 説明                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `id`       | `string`                                                                                                                                                                                                                                                                                | タグを一意に識別するID。`onDelete`にそのまま渡される。 |
| `children` | `string`                                                                                                                                                                                                                                                                                | タグに表示する1行のテキスト。                          |
| `color`    | `TagColor` (`'supportError' \| 'supportSuccess' \| 'supportWarning' \| 'supportDanger' \| 'userRed' \| 'userPink' \| 'userPurple' \| 'userTurquoise' \| 'userRoyalBlue' \| 'userBlue' \| 'userAquamarine' \| 'userYellowGreen' \| 'userYellow' \| 'userOrange' \| 'default' \| 'gray'`) | バックグラウンドとテキスト色の組み合わせを決定する。   |

### オプションプロパティ

| プロパティ   | 型                                 | デフォルト値 | 説明                                                                                               |
| ------------ | ---------------------------------- | ------------ | -------------------------------------------------------------------------------------------------- |
| `variant`    | `'normal' \| 'light'`              | `'normal'`   | カラートークンの濃淡を切り替える。`'normal'`は`tagColors`、`'light'`は`tagLightColors`を使用する。 |
| `size`       | `'x-small' \| 'small' \| 'medium'` | `'medium'`   | タグの縦寸法とタイポグラフィを切り替える。編集可能なタグでは`'medium'`固定となる。                 |
| `isEditable` | `true`                             | `undefined`  | `true`を指定すると削除アイコンを表示し、タグ全体が丸型になる。                                     |
| `onDelete`   | `(id: string) => void`             | `undefined`  | 削除アイコン押下時のハンドラ。`isEditable`指定時のみ受け付けられる。                               |

### 排他的プロパティグループ

#### 表示モード（デフォルト）

| プロパティ   | 型                                 | デフォルト値 | 説明                                       |
| ------------ | ---------------------------------- | ------------ | ------------------------------------------ |
| `isEditable` | `undefined`                        | -            | 削除操作を持たない固定タグとして表示する。 |
| `onDelete`   | `never`                            | -            | 指定不可。                                 |
| `size`       | `'x-small' \| 'small' \| 'medium'` | `'medium'`   | 3サイズから選択可能。                      |

#### 編集モード

| プロパティ   | 型             | デフォルト値 | 説明                                                                         |
| ------------ | -------------- | ------------ | ---------------------------------------------------------------------------- |
| `isEditable` | `true`         | -            | 削除ボタンを表示し、タグをピル型にする。                                     |
| `onDelete`   | `(id: string)` | -            | クリック時にタグの`id`を渡して呼び出される。                                 |
| `size`       | `'medium'`     | `'medium'`   | 編集モードでは`'medium'`のみサポートする。値を変更しても常に`'medium'`扱い。 |

### 継承プロパティ

追加のHTML属性は公開していない。`className`や`style`などを直接付与することはできない。

## 状態とスタイル

### サイズバリエーション

| サイズ        | 高さ / タイポグラフィ                     | パディング                 | 角丸           |
| ------------- | ----------------------------------------- | -------------------------- | -------------- |
| `x-small`     | `h-[14px]`, `typography-label11regular`   | `py-0.5 px-1`（2px / 4px） | `rounded`      |
| `small`       | `h-4` (16px), `typography-label12regular` | `py-0.5 px-1`              | `rounded`      |
| `medium`      | `h-[18px]`, `typography-label14regular`   | `py-0.5 px-1`              | `rounded`      |
| `medium` 編集 | `h-[22px]`, `typography-label14regular`   | `py-1 px-2`（4px / 8px）   | `rounded-full` |

### 状態に応じたスタイル

- `variant='normal'`
  - `tagColors[color]`のクラスを適用し、背景は濃色、テキストは`text-textOnColor`。
- `variant='light'`
  - `tagLightColors[color]`のクラスを適用し、背景は淡色、テキストは`text-text01`。
- `isEditable=true`
  - 右端に`DeleteIcon`を表示し、コンテナをピル型に変更する。
  - 削除ボタンは`hover:bg-iconOnColor`と`focusVisible.normal`でホバー/フォーカス状態を可視化する。

### その他のスタイル仕様

- `clsx`で`flex`, `items-center`, `justify-center`を常時付与し、ラベルと削除ボタンを中央揃えにする。
- 削除ボタンの`<svg>`は`14px`角で、色は`color`と`variant`に応じて`fill-interactive02`または`fill-iconOnColor`を切り替える。
- 編集モード以外では`rounded`、編集モードでは`rounded-full`として視覚的に区別する。

## 使用例

### 基本的な使用例

```typescript
<Tag id="status" color="supportError" size="medium">
  要対応
</Tag>
```

### サイズとバリアント

```typescript
<div className="flex flex-wrap gap-2">
  <Tag id="priority" color="supportWarning" size="x-small">
    High
  </Tag>
  <Tag id="priority" color="supportWarning" size="small">
    High
  </Tag>
  <Tag id="priority" color="supportWarning" size="medium">
    High
  </Tag>
  <Tag id="owner" color="userPurple" variant="light" size="small">
    企画チーム
  </Tag>
</div>
```

### 編集可能なタグリスト

```typescript
import { useState } from 'react';
import { Tag } from '@zenkigen-inc/component-ui';

const EditableTags = () => {
  const [tags, setTags] = useState([
    { id: '1', label: 'サポーター', color: 'supportSuccess' as const },
    { id: '2', label: '優先対応', color: 'supportDanger' as const },
  ]);

  const handleDelete = (tagId: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag.id} id={tag.id} color={tag.color} isEditable onDelete={handleDelete}>
          {tag.label}
        </Tag>
      ))}
    </div>
  );
};
```

## アクセシビリティ

1. ラベルテキストは常に表示されるため、タグの内容はスクリーンリーダーで認識できる。
2. 削除ボタンは`type="button"`でキーボードフォーカスを受け取り、`focusVisible.normal`でフォーカスリングを描画する。
3. 削除ボタンはアイコンのみで構成されるため、必要に応じて周辺文（例: グループラベルや説明テキスト）で削除操作の意図を補足すること。

## 技術的な詳細

- `tagColors` / `tagLightColors`（`@zenkigen-inc/component-theme`）を参照し、色ごとのテキスト・背景クラスを決定する。
- `clsx`でサイズ、バリアント、編集状態に応じたtailwindクラスを組み立てている。
- `DeleteIcon`は`focusVisible.normal`を適用した`button`で実装され、クリック時に親の`onDelete`へ`id`を引き渡す。

## 注意事項

1. `children`は1行テキスト前提であり、長文や複数行を表示するレイアウト調整は提供していない。
2. `isEditable`指定時は`size`を変更しても視覚的には`medium`で描画される。サイズ変更が必要な場合は別デザイン検討が必要である。
3. Tag本体はインタラクティブ要素ではないため、クリックやキーボード操作を割り当てる場合は別ボタンやリンクを併設すること。
4. 削除ボタンはアイコンのみでアクセシブルネームを持たない。削除対象が誤認されないよう、周辺テキストや文脈で補足する。

## スタイルのカスタマイズ

`tagColors` / `tagLightColors` の定義は `@zenkigen-inc/component-theme` に含まれる。色やタイポグラフィを変更する場合は `packages/component-theme/src/colors.ts` でトークンを調整し、`component-config` を再生成した後に `yarn build:all` を実行する。

## 更新履歴

| 日付                 | 内容     | 担当者 |
| -------------------- | -------- | ------ |
| 2025-12-03 09:18 JST | 新規作成 | -      |
