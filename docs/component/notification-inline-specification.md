# NotificationInline コンポーネント仕様書

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
   - [バリエーション例1](#バリエーション例1)
   - [バリエーション例2](#バリエーション例2)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

NotificationInlineコンポーネントは、コンテンツフローの中で重要な情報を即座に伝えるための小型通知を表示するUIである。成功・警告・注意などのステータスを色とアイコンで表現し、必要に応じて閉じるボタンを添えてユーザーのアクションを促す。

## インポート

```typescript
import { NotificationInline } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { NotificationInline } from '@zenkigen-inc/component-ui';

const InlineNotice = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <NotificationInline
      state="success"
      showClose
      onClickClose={() => {
        // ユーザーの操作で通知を閉じたい場合に使用する
        setIsVisible(false);
      }}
    >
      プロフィールの更新が完了しました。
    </NotificationInline>
  );
};
```

## Props

### 必須プロパティ

現在の実装では必須プロパティは存在しない。

### オプションプロパティ

| プロパティ     | 型                                                                    | デフォルト値 | 説明                                                                                     |
| -------------- | --------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------- |
| `state`        | `'success' \| 'warning' \| 'information' \| 'attention' \| 'default'` | `'default'`  | 通知の意味を表すバリアント。値に応じて背景色とアイコンを切り替える。                     |
| `size`         | `'small' \| 'medium'`                                                 | `'medium'`   | 通知の高さとパディングを決定する。                                                       |
| `children`     | `ReactNode`                                                           | `undefined`  | 通知に表示するメッセージ。テキストやインライン要素を指定できる。                         |
| `showClose`    | `boolean`                                                             | `false`      | 右端に閉じるボタンを表示するかどうか。                                                   |
| `onClickClose` | `() => void`                                                          | `undefined`  | 閉じるボタンがクリックされたときのコールバック。`showClose` が `true` の場合に利用する。 |

### 排他的プロパティグループ

#### パターンA: 閉じるボタンを表示しない

| プロパティ  | 型                     | デフォルト値 | 説明                         |
| ----------- | ---------------------- | ------------ | ---------------------------- |
| `showClose` | `false` \| `undefined` | `false`      | 閉じるボタンを非表示にする。 |

#### パターンB: 閉じるボタンを表示する

| プロパティ     | 型           | デフォルト値 | 説明                                               |
| -------------- | ------------ | ------------ | -------------------------------------------------- |
| `showClose`    | `true`       | -            | 閉じるボタンを表示する。                           |
| `onClickClose` | `() => void` | -            | 閉じるボタンを押下した際に実行されるコールバック。 |

### 継承プロパティ

追加のHTML属性は公開していない。`className` や `role` などは直接付与できないため、必要な場合はコンポーネントのラップ要素側で制御する。

## 状態とスタイル

### サイズバリエーション

| サイズ   | タイポグラフィ             | パディング | 用途                                     |
| -------- | -------------------------- | ---------- | ---------------------------------------- |
| `small`  | `typography-body13regular` | `p-2`      | フィールドの中など高さを抑えたい場合。   |
| `medium` | `typography-body13regular` | `p-3`      | デフォルト。行間をやや広く取りたい場合。 |

### 状態に応じたスタイル

- `success`: 背景 `bg-uiBackgroundSuccess`、アイコン `success-filled`、アイコン色 `fill-supportSuccess`。
- `warning`: 背景 `bg-uiBackgroundWarning`、アイコン `warning`、アイコン色 `fill-supportWarning`。
- `information`: 背景 `bg-uiBackgroundBlue`、アイコン `information-filled`、アイコン色 `fill-blue-blue50`。
- `attention`: 背景 `bg-uiBackgroundError`、アイコン `attention`、アイコン色 `fill-supportError`。
- `default`: 背景 `bg-uiBackgroundGray`。アイコンは表示しない。

### その他のスタイル仕様

- コンテナは `flex` レイアウトで `gap-1` を維持し、メッセージ部分は `flex-1` で横幅いっぱいに広がる。
- 全体は `rounded` と `text-text01` を適用し、`children` のテキストは段落タグで囲む。
- 閉じるボタンは `IconButton` の `variant="text"`, `size="small"` を利用し、表示時でもメッセージ領域の折り返しを阻害しないよう `flex` ラップで配置する。

## 使用例

### 基本的な使用例

```typescript
<NotificationInline state="information">
  メンテナンスは 16:00 から 30 分間を予定しています。
</NotificationInline>
```

### バリエーション例1

```typescript
<NotificationInline size="small" state="attention" showClose onClickClose={() => console.log('close')}>
  入力内容に不足があります。詳細を確認してください。
</NotificationInline>
```

### バリエーション例2

```typescript
<div className="flex flex-col gap-2">
  <NotificationInline state="success">保存が完了しました。</NotificationInline>
  <NotificationInline state="warning" showClose onClickClose={() => alert('dismiss')}>
    いくつかの項目に古い情報が含まれています。
  </NotificationInline>
</div>
```

## アクセシビリティ

- コンポーネント全体は `div` と `p` で構成され、読み上げ順は通知全体→閉じるボタンの順になる。
- 閉じるボタンは `IconButton` を利用することで、`button` 要素にフォーカスリングとキーボード操作（Enter/Space）を提供する。
- 状態ごとの背景色・アイコン色は `@zenkigen-inc/component-theme` のトークンを使用しており、明度差を保てるカラーパレットに統一されている。
- 通知のテキストには簡潔な文章を用い、`children` 内でリンクやボタンを配置する場合はキーボードで到達できるようにする。

## 技術的な詳細

- `clsx` を用いて `state`・`size` に応じたクラスを切り替える。
- `state` が `default` 以外のときのみ `Icon` コンポーネントを描画し、状態ごとに固定のアイコン名を割り当てる。
- 閉じるボタンは `showClose` が有効なときだけ`IconButton` を描画し、親から受け取ったコールバックで閉じる挙動を制御する。
- テキスト部分は `flex-1` として余白を吸収し、長文でも折り返しで表示できる。

## 注意事項

- 重要な情報のみを表示し、軽微なメッセージやトーストで済む内容には使用しない。
- 複数の通知を並べる場合は新しいものを上に配置し、ユーザーが処理すべき順序を明確にする。
- エラーや警告では、問題点とともに次に取るべきアクションを文章中で案内する。
- メッセージは一文または二文で簡潔にまとめ、専門用語や不必要に不安を煽る表現は避ける。
- 閉じる操作が必要なケースに限定して `showClose` を使用し、乱用して操作負荷を高めないようにする。

## スタイルのカスタマイズ

- カラーパレットは `@zenkigen-inc/component-config` の Tailwind トークン `bg-uiBackground*` や `fill-support*` に依存する。テーマ全体で色を調整する場合は `component-config` のトークンを更新する。
- 直接 `className` を上書きするAPIは用意されていないため、ラップ要素で余白を調整するか、必要があればテーマトークンを変更する。

## 更新履歴

| 日付                 | 内容             | 担当者 |
| -------------------- | ---------------- | ------ |
| 2025-12-03 09:04 JST | 初版を作成した。 | -      |
