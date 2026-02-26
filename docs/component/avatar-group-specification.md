# AvatarGroup コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [AvatarGroup](#avatargroup-1)
   - [サブコンポーネント](#サブコンポーネント)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [オーバーラップとボーダー](#オーバーラップとボーダー)
   - [カウンター表示](#カウンター表示)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズ指定](#サイズ指定)
   - [Remain（残り人数表示）](#remain残り人数表示)
   - [Counter（総数表示）](#counter総数表示)
   - [Label（カスタムラベル）](#labelカスタムラベル)
   - [Tooltip との組み合わせ](#tooltip-との組み合わせ)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [Compound Component パターン](#compound-component-パターン)
   - [サイズの自動連携](#サイズの自動連携)
   - [displayName による子要素の検出](#displayname-による子要素の検出)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [Q&A](#qa)
12. [更新履歴](#更新履歴)

---

## 概要

AvatarGroup コンポーネントは、複数の Avatar を水平にオーバーラップ表示するための Compound コンポーネントである。最大表示数を超えた場合の残り人数表示や、大量データ向けのカスタムラベル表示をサポートする。

## インポート

```typescript
import { AvatarGroup, Avatar } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { AvatarGroup, Avatar } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  return (
    <AvatarGroup max={4} size="medium">
      <Avatar userId={1} firstName="太郎" lastName="田中" />
      <Avatar userId={2} firstName="花子" lastName="鈴木" />
      <Avatar userId={3} firstName="一郎" lastName="佐藤" />
      <Avatar userId={4} firstName="次郎" lastName="高橋" />
      <Avatar userId={5} firstName="三郎" lastName="渡辺" />
      <AvatarGroup.Remain />
    </AvatarGroup>
  );
};
```

## Props

### AvatarGroup

| プロパティ | 型                                                         | デフォルト値 | 説明                            |
| ---------- | ---------------------------------------------------------- | ------------ | ------------------------------- |
| `children` | `ReactNode`                                                | -            | Avatar およびサブコンポーネント |
| `size`     | `'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'`   | グループ内の Avatar のサイズ    |
| `max`      | `number`                                                   | `5`          | 表示する Avatar の最大数        |

### サブコンポーネント

AvatarGroup は以下のサブコンポーネントを提供する。

#### AvatarGroup.Remain

`max` を超えた場合に残り人数を `+N` 形式で表示する。`max` 以下の場合は非表示となる。

```typescript
<AvatarGroup.Remain />
```

#### AvatarGroup.Counter

`max` を超えた場合に総数を表示する。`max` 以下の場合は非表示となる。

```typescript
<AvatarGroup.Counter />
```

#### AvatarGroup.Label

任意のテキストを表示する。`max` の状態に関係なく常に表示される。大量データ向けにサーバーから取得した件数を表示する場合などに使用する。

| プロパティ | 型          | デフォルト値 | 説明             |
| ---------- | ----------- | ------------ | ---------------- |
| `children` | `ReactNode` | -            | 表示するテキスト |

```typescript
<AvatarGroup.Label>+995</AvatarGroup.Label>
```

## 状態とスタイル

### サイズバリエーション

AvatarGroup の `size` は内部の Avatar に自動的に適用される。

#### x-small

- Avatar サイズ: `w-6 h-6` (24px × 24px)
- カウンターサイズ: `h-6 w-6`
- オーバーラップ: `-ml-1.5`
- ボーダー: `border border-white`
- タイポグラフィ: `typography-label11regular`

#### small

- Avatar サイズ: `w-8 h-8` (32px × 32px)
- カウンターサイズ: `h-8 w-8`
- オーバーラップ: `-ml-2`
- ボーダー: `border border-white`
- タイポグラフィ: `typography-label11regular`

#### medium（デフォルト）

- Avatar サイズ: `w-10 h-10` (40px × 40px)
- カウンターサイズ: `h-10 w-10`
- オーバーラップ: `-ml-2.5`
- ボーダー: `border-2 border-white`
- タイポグラフィ: `typography-label14regular`

#### large

- Avatar サイズ: `w-12 h-12` (48px × 48px)
- カウンターサイズ: `h-12 w-12`
- オーバーラップ: `-ml-3`
- ボーダー: `border-2 border-white`
- タイポグラフィ: `typography-label14regular`

#### x-large

- Avatar サイズ: `w-16 h-16` (64px × 64px)
- カウンターサイズ: `h-16 w-16`
- オーバーラップ: `-ml-4`
- ボーダー: `border-[3px] border-white`
- タイポグラフィ: `typography-label16regular`

### オーバーラップとボーダー

- 各 Avatar は白いボーダーで囲まれ、隣接する Avatar と視覚的に分離される
- z-index は左から右に向かって増加し、右側の Avatar が上に重なる
- trailing 要素（Remain, Counter, Label）は表示中の Avatar の後ろに配置される

### カウンター表示

Remain, Counter, Label は以下のスタイルで表示される：

- 背景色: `bg-uiBackground02`
- テキスト色: `text-text02`
- 形状: `rounded-full`

## 使用例

### 基本的な使用例

```typescript
<AvatarGroup>
  <Avatar userId={1} firstName="太郎" lastName="田中" />
  <Avatar userId={2} firstName="花子" lastName="鈴木" />
  <Avatar userId={3} firstName="一郎" lastName="佐藤" />
</AvatarGroup>
```

### サイズ指定

```typescript
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

### Remain（残り人数表示）

`max` を超えた場合に `+N` 形式で残り人数を表示する：

```typescript
<AvatarGroup max={3}>
  <Avatar userId={1} firstName="太郎" lastName="田中" />
  <Avatar userId={2} firstName="花子" lastName="鈴木" />
  <Avatar userId={3} firstName="一郎" lastName="佐藤" />
  <Avatar userId={4} firstName="次郎" lastName="高橋" />
  <Avatar userId={5} firstName="三郎" lastName="渡辺" />
  <AvatarGroup.Remain />
</AvatarGroup>
// 表示: 3つの Avatar + "+2"
```

### Counter（総数表示）

`max` を超えた場合に総数を表示する：

```typescript
<AvatarGroup max={3}>
  <Avatar userId={1} firstName="太郎" lastName="田中" />
  <Avatar userId={2} firstName="花子" lastName="鈴木" />
  <Avatar userId={3} firstName="一郎" lastName="佐藤" />
  <Avatar userId={4} firstName="次郎" lastName="高橋" />
  <Avatar userId={5} firstName="三郎" lastName="渡辺" />
  <AvatarGroup.Counter />
</AvatarGroup>
// 表示: 3つの Avatar + "5"
```

### Label（カスタムラベル）

大量データ向けに任意のテキストを表示する：

```typescript
<AvatarGroup size="small">
  <Avatar userId={1} firstName="太郎" lastName="田中" />
  <Avatar userId={2} firstName="花子" lastName="鈴木" />
  <Avatar userId={3} firstName="一郎" lastName="佐藤" />
  <Avatar userId={4} firstName="次郎" lastName="高橋" />
  <Avatar userId={5} firstName="三郎" lastName="渡辺" />
  <AvatarGroup.Label>+995</AvatarGroup.Label>
</AvatarGroup>
// 表示: 5つの Avatar + "+995"
```

### Tooltip との組み合わせ

サブコンポーネントは Tooltip でラップ可能である：

```typescript
<AvatarGroup max={4} size="medium">
  {users.map((user) => (
    <Avatar
      key={user.id}
      userId={user.id}
      firstName={user.firstName}
      lastName={user.lastName}
    />
  ))}
  <Tooltip
    content={
      <div className="flex flex-col">
        {users.slice(4).map((user) => (
          <span key={user.id}>{`${user.lastName} ${user.firstName}`}</span>
        ))}
      </div>
    }
    verticalPosition="top"
    portalTarget={document.body}
  >
    <AvatarGroup.Remain />
  </Tooltip>
</AvatarGroup>
```

**注意**: Tooltip を使用する場合、z-index の問題を避けるため `portalTarget={document.body}` を指定すること。

## アクセシビリティ

- `role="group"` が設定されており、グループとして認識される
- 各サブコンポーネントは `forwardRef` を使用して ref 転送をサポートする
- Avatar 内のテキストコンテンツ（イニシャル）が適切に表示される

## 技術的な詳細

### Compound Component パターン

AvatarGroup は Compound Component パターンを採用しており、以下のようにサブコンポーネントにアクセスできる：

```typescript
AvatarGroup.Remain;
AvatarGroup.Counter;
AvatarGroup.Label;
```

### サイズの自動連携

AvatarGroup 内の Avatar は、`useAvatarGroupSize` フックを通じて親の `size` を自動的に取得する。個別に `size` を指定した場合でも、AvatarGroup の `size` が優先される。

```typescript
// Avatar は AvatarGroup の size="small" を自動的に使用する
<AvatarGroup size="small">
  <Avatar size="large" userId={1} firstName="太郎" lastName="田中" />
</AvatarGroup>
```

### displayName による子要素の検出

サブコンポーネントは `displayName` プロパティを持ち、AvatarGroup は children を再帰的に探索してこれを検出する。これにより、Tooltip などでラップされた場合でも正しく認識される。

```typescript
Remain.displayName = 'AvatarGroup.Remain';
Counter.displayName = 'AvatarGroup.Counter';
Label.displayName = 'AvatarGroup.Label';
```

## 注意事項

1. **max を超えない場合の動作**: Avatar の数が `max` 以下の場合、`Remain` と `Counter` は非表示となる。`Label` は常に表示される
2. **Tooltip との組み合わせ**: Tooltip でサブコンポーネントをラップする場合、`portalTarget={document.body}` を指定しないと z-index の問題で Tooltip が隠れる可能性がある
3. **サイズの優先順位**: Avatar 個別の `size` 指定は AvatarGroup 内では無視される
4. **children の順序**: Avatar を先に配置し、サブコンポーネント（Remain, Counter, Label）を後に配置すること
5. **複数のカウンター**: Remain と Counter を同時に使用することは想定していない。どちらか一方を選択すること

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config` で定義されたデザイントークンに依存している。カスタマイズする場合は、これらの設定を参照すること。

特に以下の要素がカスタマイズ可能である：

- オーバーラップ幅（`-ml-*` クラス）
- ボーダー（`border-*` クラス）
- カウンター背景色（`bg-uiBackground02`）
- カウンターテキスト色（`text-text02`）

## Q&A

### Q: Avatar に個別の size を指定したらどうなる？

A: AvatarGroup 内では、Avatar 個別の `size` 指定は無視され、AvatarGroup の `size` が優先される。

### Q: Remain と Counter を同時に使える？

A: 技術的には可能だが、想定された使い方ではない。両方使用した場合、`max` を超えた際に両方とも表示される。通常はどちらか一方を選択すること。

### Q: Label と Remain を同時に使える？

A: 使用できる。ただし、Label は常に表示され、Remain は `max` を超えた場合のみ表示される。大量データで「+N」形式の表示が必要な場合は、Label 単体で `+995` のようなテキストを表示するのが一般的な使い方である。

### Q: Tooltip でラップしたら認識されなくなる？

A: AvatarGroup は `displayName` を使った再帰探索で子要素を検出するため、Tooltip などでラップしても正しく認識される。

### Q: max を超えないときに Remain/Counter はどうなる？

A: 非表示になる。

### Q: 大量データ（1000件など）の場合はどう使う？

A: サーバーから取得した上位 N 件の Avatar のみを表示し、残りの件数は `AvatarGroup.Label` で表示する：

```typescript
<AvatarGroup size="small">
  {users.slice(0, 5).map((user) => (
    <Avatar key={user.id} userId={user.id} firstName={user.firstName} lastName={user.lastName} />
  ))}
  <AvatarGroup.Label>+{totalCount - 5}</AvatarGroup.Label>
</AvatarGroup>
```

### Q: Avatar 以外の要素（div など）を入れたらどうなる？

A: Avatar としてカウントされ、`max` の計算対象となる。ただし、AvatarGroup は Avatar コンポーネントとの使用を前提としているため、他の要素を入れることは推奨しない。

### Q: z-index の順序を変えられる？（左の Avatar を前面にしたい）

A: 現在の実装では z-index は左から右に増加する固定仕様となっている。

### Q: ボーダーの色を白以外に変えられる？

A: 現在の実装ではボーダー色は `border-white` で固定されている。

## 更新履歴

| 日付                 | 内容     | 担当者 |
| -------------------- | -------- | ------ |
| 2026-02-12 15:14 JST | 新規作成 | -      |
