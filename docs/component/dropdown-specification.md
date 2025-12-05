# Dropdown コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [Dropdown（メインコンポーネント）](#dropdownメインコンポーネント)
     - [必須プロパティ](#必須プロパティ)
     - [オプションプロパティ](#オプションプロパティ)
     - [排他的プロパティグループ](#排他的プロパティグループ)
     - [継承プロパティ](#継承プロパティ)
   - [Dropdown.Menu のProps](#dropdownmenu-のprops)
   - [Dropdown.Item のProps](#dropdownitem-のprops)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [バリアントスタイル](#バリアントスタイル)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [メニュー配置](#メニュー配置)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [カスタムターゲット例](#カスタムターゲット例)
   - [ポータル描画例](#ポータル描画例)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [型安全性](#型安全性)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Dropdownコンポーネントは、トリガーボタンの操作に応じてフローティングメニューを表示し、補助的なアクションをまとめて提示するためのコンポーネントである。ターゲットとなるボタンを標準のラベル付きボタンか任意のReact要素から選択でき、`Dropdown.Menu` と `Dropdown.Item` のサブコンポーネントでメニュー内容を柔軟に構成できる。

## インポート

```typescript
import { Dropdown } from '@zenkigen-inc/component-ui';
```

`Dropdown.Menu` と `Dropdown.Item` は `Dropdown` コンポーネントのスタティックメンバーとして提供される。

## 基本的な使用方法

```typescript
import { Dropdown } from '@zenkigen-inc/component-ui';
import type { DropdownItemType } from '@zenkigen-inc/component-ui';

const items: DropdownItemType[] = [
  { id: 'edit', content: '編集', onClick: () => console.log('edit') },
  { id: 'delete', content: '削除', color: 'red', onClick: () => console.log('delete') },
];

<Dropdown label="操作" icon="more" size="medium">
  <Dropdown.Menu maxHeight={200} horizontalAlign="left">
    {items.map((item) => (
      <Dropdown.Item key={item.id} color={item.color} onClick={item.onClick}>
        {item.content}
      </Dropdown.Item>
    ))}
  </Dropdown.Menu>
</Dropdown>;
```

## Props

### Dropdown（メインコンポーネント）

#### 必須プロパティ

なし（排他的プロパティグループで条件付き必須を定義）

#### オプションプロパティ

| プロパティ        | 型                                            | デフォルト値 | 説明                                                                                                                                 |
| ----------------- | --------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `size`            | `'x-small' \| 'small' \| 'medium' \| 'large'` | `'medium'`   | トリガーボタンの高さ・余白・タイポグラフィを切り替える。                                                                             |
| `variant`         | `'text' \| 'outline'`                         | `'outline'`  | テーマのボタンスタイルを適用する。`text` は境界線なし、`outline` は枠線表示となる。                                                  |
| `title`           | `string`                                      | `undefined`  | `button` 要素の `title` 属性に渡され、ツールチップやスクリーンリーダー補助として利用できる。                                         |
| `isDisabled`      | `boolean`                                     | `false`      | トリガーボタンとメニューを無効化する。`true` の場合は `cursor-not-allowed` と `pointer-events-none` を適用しメニューを開けなくなる。 |
| `isArrowHidden`   | `boolean`                                     | `false`      | 組み込みの下向き矢印アイコンを非表示にする。カスタムターゲットで矢印が不要な場合に使用する。                                         |
| `icon`            | `IconName`                                    | `undefined`  | ラベル付きボタンの先頭に配置する公式アイコン。`target` を使用する場合は無視される。                                                  |
| `portalTargetRef` | `MutableRefObject<HTMLElement \| null>`       | `undefined`  | メニューを別コンテナへ `createPortal` で描画するためのターゲット要素参照。レイヤーの制約を回避したい場合に利用する。                 |
| `children`        | `ReactNode`                                   | -            | 一般的には `Dropdown.Menu` を渡し、その中で `Dropdown.Item` などを配置する。                                                         |

#### 排他的プロパティグループ

| 組み合わせ        | 説明                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`          | `ReactElement` を渡すと任意の要素をトリガーとして描画し、`label` と `icon` は同時に指定できない。アバターやアイコンボタンとの組み合わせに適する。 |
| `label` + `icon?` | `target` を指定しない場合は `label: string` が必須となり、標準ボタンが描画される。`icon` は任意でラベル先頭に配置できる。                         |

#### 継承プロパティ

- なし。DOM属性のスプレッドは行っていないため、追加の `aria-*` や `data-*` を指定する場合はラップ側で実装する。

### Dropdown.Menu のProps

| プロパティ         | 型                              | デフォルト値 | 説明                                                                                                            |
| ------------------ | ------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| `maxHeight`        | `CSSProperties['height']`       | `undefined`  | メニューリストの最大高さ。値を設定すると `overflow-y-auto` が有効になり、スクロール可能なリストになる。         |
| `isNoPadding`      | `boolean`                       | `false`      | `py-1` の内部余白を削除し、完全にカスタムなレイアウトを実装できる。                                             |
| `verticalPosition` | `'top' \| 'bottom'`             | `'bottom'`   | トリガーボタンからの表示方向。`top` を指定するとボタンの上側に 4px の余白で配置する。                           |
| `horizontalAlign`  | `'left' \| 'center' \| 'right'` | `'left'`     | トリガーとの水平位置。`right` は右端を揃え、`center` は左右を固定しない（ポータル描画などのカスタム配置向け）。 |
| `children`         | `ReactNode`                     | -            | `Dropdown.Item` や任意のリスト要素を受け取り、そのまま `ul` の子要素として描画する。                            |

### Dropdown.Item のProps

| プロパティ | 型                                               | デフォルト値 | 説明                                                                               |
| ---------- | ------------------------------------------------ | ------------ | ---------------------------------------------------------------------------------- |
| `color`    | `'gray' \| 'red'`                                | `'gray'`     | アイテムの配色。`red` を指定すると危険操作向けに `text-supportDanger` を適用する。 |
| `onClick`  | `(event: MouseEvent<HTMLButtonElement>) => void` | `undefined`  | アイテム選択時のコールバック。実行前にメニューを自動で閉じる。                     |
| `children` | `ReactNode`                                      | -            | ボタン内に表示する内容。テキスト、アイコン、複合レイアウトに対応する。             |

## 状態とスタイル

### サイズバリエーション

| `size`      | 高さ・余白                                   | タイポグラフィ              | アイコンサイズ |
| ----------- | -------------------------------------------- | --------------------------- | -------------- |
| `'x-small'` | `h-6 px-2`（ターゲットボタンの場合は `p-1`） | `typography-label12regular` | `small`        |
| `'small'`   | `h-6 px-2`                                   | `typography-label14regular` | `small`        |
| `'medium'`  | `h-8 px-4`                                   | `typography-label14regular` | `small`        |
| `'large'`   | `h-10 px-4`                                  | `typography-label16regular` | `medium`       |

### バリアントスタイル

- `outline`（デフォルト）: `buttonColors.outline` のベース/ホバー/アクティブ/無効スタイルを適用し、境界線を描画する。
- `text`: 背景色を抑えテキストボタンの見た目を適用する。ターゲットとして任意要素を渡す場合に馴染ませやすい。

### 状態に応じたスタイル

- 通常: `bg-uiBackground01` にテーマカラーを重ね、`focusVisible.normal` でキーボードフォーカスを描画する。
- ホバー: `buttonColors[variant].hover` またはターゲットボタン用の `hover:bg-hover02` を適用し、ポインター操作を明示する。
- アクティブ: `buttonColors[variant].active` で押下状態を再現する。
- 無効（`isDisabled: true`）: `buttonColors[variant].disabled` と `cursor-not-allowed` を適用し、`pointer-events-none` によりクリックできなくなる。
- 矢印（`isArrowHidden: false`）: `Icon` を末尾に描画し、開閉状態で `angle-small-up`/`angle-small-down` を切り替える。

`Dropdown.Menu` は `bg-uiBackground01`、`shadow-floatingShadow`、および `border-uiBorder01`（outlineバリアント時）で描画され、`overflow-y-auto` によって長いリストもスクロールできる。`Dropdown.Item` は `typography-label14regular`、`h-8`、`px-3` を基準とし、`focusVisible.inset` でフォーカスインジケータを持つ。

### メニュー配置

- `verticalPosition='bottom'` の場合はトリガーの高さと 4px を加算した `top` Position を設定し、`'top'` の場合は `bottom` に同距離を設定する。
- `horizontalAlign='left'` は左端をそろえ、`'right'` は右端、`'center'` は左右いずれも固定しないためポータル先でカスタム配置するときに利用する。
- `portalTargetRef` を指定すると `Dropdown.Menu` は `createPortal` で参照先要素の子として描画され、`absolute` ではなく参照先のレイアウトに従う。

## 使用例

### 基本的な使用例

```typescript
const ActionDropdown = () => (
  <Dropdown label="操作" icon="more" size="small">
    <Dropdown.Menu maxHeight={160} horizontalAlign="left">
      <Dropdown.Item onClick={() => console.log('rename')}>名前を変更</Dropdown.Item>
      <Dropdown.Item onClick={() => console.log('duplicate')}>複製</Dropdown.Item>
      <Dropdown.Item color="red" onClick={() => console.log('delete')}>
        削除
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
```

### カスタムターゲット例

```typescript
import { Avatar } from '@zenkigen-inc/component-ui';

const AvatarDropdown = () => (
  <Dropdown
    variant="text"
    size="medium"
    isArrowHidden
    target={<Avatar size="small" userId={1} lastName="全機現" firstName="太郎" />}
  >
    <Dropdown.Menu horizontalAlign="right">
      <Dropdown.Item>プロフィールを見る</Dropdown.Item>
      <Dropdown.Item>設定</Dropdown.Item>
      <Dropdown.Item color="red">ログアウト</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
```

### ポータル描画例

```typescript
import { useRef } from 'react';

const PortalizedDropdown = () => {
  const portalRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ position: 'relative', minHeight: 320 }}>
      <Dropdown label="メニュー" portalTargetRef={portalRef}>
        <Dropdown.Menu verticalPosition="bottom" horizontalAlign="center">
          <Dropdown.Item>共有リンクをコピー</Dropdown.Item>
          <Dropdown.Item>権限を管理</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div ref={portalRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
    </div>
  );
};
```

`portalTargetRef` には `null` 初期化した `useRef` を渡し、メニューを任意のレイヤーに移動させる。ターゲットDOMは描画時点で存在する必要がある。

## アクセシビリティ

- トリガーはネイティブ `button` 要素で描画し、`disabled` 属性を適切に設定する。
- フォーカスリングは `focusVisible` トークンで統一され、キーボード操作時にも視認できる。
- `title` プロパティで補足説明を付与でき、スクリーンリーダー向けのヒントになる。
- メニューは `ul`、アイテムは `li > button` 構造のため、矢印キー移動などのロービングフォーカスは実装していない。必要に応じてショートカットナビゲーションは呼び出し元で制御する。
- `useOutsideClick` によりメニュー外をクリックすると自動で閉じ、フォーカスをトリガーに戻す。

## 技術的な詳細

### 実装について

- 内部状態 `isVisible` と `targetDimensions` を `DropdownContext` で共有し、`Dropdown.Menu` が開閉状態と位置情報を参照できるようにしている。
- `useOutsideClick` でドキュメント全体の外側クリックを検出し、開閉の整合性を保つ。
- `createPortal` を用いて `portalTargetRef` 配下へ `Dropdown.Menu` を描画し、モーダルなどの重なり順制約を回避する。
- `Dropdown.Item` はクリック時に `setIsVisible(false)` を先行して呼び、`onClick` ハンドラは閉じた状態で実行される。

### 型安全性

- メインコンポーネントは `target` を指定するパターンと `label` を指定するパターンを排他的ユニオンで定義しており、両方を同時に指定した場合は型エラーになる。
- `DropdownItemType`（`packages/component-ui/src/dropdown/type.ts`）を利用すると、Storybookのように事前定義したアイテム配列を型安全に扱える。
- `Dropdown.Menu` の位置指定や `Dropdown.Item` のカラーバリエーションはリテラル型で制限し、無効な値を排除している。

## 注意事項

1. `Dropdown.Menu` はフォーカストラップやキーボードナビゲーションを自動提供しないため、必要な場合は呼び出し元で `useRovingFocus` などを組み合わせること。
2. `portalTargetRef` で指定する要素は描画時にDOMへ存在している必要があり、`display: none` の要素を指定するとメニューが表示されない。
3. `isArrowHidden` を `true` にした場合、ボタン幅が縮むためラベルが長いケースでは `px-*` の余白だけで折り返しやすくなる。文言は短く保つ。
4. `Dropdown.Item` に `color="red"` を指定するパターンは破壊的操作を想定している。実際の削除などと意味が一致しているか確認すること。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS と `@zenkigen-inc/component-config` で定義された `buttonColors`, `focusVisible`, `shadow-floatingShadow` などのデザイントークンに依存している。カスタマイズが必要な場合は `packages/component-config` および `@zenkigen-inc/component-theme` のトークン定義を更新し、`Dropdown` 側ではユーティリティクラスを追加・削除する方針とする。

## 更新履歴

| 日付                 | 内容                                                              | 担当者 |
| -------------------- | ----------------------------------------------------------------- | ------ |
| 2025-12-03 08:55 JST | Dropdown仕様書を新規作成し、Props・使用例・アクセシビリティを整理 | -      |
