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
   - [バリアントスタイル](#バリアントスタイル)
   - [状態に応じたスタイル](#状態に応じたスタイル)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [アイコン付きボタン](#アイコン付きボタン)
   - [選択状態](#選択状態)
   - [無効状態](#無効状態)
   - [カスタムスタイル](#カスタムスタイル)
   - [ポリモーフィックコンポーネント](#ポリモーフィックコンポーネント)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [ポリモーフィック実装](#ポリモーフィック実装)
   - [型安全性](#型安全性)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Buttonコンポーネントは、ユーザーアクションを実行するためのクリック可能なUIコンポーネントです。複数のサイズ、バリアント、状態に対応し、アイコンの表示やポリモーフィックな要素としての使用が可能な柔軟なボタンコンポーネントを提供します。

## インポート

```typescript
import { Button } from '@zenkigen-inc/component-ui';
import type { ElementAs, AsProp, PolymorphicPropsWithoutRef } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { Button } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const handleClick = () => {
    console.log('ボタンがクリックされました');
  };

  return (
    <Button
      variant="fill"
      size="medium"
      onClick={handleClick}
    >
      ボタンラベル
    </Button>
  );
};
```

## Props

### 必須プロパティ

なし（すべてオプション）

### オプションプロパティ

| プロパティ       | 型                                              | デフォルト値 | 説明                           |
| ---------------- | ----------------------------------------------- | ------------ | ------------------------------ |
| `size`           | `'small' \| 'medium' \| 'large'`                | `'medium'`   | ボタンのサイズ                 |
| `variant`        | `'fill' \| 'fillDanger' \| 'outline' \| 'text'` | `'fill'`     | ボタンのスタイルバリエーション |
| `width`          | `CSSProperties['width']`                        | -            | ボタンの幅                     |
| `isSelected`     | `boolean`                                       | `false`      | 選択状態の制御                 |
| `isDisabled`     | `boolean`                                       | `undefined`  | 無効状態の制御                 |
| `before`         | `ReactNode`                                     | -            | テキストの前に表示する要素     |
| `after`          | `ReactNode`                                     | -            | テキストの後に表示する要素     |
| `borderRadius`   | `CSSProperties['borderRadius']`                 | -            | ボタンの角丸設定               |
| `justifyContent` | `'start' \| 'center'`                           | `'center'`   | 内容の配置方法                 |
| `elementAs`      | `ElementType`                                   | `'button'`   | レンダリングする要素の型       |

### 継承プロパティ

`ComponentPropsWithoutRef<T>` のすべてのプロパティが使用可能です（`elementAs`で指定された要素の属性）。
`className` は後方互換のため受け付けていますが、外部からスタイルを上書きする目的での使用は非推奨です。
スタイル変更は提供している props やテーマトークンで行ってください。

## 状態とスタイル

### サイズバリエーション

#### small

- 高さ: `h-6` (24px)
- パディング: `px-2.5`
- タイポグラフィ: `typography-label14regular`
- アイコンサイズ: `small`（推奨）

#### medium（デフォルト）

- 高さ: `h-8` (32px)
- パディング: `px-3`
- タイポグラフィ: `typography-label14regular`
- アイコンサイズ: `small`（推奨）

#### large

- 高さ: `h-10` (40px)
- パディング: `px-4`
- 行の高さ: `leading-[24px]`
- タイポグラフィ: `typography-label16regular`
- アイコンサイズ: `medium`（推奨）

### バリアントスタイル

#### fill（デフォルト）

- 背景色: `bg-interactive01`
- ボーダー: `border-interactive01`
- テキスト色: `text-textOnColor`
- ホバー: `hover:bg-hover01`
- アクティブ: `active:bg-active01`

#### fillDanger

- 背景色: `bg-supportDanger`
- ボーダー: `border-supportDanger`
- テキスト色: `text-textOnColor`
- ホバー: `hover:bg-hoverDanger`
- アクティブ: `active:bg-activeDanger`

#### outline

- 背景色: `bg-uiBackground01`
- ボーダー: `border-uiBorder02`
- テキスト色: `text-interactive02`
- ホバー: `hover:bg-hover02`
- アクティブ: `active:bg-active02`

#### text

- 背景色: 透明
- ボーダー: 透明
- テキスト色: `text-interactive02`
- ホバー: `hover:bg-hover02`
- アクティブ: `active:bg-active02`

### 状態に応じたスタイル

#### 通常状態

- 各バリアントのベース色が適用される
- ホバー・アクティブ状態のインタラクション有効

#### 選択状態（`isSelected: true`）

- 背景色: `bg-selectedUi`
- テキスト色: `text-interactive01`
- ボーダー: `border-transparent`（fill/fillDanger）または `border-interactive01`（outline/text）
- アイコン色: `fill-interactive01`
- ホバー時のテキスト・アイコン色: `text-textOnColor`、`fill-iconOnColor`（fill/fillDangerのみ）

#### 無効状態（`isDisabled: true`）

- ポインターイベント: `pointer-events-none`
- 背景色: `bg-disabled01`（fill/fillDanger）または `bg-uiBackground01`（outline/text）
- テキスト色: `text-disabled01`
- ボーダー: `border-disabled01`（fill/fillDanger）または `border-uiBorder01`（outline/text）

## 使用例

### 基本的な使用例

```typescript
<Button
  variant="fill"
  size="medium"
  onClick={() => console.log('クリック')}
>
  ボタンラベル
</Button>
```

### アイコン付きボタン

```typescript
import { Icon } from '@zenkigen-inc/component-ui';

// アイコンが前にある場合
<Button
  variant="fill"
  before={<Icon name="add" size="small" />}
>
  追加
</Button>

// アイコンが後にある場合
<Button
  variant="outline"
  after={<Icon name="arrow-right" size="small" />}
>
  次へ
</Button>

// 両方にアイコンがある場合
<Button
  variant="text"
  before={<Icon name="edit" size="small" />}
  after={<Icon name="arrow-right" size="small" />}
>
  編集して次へ
</Button>
```

### 選択状態

```typescript
const [isSelected, setIsSelected] = useState(false);

<Button
  variant="fill"
  isSelected={isSelected}
  onClick={() => setIsSelected(!isSelected)}
>
  選択可能なボタン
</Button>
```

### 無効状態

```typescript
<Button
  variant="fill"
  isDisabled={true}
>
  無効なボタン
</Button>
```

### カスタムスタイル

```typescript
<Button
  variant="fill"
  width={200}
  borderRadius="9999px"
  justifyContent="start"
>
  カスタムボタン
</Button>
```

### ポリモーフィックコンポーネント

```typescript
// リンクとして使用
<Button
  elementAs="a"
  href="/path"
  variant="outline"
>
  リンクボタン
</Button>

// フォーム送信ボタン
<Button
  elementAs="button"
  type="submit"
  variant="fill"
>
  送信
</Button>
```

## アクセシビリティ

- 標準的な`<button>`要素のすべてのアクセシビリティ機能を継承
- `disabled`属性が適切に設定される
- フォーカス管理が適切に実装されている（`focusVisible`による視覚的フィードバック）
- キーボードナビゲーションに対応
- 選択状態が視覚的に明確に表示される
- ポリモーフィック実装により、適切なセマンティック要素を使用可能

## 技術的な詳細

### 実装について

- `clsx`を使用した動的クラス名の生成
- `@zenkigen-inc/component-theme`の`buttonColors`と`focusVisible`を使用
- ポリモーフィック実装により任意の要素としてレンダリング可能
- `a`要素の場合は`inline-flex`クラスが自動適用
- デフォルトの角丸は`rounded-button`（`borderRadius`が未指定の場合）

### 内部実装の詳細

Buttonコンポーネントは以下の2つのコンポーネントで構成されています：

1. **`Button`**: 公開API用のコンポーネント（`outlineDanger`バリアントは含まない）
2. **`InternalButton`**: 内部実装用のコンポーネント（`outlineDanger`バリアントを含む）

```typescript
// 公開API用の型（outlineDangerは含まない）
type PublicProps<T extends ElementAs> = BaseProps<T> & {
  variant?: 'fill' | 'fillDanger' | 'outline' | 'text';
};

// 内部実装用の型（outlineDanger variantを含む）
type InternalProps<T extends ElementAs> = BaseProps<T> & {
  variant?: 'fill' | 'fillDanger' | 'outline' | 'text' | 'outlineDanger';
};
```

### 共通実装パターン

`createButton`関数により、両方のコンポーネントで共通の実装ロジックが使用されています：

```typescript
const createButton = <T extends ElementAs = 'button'>(props: InternalProps<T>) => {
  // 共通の実装ロジック
};
```

### ポリモーフィック実装

Buttonコンポーネントはポリモーフィックな実装により、`elementAs`プロパティで指定された要素としてレンダリングされます。

```typescript
// デフォルトはbutton要素
<Button>通常のボタン</Button>

// a要素としてレンダリング
<Button elementAs="a" href="/path">リンクボタン</Button>

// div要素としてレンダリング
<Button elementAs="div" role="button">カスタムボタン</Button>
```

### 型安全性

ポリモーフィック実装により、`elementAs`で指定された要素の属性が型安全に提供されます。

```typescript
// ✅ 正しい使用
<Button elementAs="a" href="/path">リンク</Button>
<Button elementAs="button" type="submit">送信</Button>

// ❌ コンパイルエラー
<Button elementAs="div" href="/path">エラー</Button>
```

## 注意事項

1. **アイコンの使用**: `before`と`after`プロパティには`@zenkigen-inc/component-icons`の`Icon`コンポーネントを使用してください
2. **ポリモーフィック使用時**: `elementAs`で指定した要素に適切な属性を設定してください（例：`a`要素の場合は`href`属性）
3. **アクセシビリティ**: カスタム要素を使用する場合は、適切な`role`属性や`aria-*`属性を設定してください
4. **選択状態の視覚的フィードバック**: `isSelected`が`true`の場合、`outline`と`text`バリアントでは選択状態のスタイルが適用されます
5. **内部実装の使用**: `InternalButton`コンポーネントは内部実装用であり、通常の使用では`Button`コンポーネントを使用してください
6. **outlineDangerバリアント**: `outlineDanger`バリアントは`InternalButton`でのみ利用可能で、公開APIでは提供されていません
7. **classNameの扱い**: 外部から`className`を渡してスタイルを変更することは後方互換のため許容していますが非推奨です。
   propsやテーマ設定でスタイルを調整してください

## スタイルのカスタマイズ

Buttonコンポーネントのスタイルは`@zenkigen-inc/component-theme`の`buttonColors`設定に基づいています。カスタマイズする場合は、テーマ設定を変更することで一括でスタイルを調整できます。

特に以下の要素がカスタマイズ可能：

- `buttonColors` - 各バリアントと状態の色設定
- `focusVisible` - フォーカス時の視覚的フィードバック
- タイポグラフィトークンによる文字スタイル

## 更新履歴

| 日付                 | 内容                                                                                    | 担当者 |
| -------------------- | --------------------------------------------------------------------------------------- | ------ |
| 2025-11-26 15:53 JST | `className`プロパティの非推奨化を明記                                                  | -      |
| 2025-10-29 10:28 JST | 内部実装の詳細を追加、InternalButtonコンポーネントとoutlineDangerバリアントの説明を追加 | -      |
| 2025-10-29 10:16 JST | 新規作成                                                                                | -      |
