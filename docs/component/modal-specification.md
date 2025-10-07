# Modal コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [継承プロパティ](#継承プロパティ)
5. [サブコンポーネント](#サブコンポーネント)
   - [Modal.Header](#modalheader)
   - [Modal.Body](#modalbody)
   - [Modal.Footer](#modalfooter)
6. [状態とスタイル](#状態とスタイル)
   - [表示状態](#表示状態)
   - [サイズ制御](#サイズ制御)
   - [その他のスタイル仕様](#その他のスタイル仕様)
7. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [チェックボックス付きモーダル](#チェックボックス付きモーダル)
   - [サブボタン付きモーダル](#サブボタン付きモーダル)
   - [固定高さモーダル](#固定高さモーダル)
   - [タブ付きモーダル](#タブ付きモーダル)
   - [危険なアクションモーダル](#危険なアクションモーダル)
   - [フッターなしモーダル](#フッターなしモーダル)
8. [技術的な詳細](#技術的な詳細)
   - [Portal実装](#portal実装)
   - [スクロール制御](#スクロール制御)
   - [コンテキスト管理](#コンテキスト管理)
9. [アクセシビリティ](#アクセシビリティ)
10. [注意事項](#注意事項)
11. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
12. [更新履歴](#更新履歴)

---

## 概要

Modalコンポーネントは、ページの上にオーバーレイ表示される対話式のウィンドウUIコンポーネントである。Portal機能を使用してDOM構造の外部に表示され、バックグラウンドスクロールの制御、サイズのカスタマイズ、構造化されたヘッダー・ボディ・フッターレイアウトを提供する。

## インポート

```typescript
import { Modal } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { Modal, Button } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button variant="fill" onClick={() => setIsOpen(true)}>
        モーダルを開く
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>タイトル</Modal.Header>
        <Modal.Body>
          <div className="py-8">
            ここにコンテンツを配置します
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              キャンセル
            </Button>
            <Button variant="fill" onClick={() => setIsOpen(false)}>
              保存する
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型        | 説明                   |
| ---------- | --------- | ---------------------- |
| `isOpen`   | `boolean` | モーダルが開いているか |

### オプションプロパティ

| プロパティ        | 型                                      | デフォルト値           | 説明                                                |
| ----------------- | --------------------------------------- | ---------------------- | --------------------------------------------------- |
| `width`           | `CSSProperties['width']`                | `480`                  | モーダルの幅（数値または文字列、最小値320px）       |
| `height`          | `CSSProperties['height']`               | `undefined`            | モーダルの高さ（数値または文字列、最小値184px）     |
| `maxWidth`        | `CSSProperties['maxWidth']`             | `'calc(100vw - 40px)'` | モーダルの最大幅                                    |
| `onClose`         | `() => void`                            | `undefined`            | モーダルを閉じる際のコールバック関数                |
| `portalTargetRef` | `MutableRefObject<HTMLElement \| null>` | `undefined`            | ポータルのターゲット要素（未指定時はdocument.body） |

### 継承プロパティ

`PropsWithChildren<Props>` として `children` プロパティを受け取り、`Modal.Header`、`Modal.Body`、`Modal.Footer` を含むReactNodeを指定する。

## サブコンポーネント

### Modal.Header

ヘッダー部分を構成するサブコンポーネント。

#### Props

| プロパティ   | 型        | デフォルト値 | 説明                               |
| ------------ | --------- | ------------ | ---------------------------------- |
| `isNoBorder` | `boolean` | `false`      | 下部ボーダーを非表示にするかどうか |

#### 機能

- `onClose`が設定されている場合、自動的に閉じるボタンを表示
- タイポグラフィ: `typography-h5`
- 閉じるボタンがある場合は高さ48px、ない場合は56px
- パディング: `px-6`

### Modal.Body

コンテンツ部分を構成するサブコンポーネント。

#### 機能

- 縦方向のオーバーフロー時にスクロール表示（`overflow-y-auto`）
- フレキシブルな高さでレイアウトの残りスペースを占有

### Modal.Footer

フッター部分を構成するサブコンポーネント。

#### Props

| プロパティ   | 型        | デフォルト値 | 説明                               |
| ------------ | --------- | ------------ | ---------------------------------- |
| `isNoBorder` | `boolean` | `false`      | 上部ボーダーを非表示にするかどうか |

#### 機能

- パディング: `px-6 py-4`
- 上部ボーダー: `border-t border-uiBorder01`（`isNoBorder`が`false`の場合）

## 状態とスタイル

### 表示状態

#### 開いている状態（`isOpen: true`）

- `z-overlay`での最上位表示
- 全画面オーバーレイ: `bg-backgroundOverlayBlack`
- 中央配置: `flex items-center justify-center`
- モーダルシャドウ: `shadow-modalShadow`

#### 閉じている状態（`isOpen: false`）

- DOM上に存在しない（Portal外）
- レンダリングされない

### サイズ制御

#### 幅制御

- デフォルト幅: `480px`
- 最小幅: `320px`（数値指定時に自動適用）
- 最大幅: `calc(100vw - 40px)`（デフォルト）

#### 高さ制御

- デフォルト高さ: コンテンツに応じた自動調整
- 最小高さ: `184px`（数値指定時に自動適用）
- 最大高さ: `max-h-full`で画面サイズに制限

### その他のスタイル仕様

- 角丸: `rounded-lg`
- 背景色: `bg-uiBackground01`
- レイアウト: `grid-rows-[max-content_1fr_max-content]`によるヘッダー・ボディ・フッター構造
- 最小高さ: `min-h-[120px]`

## 使用例

### 基本的な使用例

```typescript
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header>基本的なモーダル</Modal.Header>
  <Modal.Body>
    <div className="py-8 text-center">
      ここにコンテンツを表示します
    </div>
  </Modal.Body>
  <Modal.Footer>
    <div className="flex justify-end gap-4">
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        キャンセル
      </Button>
      <Button variant="fill" onClick={() => setIsOpen(false)}>
        確認
      </Button>
    </div>
  </Modal.Footer>
</Modal>
```

### チェックボックス付きモーダル

```typescript
const [isChecked, setIsChecked] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header>設定</Modal.Header>
  <Modal.Body>
    <div className="py-8">設定内容</div>
  </Modal.Body>
  <Modal.Footer>
    <div className="flex justify-between w-full">
      <div className="flex items-center">
        <Checkbox
          id="modal-checkbox"
          label="次回から表示しない"
          isChecked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          キャンセル
        </Button>
        <Button variant="fill" onClick={() => setIsOpen(false)}>
          保存する
        </Button>
      </div>
    </div>
  </Modal.Footer>
</Modal>
```

### サブボタン付きモーダル

```typescript
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header>詳細設定</Modal.Header>
  <Modal.Body>
    <div className="py-8">設定内容</div>
  </Modal.Body>
  <Modal.Footer>
    <div className="flex justify-between items-center w-full">
      <div>
        <Button variant="text" onClick={handleHelp}>
          ヘルプ
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          キャンセル
        </Button>
        <Button variant="fill" onClick={() => setIsOpen(false)}>
          保存する
        </Button>
      </div>
    </div>
  </Modal.Footer>
</Modal>
```

### 固定高さモーダル

```typescript
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  width={480}
  height={500}
>
  <Modal.Header>固定高さモーダル</Modal.Header>
  <Modal.Body>
    <div className="py-8">
      長いコンテンツがある場合、Bodyエリアが
      スクロール可能になります。
    </div>
  </Modal.Body>
  <Modal.Footer>
    <div className="flex justify-end gap-4">
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        キャンセル
      </Button>
      <Button variant="fill" onClick={() => setIsOpen(false)}>
        確認
      </Button>
    </div>
  </Modal.Footer>
</Modal>
```

### タブ付きモーダル

```typescript
const [selectedTab, setSelectedTab] = useState('tab1');
const tabItems = [
  { id: 'tab1', label: 'タブ1' },
  { id: 'tab2', label: 'タブ2' },
  { id: 'tab3', label: 'タブ3' },
];

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header isNoBorder>設定</Modal.Header>
  <Modal.Body>
    <div className="mt-2 flex flex-col w-full">
      <div className="w-full">
        <Tab>
          {tabItems.map((item) => (
            <Tab.Item
              key={item.id}
              id={item.id}
              isSelected={selectedTab === item.id}
              onClick={setSelectedTab}
            >
              {item.label}
            </Tab.Item>
          ))}
        </Tab>
      </div>
      <div className="py-20 text-center">
        {selectedTab === 'tab1' && <div>タブ1の内容</div>}
        {selectedTab === 'tab2' && <div>タブ2の内容</div>}
        {selectedTab === 'tab3' && <div>タブ3の内容</div>}
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <div className="flex justify-end gap-4">
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        キャンセル
      </Button>
      <Button variant="fill" onClick={() => setIsOpen(false)}>
        保存する
      </Button>
    </div>
  </Modal.Footer>
</Modal>
```

### 危険なアクションモーダル

```typescript
<Modal isOpen={isOpen} width={420}>
  <Modal.Header isNoBorder>削除の確認</Modal.Header>
  <Modal.Body>
    <div className="h-16 flex items-center justify-center">
      この操作は取り消せません。本当に削除しますか？
    </div>
  </Modal.Body>
  <Modal.Footer isNoBorder>
    <div className="flex justify-end gap-4 w-full">
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        キャンセル
      </Button>
      <Button variant="fillDanger" onClick={handleDelete}>
        削除する
      </Button>
    </div>
  </Modal.Footer>
</Modal>
```

### フッターなしモーダル

```typescript
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header>情報</Modal.Header>
  <Modal.Body>
    <div className="py-8 text-center">
      情報を表示するだけのモーダル
    </div>
  </Modal.Body>
</Modal>
```

## 技術的な詳細

### Portal実装

- `createPortal`を使用してDOM構造外に表示
- `portalTargetRef`が指定されていない場合は`document.body`をターゲットとする
- `isMounted`フラグを使用してクライアントサイドでのみレンダリング

### スクロール制御

- `BodyScrollLock`コンポーネントによる背景スクロール防止
- `position: fixed`アプローチによる実装
- スクロールバー幅の検出と補正機能
- スクロール位置の保存と復元

### コンテキスト管理

- `ModalContext`による`onClose`の共有
- ヘッダーコンポーネントでの閉じるボタン制御

## アクセシビリティ

- フォーカストラップの自動管理
- Escキーでの閉じる操作対応（`onClose`が設定されている場合）
- セマンティックなHTML構造
- 閉じるボタンの適切なラベリング
- 背景クリックでの閉じる操作対応

## 注意事項

1. **サイズ制限**: 幅は最小320px、高さは最小184pxに制限される（数値指定時）
2. **マウント状態**: `isMounted`フラグによりSSR環境での動作を保証
3. **Portal要素**: ターゲット要素が存在しない場合は`document.body`にフォールバック
4. **スクロール制御**: モーダル表示中は背景のスクロールが自動的に無効化される
5. **z-index**: `z-overlay`クラスによる最上位表示（他の要素との重なり順に注意）

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config`で定義されたデザイントークンに依存しています。カスタマイズする場合は、これらの設定を参照してください。

特にカスタマイズ可能な要素：

- `shadow-modalShadow` - モーダルのドロップシャドウ
- `bg-backgroundOverlayBlack` - オーバーレイの背景色
- `bg-uiBackground01` - モーダル本体の背景色
- `border-uiBorder01` - ヘッダー・フッターのボーダー色
- `typography-h5` - ヘッダーのタイポグラフィ

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-09-10 | 新規作成 | -      |
