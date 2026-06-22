# リリース手順（npm publish）

`@zenkigen-inc/*` パッケージを npm に公開する手順をまとめる。

## 目次

- [概要](#概要)
- [公開対象パッケージ](#公開対象パッケージ)
- [バージョン同期ルール（重要）](#バージョン同期ルール重要)
- [リリース手順（ステップ）](#リリース手順ステップ)
- [具体例: 1.20.4 → 1.20.5 をリリースする](#具体例-1204--1205-をリリースする)
- [publish 関連の設定](#publish-関連の設定)
- [よくある落とし穴](#よくある落とし穴)

## 概要

リリースは **`v*` タグの push を起点に GitHub Actions が自動で npm publish する**フローで運用している。ローカルで `yarn publish:all` を手で叩く運用ではない（手動コマンドは緊急時のフォールバック）。

```
version bump + lockfile 更新（4 package.json + yarn.lock）
        ↓ commit（release: X.Y.Z）
vX.Y.Z タグを作成・push
        ↓ publish.yaml が発火（on: push: tags: 'v*'）
CI: yarn install → yarn build-lib:all → yarn publish:all
        ↓
npm に公開（dist-tag = latest）
```

## 公開対象パッケージ

| パッケージ                       | publishConfig  |
| -------------------------------- | -------------- |
| `@zenkigen-inc/component-ui`     | access: public |
| `@zenkigen-inc/component-config` | access: public |
| `@zenkigen-inc/component-icons`  | access: public |
| `@zenkigen-inc/component-theme`  | access: public |

ルートの `zenkigen-component`（private なワークスペース）は publish 対象外（`publish:all` は `--exclude zenkigen-component`）。

## バージョン同期ルール（重要）

- **全パッケージの version を常に揃える**（部分的なバージョン更新はしない）。
- 内部依存（`@zenkigen-inc/*`）は **`workspace:*`** で参照している。Yarn が publish 時にその時点の version の exact 値へ自動変換する（`"workspace:*"` → `"1.20.5"`）ため、利用者が見る公開物は exact 固定になる。
- version を変えたら **`yarn install` で `yarn.lock` を更新**し、同じコミットに含める。

## リリース手順（ステップ）

> **ブランチ運用**: 機能開発・修正は PR 経由でマージするが、**リリース（version bump）コミットは `main` に直接 commit & push する**（PR を通さない）。タグはその release コミット自体に打つ。

1. **version bump**
   - 4つの `packages/*/package.json` の `version` 行を新 version に更新。

2. **lockfile 更新**
   - `yarn install` を実行し `yarn.lock` の resolution を更新。

3. **commit（main に直接）**
   - `main` 上で直接 commit する（PR を通さない）。
   - メッセージ形式: `release: X.Y.Z`
   - 対象: 4 package.json ＋ yarn.lock

4. **push ＆ タグ作成・push**
   - `git push origin main` で release コミットを push。
   - `git tag vX.Y.Z` → `git push origin vX.Y.Z`（このタグ push が publish.yaml を発火させる）。

5. **CI publish（自動）**
   - `publish.yaml`（`on: push: tags: 'v*'`）が発火。
   - `yarn install` → `yarn build-lib:all` → `yarn publish:all`。
   - `publish:all` = `yarn workspaces foreach --all --exclude zenkigen-component npm publish`（**dist-tag 未指定 = latest**）。

6. **確認**
   - `npm view @zenkigen-inc/component-ui version` で公開を確認。

## 具体例: 1.20.4 → 1.20.5 をリリースする

人が手を動かすのは「4つの `version` 行の書き換え → `yarn install` → commit → tag push」だけ。ビルドや publish コマンドは打たない（CI が実施する）。

### ① version 行を書き換える（手動編集）

4つすべての `packages/*/package.json` で `version` 行を変更する。

```diff
-  "version": "1.20.4",
+  "version": "1.20.5",
```

### ② 以降はコマンド

```bash
yarn install                                 # yarn.lock を 1.20.5 に更新

git checkout main                            # リリースは main に直接
git add packages/*/package.json yarn.lock
git commit -m "release: 1.20.5"
git push origin main

git tag v1.20.5
git push origin v1.20.5                      # ← publish.yaml が発火

npm view @zenkigen-inc/component-ui version  # 1.20.5 を確認
```

## publish 関連の設定

- `.github/workflows/publish.yaml`: `v*` タグ push で発火する CI。認証は `secrets.NPM_TOKEN`（`NODE_AUTH_TOKEN`）。
- ルート `package.json` の scripts:
  - `build-lib:all`: 全パッケージのライブラリビルド。
  - `publish:all`: 全 workspace を npm publish（ルート除外）。
- `.yarnrc.yml`:
  - `npmScopes.zenkigen-inc.npmPublishRegistry: 'https://registry.npmjs.org'` … publish 先を npmjs に固定（`npmScopes` 配下の設定）。
  - `npmMinimalAgeGate: '3d'` … リリースから3日未満のバージョンは **install をブロック**（publish には影響しない）。
  - `enableScripts: false` … 依存の install スクリプトを既定で実行しない。
  - `defaultSemverRangePrefix: ''` … `yarn add` 時のバージョンを exact 固定にする（`workspace:*` の publish 時変換結果も exact になる）。
- 各 `package.json` の `publishConfig.access: public`。
- パッケージマネージャ: `yarn@4.13.0`（Yarn Berry）。publish は `yarn npm publish` 実体。
- **dist-tag**: 現状は `latest` のみ運用。`publish:all` は `--tag` 未指定で publish するため、release したバージョンに `latest`（= `npm install`（バージョン未指定）で入る既定を指すラベル）が付け替わる。

## よくある落とし穴

- **yarn.lock 更新漏れ**: package.json だけ更新して `yarn.lock` を更新しないと、CI の `yarn install`（GitHub Actions では `CI=true` により暗黙 immutable）が lockfile 不整合で失敗する。
