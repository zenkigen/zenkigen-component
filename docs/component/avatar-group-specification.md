# AvatarGroup コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [オーバーラップとボーダー](#オーバーラップとボーダー)
   - [+N バッジのスタイル](#n-バッジのスタイル)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズ指定](#サイズ指定)
   - [max を超えたとき（+N 自動表示）](#max-を超えたとき+n-自動表示)
   - [大量データ（total prop）](#大量データtotal-prop)
   - [renderSurplus で +N をカスタマイズ](#rendersurplus-で-n-をカスタマイズ)
   - [各 Avatar に Tooltip を付与](#各-avatar-に-tooltip-を付与)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [children の扱い](#children-の扱い)
   - [サイズの自動連携](#サイズの自動連携)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [Q&A](#qa)
12. [更新履歴](#更新履歴)

---

## 概要

AvatarGroup コンポーネントは、複数の Avatar を水平にオーバーラップ表示するためのコンポーネントである。最大表示数（`max`）を超えた場合、末尾に `+N` バッジが自動表示される。`total` prop で実件数を渡せば大量データでも「+995」のような表示が自動で行われ、`renderSurplus` prop で `+N` ノードを自由にカスタマイズできる。

## インポート

```typescript
import { AvatarGroup, Avatar } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```tsx
import { AvatarGroup, Avatar } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  return (
    <AvatarGroup max={4} size="medium">
      <Avatar userId={1} firstName="太郎" lastName="田中" />
      <Avatar userId={2} firstName="花子" lastName="鈴木" />
      <Avatar userId={3} firstName="一郎" lastName="佐藤" />
      <Avatar userId={4} firstName="次郎" lastName="高橋" />
      <Avatar userId={5} firstName="三郎" lastName="渡辺" />
    </AvatarGroup>
  );
};
// → 表示: 4つの Avatar + "+1"
```

## Props

| プロパティ      | 型                                                         | デフォルト値 | 説明                                                            |
| --------------- | ---------------------------------------------------------- | ------------ | --------------------------------------------------------------- |
| `children`      | `ReactNode`                                                | -            | Avatar 要素。条件付きレンダリング・Tooltip ラップも可           |
| `size`          | `'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'`   | グループ内の Avatar のサイズ                                    |
| `max`           | `number`                                                   | `5`          | 表示する Avatar の最大数（最低 1）                              |
| `total`         | `number`                                                   | -            | 実件数。未指定時は children の件数を使用                        |
| `renderSurplus` | `(ctx: RenderSurplusContext) => ReactNode`                 | -            | +N バッジの差し替え関数。未指定時はデフォルトの +N バッジを表示 |
| `aria-label`    | `string`                                                   | -            | グループに対する aria-label                                     |

### `RenderSurplusContext`

`renderSurplus` に渡される引数の型。

| プロパティ     | 型          | 説明                                                      |
| -------------- | ----------- | --------------------------------------------------------- |
| `remain`       | `number`    | 隠れている件数（`max(displayedTotal - max, 0)`）          |
| `total`        | `number`    | 実件数（`total` prop または children の件数）             |
| `defaultBadge` | `ReactNode` | 既定の `+N` バッジ要素（共通スタイル・`aria-label` 付き） |

## 状態とスタイル

### サイズバリエーション

| size      | Avatar サイズ | +N バッジサイズ | オーバーラップ | ボーダー                    | タイポグラフィ              |
| --------- | ------------- | --------------- | -------------- | --------------------------- | --------------------------- |
| `x-small` | 24×24         | 24×24           | `-ml-1.5`      | `border border-white`       | `typography-label11regular` |
| `small`   | 32×32         | 32×32           | `-ml-2`        | `border border-white`       | `typography-label11regular` |
| `medium`  | 40×40         | 40×40           | `-ml-2.5`      | `border-2 border-white`     | `typography-label14regular` |
| `large`   | 48×48         | 48×48           | `-ml-3`        | `border-2 border-white`     | `typography-label14regular` |
| `x-large` | 64×64         | 64×64           | `-ml-4`        | `border-[3px] border-white` | `typography-label16regular` |

### オーバーラップとボーダー

- 各 Avatar は白いボーダーで囲まれ、隣接する Avatar と視覚的に分離される
- z-index は左から右に向かって増加し、左側の Avatar が上に重なる
- `+N` バッジは表示中の Avatar の後ろに配置される

### +N バッジのスタイル

デフォルトの `+N` バッジは以下のスタイルで表示される：

- 背景色: `bg-uiBackground02`
- テキスト色: `text-text02`
- 形状: `rounded-full`
- `aria-label="残り{N}人"` を自動付与

## 使用例

### 基本的な使用例

```tsx
<AvatarGroup>
  <Avatar userId={1} firstName="太郎" lastName="田中" />
  <Avatar userId={2} firstName="花子" lastName="鈴木" />
  <Avatar userId={3} firstName="一郎" lastName="佐藤" />
</AvatarGroup>
```

### サイズ指定

```tsx
<div className="flex flex-col gap-4">
  <AvatarGroup size="x-small">
    <Avatar userId={1} firstName="太郎" lastName="田中" />
    <Avatar userId={2} firstName="花子" lastName="鈴木" />
  </AvatarGroup>

  <AvatarGroup size="medium">
    <Avatar userId={1} firstName="太郎" lastName="田中" />
    <Avatar userId={2} firstName="花子" lastName="鈴木" />
  </AvatarGroup>

  <AvatarGroup size="x-large">
    <Avatar userId={1} firstName="太郎" lastName="田中" />
    <Avatar userId={2} firstName="花子" lastName="鈴木" />
  </AvatarGroup>
</div>
```

### max を超えたとき（+N 自動表示）

children の件数が `max` を超えると、末尾に `+N` バッジが自動表示される。

```tsx
<AvatarGroup max={3}>
  <Avatar userId={1} firstName="太郎" lastName="田中" />
  <Avatar userId={2} firstName="花子" lastName="鈴木" />
  <Avatar userId={3} firstName="一郎" lastName="佐藤" />
  <Avatar userId={4} firstName="次郎" lastName="高橋" />
  <Avatar userId={5} firstName="三郎" lastName="渡辺" />
</AvatarGroup>
// → 表示: 3つの Avatar + "+2"
```

### 大量データ（total prop）

サーバーから取得した件数を `total` に渡すと、`total - max` が自動的に `+N` として表示される。children には `max` 件までの Avatar を渡せばよい。

```tsx
<AvatarGroup size="small" max={5} total={1000}>
  {users.slice(0, 5).map((user) => (
    <Avatar key={user.id} userId={user.id} firstName={user.firstName} lastName={user.lastName} />
  ))}
</AvatarGroup>
// → 表示: 5つの Avatar + "+995"
```

### renderSurplus で +N をカスタマイズ

`+N` バッジの差し替えや装飾は `renderSurplus` prop で行う。

**総数を表示する例**:

```tsx
<AvatarGroup max={4} renderSurplus={({ total }) => <span>{total}</span>}>
  {/* ... */}
</AvatarGroup>
```

**Tooltip で装飾する例**（`defaultBadge` を流用）:

```tsx
<AvatarGroup
  max={4}
  renderSurplus={({ defaultBadge, remain }) => (
    <Tooltip content={`他${remain}名`} verticalPosition="top" portalTarget={document.body}>
      {defaultBadge}
    </Tooltip>
  )}
>
  {users.map((u) => (
    <Avatar key={u.id} userId={u.id} firstName={u.firstName} lastName={u.lastName} />
  ))}
</AvatarGroup>
```

`renderSurplus` が `null` を返した場合、`+N` バッジは表示されない（抑制できる）。

### 各 Avatar に Tooltip を付与

`<Tooltip><Avatar /></Tooltip>` を children に直接入れられる。ラッパ要素の有無に関わらず、`max` / 並び順 / +N 計算は正しく動作する。

```tsx
<AvatarGroup max={4} size="small">
  {users.map((user) => (
    <Tooltip
      key={user.id}
      content={`${user.lastName} ${user.firstName}`}
      verticalPosition="top"
      portalTarget={document.body}
    >
      <Avatar userId={user.id} firstName={user.firstName} lastName={user.lastName} />
    </Tooltip>
  ))}
</AvatarGroup>
```

Tooltip で +N バッジを装飾したい場合は前項の `renderSurplus` の例を参照。

**注意**: Tooltip を使用する場合、z-index の問題を避けるため `portalTarget={document.body}` を指定すること。

## アクセシビリティ

- `role="group"` が設定されており、グループとして認識される
- `aria-label` prop でグループ全体のラベルを指定できる
- デフォルトの `+N` バッジには `aria-label="残り{N}人"` が自動付与される
- Avatar 内のテキストコンテンツ（イニシャル）が適切に表示される

## 技術的な詳細

### children の扱い

`AvatarGroup` は children を以下のルールで処理する：

1. `Children.toArray(children)` で配列化（`null` / `false` / `undefined` / `true` は除外）
2. `isValidElement` でフィルタ（文字列・数値・Fragment などを除外して有効な要素だけ残す）
3. この配列から `childrenCount` を算出し、`slice(0, max)` で最大 `max` 件までに制限

これにより、`{condition && <Avatar />}` のような条件付きレンダリングでも件数と描画が一致する。

### サイズの自動連携

AvatarGroup 内の Avatar は、`useAvatarGroupSize` フックを通じて親の `size` を自動的に取得する。個別に `size` を指定した場合でも、AvatarGroup の `size` が優先される。

```tsx
// Avatar は AvatarGroup の size="small" を自動的に使用する
<AvatarGroup size="small">
  <Avatar size="large" userId={1} firstName="太郎" lastName="田中" />
</AvatarGroup>
```

## 注意事項

1. **max を超えない場合の動作**: Avatar の件数（または `total`）が `max` 以下の場合、`+N` バッジは非表示となる
2. **Fragment を children に直接渡すことは非サポート**: `<AvatarGroup><><Avatar /><Avatar /></></AvatarGroup>` のように Fragment を直接渡すと、Fragment 自体が 1 ノードとして扱われ `max` の挙動が意図と合わない。配列で渡すこと: `<AvatarGroup>{list.map(...)}</AvatarGroup>`
3. **文字列・数値ノードは無視される**: Avatar 以外の文字列・数値ノードは `isValidElement` で弾かれ、件数・描画の対象とならない
4. **Tooltip との組み合わせ**: Tooltip を使う場合、`portalTarget={document.body}` を指定しないと z-index の問題で Tooltip が隠れる可能性がある
5. **サイズの優先順位**: Avatar 個別の `size` 指定は AvatarGroup 内では無視される
6. **`total` が children 件数より小さい場合**: そのまま計算される（= remain が 0 になり +N 非表示）。利用側で実件数を正しく渡すこと

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config` で定義されたデザイントークンに依存している。カスタマイズする場合は、これらの設定を参照すること。

特に以下の要素がカスタマイズ可能である：

- `+N` バッジの差し替え（`renderSurplus` prop）
- オーバーラップ幅（`-ml-*` クラス）
- ボーダー（`border-*` クラス）
- カウンター背景色（`bg-uiBackground02`）
- カウンターテキスト色（`text-text02`）

## Q&A

### Q: Avatar に個別の size を指定したらどうなる？

A: AvatarGroup 内では、Avatar 個別の `size` 指定は無視され、AvatarGroup の `size` が優先される。

### Q: 大量データ（1000件など）の場合はどう使う？

A: サーバーから取得した上位 N 件の Avatar を children に渡し、`total` prop に実件数を指定する：

```tsx
<AvatarGroup size="small" max={5} total={1000}>
  {users.slice(0, 5).map((user) => (
    <Avatar key={user.id} userId={user.id} firstName={user.firstName} lastName={user.lastName} />
  ))}
</AvatarGroup>
// → "+995" が自動表示される
```

### Q: +N の表示内容を自由に変えたい

A: `renderSurplus` prop を使う。`defaultBadge` を渡してくれるので、Tooltip などで装飾するだけなら既定スタイルのまま流用できる。

### Q: +N を表示したくない（抑制したい）

A: `renderSurplus={() => null}` を渡せば、max を超えてもバッジが表示されなくなる。

### Q: Tooltip で Avatar をラップしてもいい？

A: よい。`<AvatarGroup><Tooltip><Avatar /></Tooltip>...</AvatarGroup>` のパターンは公式にサポートされており、max / 並び順 / +N 計算は正しく動作する。

### Q: z-index の順序を変えられる？（右の Avatar を前面にしたい）

A: 現在の実装では z-index は左から右に増加する固定仕様となっている。

### Q: ボーダーの色を白以外に変えられる？

A: 現在の実装ではボーダー色は `border-white` で固定されている。

## 更新履歴

| 日付                 | 内容                                                                                                                                  | 担当者 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 2026-02-12 15:14 JST | 新規作成                                                                                                                              | -      |
| 2026-04-21 11:00 JST | `total` / `renderSurplus` prop を追加し、`Remain` / `Counter` / `Label` サブコンポーネントを廃止。children 走査を簡素化（破壊的変更） | -      |
