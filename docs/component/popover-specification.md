# Popover コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [子コンポーネント](#子コンポーネント)
5. [PopoverPlacement型](#popoverplacement型)
6. [状態とスタイル](#状態とスタイル)
   - [配置位置バリエーション](#配置位置バリエーション)
   - [フォーカス状態](#フォーカス状態)
7. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [配置位置のカスタマイズ](#配置位置のカスタマイズ)
   - [オフセットの調整](#オフセットの調整)
   - [Popupコンポーネントとの連携](#popupコンポーネントとの連携)
8. [技術的な詳細](#技術的な詳細)
   - [Floating UIの統合](#floating-uiの統合)
   - [ポータル描画](#ポータル描画)
   - [フォーカス管理](#フォーカス管理)
   - [外部クリック検知](#外部クリック検知)
   - [Escapeキー対応](#escapeキー対応)
9. [アクセシビリティ](#アクセシビリティ)
10. [注意事項](#注意事項)
11. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
12. [更新履歴](#更新履歴)

---

## 概要

Popoverコンポーネントは、トリガー要素に関連付けられたコンテンツを浮動表示するUIコンポーネントです。Floating UIライブラリを使用して、柔軟な位置制御とポータル描画を実現し、親要素の`overflow`設定の影響を受けずに表示できます。トリガーとコンテンツの組み合わせで構成され、アクセシビリティとキーボード操作に完全対応しています。

## インポート

```typescript
import { Popover } from '@zenkigen-inc/component-ui';
import type { PopoverPlacement } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { Popover, Button } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      placement="top"
      onClose={() => setIsOpen(false)}
    >
      <Popover.Trigger>
        <Button onClick={() => setIsOpen(!isOpen)}>
          Popoverを表示
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="rounded-lg bg-white p-4 shadow-lg">
          Popoverのコンテンツ
        </div>
      </Popover.Content>
    </Popover>
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型          | 説明                                             |
| ---------- | ----------- | ------------------------------------------------ |
| `isOpen`   | `boolean`   | Popoverの開閉状態を制御                          |
| `children` | `ReactNode` | `Popover.Trigger`と`Popover.Content`を含む子要素 |

### オプションプロパティ

| プロパティ  | 型                              | デフォルト値 | 説明                                                    |
| ----------- | ------------------------------- | ------------ | ------------------------------------------------------- |
| `placement` | `PopoverPlacement`              | `'top'`      | Popoverの配置位置                                       |
| `offset`    | `number`                        | `8`          | トリガー要素とPopoverコンテンツとの間隔（ピクセル単位） |
| `onClose`   | `(reason: CloseReason) => void` | `undefined`  | Popoverが閉じられた時に呼び出されるコールバック         |

### CloseReason型

```typescript
type CloseReason = 'outside-click' | 'escape-key-down';
```

- `'outside-click'`: Popoverの外側をクリックした時
- `'escape-key-down'`: Escapeキーが押された時

### 子コンポーネント

#### Popover.Trigger

トリガー要素を定義するコンポーネント。

| プロパティ | 型                   | 説明                                        |
| ---------- | -------------------- | ------------------------------------------- |
| `children` | `React.ReactElement` | トリガーとなる単一のReact要素（Buttonなど） |

**特徴**

- `children`として受け取った要素に以下の属性を自動的に付与：
  - `aria-haspopup="dialog"`
  - `aria-expanded={isOpen}`
  - `aria-controls={panelId}`
- `forwardRef`を使用してref転送をサポート

#### Popover.Content

Popoverのコンテンツを定義するコンポーネント。

| プロパティ | 型          | 説明                        |
| ---------- | ----------- | --------------------------- |
| `children` | `ReactNode` | Popoverに表示するコンテンツ |

**特徴**

- `children`として受け取った要素に以下の属性を自動的に付与：
  - `id={panelId}`
  - `role="dialog"`
- `forwardRef`を使用してref転送をサポート
- `FloatingPortal`を使用してポータル描画
- 開閉時に自動的にフォーカス管理を実行

## PopoverPlacement型

```typescript
type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';
```

### 配置位置の詳細

- **基本4方向**: `top`, `bottom`, `left`, `right` - トリガーの中央に配置
- **開始位置**: `top-start`, `bottom-start`, `left-start`, `right-start` - トリガーの開始端に配置
- **終了位置**: `top-end`, `bottom-end`, `left-end`, `right-end` - トリガーの終了端に配置

## 状態とスタイル

### 配置位置バリエーション

Popoverの配置は`placement` propで制御され、Floating UIが自動的に最適な位置を計算します。

#### 基本配置

- **top**: トリガーの上部中央
- **bottom**: トリガーの下部中央
- **left**: トリガーの左側中央
- **right**: トリガーの右側中央

#### 開始位置配置

- **top-start**: トリガーの上部、左端揃え
- **bottom-start**: トリガーの下部、左端揃え
- **left-start**: トリガーの左側、上端揃え
- **right-start**: トリガーの右側、上端揃え

#### 終了位置配置

- **top-end**: トリガーの上部、右端揃え
- **bottom-end**: トリガーの下部、右端揃え
- **left-end**: トリガーの左側、下端揃え
- **right-end**: トリガーの右側、下端揃え

### フォーカス状態

#### Popover開閉時のフォーカス管理

- **Popover表示時**: `Popover.Content`内の要素に自動的にフォーカスが移動（`preventScroll: true`）
- **Popover非表示時**: トリガー要素に自動的にフォーカスが戻る（`preventScroll: true`）
- **tabIndex**: Popover.Content の wrapper div は `tabIndex={-1}` でフォーカス可能
- **outline**: フォーカス時の視覚的フィードバックとして `outline: '0'` を設定

## 使用例

### 基本的な使用例

```typescript
import { useState } from 'react';
import { Popover, Button } from '@zenkigen-inc/component-ui';

const BasicExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Popover.Trigger>
        <Button onClick={() => setIsOpen(!isOpen)}>
          Popoverを表示
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="rounded-lg bg-slate-200 p-4">
          <p className="text-sm font-semibold text-text01">Popoverのコンテンツ</p>
          <p className="text-xs text-text02">
            ここにPopoverの内容を表示します。
          </p>
        </div>
      </Popover.Content>
    </Popover>
  );
};
```

### 配置位置のカスタマイズ

```typescript
const PlacementExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      placement="bottom-start"
      onClose={() => setIsOpen(false)}
    >
      <Popover.Trigger>
        <Button onClick={() => setIsOpen(!isOpen)}>
          下部左端に表示
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="rounded-lg bg-white p-4 shadow-md">
          下部左端に配置されたPopover
        </div>
      </Popover.Content>
    </Popover>
  );
};
```

### オフセットの調整

```typescript
const OffsetExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      placement="top"
      offset={16}
      onClose={() => setIsOpen(false)}
    >
      <Popover.Trigger>
        <Button onClick={() => setIsOpen(!isOpen)}>
          オフセット16pxで表示
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="rounded-lg bg-white p-4 shadow-md">
          トリガーから16px離れて表示
        </div>
      </Popover.Content>
    </Popover>
  );
};
```

### Popupコンポーネントとの連携

PopoverコンポーネントとPopupコンポーネントを組み合わせて使用することで、スタイル付きのダイアログを簡単に表示できます。PopupコンポーネントはPopoverContextを自動的に参照し、統合されたUIを提供します。

```typescript
import { useState } from 'react';
import { Popover, Popup, Button } from '@zenkigen-inc/component-ui';

const PopupIntegrationExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      placement="bottom"
      onClose={() => setIsOpen(false)}
    >
      <Popover.Trigger>
        <Button onClick={() => setIsOpen(!isOpen)}>
          Popupを表示
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popup width={400} onClose={() => setIsOpen(false)}>
          <Popup.Header>タイトル</Popup.Header>
          <Popup.Body>
            <div className="flex w-full flex-col gap-2 p-4">
              <p className="text-sm text-text01">
                PopupコンポーネントはPopoverContext内で使用でき、
                統合されたUIを提供します。
              </p>
            </div>
          </Popup.Body>
          <Popup.Footer>
            <div className="flex w-full items-center justify-end gap-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                キャンセル
              </Button>
              <Button variant="fill">
                保存
              </Button>
            </div>
          </Popup.Footer>
        </Popup>
      </Popover.Content>
    </Popover>
  );
};
```

## 技術的な詳細

### Floating UIの統合

Popoverコンポーネントは[@floating-ui/react](https://floating-ui.com/)を使用して、トリガー要素に対する動的な位置計算を実現しています。

**主要機能**

- `useFloating`: 位置計算とref管理
- `autoUpdate`: トリガー要素の移動やリサイズ時の自動位置更新
- `offset`: トリガーとコンテンツ間の間隔制御
- `strategy: 'fixed'`: `position: fixed`を使用した固定配置

**使用されているミドルウェア**

- `offset`: トリガー要素からの距離を制御
- `autoUpdate`: ビューポート変更時の自動更新
- `whileElementsMounted`: 要素がマウントされている間の継続的な位置更新

### ポータル描画

`FloatingPortal`を使用してPopoverコンテンツをDOM階層の外部に描画します。これにより、親要素の`overflow: hidden`やz-indexの影響を受けずに表示できます。

**メリット**

- 親要素の`overflow`設定の影響を回避
- z-indexの階層構造から独立
- スクロール可能な領域内でも適切に表示

### フォーカス管理

Popoverの開閉時に適切なフォーカス管理を実装しています。

**開く時のフォーカス**

```typescript
useEffect(() => {
  if (isOpen) {
    const element = floating.refs.floating.current as HTMLElement | null;
    element?.focus?.({ preventScroll: true });
  }
}, [isOpen, floating.refs.floating]);
```

**閉じる時のフォーカス**

```typescript
useEffect(() => {
  if (!isOpen) {
    triggerRef.current?.focus({ preventScroll: true });
  }
}, [isOpen, triggerRef]);
```

### 外部クリック検知とEscapeキー対応

Popoverの外側をクリックした時やEscapeキーが押された時に`onClose`コールバックを呼び出します。

**実装の特徴**

- **外部クリック検知**: `pointerdown`イベントをリスンし、Floating要素とトリガー要素の両方の外側をクリックした時のみ発火
- **Escapeキー対応**: `event.stopPropagation()`でイベントの伝播を停止
- **reasonパラメータ**: 閉じる理由を`'outside-click'`または`'escape-key-down'`で区別

```typescript
// 外部クリック検知
const isOutsideFloating = !(floatingEl.contains(target) as boolean);
const isOutsideReference = !(referenceEl.contains(target) as boolean);

if (isOutsideFloating === true && isOutsideReference === true) {
  onClose('outside-click');
}

// Escapeキー対応
const onKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
    onClose('escape-key-down');
  }
};
```

## アクセシビリティ

- **ARIA属性の自動付与**
  - `aria-haspopup="dialog"`: トリガー要素にポップアップがあることを示す
  - `aria-expanded`: Popoverの開閉状態を示す
  - `aria-controls`: トリガーが制御するPopoverのIDを示す
  - `role="dialog"`: Popoverコンテンツがダイアログであることを示す
- **フォーカス管理**
  - Popover表示時にコンテンツへ自動フォーカス
  - Popover非表示時にトリガー要素へ自動フォーカス復帰
  - `preventScroll: true`でスクロール位置を維持
- **キーボード操作**
  - Escapeキーでポップアップを閉じる
  - `tabIndex={-1}`でコンテンツwrapperをフォーカス可能に設定
- **外部クリック検知**: マウス操作でのアクセシビリティをサポート
- **forwardRef対応**: トリガーとコンテンツの両方でref転送をサポート

## 注意事項

1. **単一のReact要素を必須とする子要素**
   - `Popover.Trigger`の`children`は単一のReact要素（`React.ReactElement`）である必要があります
   - 複数の要素やテキストノードは使用できません

2. **開閉状態の制御**
   - `isOpen`は必須プロパティであり、開閉状態は親コンポーネントで管理する必要があります
   - `onClose`を適切に設定して状態を更新してください
   - `onClose`の`reason`パラメータを使用して、閉じる理由に応じた処理を実装できます

3. **PopoverContextの使用範囲**
   - `Popover.Trigger`と`Popover.Content`は`Popover`コンポーネント内でのみ使用できます
   - コンテキスト外で使用するとエラーがスローされます

4. **Popupコンポーネントとの統合**
   - PopupコンポーネントはPopoverContext内で使用する場合、自動的にコンテキストを参照します
   - Popupの`onClose`でPopoverの`isOpen`状態を更新することを推奨します

5. **ポータル描画の影響**
   - `FloatingPortal`によりDOM階層が親要素から分離されるため、CSS継承が期待通りに動作しない場合があります
   - 必要なスタイルはPopoverコンテンツに直接適用してください

6. **アイコンの使用**
   - アイコンを使用する場合は、`@zenkigen-inc/component-icons`の`Icon`コンポーネントのみを使用してください

## スタイルのカスタマイズ

Popoverコンポーネント自体は最小限のスタイルのみを適用し、コンテンツのスタイリングは利用者に委ねられています。

**基本スタイル**

- `position: fixed` - 固定配置
- `outline: '0'` - フォーカス時のアウトライン無効化

**カスタマイズの推奨方法**

1. `Popover.Content`の`children`としてスタイル付き要素を渡す
2. Tailwind CSSのユーティリティクラスを使用してスタイリング
3. `@zenkigen-inc/component-config`で定義されたデザイントークンを活用
4. `Popup`コンポーネントと組み合わせて統一感のあるUIを実現

## 更新履歴

| 日付                 | 内容                                              | 担当者 |
| -------------------- | ------------------------------------------------- | ------ |
| 2025-10-22 16:30 JST | API統合: onOutsideClick/onEscapeKeyDown → onClose | -      |
| 2025-10-17 15:00 JST | 新規作成                                          | -      |
