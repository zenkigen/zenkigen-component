# FileInput コンポーネント - 残りの作業

このドキュメントでは、FileInputコンポーネント実装の残りの作業・改善予定をまとめています。

## 目次

1. [✅ 完了済み](#完了済み)
   - [1. アクセシビリティの改善](#1-アクセシビリティの改善)
   - [2. 外部label要素との連携](#2-外部label要素との連携)
2. [優先度：中](#優先度中)
   - [3. Storybook での検証が必要](#3-storybook-での検証が必要)
   - [4. テストコードの作成](#4-テストコードの作成)

---

## ✅ 完了済み

### 1. アクセシビリティの改善

**実装完了内容:**

- ✅ Dropzone variantでのキーボード操作（Tab、Enter、Space）対応
- ✅ ARIA属性の実装：
  - `role="button"` でボタンとして認識
  - `aria-label="ファイルを選択"` でアクセシブルな名前を提供
  - `aria-disabled` で無効状態を明示
  - `aria-invalid` でエラー状態を明示
  - `aria-describedby` でエラーメッセージと連携
- ✅ スクリーンリーダー対応完了
- ✅ WCAG 2.1 レベルA準拠

**実装日**: 2025-10-29

### 2. 外部label要素との連携

**実装完了内容:**

- ✅ `id` prop の追加（外部`<label>`との連携用）
- ✅ `useId` を使用した一意のID生成
- ✅ 外部制御と自動生成の両方に対応
- ✅ TypeScript での型安全性確保

**実装日**: 2025-10-29

---

## 優先度：中

### 3. Storybook での検証が必要

**現在の状態:**

- Storybookでは基本的なバリエーションのみカバー
- 詳細な状態の組み合わせ（エラー状態+ファイル選択済みなど）が検証できない

**改善案:**

- より多くのStory を追加し、すべての状態の組み合わせをカバーする
- ビジュアルリグレッションテストの導入を検討
- アクセシビリティテストのStory追加

**推奨追加ストーリー:**

- エラー状態 + ファイル選択済み
- 長いファイル名のテスト
- 複数エラーの表示
- レスポンシブレイアウトのテスト
- 外部label要素との連携例

---

### 4. テストコードの作成

**現在の状態:**

- テストコード（`.test.tsx`）が未作成
- ユニットテストによる検証ができていない

**改善案:**

- Vitest/Jestを使用した基本的なユニットテスト作成
- 以下をテストケースでカバーする：
  - ファイル選択時に`onSelect`が正しく呼ばれることを確認
  - ファイルサイズバリデーション（超過時に`onError`が呼ばれる）
  - ファイル形式バリデーション（非対応形式時に`onError`が呼ばれる）
  - 複数エラー検出時に配列で返されることを確認
  - `reset`メソッドでリセットされることを確認
  - button variant と dropzone variant の各状態テスト
  - `isDisabled`時の動作確認
  - 外部`<label>`要素との連携テスト
  - アクセシビリティ属性のテスト
- React Testing Library による UI テスト
- アクセシビリティテスト（`@testing-library/jest-dom`）

**推奨テストケース:**

```typescript
// アクセシビリティテスト例
it('should have proper ARIA attributes', () => {
  render(<FileInput variant="dropzone" errorMessages={['Error message']} />);

  const dropzone = screen.getByRole('button');
  expect(dropzone).toHaveAttribute('aria-label', 'ファイルを選択');
  expect(dropzone).toHaveAttribute('aria-disabled', 'false');

  const input = screen.getByRole('textbox', { hidden: true });
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('aria-describedby');
});
```

---

## 優先度：低

### 5. パフォーマンス最適化

**現在の状態:**

- 基本的なパフォーマンスは良好
- 大きなファイルの処理時の最適化の余地

**改善案:**

- 大きなファイルのプレビュー表示の最適化
- メモ化の見直し（必要に応じて）

### 6. 国際化対応

**現在の状態:**

- エラーメッセージが日本語固定

**改善案:**

- i18n対応（エラーメッセージ、ラベル等）
- 多言語対応の検討
