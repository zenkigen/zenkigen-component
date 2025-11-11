# Popup コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [オプションプロパティ](#オプションプロパティ)
   - [子コンポーネント](#子コンポーネント)
5. [状態とスタイル](#状態とスタイル)
   - [サイズ仕様](#サイズ仕様)
   - [レイアウト構造](#レイアウト構造)
   - [ヘッダースタイル](#ヘッダースタイル)
   - [ボディスタイル](#ボディスタイル)
   - [フッタースタイル](#フッタースタイル)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [高さ固定のPopup](#高さ固定のpopup)
   - [閉じるボタンなしのPopup](#閉じるボタンなしのpopup)
   - [Popoverとの連携](#popoverとの連携)
7. [技術的な詳細](#技術的な詳細)
   - [PopoverContextとの統合](#popovercontextとの統合)
   - [サイズ制約](#サイズ制約)
   - [レスポンシブ対応](#レスポンシブ対応)
8. [アクセシビリティ](#アクセシビリティ)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Popupコンポーネントは、モーダルやポップオーバー内で使用するスタイル付きコンテナUIコンポーネントです。ヘッダー、ボディ、フッターの3つのセクションで構成され、統一されたレイアウトとスタイルを提供します。Popoverコンポーネントとシームレスに統合でき、Popover内で使用する場合は開閉状態を自動的に継承します。

## インポート

```typescript
import { Popup } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { Popup, Button } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Popupを開く</Button>
      <Popup
        isOpen={isOpen}
        width={480}
        onClose={() => setIsOpen(false)}
      >
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="p-4">コンテンツ</div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full justify-end gap-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              キャンセル
            </Button>
            <Button variant="fill">
              保存
            </Button>
          </div>
        </Popup.Footer>
      </Popup>
    </>
  );
};
```

## Props

### オプションプロパティ

| プロパティ | 型                        | デフォルト値 | 説明                                                       |
| ---------- | ------------------------- | ------------ | ---------------------------------------------------------- |
| `isOpen`   | `boolean`                 | `undefined`  | Popupの表示/非表示状態（PopoverContext内では自動的に取得） |
| `width`    | `CSSProperties['width']`  | `480`        | Popupの幅（数値の場合は最小320px）                         |
| `height`   | `CSSProperties['height']` | `undefined`  | Popupの高さ（数値の場合は最小184px、未指定時は自動調整）   |
| `onClose`  | `() => void`              | `undefined`  | 閉じる操作が発生した時に呼び出されるコールバック           |
| `children` | `ReactNode`               | -            | `Popup.Header`、`Popup.Body`、`Popup.Footer`を含む子要素   |

### 子コンポーネント

#### Popup.Header

Popupのヘッダーセクションを定義するコンポーネント。

| プロパティ | 型          | デフォルト値 | 説明                                     |
| ---------- | ----------- | ------------ | ---------------------------------------- |
| `children` | `ReactNode` | -            | ヘッダーに表示する内容                   |
| `before`   | `ReactNode` | `undefined`  | タイトル前に表示する要素（アイコンなど） |

**特徴**

- タイトルテキストを表示
- `onClose`が指定されている場合、自動的に閉じるボタン（IconButton）を表示
- 高さ: `h-12` (48px) で固定
- タイポグラフィ: `typography-h5`
- テキスト色: `text-text01`
- パディング: `px-6 pt-3`
- 角丸: `rounded-t-lg`（上部のみ）
- レイアウト: `flex items-start justify-between`

#### Popup.Body

Popupのボディセクションを定義するコンポーネント。

| プロパティ | 型          | 説明                 |
| ---------- | ----------- | -------------------- |
| `children` | `ReactNode` | ボディに表示する内容 |

**特徴**

- 縦方向にスクロール可能（`overflow-y-auto`）
- 高さがコンテンツに応じて自動調整（`height`未指定時）
- グリッドレイアウトの中央行として配置され、残りスペースを占有

#### Popup.Footer

Popupのフッターセクションを定義するコンポーネント。

| プロパティ | 型          | 説明                   |
| ---------- | ----------- | ---------------------- |
| `children` | `ReactNode` | フッターに表示する内容 |

**特徴**

- 主にアクションボタンを配置
- パディング: `px-6 py-3`
- 角丸: `rounded-b-lg`（下部のみ）
- フレックスレイアウト: `flex items-center`
- 縮小しない: `shrink-0`

## 状態とスタイル

### サイズ仕様

#### 幅の制約

- **デフォルト幅**: `480px`
- **最小幅**: `320px`（数値指定時に自動適用）
- **幅の指定方法**:
  - 数値: ピクセル値として扱われ、最小320pxが保証される
  - 文字列: CSS値として直接適用（例: `'50vw'`, `'100%'`）

#### 高さの制約

- **デフォルト高さ**: `undefined`（コンテンツに応じて自動調整）
- **最小高さ**: `184px`（数値指定時に自動適用）
- **最大高さ**: `max-h-full`（画面高さを超えない）
- **高さの指定方法**:
  - 数値: ピクセル値として扱われ、最小184pxが保証される
  - 文字列: CSS値として直接適用（例: `'80vh'`）
  - `undefined`: コンテンツに応じて自動調整

### レイアウト構造

Popupコンポーネントは CSS Grid レイアウトを使用して構造化されています。

```css
grid-rows-[max-content_1fr_max-content]
```

- **Header**: 最大コンテンツサイズ（`max-content`）
- **Body**: 残りのスペース全体（`1fr`）、スクロール可能
- **Footer**: 最大コンテンツサイズ（`max-content`）

### ヘッダースタイル

#### 共通スタイル

- 高さ: `h-12` (48px) で固定
- レイアウト: `flex items-start justify-between`
- タイポグラフィ: `typography-h5`
- テキスト色: `text-text01`
- パディング: `px-6 pt-3`
- 幅: `w-full`
- 縮小: `shrink-0`
- 角丸: `rounded-t-lg`

#### 閉じるボタンあり（`onClose`指定時）

- IconButton: `size="small"`, `variant="text"`, `icon="close"`
- 右端に配置

#### 閉じるボタンなし

- 閉じるボタンは表示されない
- レイアウトは同じ（`flex items-start justify-between`）

### ボディスタイル

- オーバーフロー: `overflow-y-auto`（縦スクロール可能）
- グリッド配置: 残りスペースを占有（`1fr`）
- 背景: 継承（通常は親の`bg-uiBackground01`）

### フッタースタイル

- レイアウト: `flex items-center`
- 幅: `w-full`
- 縮小: `shrink-0`
- パディング: `px-6 py-3`
- 角丸: `rounded-b-lg`

### コンテナスタイル

- 背景色: `bg-uiBackground01`
- 角丸: `rounded-lg`
- シャドウ: `shadow-floatingShadow`
- グリッドレイアウト: `grid grid-rows-[max-content_1fr_max-content]`
- 最大高さ: `max-h-full`

## 使用例

### 基本的な使用例

```typescript
import { useState } from 'react';
import { Popup, Button } from '@zenkigen-inc/component-ui';

const BasicExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Popupを開く</Button>
      <Popup
        isOpen={isOpen}
        width={480}
        onClose={() => setIsOpen(false)}
      >
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full items-center justify-center py-20">
            Content
          </div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full flex-wrap items-center justify-end gap-4">
            <Button variant="outline" size="medium" onClick={() => setIsOpen(false)}>
              キャンセル
            </Button>
            <Button variant="fill" size="medium">
              保存する
            </Button>
          </div>
        </Popup.Footer>
      </Popup>
    </>
  );
};
```

### 高さ固定のPopup

長いコンテンツがある場合、高さを固定してスクロール可能にできます。

```typescript
const FixedHeightExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Popupを開く</Button>
      <Popup
        isOpen={isOpen}
        width={480}
        height={320}
        onClose={() => setIsOpen(false)}
      >
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full flex-col px-4">
            <p>
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、
              うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
            </p>
            <p>
              またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、
              羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、
              山猫博士のボーガント・デストゥパーゴなど、
              いまこの暗い巨きな石の建物のなかで考えていると、
              みんなむかし風のなつかしい青い幻燈のように思われます。
            </p>
          </div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full items-center justify-end gap-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              キャンセル
            </Button>
            <Button variant="fill">
              保存する
            </Button>
          </div>
        </Popup.Footer>
      </Popup>
    </>
  );
};
```

### 閉じるボタンなしのPopup

`onClose`を指定しない場合、ヘッダーに閉じるボタンが表示されません。

```typescript
const WithoutCloseButtonExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Popupを開く</Button>
      <Popup isOpen={isOpen} width={480}>
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full flex-col px-4 pb-4">
            <p>
              閉じるボタンがないPopupです。
              フッターのボタンやその他の方法で閉じる必要があります。
            </p>
          </div>
        </Popup.Body>
      </Popup>
    </>
  );
};
```

### Popoverとの連携

PopupコンポーネントはPopoverコンポーネントと統合して使用できます。Popover内で使用する場合、`isOpen` propを指定しなくてもPopoverContextから自動的に開閉状態を取得します。

```typescript
import { useState } from 'react';
import { Popover, Popup, Button } from '@zenkigen-inc/component-ui';

const PopoverIntegrationExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      placement="top"
      onOutsideClick={() => setIsOpen(false)}
      onEscapeKeyDown={() => setIsOpen(false)}
    >
      <Popover.Trigger>
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Popoverを閉じる' : 'Popoverを開く'}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        {/* isOpen を指定しなくても PopoverContext から自動取得 */}
        <Popup width={480} onClose={() => setIsOpen(false)}>
          <Popup.Header>Popover内のPopup</Popup.Header>
          <Popup.Body>
            <div className="typography-body14regular flex w-full flex-col gap-3 p-4 text-text01">
              <p>このPopupはPopover内で使用されています。</p>
              <p>ヘッダーの✕ボタンをクリックすると、PopupとPopoverの両方が閉じます。</p>
            </div>
          </Popup.Body>
        </Popup>
      </Popover.Content>
    </Popover>
  );
};
```

## 技術的な詳細

### PopoverContextとの統合

Popupコンポーネントは、PopoverContext内で使用される場合、自動的にPopoverの開閉状態を継承します。

**実装の詳細**

```typescript
function useOptionalPopoverContext() {
  return useContext(PopoverContext);
}

// PopoverContext が存在する場合はその状態を優先
const popoverContext = useOptionalPopoverContext();
const isInPopover = popoverContext != null;
const isOpen = isInPopover ? popoverContext.isOpen : (controlledIsOpen ?? false);
```

**動作**

1. **Popover内で使用する場合**: PopoverContextの`isOpen`状態を自動的に使用
2. **単独で使用する場合**: `isOpen` propで指定された値を使用
3. **どちらも指定がない場合**: `false`として扱われ、Popupは表示されない

### サイズ制約

Popupコンポーネントには最小サイズ制約が実装されています。

**幅の制約**

```typescript
const LIMIT_WIDTH = 320;
const renderWidth = typeof width === 'number' ? Math.max(width, LIMIT_WIDTH) : width;
```

- 数値で指定された場合: 最小320pxが保証される
- 文字列で指定された場合: そのままCSS値として適用

**高さの制約**

```typescript
const LIMIT_HEIGHT = 184;
const renderHeight = typeof height === 'number' ? Math.max(height, LIMIT_HEIGHT) : height;
```

- 数値で指定された場合: 最小184pxが保証される
- 文字列で指定された場合: そのままCSS値として適用
- `undefined`の場合: コンテンツに応じて自動調整

### レスポンシブ対応

Popupコンポーネントは`max-h-full`クラスにより、画面高さを超えないように制限されています。

- 最大高さ: `max-h-full`（画面高さを超えない）
- 小さい画面でもPopupが画面からはみ出さない

## アクセシビリティ

- **コンポーネント構造**: ヘッダー、ボディ、フッターの明確な区分により、スクリーンリーダーが構造を理解しやすい
- **閉じるボタン**: IconButtonコンポーネントを使用し、適切なアクセシビリティ属性を継承
- **キーボード操作**: PopoverContextと統合時、Popoverのキーボード操作（Escapeキー等）を継承
- **フォーカス管理**: Popover内で使用する場合、Popoverのフォーカス管理機能を活用
- **スクロール可能領域**: ボディセクションが明確にスクロール可能として定義され、キーボードでのスクロール操作が可能

## 注意事項

1. **表示状態の制御**
   - 単独で使用する場合は`isOpen` propが必須です
   - PopoverContext内で使用する場合は`isOpen`を省略できます

2. **最小サイズの制約**
   - 幅: 最小320px（数値指定時）
   - 高さ: 最小184px（数値指定時）
   - これらの制約より小さい値を指定しても、最小サイズが適用されます

3. **子コンポーネントの順序**
   - `Popup.Header`、`Popup.Body`、`Popup.Footer`の順序で配置することを推奨します
   - グリッドレイアウトを使用しているため、順序が異なると意図しないレイアウトになる可能性があります

4. **閉じるボタンの表示**
   - `onClose`を指定した場合のみ、ヘッダーに閉じるボタンが表示されます
   - ヘッダーの高さは固定で48pxです

5. **PopoverContextとの連携**
   - Popover内で使用する場合、Popupの`onClose`でPopoverの`isOpen`状態も更新することを推奨します
   - そうしないと、Popup（の閉じるボタン）を閉じてもPopoverは開いたままになります

6. **スタイルの継承**
   - Popupコンテナは固定のスタイルを持ちますが、内部コンテンツのスタイルは利用者が指定します
   - 特にBodyセクションでは、パディングやマージンを適切に設定してください

7. **アイコンの使用**
   - アイコンを使用する場合は、`@zenkigen-inc/component-icons`の`Icon`コンポーネントのみを使用してください

## スタイルのカスタマイズ

Popupコンポーネントは統一されたスタイルを提供しますが、内部コンテンツは自由にカスタマイズできます。

**固定スタイル**

以下のスタイルは変更できません：

- コンテナの背景色（`bg-uiBackground01`）
- 角丸（`rounded-lg`）
- シャドウ（`shadow-floatingShadow`）
- グリッドレイアウト構造
- ヘッダーのタイポグラフィ（`typography-h5`）

**カスタマイズ可能な要素**

1. **幅と高さ**: `width`、`height`、`maxWidth` propsで調整
2. **ヘッダーコンテンツ**: `Popup.Header`の`children`で自由に配置
3. **ボディコンテンツ**: `Popup.Body`の`children`で自由に配置
4. **フッターコンテンツ**: `Popup.Footer`の`children`で自由に配置
5. **内部要素のスタイル**: Tailwind CSSのユーティリティクラスを使用して調整

**推奨カスタマイズ方法**

```typescript
<Popup width={600} height={400} onClose={handleClose}>
  <Popup.Header before={<Icon name="info" size="small" />}>
    情報
  </Popup.Header>
  <Popup.Body>
    {/* カスタムボディコンテンツ */}
    <div className="flex flex-col gap-4 p-6">
      <p className="typography-body14regular text-text01">
        コンテンツ
      </p>
    </div>
  </Popup.Body>
  <Popup.Footer>
    {/* カスタムフッターコンテンツ */}
    <div className="flex w-full justify-between">
      <Button variant="text">ヘルプ</Button>
      <div className="flex gap-4">
        <Button variant="outline">キャンセル</Button>
        <Button variant="fill">保存</Button>
      </div>
    </div>
  </Popup.Footer>
</Popup>
```

## 更新履歴

| 日付                 | 内容     | 担当者 |
| -------------------- | -------- | ------ |
| 2025-10-17 15:30 JST | 新規作成 | -      |
