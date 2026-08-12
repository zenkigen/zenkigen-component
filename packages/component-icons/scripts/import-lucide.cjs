/*
 * lucide SVG 取り込みスクリプト
 *
 * lucide-import.json（現行 IconName 主キー）を読み、lucide-static の SVG を
 * src/svg/lucide/<現行名>.svg へコピーする。置換対象の旧 src/svg/<現行名>.svg は削除する。
 *
 * - 複数の現行名が同じ lucide 名を参照できる（signal / signal-low / signal-off など）
 * - accent.markPaths: d が完全一致する既存 path に class="accent" を付与（一致がちょうど 1 件でなければエラー）
 * - accent.addPaths: <path class="accent" d="..."/> を末尾に追加
 *
 * 使い方: yarn workspace @zenkigen-inc/component-icons import-lucide [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const cheerio = require('cheerio');

const isDryRun = process.argv.includes('--dry-run');
const packageRoot = path.resolve(__dirname, '..');
const outputDir = path.join(packageRoot, 'src', 'svg', 'lucide');
const legacyDir = path.join(packageRoot, 'src', 'svg');

const importConfig = require(path.join(packageRoot, 'lucide-import.json'));

const errors = [];
const warnings = [];

// lucide-static のバージョンが定義と一致しているか（不一致は path の d 値がずれる恐れ）
const lucideStaticVersion = require('lucide-static/package.json').version;
if (lucideStaticVersion !== importConfig.lucideVersion) {
  warnings.push(
    `lucide-static のバージョン不一致: lucide-import.json は ${importConfig.lucideVersion}、実体は ${lucideStaticVersion}`,
  );
}

function transformSvg(name, definition, content) {
  const $ = cheerio.load(content, { xml: true });
  const $svg = $('svg');

  // root の検証（lucide の規約から外れた SVG の混入を検出）
  if ($svg.attr('fill') !== 'none') {
    errors.push(`${name}: root の fill が "none" ではない（${String($svg.attr('fill'))}）`);
  }
  if ($svg.attr('stroke') !== 'currentColor') {
    errors.push(`${name}: root の stroke が "currentColor" ではない（${String($svg.attr('stroke'))}）`);
  }
  if ($svg.attr('viewBox') !== '0 0 24 24') {
    errors.push(`${name}: viewBox が "0 0 24 24" ではない（${String($svg.attr('viewBox'))}）`);
  }

  // root の class="lucide lucide-*" は不要（codegen の camelCase 変換で値が壊れるため残さない）
  $svg.removeAttr('class');

  // root 以外の none 以外の fill は stroke 系の前提を崩すため警告
  $svg.find('[fill]').each((_, el) => {
    const fill = $(el).attr('fill');
    if (fill !== 'none') {
      warnings.push(`${name}: root 以外に fill="${String(fill)}" を持つ要素がある`);
    }
  });

  const accent = definition.accent;
  let markedCount = 0;
  let addedCount = 0;

  if (accent != null && Array.isArray(accent.markPaths)) {
    for (const d of accent.markPaths) {
      const matched = $svg.find(`path[d="${d}"]`);
      if (matched.length !== 1) {
        errors.push(`${name}: markPaths "${d}" の一致が ${matched.length} 件（ちょうど 1 件であること）`);
        continue;
      }
      matched.attr('class', 'accent');
      markedCount += 1;
    }
  }

  if (accent != null && Array.isArray(accent.addPaths)) {
    for (const d of accent.addPaths) {
      $svg.append(`<path class="accent" d="${d}"/>`);
      addedCount += 1;
    }
  }

  return { svg: $.xml(), markedCount, addedCount };
}

function main() {
  const entries = Object.entries(importConfig.icons);
  const uniqueLucideNames = new Set(entries.map(([, definition]) => definition.lucide));

  let importedCount = 0;
  let deletedCount = 0;
  let totalMarked = 0;
  let totalAdded = 0;

  if (!isDryRun) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const [name, definition] of entries) {
    let sourcePath;
    try {
      sourcePath = require.resolve(`lucide-static/icons/${definition.lucide}.svg`);
    } catch {
      errors.push(`${name}: lucide-static に "${definition.lucide}.svg" が存在しない`);
      continue;
    }

    const content = fs.readFileSync(sourcePath, 'utf8');
    const { svg, markedCount, addedCount } = transformSvg(name, definition, content);
    totalMarked += markedCount;
    totalAdded += addedCount;

    const outputPath = path.join(outputDir, `${name}.svg`);
    if (!isDryRun) {
      fs.writeFileSync(outputPath, `${svg.trimEnd()}\n`, 'utf8');
    }
    importedCount += 1;

    const legacyPath = path.join(legacyDir, `${name}.svg`);
    if (fs.existsSync(legacyPath)) {
      if (!isDryRun) {
        fs.rmSync(legacyPath);
      }
      deletedCount += 1;
    } else {
      warnings.push(`${name}: 置換対象の旧 src/svg/${name}.svg が存在しない`);
    }
  }

  console.log(isDryRun ? '--- dry-run（書き込み・削除なし） ---' : '--- 取り込み結果 ---');
  console.log(`取り込み: ${importedCount} 件（lucide ${uniqueLucideNames.size} 種）`);
  console.log(`旧 SVG 削除: ${deletedCount} 件`);
  console.log(`accent 付与: mark ${totalMarked} path / add ${totalAdded} path`);

  if (warnings.length > 0) {
    console.log(`\n警告 (${warnings.length}):`);
    for (const message of warnings) console.log(`  - ${message}`);
  }
  if (errors.length > 0) {
    console.error(`\nエラー (${errors.length}):`);
    for (const message of errors) console.error(`  - ${message}`);
    process.exitCode = 1;
  }
}

main();
