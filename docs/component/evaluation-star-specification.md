# EvaluationStar コンポーネント仕様書

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
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [その他のスタイル仕様](#その他のスタイル仕様)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [バリエーション例1（編集可能）](#バリエーション例1編集可能)
   - [バリエーション例2（ラージサイズ表示）](#バリエーション例2ラージサイズ表示)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

EvaluationStarコンポーネントは、最大5段階の星形アイコンで評価値を表示・入力するためのUIコンポーネントである。閲覧専用（表示のみ）と編集可能（ユーザー入力を受け付ける）を切り替えられ、星のサイズも用途に応じて選択できる。

## インポート

```typescript
import { EvaluationStar } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { EvaluationStar } from '@zenkigen-inc/component-ui';

const DisplayOnlyRating = () => {
  return <EvaluationStar value={4} />;
};
```

## Props

### 必須プロパティ

| プロパティ | 型       | 説明                                            |
| ---------- | -------- | ----------------------------------------------- |
| `value`    | `number` | 表示する評価値。0〜5の整数を推奨（最大5段階）。 |

### オプションプロパティ

| プロパティ       | 型                            | デフォルト値 | 説明                                                                     |
| ---------------- | ----------------------------- | ------------ | ------------------------------------------------------------------------ |
| `isEditable`     | `boolean`                     | `false`      | 星をボタンとして有効化し、ユーザーがクリックで評価を変更できるかどうか。 |
| `onChangeRating` | `(newRating: number) => void` | `undefined`  | 編集可能時に星がクリックされた際のコールバック。新しい評価値を受け取る。 |
| `size`           | `'medium' \| 'large'`         | `'medium'`   | 星アイコンのサイズ。`large`は24px、`medium`は16px相当。                  |

### 継承プロパティ

なし。すべてのプロパティは上記テーブルに定義されている。

## 状態とスタイル

### サイズバリエーション

#### Medium（デフォルト）

- 星アイコンのサイズ: `w-4 h-4`（16px相当）
- コンテンツ行間: `gap-0`（星間の余白はTailwindの`flex`デフォルト）
- タイポグラフィ: アイコンのみで文字表示はない

#### Large

- 星アイコンのサイズ: `w-6 h-6`（24px相当）
- その他のレイアウトやスタイルはMediumと同様

### 状態に応じたスタイル

#### 表示状態（`isEditable: false`）

- 各星は`<button disabled>`として描画され、クリック不可かつフォーカス不可
- 選択済みの星は`fill-yellow-yellow50`、未選択は`fill-icon03`で塗り分ける
- 評価値は`value`で固定表示される

#### 編集状態（`isEditable: true`）

- `focusVisible.inset`（`@zenkigen-inc/component-theme`）によるフォーカスリングが適用される
- 各星はクリックやキーボード操作（Space/Enter）で選択可能
- 新しい評価を選択すると内部状態と`onChangeRating`コールバックが更新される

### その他のスタイル仕様

- 星アイコンは`@zenkigen-inc/component-icons`の`star-filled`を使用する
- 星全体は`<span>`の`flex flex-row`で横並びに配置される
- カラーリングはTailwindクラス（`fill-yellow-yellow50`, `fill-icon03`）で管理され、テーマトークンに準拠する

## 使用例

### 基本的な使用例

```typescript
import { EvaluationStar } from '@zenkigen-inc/component-ui';

const ProductRating = () => {
  return (
    <div>
      <p className="typography-label14regular text-text02">平均評価</p>
      <EvaluationStar value={4} />
    </div>
  );
};
```

### バリエーション例1（編集可能）

```typescript
import { useState, useCallback } from 'react';
import { EvaluationStar } from '@zenkigen-inc/component-ui';

const EditableRating = () => {
  const [rating, setRating] = useState(3);

  const handleChange = useCallback((newRating: number) => {
    setRating(newRating);
  }, []);

  return (
    <EvaluationStar
      value={rating}
      isEditable
      onChangeRating={handleChange}
    />
  );
};
```

### バリエーション例2（ラージサイズ表示）

```typescript
import { EvaluationStar } from '@zenkigen-inc/component-ui';

const LargeRating = () => {
  return <EvaluationStar value={5} size="large" />;
};
```

## アクセシビリティ

- 各星は`<button type="button">`で描画され、キーボード操作（Tabでフォーカス、Space/Enterで選択）に対応する
- `isEditable`が`false`のときは`disabled`属性で操作不可を明示するため、支援技術からもアクション対象外となる
- `focusVisible.inset`によりフォーカス時の可視的なアウトラインが提供される
- 星は意味を持つ順序で並び、左から右へ評価値が増加するため可読性が高い

## 技術的な詳細

### 実装について

- 最大評価値`maxRating`は5で固定されており、`Array.from`で星を宣言的に生成する
- `useState`で`currentRating`を保持し、`value`で初期化する。編集可能時はユーザー操作で状態を更新する
- 星の色は現在値と比較して決定し、`fill-yellow-yellow50`（選択済み）と`fill-icon03`（未選択）で塗り分ける
- アイコンは`iconElements['star-filled']`を通じて描画されるため、`@zenkigen-inc/component-icons`のビルドに依存する

## 注意事項

- `value`は初期表示値として使用される。編集後の状態は内部で管理されるため、親コンポーネントで値を同期したい場合は`key`リセットまたは`isEditable`時の`onChangeRating`で受け取った新しい値を状態管理に反映すること
- `onChangeRating`は`isEditable`が`true`の場合のみ呼ばれる。表示専用モードでは呼ばれない
- 評価段階は5に固定されており、3段階表示や半分評価などのカスタム段階は現時点ではサポートしない

## スタイルのカスタマイズ

- 色やフォーカスリングは`@zenkigen-inc/component-theme`で提供される`focusVisible`や`fill-*`トークンによって制御される
- 星の大きさを変更したい場合は、Tailwindプリセット（`@zenkigen-inc/component-config`）に同名ユーティリティを追加するか、カスタムクラスを拡張して再ビルドする
- 企業ブランドカラーに合わせた評価色へ変更する場合は、`component-theme`内の`fill-yellow-yellow50`や`fill-icon03`に対応するトークン値を調整する

## 更新履歴

| 日付                 | 内容                                       | 担当者 |
| -------------------- | ------------------------------------------ | ------ |
| 2025-12-03 14:02 JST | 新規作成（仕様書テンプレートに従って整備） | -      |
