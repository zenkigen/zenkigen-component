#!/usr/bin/env node

import path from 'node:path';

import { glob } from 'glob';

// 許可されるファイル名パターン
const ALLOWED_PATTERNS = {
  // kebab-case: 小文字とハイフンのみ
  kebabCase: /^[a-z0-9]+(-[a-z0-9]+)*$/,
  // PascalCase: 大文字で始まり、大文字小文字の組み合わせ
  pascalCase: /^[A-Z][a-zA-Z0-9]*$/,
  // 特殊ファイル（設定ファイルなど）
  configFiles:
    /^(\..*|[A-Z][A-Z_]*|package\.json|tsconfig.*\.json|.*\.config\.(js|ts|mjs)|README\.md|Docs\.mdx|.*\.stories\.(tsx|ts|js|jsx))$/,
};

// 除外するパターン
const IGNORE_PATTERNS = [
  'node_modules/**',
  '**/node_modules/**', // 各パッケージのnode_modules
  '.git/**',
  '**/dist/**',
  'build/**',
  'storybook-static/**',
  '**/*.d.ts', // TypeScript型定義ファイルは除外
  '**/*.svg', // SVGファイルは除外
  '**/_templates/**', // テンプレートファイルは除外
  '**/CODING_GUIDELINES.md', // ドキュメントファイルは除外
  'pr_description_temp.md', // 一時ファイルは除外
];

// ファイル名が規約に従っているかチェック
function isValidFilename(filename) {
  const baseName = path.parse(filename).name;

  // 設定ファイルや特殊ファイルは除外
  if (ALLOWED_PATTERNS.configFiles.test(filename)) {
    return true;
  }

  // すべてのファイルはkebab-caseのみ許可
  return ALLOWED_PATTERNS.kebabCase.test(baseName);
}

// ディレクトリ名が規約に従っているかチェック
function isValidDirectoryName(dirName) {
  // 隠しディレクトリや特殊ディレクトリは除外
  if (dirName.startsWith('.') || dirName === 'node_modules') {
    return true;
  }

  // kebab-caseのみ許可
  return ALLOWED_PATTERNS.kebabCase.test(dirName);
}

async function checkFilenames() {
  console.log('🔍 ファイル名・ディレクトリ名の命名規約をチェック中...\n');

  const errors = [];

  try {
    // すべてのファイルを取得（除外パターンを適用）
    const files = await glob('**/*', {
      ignore: IGNORE_PATTERNS,
      dot: false,
    });

    for (const file of files) {
      const parts = file.split('/');

      // ディレクトリ名をチェック
      for (let i = 0; i < parts.length - 1; i++) {
        const dirName = parts[i];
        if (!isValidDirectoryName(dirName)) {
          errors.push({
            type: 'directory',
            path: parts.slice(0, i + 1).join('/'),
            name: dirName,
            suggestion: dirName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          });
        }
      }

      // ファイル名をチェック
      const filename = parts[parts.length - 1];

      if (!isValidFilename(filename)) {
        const baseName = path.parse(filename).name;
        const extension = path.parse(filename).ext;

        // すべてkebab-caseに統一
        const suggestion = baseName.toLowerCase().replace(/[^a-z0-9]/g, '-') + extension;

        errors.push({
          type: 'file',
          path: file,
          name: filename,
          suggestion,
        });
      }
    }

    // 結果を表示
    if (errors.length === 0) {
      console.log('✅ すべてのファイル・ディレクトリ名が命名規約に従っています！');
      process.exit(0);
    } else {
      console.log(`❌ ${errors.length}個の命名規約違反が見つかりました:\n`);

      errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.type === 'file' ? '📄' : '📁'} ${error.path}`);
        console.log(`   現在: ${error.name}`);
        console.log(`   推奨: ${error.suggestion}\n`);
      });

      console.log('💡 修正方法:');
      console.log('   - ファイル名: kebab-case のみ');
      console.log('   - ディレクトリ名: kebab-case のみ');

      process.exit(1);
    }
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    process.exit(1);
  }
}

// スクリプト実行
checkFilenames();
