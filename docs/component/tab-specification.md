# Tab コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [Tab（メインコンポーネント）のProps](#tabメインコンポーネントのprops)
   - [Tab.Item（サブコンポーネント）のProps](#tabitemサブコンポーネントのprops)
5. [状態とスタイル](#状態とスタイル)
   - [レイアウトバリエーション](#レイアウトバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
6. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [自動レイアウト](#自動レイアウト)
   - [等幅レイアウト](#等幅レイアウト)
   - [無効状態](#無効状態)
   - [状態管理の実装例](#状態管理の実装例)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [状態管理パターン](#状態管理パターン)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

## 概要

Tabコンポーネントは、複数のコンテンツ間を切り替えるためのタブインターフェースを提供するUIコンポーネントです。WAI-ARIA準拠のアクセシビリティサポートと、柔軟なレイアウト制御機能を提供します。

## インポート

```typescript
import { Tab } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { Tab } from '@zenkigen-inc/component-ui';

const MyTabComponent = () => {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <Tab layout="auto">
      <Tab.Item
        id="tab1"
        isSelected={selectedTab === 'tab1'}
        onClick={(id) => setSelectedTab(id)}
      >
        タブ1
      </Tab.Item>
      <Tab.Item
        id="tab2"
        isSelected={selectedTab === 'tab2'}
        onClick={(id) => setSelectedTab(id)}
      >
        タブ2
      </Tab.Item>
      <Tab.Item
        id="tab3"
        isSelected={selectedTab === 'tab3'}
        onClick={(id) => setSelectedTab(id)}
      >
        タブ3
      </Tab.Item>
    </Tab>
  );
};
```

## Props

### Tab（メインコンポーネント）のProps

#### オプションプロパティ

| プロパティ | 型                  | デフォルト値 | 説明                                 |
| ---------- | ------------------- | ------------ | ------------------------------------ |
| `layout`   | `'auto' \| 'equal'` | `'auto'`     | タブアイテムのレイアウトタイプ       |
| `children` | `ReactNode`         | -            | Tab.Itemコンポーネントのコレクション |

### Tab.Item（サブコンポーネント）のProps

#### 必須プロパティ

| プロパティ | 型                     | 説明                             |
| ---------- | ---------------------- | -------------------------------- |
| `id`       | `string`               | タブアイテムの一意識別子         |
| `onClick`  | `(id: string) => void` | タブクリック時のコールバック関数 |

#### オプションプロパティ

| プロパティ   | 型          | デフォルト値 | 説明                       |
| ------------ | ----------- | ------------ | -------------------------- |
| `isSelected` | `boolean`   | `false`      | タブが選択状態かどうか     |
| `isDisabled` | `boolean`   | `false`      | タブが無効状態かどうか     |
| `children`   | `ReactNode` | -            | タブ内に表示するコンテンツ |

## 状態とスタイル

### レイアウトバリエーション

#### auto（デフォルト）

- CSS Flexboxを使用したレイアウト
- 各タブはコンテンツの幅に応じて自動調整
- タブ間には`gap-4`のスペースを設定
- 適用クラス: `flex gap-4`

#### equal

- CSS Gridを使用したレイアウト
- すべてのタブが等幅で表示
- タブの数に応じて動的にグリッド列を生成
- タブ間には`gap-4`のスペースを設定
- 適用クラス: `grid gap-4`
- 動的スタイル: `gridTemplateColumns: repeat(${childrenCount}, minmax(0,1fr))`

### 状態に応じたスタイル

#### 通常状態（非選択）

- タイポグラフィ: `typography-label14regular`
- テキストカラー: `text-interactive02`
- ホバー時: `hover:text-text01`
- ホバー時ボーダー: `hover:before:bg-uiBorder04`
- ボトムボーダー: `before:h-px` (透明)

#### 選択状態（`isSelected: true`）

- タイポグラフィ: `typography-label14bold`
- ポインターイベント無効: `pointer-events-none`
- アクティブボーダー: `before:bg-interactive01`
- ホバー時もアクティブボーダー維持: `hover:before:bg-interactive01`

#### 無効状態（`isDisabled: true`）

- ポインターイベント無効: `disabled:pointer-events-none`
- テキストカラー: `disabled:text-disabled01`
- `disabled`属性が設定される

#### コンテナスタイル

- 背景ボーダー: `before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-uiBorder01`
- パディング: `px-6`
- ポジション: `relative`

## 使用例

### 基本的な使用例

```typescript
import { useState } from 'react';
import { Tab } from '@zenkigen-inc/component-ui';

const BasicTabExample = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div>
      <Tab>
        <Tab.Item
          id="overview"
          isSelected={selectedTab === 'overview'}
          onClick={(id) => setSelectedTab(id)}
        >
          概要
        </Tab.Item>
        <Tab.Item
          id="details"
          isSelected={selectedTab === 'details'}
          onClick={(id) => setSelectedTab(id)}
        >
          詳細
        </Tab.Item>
        <Tab.Item
          id="settings"
          isSelected={selectedTab === 'settings'}
          onClick={(id) => setSelectedTab(id)}
        >
          設定
        </Tab.Item>
      </Tab>

      <div className="mt-4">
        {selectedTab === 'overview' && <div>概要コンテンツ</div>}
        {selectedTab === 'details' && <div>詳細コンテンツ</div>}
        {selectedTab === 'settings' && <div>設定コンテンツ</div>}
      </div>
    </div>
  );
};
```

### 自動レイアウト

```typescript
<Tab layout="auto">
  <Tab.Item id="short" isSelected={selectedTab === 'short'} onClick={setSelectedTab}>
    短い
  </Tab.Item>
  <Tab.Item id="medium" isSelected={selectedTab === 'medium'} onClick={setSelectedTab}>
    中程度のタブ
  </Tab.Item>
  <Tab.Item id="long" isSelected={selectedTab === 'long'} onClick={setSelectedTab}>
    とても長いタブのテキスト
  </Tab.Item>
</Tab>
```

### 等幅レイアウト

```typescript
<Tab layout="equal">
  <Tab.Item id="tab1" isSelected={selectedTab === 'tab1'} onClick={setSelectedTab}>
    短い
  </Tab.Item>
  <Tab.Item id="tab2" isSelected={selectedTab === 'tab2'} onClick={setSelectedTab}>
    中程度のタブ
  </Tab.Item>
  <Tab.Item id="tab3" isSelected={selectedTab === 'tab3'} onClick={setSelectedTab}>
    とても長いタブのテキスト
  </Tab.Item>
</Tab>
```

### 無効状態

```typescript
<Tab>
  <Tab.Item
    id="active"
    isSelected={selectedTab === 'active'}
    onClick={setSelectedTab}
  >
    アクティブタブ
  </Tab.Item>
  <Tab.Item
    id="disabled"
    isSelected={selectedTab === 'disabled'}
    onClick={setSelectedTab}
    isDisabled={true}
  >
    無効なタブ
  </Tab.Item>
</Tab>
```

### 状態管理の実装例

```typescript
import { useState } from 'react';
import { Tab } from '@zenkigen-inc/component-ui';

type TabId = 'dashboard' | 'analytics' | 'reports' | 'settings';

const TabWithStateManagement = () => {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [disabledTabs, setDisabledTabs] = useState<Set<TabId>>(new Set(['settings']));

  const handleTabClick = (tabId: string) => {
    if (!disabledTabs.has(tabId as TabId)) {
      setActiveTab(tabId as TabId);
    }
  };

  const toggleTabDisabled = (tabId: TabId) => {
    const newDisabledTabs = new Set(disabledTabs);
    if (newDisabledTabs.has(tabId)) {
      newDisabledTabs.delete(tabId);
    } else {
      newDisabledTabs.add(tabId);
      if (activeTab === tabId) {
        // 無効化されたタブがアクティブの場合、別のタブに切り替え
        setActiveTab('dashboard');
      }
    }
    setDisabledTabs(newDisabledTabs);
  };

  return (
    <div>
      <Tab layout="equal">
        <Tab.Item
          id="dashboard"
          isSelected={activeTab === 'dashboard'}
          onClick={handleTabClick}
          isDisabled={disabledTabs.has('dashboard')}
        >
          ダッシュボード
        </Tab.Item>
        <Tab.Item
          id="analytics"
          isSelected={activeTab === 'analytics'}
          onClick={handleTabClick}
          isDisabled={disabledTabs.has('analytics')}
        >
          分析
        </Tab.Item>
        <Tab.Item
          id="reports"
          isSelected={activeTab === 'reports'}
          onClick={handleTabClick}
          isDisabled={disabledTabs.has('reports')}
        >
          レポート
        </Tab.Item>
        <Tab.Item
          id="settings"
          isSelected={activeTab === 'settings'}
          onClick={handleTabClick}
          isDisabled={disabledTabs.has('settings')}
        >
          設定
        </Tab.Item>
      </Tab>

      {/* タブコンテンツエリア */}
      <div className="mt-6 p-4 bg-gray-50 rounded">
        {activeTab === 'dashboard' && <div>ダッシュボードコンテンツ</div>}
        {activeTab === 'analytics' && <div>分析コンテンツ</div>}
        {activeTab === 'reports' && <div>レポートコンテンツ</div>}
        {activeTab === 'settings' && <div>設定コンテンツ</div>}
      </div>
    </div>
  );
};
```

## アクセシビリティ

- WAI-ARIA Tabsパターンに準拠
- タブリストに`role="tablist"`を設定
- 各タブアイテムに`role="tab"`を設定
- 選択状態を`aria-selected`属性で表現
- `button`要素を使用してキーボードナビゲーションをサポート
- `disabled`属性による適切な無効状態の表現
- フォーカス管理が適切に実装されている

## 技術的な詳細

### 実装について

- `Tab`メインコンポーネントは`Children.count`を使用して子要素数を取得し、等幅レイアウト時のグリッド設定を動的に生成
- `Tab.Item`はstaticプロパティとして`Tab`コンポーネントに追加される複合コンポーネントパターン
- `clsx`を使用した条件付きクラス名の動的生成
- CSS Grid（equal）とFlexbox（auto）を使い分けたレスポンシブレイアウト

### 状態管理パターン

タブコンポーネントは制御コンポーネント（Controlled Component）として設計されており、状態管理は親コンポーネントで行う必要があります：

```typescript
// ✅ 推奨: 親コンポーネントで状態管理
const [selectedTab, setSelectedTab] = useState('tab1');

// ✅ 推奨: 明示的な選択状態の制御
<Tab.Item
  id="tab1"
  isSelected={selectedTab === 'tab1'}
  onClick={(id) => setSelectedTab(id)}
>
```

## 注意事項

1. **状態管理必須**: タブの選択状態は親コンポーネントで管理する必要があります
2. **一意なID**: 各`Tab.Item`には一意の`id`を設定する必要があります
3. **選択状態の同期**: `isSelected`プロパティと実際の選択状態を適切に同期させる必要があります
4. **無効タブの扱い**: 無効なタブがアクティブ状態の場合、別のタブに切り替える処理を実装することを推奨します
5. **レイアウトの選択**: コンテンツ幅が大きく異なる場合は`layout="auto"`、統一感が必要な場合は`layout="equal"`を選択してください

## スタイルのカスタマイズ

Tabコンポーネントのスタイルは`@zenkigen-inc/component-theme`のTailwind CSS設定に基づいています。カスタマイズする場合は、テーマ設定を変更することで一括でスタイルを調整できます。

主要なカスタマイズ可能要素：

- `uiBorder01` - タブリストの下部ボーダー色
- `uiBorder04` - ホバー時のタブボーダー色
- `interactive01` - 選択状態のアクティブボーダー色
- `interactive02` - 非選択状態のテキスト色
- `text01` - ホバー時のテキスト色
- `disabled01` - 無効状態のテキスト色
- タイポグラフィトークン: `typography-label14regular`, `typography-label14bold`

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-09-09 | 新規作成 | -      |
