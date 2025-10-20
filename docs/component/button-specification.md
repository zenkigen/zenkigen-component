# Button コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [継承プロパティ](#継承プロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [バリエーション](#バリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [バリエーション例](#バリエーション例)
   - [アイコン付きボタン](#アイコン付きボタン)
   - [Polymorphicコンポーネント](#polymorphicコンポーネント)
   - [カスタマイズ例](#カスタマイズ例)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [型安全性](#型安全性)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Buttonコンポーネントは、ユーザーのアクションを実行するためのUIコンポーネントです。複数のバリエーションとサイズを提供し、アイコンの配置やPolymorphicな要素としての使用が可能です。

## インポート

```typescript
import { Button } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { Button } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const handleClick = () => {
    console.log('ボタンがクリックされました');
  };

  return (
    <Button onClick={handleClick}>
      ボタンラベル
    </Button>
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型          | 説明                   |
| ---------- | ----------- | ---------------------- |
| `children` | `ReactNode` | ボタン内に表示する内容 |

### オプションプロパティ

| プロパティ       | 型                                              | デフォルト値 | 説明                           |
| ---------------- | ----------------------------------------------- | ------------ | ------------------------------ |
| `size`           | `'small' \| 'medium' \| 'large'`                | `'medium'`   | ボタンのサイズ                 |
| `variant`        | `'fill' \| 'fillDanger' \| 'outline' \| 'text'` | `'fill'`     | ボタンのスタイルバリエーション |
| `isDisabled`     | `boolean`                                       | `false`      | 無効状態かどうか               |
| `isSelected`     | `boolean`                                       | `false`      | 選択状態かどうか               |
| `width`          | `CSSProperties['width']`                        | `undefined`  | ボタンの幅                     |
| `borderRadius`   | `CSSProperties['borderRadius']`                 | `undefined`  | ボタンの角丸                   |
| `justifyContent` | `'start' \| 'center'`                           | `'center'`   | 内容の配置方法                 |
| `before`         | `ReactNode`                                     | `undefined`  | ボタン内容の前に表示する要素   |
| `after`          | `ReactNode`                                     | `undefined`  | ボタン内容の後に表示する要素   |
| `elementAs`      | `ElementType`                                   | `'button'`   | レンダリングする要素の種類     |

### 継承プロパティ

`ComponentPropsWithoutRef<T>` のすべてのプロパティが使用可能です（`elementAs`で指定した要素の属性）。

## 状態とスタイル

### サイズバリエーション

#### Small

- 高さ: `h-6` (24px)
- パディング: `px-2.5` (10px)
- タイポグラフィ: `typography-label14regular`

#### Medium（デフォルト）

- 高さ: `h-8` (32px)
- パディング: `px-3` (12px)
- タイポグラフィ: `typography-label14regular`

#### Large

- 高さ: `h-10` (40px)
- パディング: `px-4` (16px)
- 行の高さ: `leading-[24px]`
- タイポグラフィ: `typography-label16regular`

### バリエーション

#### Fill（デフォルト）

- 背景色: プライマリカラー
- テキスト色: 白色
- 用途: 主要なアクション

#### FillDanger

- 背景色: 危険色（赤系）
- テキスト色: 白色
- 用途: 削除や危険なアクション

#### Outline

- 背景色: 透明
- ボーダー: プライマリカラー
- テキスト色: プライマリカラー
- 用途: セカンダリアクション

#### Text

- 背景色: 透明
- ボーダー: なし
- テキスト色: プライマリカラー
- 用途: テキストリンクのようなアクション

### 状態に応じたスタイル

#### 通常状態

- 各バリエーションの基本スタイルが適用される

#### ホバー状態

- 各バリエーションのホバースタイルが適用される
- アイコンの色も適切に変更される

#### アクティブ状態

- 各バリエーションのアクティブスタイルが適用される
- アイコンの色も適切に変更される

#### フォーカス状態

- `focusVisible.normal`クラスが適用される
- キーボードナビゲーション時のフォーカス表示

#### 無効状態（isDisabled: true）

- `pointer-events-none`が適用される
- 各バリエーションの無効スタイルが適用される

#### 選択状態（isSelected: true）

- 各バリエーションの選択スタイルが適用される
- 選択時はホバー・アクティブ時のテキスト・アイコン色が適切に変更される

## 使用例

### 基本的な使用例

```typescript
<Button onClick={handleClick}>
  ボタンラベル
</Button>
```

### バリエーション例

```typescript
// プライマリボタン
<Button variant="fill" onClick={handleSubmit}>
  送信
</Button>

// 危険なアクション
<Button variant="fillDanger" onClick={handleDelete}>
  削除
</Button>

// セカンダリボタン
<Button variant="outline" onClick={handleCancel}>
  キャンセル
</Button>

// テキストボタン
<Button variant="text" onClick={handleEdit}>
  編集
</Button>
```

### アイコン付きボタン

```typescript
import { Icon } from '@zenkigen-inc/component-ui';

// アイコンが前にあるボタン
<Button before={<Icon name="add" size="small" />}>
  追加
</Button>

// アイコンが後にあるボタン
<Button after={<Icon name="arrow-right" size="small" />}>
  次へ
</Button>

// 両方にアイコンがあるボタン
<Button
  before={<Icon name="download" size="small" />}
  after={<Icon name="external-link" size="small" />}
>
  ダウンロード
</Button>
```

### Polymorphicコンポーネント

```typescript
// リンクとして使用
<Button elementAs="a" href="/path/to/page">
  ページへ移動
</Button>

// カスタム要素として使用
<Button elementAs="div" onClick={handleCustomAction}>
  カスタムアクション
</Button>
```

### カスタマイズ例

```typescript
// 幅を指定
<Button width={200}>
  固定幅ボタン
</Button>

// 角丸をカスタマイズ
<Button borderRadius={9999}>
  完全に丸いボタン
</Button>

// 左寄せ
<Button justifyContent="start">
  左寄せボタン
</Button>
```

## アクセシビリティ

Buttonコンポーネントのアクセシビリティ要件とWCAG 2.2準拠状況については、専用の仕様書を参照してください：

**[Button アクセシビリティ仕様書](./button-accessibility-specification.md)**

### 基本的なアクセシビリティ機能

- 標準的な`<button>`要素のすべてのアクセシビリティ機能を継承
- `disabled`属性が適切に設定される
- フォーカス管理が適切に実装されている（`focusVisible.normal`）
- キーボードナビゲーションに対応
- `elementAs`で`a`要素を使用する場合は、適切な`href`属性を設定する必要がある
- アイコンを使用する場合は、適切な`aria-label`や`aria-hidden`属性を設定することを推奨

## 技術的な詳細

### 実装について

- Polymorphicコンポーネントとして実装され、`elementAs`プロパティでレンダリングする要素を指定可能
- `clsx`を使用した動的クラス名の生成
- `@zenkigen-inc/component-theme`の`buttonColors`と`focusVisible`を使用
- アイコンの色は選択状態に応じて自動的に変更される

### 型安全性

Polymorphicな型定義により、`elementAs`で指定した要素の属性が適切に型チェックされる：

```typescript
// ✅ 正しい使用
<Button elementAs="a" href="/path">
  リンクボタン
</Button>

<Button elementAs="button" type="submit">
  送信ボタン
</Button>

// ❌ コンパイルエラー
<Button elementAs="a" type="submit">  // a要素にtype属性は無効
  エラー
</Button>
```

## 注意事項

1. **アイコンのサイズ**: `before`と`after`で使用するアイコンは、ボタンのサイズに応じて適切なサイズを指定することを推奨（small: `size="small"`, medium/large: `size="small"`または`size="medium"`）
2. **Polymorphic使用時**: `elementAs`で`a`要素を使用する場合は、`href`属性を必ず設定する
3. **選択状態**: `isSelected`は主にトグルボタンや選択可能なボタンで使用する
4. **無効状態**: `isDisabled`が`true`の場合、`pointer-events-none`が適用され、クリックイベントが無効になる
5. **カスタマイズ**: `width`や`borderRadius`を指定する場合は、デザインシステムとの整合性を考慮する

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config`で定義されたデザイントークンに依存しています。カスタマイズする場合は、これらの設定を参照してください。

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-01-27 | 新規作成 | -      |
