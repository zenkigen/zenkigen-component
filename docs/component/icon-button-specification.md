# IconButton コンポーネント仕様書

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
   - [バリアント](#バリアント)
   - [状態に応じたスタイル](#状態に応じたスタイル)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズ指定](#サイズ指定)
   - [バリアント指定](#バリアント指定)
   - [特殊な状態](#特殊な状態)
   - [アンカーとして使用](#アンカーとして使用)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

## 概要

IconButtonコンポーネントは、アイコンのみを表示するボタン型UIコンポーネントです。通常のボタンやアンカーリンクとして動作し、ツールバーやアクションリスト等で使用されます。

## インポート

```typescript
import { IconButton } from '@zenkigen-inc/component-ui';
import type { IconName } from '@zenkigen-inc/component-icons';
```

## 基本的な使用方法

```typescript
import { IconButton } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const handleClick = () => {
    console.log('ボタンがクリックされました');
  };

  return (
    <IconButton
      icon="add"
      onClick={handleClick}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型         | 説明               |
| ---------- | ---------- | ------------------ |
| `icon`     | `IconName` | 表示するアイコン名 |

### オプションプロパティ

| プロパティ    | 型                               | デフォルト値 | 説明                           |
| ------------- | -------------------------------- | ------------ | ------------------------------ |
| `size`        | `'small' \| 'medium' \| 'large'` | `'medium'`   | ボタンのサイズ                 |
| `variant`     | `'outline' \| 'text'`            | `'outline'`  | ボタンのバリアント             |
| `isDisabled`  | `boolean`                        | `false`      | ボタンが無効かどうか           |
| `isSelected`  | `boolean`                        | `false`      | ボタンが選択されているかどうか |
| `isNoPadding` | `boolean`                        | `false`      | パディングを無効にするかどうか |

### 排他的プロパティグループ

IconButtonは使用方法に応じて、ボタンまたはアンカーリンクとして動作します。

#### ボタンとして使用（デフォルト）

| プロパティ | 型                   | デフォルト値 | 説明                   |
| ---------- | -------------------- | ------------ | ---------------------- |
| `isAnchor` | `false \| undefined` | `false`      | アンカーモードを無効化 |

#### アンカーリンクとして使用

| プロパティ | 型                            | デフォルト値 | 説明                   |
| ---------- | ----------------------------- | ------------ | ---------------------- |
| `isAnchor` | `true`                        | -            | アンカーモードを有効化 |
| `href`     | `string`                      | -            | リンク先URL            |
| `target`   | `HTMLAnchorElement['target']` | `undefined`  | リンクのターゲット     |

### 継承プロパティ

#### ボタンモード時

`ButtonHTMLAttributes<HTMLButtonElement>`のプロパティを継承しますが、以下のプロパティは除外されています：

- `disabled`
- `className`

#### アンカーモード時

`AnchorHTMLAttributes<HTMLAnchorElement>`のプロパティを継承しますが、以下のプロパティは除外されています：

- `href`
- `target`
- `className`

## 状態とスタイル

### サイズバリエーション

#### Small

- サイズ:
  - `isNoPadding: true`: `h-4 w-4` (16px × 16px)
  - `isNoPadding: false`: `h-6 w-6` (24px × 24px)
- アイコンサイズ: `small`

#### Medium（デフォルト）

- サイズ:
  - `isNoPadding: true`: `h-6 w-6` (24px × 24px)
  - `isNoPadding: false`: `h-8 w-8` (32px × 32px)
- アイコンサイズ: `medium`

#### Large

- サイズ:
  - `isNoPadding: true`: `h-6 w-6` (24px × 24px)
  - `isNoPadding: false`: `h-10 w-10` (40px × 40px)
- アイコンサイズ: `medium`

### バリアント

#### Outline（デフォルト）

- ボーダーありのスタイル
- 背景色とホバー・アクティブ状態のスタイルが適用

#### Text

- ボーダーなしのテキストボタンスタイル
- より軽量な見た目

### 状態に応じたスタイル

#### 通常状態

- バリアントに応じた基本スタイル: `buttonColors[variant].base`
- ホバー: `buttonColors[variant].hover`
- アクティブ: `buttonColors[variant].active`

#### 選択状態（`isSelected: true`）

- 背景: `buttonColors[variant].selected`
- 選択された状態のスタイルが適用される

#### 無効状態（`isDisabled: true`）

- 背景: `buttonColors[variant].disabled`
- ポインターイベント: `pointer-events-none`

#### フォーカス状態

- フォーカスリング: `focusVisible.normal`

## 使用例

### 基本的な使用例

```typescript
<IconButton
  icon="add"
  onClick={() => console.log('追加ボタンクリック')}
/>
```

### サイズ指定

```typescript
// 小サイズ
<IconButton
  icon="edit"
  size="small"
  onClick={handleEdit}
/>

// 大サイズ
<IconButton
  icon="delete"
  size="large"
  onClick={handleDelete}
/>
```

### バリアント指定

```typescript
// テキストバリアント
<IconButton
  icon="settings"
  variant="text"
  onClick={handleSettings}
/>

// アウトラインバリアント（デフォルト）
<IconButton
  icon="save"
  variant="outline"
  onClick={handleSave}
/>
```

### 特殊な状態

```typescript
// 無効状態
<IconButton
  icon="upload"
  isDisabled={true}
/>

// 選択状態
<IconButton
  icon="favorite"
  isSelected={true}
  onClick={handleToggleFavorite}
/>

// パディングなし
<IconButton
  icon="close"
  isNoPadding={true}
  size="small"
  variant="text"
  onClick={handleClose}
/>
```

### アンカーとして使用

```typescript
// 外部リンク
<IconButton
  icon="external-link"
  isAnchor={true}
  href="https://example.com"
  target="_blank"
/>

// 内部リンク
<IconButton
  icon="home"
  isAnchor={true}
  href="/dashboard"
/>
```

## アクセシビリティ

- 標準的な`<button>`要素または`<a>`要素のすべてのアクセシビリティ機能を継承
- `disabled`属性が無効状態で適切に設定される
- フォーカス管理が適切に実装されている
- キーボードナビゲーション（Enterキー、Spaceキー）をサポート
- アイコンのみのボタンのため、適切な`aria-label`属性の設定を推奨

### 推奨されるaria-labelパターン

```typescript
// 機能を説明するラベル
<IconButton
  icon="add"
  onClick={handleAdd}
  aria-label="項目を追加"
/>

// 状態を含むラベル
<IconButton
  icon="favorite"
  isSelected={isFavorited}
  onClick={handleToggleFavorite}
  aria-label={isFavorited ? "お気に入りから削除" : "お気に入りに追加"}
/>
```

## 技術的な詳細

### 実装について

- `clsx`を使用した動的クラス名の生成
- ユニオン型を使用してボタンとアンカーの排他的制御を実現
- `@zenkigen-inc/component-theme`のボタンカラーシステムを使用

### 型安全性

排他的ユニオン型により、ボタンモードとアンカーモードの不正な組み合わせを防止：

```typescript
// ✅ 正しい使用（ボタンモード）
<IconButton icon="add" onClick={handleClick} />

// ✅ 正しい使用（アンカーモード）
<IconButton icon="link" isAnchor={true} href="/page" />

// ❌ コンパイルエラー（不正な組み合わせ）
<IconButton icon="add" isAnchor={true} onClick={handleClick} />
```

## 注意事項

1. `isNoPadding`はボタンサイズを最小化するため、タッチ操作では十分なタップエリアを確保することを推奨
2. アイコンのみのボタンは視覚的に機能が分かりにくいため、ツールチップやaria-labelの使用を推奨
3. `isSelected`状態は見た目の変更のみで、動作ロジックは実装側で制御する必要がある

## スタイルのカスタマイズ

このコンポーネントのスタイルは`@zenkigen-inc/component-theme`のテーマシステムと`@zenkigen-inc/component-config`のTailwind CSS設定を使用しています。色やタイポグラフィのカスタマイズは、これらのパッケージの設定を変更することで行えます。

## 更新履歴

| 日付       | 内容                          | 担当者 |
| ---------- | ----------------------------- | ------ |
| 2025-10-27 | onClickプロパティの扱いを変更 | -      |
| 2025-09-09 | 新規作成                      | -      |
