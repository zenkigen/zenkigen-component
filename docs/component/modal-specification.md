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
   - [フォーカス管理](#フォーカス管理)
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
- 内容が `aria-labelledby` を通じてダイアログのアクセシブルネームになる
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

### フォーカス管理

- `@floating-ui/react` の `FloatingFocusManager` を使用する
- 位置計算は行わないため、`useFloating` は `open` のみを渡し `refs.setFloating` / `context` だけを利用する
- `role="dialog"` はダイアログ本体の `tabindex` 自動付与の前提条件になっているため、変更しないこと
- `initialFocus` にダイアログ本体を指定する（既定の先頭の tabbable = 閉じるボタンにフォーカスリングが出るのを避け、支援技術にダイアログとして認識させるため）。本体は `outline-none` でフォーカスリングを出さない
- `outsideElementsInert` を有効にして背面を `inert` にする（`aria-hidden` はタブ順から要素を外さないため、フォーカスがモーダル外に出た瞬間に背面へ抜けられてしまう）
- `getInsideElements` で以下を `inert` の対象から除外する
  - `[data-floating-ui-portal]` — Popover / DatePicker / Combobox はモーダルより先にポータルの器を作るため
  - ライブラリ内部で除外指定した要素（Toast のコンテナ）— Toast はモーダルより前面に出る設計で、表示中も操作・読み上げ可能に保つため

## アクセシビリティ

- `role="dialog"` / `aria-modal="true"` によるダイアログのセマンティクス
- フォーカストラップ（`@floating-ui/react` の `FloatingFocusManager`）
  - 開いたときにダイアログ本体（`role="dialog"`）へフォーカスを移す。Tab で Modal 内の先頭のフォーカス可能要素へ進む
  - Tab / Shift+Tab は Modal 内でループし、背面へ抜けない
  - 閉じたときに、開く直前にフォーカスがあった要素へ戻す
  - 表示中は背面の要素を `inert` にし、キーボード操作・ポインタ操作・支援技術のいずれからも到達できないようにする（`inert` 非対応ブラウザでは `aria-hidden` にフォールバックする）
- `Modal.Header` の内容を `aria-labelledby` でダイアログのアクセシブルネームにする（`Modal.Header` がある場合）
- 閉じるボタンの適切なラベリング

### 意図的に対応していないこと

- **Escape キーによる閉じる操作**
- **背景クリックによる閉じる操作**

閉じる操作は `Modal.Header` の閉じるボタン（`onClose`）と、利用側が明示的に実装した操作に限定する。既存の利用側にはこれらの挙動を意図的に持たせていない画面があるため、デフォルトでは有効にしない。

## 注意事項

1. **サイズ制限**: 幅は最小320px、高さは最小184pxに制限される（数値指定時）
2. **マウント状態**: `isMounted`フラグによりSSR環境での動作を保証
3. **Portal要素**: ターゲット要素が存在しない場合は`document.body`にフォールバック
4. **スクロール制御**: モーダル表示中は背景のスクロールが自動的に無効化される
5. **z-index**: オーバーレイには `z-overlay`（1000）、モーダル本体には `z-modal`（1100）クラスを使用
6. **背面要素の `inert`**: モーダル表示中、表示開始時点で `document.body` 直下にあった要素は `inert` になり、クリックもキーボード操作も支援技術からの読み上げもできなくなる。除外されるのは floating-ui のポータル器と、ライブラリ内部で除外指定した要素（Toast のコンテナ）のみ。
7. **モーダル内で使うポップアップ**: 本ライブラリのコンポーネント（Popover / DatePicker / Combobox / Select / Dropdown）はモーダル内で問題なく動作する。自前実装のポップアップをモーダルの DOM 配下ではない場所へポータル描画する場合、ポータル先がモーダル表示前から存在していると `inert` になり操作できなくなる（この判定はモーダルを開いた瞬間に一度だけ行われる）。自前のポップアップはモーダルの DOM 配下に描画するか、開いたときにポータル先を生成すること。`Dropdown` の `portalTargetRef` はモーダルの DOM 配下を指すのが推奨。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config`で定義されたデザイントークンに依存しています。カスタマイズする場合は、これらの設定を参照してください。

特にカスタマイズ可能な要素：

- `shadow-modalShadow` - モーダルのドロップシャドウ
- `bg-backgroundOverlayBlack` - オーバーレイの背景色
- `bg-uiBackground01` - モーダル本体の背景色
- `border-uiBorder01` - ヘッダー・フッターのボーダー色
- `typography-h5` - ヘッダーのタイポグラフィ

## 更新履歴

| 日付       | 内容                                                                                                                                                   | 担当者 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| 2025-09-10 | 新規作成                                                                                                                                               | -      |
| 2026-09-14 | フォーカストラップの実装に合わせてアクセシビリティ節を修正（未実装だった Esc / 背景クリックの記載を削除、初期フォーカス先と `aria-labelledby` を追記） | -      |
