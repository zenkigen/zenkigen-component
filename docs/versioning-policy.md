# バージョン運用方針

このドキュメントでは、メジャーバージョンのライフサイクル・ブランチ戦略・dist-tag 体制の方針を定義しています。個別リリースの実行手順（version bump・タグ push・CI publish）は [リリース手順](./release-process.md) を参照してください。

## 目次

- [基本方針](#基本方針)
- [バージョン計画](#バージョン計画)
- [ブランチ運用](#ブランチ運用)
  - [現在（v1 安定版）](#現在v1-安定版)
  - [v2 開発中（pre-release 期間）](#v2-開発中pre-release-期間)
  - [v2 本リリース時（順序が重要）](#v2-本リリース時順序が重要)
  - [本リリース後の定常状態](#本リリース後の定常状態)
- [npm dist-tag 体制](#npm-dist-tag-体制)
- [publish workflow の npm dist-tag 判定: 現状と将来改修](#publish-workflow-の-npm-dist-tag-判定-現状と将来改修)
  - [現状](#現状)
  - [将来（v2 本リリース時に改修必須）](#将来v2-本リリース時に改修必須)
- [関連リンク](#関連リンク)

## 基本方針

- **SemVer** に従う。破壊的変更はメジャーバージョンで吸収する。
- **最新安定メジャーを `latest` に置く**。`npm install` は常に最新メジャーを受け取る。
- 新メジャーの開発中は `next` dist-tag でプレリリースを先行公開し、利用者の合意を得てから本リリース（`latest` 昇格）する。
- 旧メジャーは専用の保守ブランチ・dist-tag（`v1` 等）で継続メンテナンスする。

## バージョン計画

|              | バージョン系列                 | dist-tag              | 状態       |
| ------------ | ------------------------------ | --------------------- | ---------- |
| 現行安定版   | v1.x（Tailwind CSS v3 系）     | `latest`              | リリース中 |
| 次期メジャー | **v2.x（Tailwind CSS v4 系）** | `next`（pre-release） | 開発中     |

v2 は安定版（v1 = `latest`）を壊さないよう、`next` dist-tag でプレリリース（`2.0.0-rc.N`）を反復し、利用者の検証・合意を経て本リリースする運用とする。

## ブランチ運用

### 現在（v1 安定版）

`main` ブランチで v1.x を開発・リリースしている。リリースコミットは `main` に直接 push し、`v1.x.y` タグを打つ。

```
main        ←── v1.x の開発・リリース（latest）
```

### v2 開発中（pre-release 期間）

v2 の開発は `v2-main` ブランチで行い、機能ブランチは `v2-main` へマージして集約する。`main`（v1 安定版）には影響を与えない。

```
main        ←── v1.x の安定リリース（latest）
v2-main     ←── v2 の開発（next）
```

### v2 本リリース時（順序が重要）

**順序を誤ると v1 保守ブランチが v2 起点になるため、必ず以下の順で実施する。**

1. **先に** `main`（v1 の最終コミット）から `v1` 保守ブランチを分岐する
   ```bash
   git checkout main
   git checkout -b v1
   git push origin v1
   ```
2. **その後** `main` を v2 内容へ更新（`v2-main` を統合）
   ```bash
   git checkout main
   git merge v2-main   # または rebase / reset
   git push origin main
   ```
3. `v2-main` ブランチは役目を終えるため削除または archive する

### 本リリース後の定常状態

```
main        ←── 最新安定メジャー（v2 本リリース後は v2）
v1          ←── v1 保守ブランチ（patch のみ）
```

将来 v3 以降が登場しても同じパターンを繰り返す（`v2` 保守ブランチを分岐 → `main` を v3 化）。

## npm dist-tag 体制

| フェーズ          | 対象           | タグ例        | dist-tag | `npm install` の挙動      |
| ----------------- | -------------- | ------------- | -------- | ------------------------- |
| v2 開発中（現在） | v1 安定版      | `v1.x`        | `latest` | 既定で配信                |
| ↓                 | v2 pre-release | `v2.0.0-rc.N` | `next`   | `@next` でオプトイン      |
| v2 本リリース時   | v2 安定版      | `v2.0.0`      | `latest` | 既定で配信（v1 から切替） |
| v2 本リリース後   | v2 安定版      | `v2.x`        | `latest` | 既定で配信                |
| ↓                 | v1 保守 patch  | `v1.x`        | `v1`     | `@v1` でオプトイン        |
| 将来（v3 開発中） | v2 安定版      | `v2.x`        | `latest` | 既定で配信                |
| ↓                 | v3 pre-release | `v3.0.0-rc.N` | `next`   | `@next` でオプトイン      |

v2 本リリース後の利用者への影響:

- 新規 `npm install @zenkigen-inc/component-ui` → v2 を受け取る
- v1 継続利用 → `@v1` dist-tag か `^1` version range を明示する

## publish workflow の npm dist-tag 判定: 現状と将来改修

### 現状

タグ名の**ハイフン有無のみ**で判定する:

```bash
if [[ "${GITHUB_REF_NAME}" == *-* ]]; then
  echo "name=next"    # ハイフンあり → next（プレリリース）
else
  echo "name=latest"  # ハイフンなし → latest（安定版）
fi
```

v2 本リリース**前**は正しく機能する。

### 将来（v2 本リリース時に改修必須）

現状の「ハイフンなし → `latest`」判定では、v2 本リリース後に v1 保守 patch（`v1.x`、ハイフンなし）が `latest` を奪い返してしまう。本リリース当日に以下のロジックへ改修する:

```
v*-*（ハイフンあり）                  → next
major == LATEST_MAJOR（最新安定）    → latest
major < LATEST_MAJOR（旧メジャー）   → v${major}（タグから major を抽出）
```

`LATEST_MAJOR` は GitHub リポジトリ変数として管理する。v3 移行時はこの値を変えるだけでよい。

旧メジャーの dist-tag は**固定値（`v1` 等）ではなく `v${major}` を動的生成**する。固定値にすると v3 移行後に v2 保守リリースが `v1` dist-tag へ誤って流れるため。

## 関連リンク

- [リリース手順](./release-process.md) — version bump・タグ push・CI publish の実行手順
