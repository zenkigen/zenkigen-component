# ドキュメント整備 依頼内容

## 依頼事項

- 以下３点が依頼内容
  - すでに作成済みである場合は、対応不要
- 作業対象は、依頼されたコンポーネントのみ
  - 各コンポーネントのコードは、packages/component-ui/src に配置されている

### 1. Component Specifications

docs/component 下に、各コンポーネントの詳細な仕様書がある。
これは、コンポーネントの実装を詳細に確認した後、
.cursor/rules/component-specification-rules.mdc
に基づき作成すること。
また、そのインデックスがREADME.mdに記載すること

### 2. Props Descriptions

各コンポーネントの実装コードに、props に説明を記載すること

### 3. Docs.mdx

各コンポーネントのディレクトリに、docs.mdx ファイルを配置し以下の整備を共通化している。

- Code Example を記載する
- タイトル下に、1. の詳細仕様書配置する
  - 実装済みの Docs.mdx を参考にすること
