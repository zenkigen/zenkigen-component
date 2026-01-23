# テスト実装ガイドライン

Zenkigen Component のテスト戦略と実装ルールをまとめます。

## 目次

- [1. ユニットテスト](#1-ユニットテスト)
- [2. VRT](#2-vrt)
- [3. 参考リンク](#3-参考リンク)

---

## テスト戦略の全体像

本プロジェクトでは、2 種類のテストを組み合わせて品質を担保します。

```
┌─────────────────────────────────────────────────────────────┐
│                        VRT                                  │
│                   (Chromatic + Storybook)                   │
│               見た目の意図しない変更を検出                    │
├─────────────────────────────────────────────────────────────┤
│                    ユニットテスト                            │
│                   (Vitest + RTL)                            │
│          個別コンポーネントの振る舞い・ロジック検証            │
└─────────────────────────────────────────────────────────────┘
```

| 種別           | 目的                   | ツール                         | 実行タイミング |
| -------------- | ---------------------- | ------------------------------ | -------------- |
| ユニットテスト | 振る舞い・ロジック検証 | Vitest + React Testing Library | ローカル / CI  |
| VRT            | 見た目の変更検出       | Chromatic + Storybook          | PR / main push |

---

## 1. ユニットテスト

### 1.1 基本情報

- **テストランナー**: Vitest
- **ライブラリ**: React Testing Library (RTL)
- **言語**: 日本語
- **配置**: 各コンポーネント直下に `*.test.tsx`

### 1.2 コマンド

```bash
# watch モードで実行（開発時）
yarn test

# CI 用（1 回実行）
yarn test:ci
```

### 1.3 設定ファイル

```
packages/component-ui/
├── vitest.config.ts   # Vitest 設定
└── vitest.setup.ts    # セットアップ（jest-dom 読み込み）
```

### 1.4 基本ルール

#### ファイル構成

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基本レンダリング', () => {
    it('プレースホルダーが表示されること', () => {
      // ...
    });
  });

  describe('イベント', () => {
    it('クリック時に onClick が呼ばれること', async () => {
      // ...
    });
  });
});
```

#### 命名規則

- ルート `describe` にコンポーネント名
- 機能単位で `describe` を分ける（基本レンダリング / イベント / 状態 / アクセシビリティ など）
- `it` は振る舞いを端的に日本語で書く
  - 良い例: `'クリック時に onClick が呼ばれること'`
  - 良い例: `'isDisabled=true の場合、クリックできないこと'`

### 1.5 観点チェックリスト

テストを書く前に、該当する観点をカバーしているか確認します。

| 観点                   | 確認内容                                                |
| ---------------------- | ------------------------------------------------------- |
| レンダリング           | プレースホルダー、初期表示テキストが出るか              |
| プロパティ反映         | サイズ・バリアント・幅などのスタイルが反映されるか      |
| イベント               | `onClick`/`onChange` などコールバックが正しく呼ばれるか |
| 状態                   | 無効/エラー/選択/読み取り専用などの状態が反映されるか   |
| キーボード・フォーカス | Tab 移動、Enter/Space/Escape の動作                     |
| アクセシビリティ       | `role`・`aria-*`・`type` 属性の設定                     |
| レイアウト・幅         | `width`/`maxWidth` などのスタイル適用                   |
| アイコン/補助 UI       | アイコンの切り替え、チェックマーク表示                  |
| 非同期・外部クリック   | 開閉・外側クリック・アンマウント時の挙動                |
| エッジケース           | コールバック未指定時の安全性、ID 衝突がないか           |

### 1.6 スナップショットテスト

**原則使用しない。** 振る舞い・ロール・ARIA・スタイルクラスを個別に検証します。

---

## 2. VRT

### 2.1 概要

Visual Regression Testing (VRT) は、UI の見た目が意図せず変更されていないかを検出します。

- **ツール**: Chromatic (Storybook ベース)
- **実行タイミング**: PR 作成時、main ブランチへの push 時
- **レビュー**: Chromatic ダッシュボードで差分を確認・承認

### 2.2 CI ワークフロー

`.github/workflows/chromatic.yaml` で設定済み:

- PR 作成/更新時に自動実行
- `renovate` / `dependencies` ラベル付き PR はスキップ
- 結果は PR コメントに自動投稿

### 2.3 VRT 対象の Stories 設計方針

| Story 名                | 目的                           |
| ----------------------- | ------------------------------ |
| `Default` / `Component` | 基本状態                       |
| `SizeVariants`          | サイズバリエーション一覧       |
| `Disabled`              | 無効状態                       |
| `Error`                 | エラー状態                     |
| `Open`                  | 開いた状態（Popover/Modal 等） |
| `LayoutExamples`        | 幅・配置バリエーション         |

---

## 3. 参考リンク

- [Vitest 公式ドキュメント](https://vitest.dev/)
- [React Testing Library 公式](https://testing-library.com/docs/react-testing-library/intro/)
- [Chromatic ドキュメント](https://www.chromatic.com/docs/)
