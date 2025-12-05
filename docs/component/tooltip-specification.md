# Tooltip コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [特殊機能の詳細](#特殊機能の詳細)
   - [継承プロパティ](#継承プロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
   - [その他のスタイル仕様](#その他のスタイル仕様)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [水平配置をカスタマイズする例](#水平配置をカスタマイズする例)
   - [ポータルと最大幅を併用する例](#ポータルと最大幅を併用する例)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [型安全性](#型安全性)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Tooltipコンポーネントは、UI要素に付随する補足説明をホバーで即時に表示する軽量ヒントである。トリガー要素の周囲に短いテキストを表示し、左右および上下方向の配置やコンテンツ幅を制御できる。ヘルパーテキストやPopoverよりも短い説明を届けたい場合に使用する。

## インポート

```typescript
import { Tooltip } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { Tooltip, IconButton } from '@zenkigen-inc/component-ui';
import { InformationCircleIcon } from '@zenkigen-inc/component-icons';

const TooltipExample = () => (
  <Tooltip content="補足説明がここに入ります">
    <IconButton aria-label="ヘルプ">
      <InformationCircleIcon />
    </IconButton>
  </Tooltip>
);
```

## Props

### 必須プロパティ

| プロパティ | 型          | 説明                                                                               |
| ---------- | ----------- | ---------------------------------------------------------------------------------- |
| `children` | `ReactNode` | Tooltipを紐づけるトリガー要素。`div`でラップされ、hover対象になる。                |
| `content`  | `ReactNode` | Tooltip本体に表示する内容。テキスト/インライン要素/改行を含むReactノードを渡せる。 |

### オプションプロパティ

| プロパティ         | 型                                    | デフォルト値 | 説明                                                                                                           |
| ------------------ | ------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `size`             | `TooltipSize` (`'small' \| 'medium'`) | `'small'`    | 表示されるテキストのタイポグラフィとパディングを切り替える。                                                   |
| `maxWidth`         | `CSSProperties['maxWidth']`           | `undefined`  | Tooltip本体の最大幅。未指定時はコンテンツ幅に追従して`w-max`スタイルで描画される。                             |
| `verticalPosition` | `'top' \| 'bottom'`                   | `'bottom'`   | トリガーに対してTooltipを上下どちらに配置するか。`'top'`はトリガーの上側に表示し、`'bottom'`は下側に表示する。 |
| `horizontalAlign`  | `'left' \| 'center' \| 'right'`       | `'center'`   | Tooltipの水平位置を制御する。左揃えはトリガー左端から、右揃えは右端からオフセットを付与して配置される。        |
| `isDisabledHover`  | `boolean`                             | `false`      | `true` の間は hover してもTooltipを表示しない。操作ガイドを一時的に止めたいケースで使用する。                  |
| `portalTarget`     | `HTMLElement`                         | `undefined`  | Tooltipを指定要素配下にポータル描画する。`overflow: hidden` を回避したいときは `document.body` を渡す。        |

### 特殊機能の詳細

#### ポータル描画

- `portalTarget` に `HTMLElement` を渡すと `createPortal` で Tooltip がそのノード直下に描画される。
- `TooltipContent` は `translate(X/Y)` を用いて絶対座標に配置されるため、ポータル先がスクロールコンテナでも視覚位置は維持される。

#### ホバー抑止

- `isDisabledHover` が `true` の間は `mouseenter` イベントが無視され、内部状態 `isVisible` が `false` のまま維持される。
- 対象要素を `disabled` にした場合など、Tooltipの説明が不要/不正確になる時に使用する。

### 継承プロパティ

- 追加でスプレッドされるDOM属性はない。`Tooltip` が内部で `div` を生成し、`children` を直接描画するため、トリガー要素側で必要なARIA属性やイベントを定義すること。

## 状態とスタイル

### サイズバリエーション

| サイズ   | タイポグラフィ             | パディング         | Tailwindクラス                                    |
| -------- | -------------------------- | ------------------ | ------------------------------------------------- |
| `small`  | `typography-body12regular` | `px-2 pb-1 pt-1.5` | `w-[24px]` のターゲット幅 / TailIconは `8x4px`。  |
| `medium` | `typography-body13regular` | `px-4 py-3`        | `w-[46px]` のターゲット幅 / TailIconは `14x8px`。 |

### 状態に応じたスタイル

- **通常状態**: `bg-uiBackgroundTooltip` と `text-textOnColor` を使用し、`rounded`・`shadow`無しのシンプルなラベルとして描画する。
- **表示状態**: `isVisible` が `true` になると `TooltipContent` が描画され、`TailIcon` が現在の `verticalPosition`・`horizontalAlign` に応じた位置へ絶対配置される。
- **非表示状態**: DOM上から `TooltipContent` が除去される。フェードアニメーションは付与していない。

### その他のスタイル仕様

- ラッパーは `relative flex items-center justify-center` で構成され、ターゲット要素を中央に保持したままサイズを測定する。
- 本体は常に `absolute z-tooltip inline-block w-max rounded bg-uiBackgroundTooltip text-textOnColor` を使用し、`maxWidth` 指定値を `style` で適用する。
- `TailIcon` は `fill-uiBackgroundTooltip` を用いた二等辺三角形で、上下位置に応じて `rotate-180` を切り替える。
- ポータル使用時は `style={{ transform: translate(...) }}` でスクロール位置を補正し、`left/top/bottom` を `calculatePosition` が算出した値へ反映する。

## 使用例

### 基本的な使用例

```typescript
import { Tooltip, Button } from '@zenkigen-inc/component-ui';

const BasicTooltip = () => (
  <Tooltip content="保存内容の説明テキストです" size="small">
    <Button variant="ghost">保存</Button>
  </Tooltip>
);
```

### 水平配置をカスタマイズする例

```typescript
import { Tooltip } from '@zenkigen-inc/component-ui';

const AlignSample = () => (
  <div className="flex gap-8">
    <Tooltip content="左寄せ" horizontalAlign="left" verticalPosition="top">
      <span className="underline decoration-dotted">左揃え</span>
    </Tooltip>
    <Tooltip content="右寄せ" horizontalAlign="right">
      <span className="underline decoration-dotted">右揃え</span>
    </Tooltip>
  </div>
);
```

### ポータルと最大幅を併用する例

```typescript
import { Tooltip } from '@zenkigen-inc/component-ui';

const PortalTooltip = () => (
  <Tooltip
    content={
      <div>
        <p className="font-semibold">アップロード要件</p>
        <p>PDF 5MB 以内で、縦横比は 16:9 を推奨します。</p>
      </div>
    }
    maxWidth={320}
    portalTarget={document.body}
    size="medium"
  >
    <span className="border-b border-dashed border-text02">ファイル仕様を確認</span>
  </Tooltip>
);
```

## アクセシビリティ

- Tooltip自身は `role` や `aria` 属性を付与しない。スクリーンリーダーはトリガーにフォーカスしてもTooltipを読み上げないため、必須情報は `Popover` や `HelperText` を用いる。
- 表示はマウスホバーイベントのみで制御しており、キーボードフォーカスやタッチ操作時には自動で表示されない。キーボード利用者に同等の情報を提供する別導線を用意すること。
- `TailIcon` などの装飾は `aria-hidden` の役割を持つSVGで構成されているため、追加の読み上げは行われない。

## 技術的な詳細

### 実装について

- `Tooltip` は内部で `useState` により `isVisible` を保持し、`onMouseOver`/`onMouseLeave` で開閉を切り替える。制御用のAPIは提供していない。
- 表示座標は `useTooltip` フックの `calculatePosition` で算出する。`DOMRect` からターゲットの中心/端を求め、`horizontalAlign` と `verticalPosition` に応じて `left/top/bottom/translate` を定義する。
- `window.scrollY` を参照してページスクロール分を補正し、ポータル描画時にも正しいY座標を確保する。
- `TooltipContent` は `isPortal` フラグで分岐し、ポータル時のみ `style` に `transform: translate(...)` と算出済み座標をマージする。
- `TailIcon` はサイズ別のSVGを返し、`clsx` で上下左右のオフセットを切り替えることで常に吹き出しの端点とトリガーが繋がるように実装している。

### 型安全性

- `TooltipSize`, `TooltipVerticalPosition`, `TooltipHorizontalAlign` のユニオン型により、無効な文字列をコンパイル時に排除する。
- `TooltipPosition` は `calculatePosition` の戻り値を厳密化し、`TooltipContent` の `style` に展開されるプロパティの不足を防いでいる。

## 注意事項

- Tooltipはホバー中のみ一時的に表示されるため、ユーザーが情報を保持できない。入力必須項目や警告など、恒常表示が必要な情報を配置してはならない。
- サイズ計算は`useEffect`で `maxWidth`, `size`, `verticalPosition`, `horizontalAlign` が変化した時のみ再計算される。ターゲットが動的にサイズ変更される場合は再レンダーを行い計算を更新すること。
- `portalTarget` 未指定で `overflow: hidden` な親要素内に配置した場合、Tooltipが切り取られる。必要に応じてポータル先を指定する。

## スタイルのカスタマイズ

- 色とタイポグラフィは `@zenkigen-inc/component-config` に定義された `uiBackgroundTooltip`, `textOnColor`, `typography-body12regular/13regular` トークンを使用している。テーマトークンを変更することで一括調整できる。
- `maxWidth` でコンテンツ幅を制限し、`content` に独自のTypograpy/レイアウトを渡すことで詳細な整形が可能。
- Tailwindクラスを直接上書きするpropsは提供しないため、背景色や余白調整が必要な場合はデザイントークンを更新する方針とする。

## 更新履歴

※ 日時はJST表記

| 日付                 | 内容                                                     | 担当者 |
| -------------------- | -------------------------------------------------------- | ------ |
| 2025-12-03 09:23 JST | Tooltip仕様書を新規作成し、Props/使用例/注意事項を整理。 | -      |
