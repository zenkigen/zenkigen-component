# Zenkigen Component ライブラリドキュメント

このディレクトリには、Zenkigen Component ライブラリの内部構造と実装に関するドキュメントが含まれています。このドキュメントは、プロジェクトに新たに参加した開発者が、ライブラリの設計思想や実装方法を理解するために作成されました。

## ドキュメント構成

- [プロジェクト構造](./project-structure.md) - プロジェクト全体の構造とパッケージ間の関係性
- [コンポーネント実装パターン](./component-patterns.md) - コンポーネントの設計パターンと実装方針
- [テーマシステム](./theme-system.md) - テーマシステムとTailwind CSS設定

## プロジェクト概要

Zenkigen Component は React コンポーネントライブラリで、ZENKIGENのデザインシステムに準拠したUIを構築するためのツールを提供します。Tailwind CSSをベースとしており、一貫したデザインとUIコンポーネントをアプリケーションに簡単に取り入れることができます。

## 構成パッケージ

このプロジェクトは、以下の4つの主要パッケージで構成されています：

1. **@zenkigen-inc/component-ui**: メインのUIコンポーネントライブラリ
2. **@zenkigen-inc/component-theme**: テーマ関連の設定と変数
3. **@zenkigen-inc/component-config**: Tailwind CSSの設定
4. **@zenkigen-inc/component-icons**: アイコンコンポーネント

それぞれのパッケージの役割と連携方法については、[プロジェクト構造](./project-structure.md)ドキュメントで詳しく説明しています。

## このドキュメントの対象者

このドキュメントは、以下の開発者を対象としています：

- Zenkigen Component ライブラリのメンテナンス担当者
- Zenkigen Component ライブラリの拡張や新機能追加を行う開発者
- ライブラリの内部構造を理解したい開発者

## ライブラリの使用方法について

ライブラリの基本的な使用方法については、ルートディレクトリおよび各パッケージのREADMEファイルを参照してください：

- [ルートREADME](../README.md)
- [component-ui README](../packages/component-ui/README.md)
- [component-config README](../packages/component-config/README.md)
- [component-theme README](../packages/component-theme/README.md)
- [component-icons README](../packages/component-icons/README.md)

## ライセンス

Zenkigen Component は MIT ライセンスに基づいています。ただし、`@zenkigen-inc/component-icons` の SVG ファイルは [Shape](https://shape.so/) の[利用規約](https://shape.so/terms)に準拠します。
