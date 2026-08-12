const fs = require('fs');
const path = require('path');

const cheerio = require('cheerio');
const ejs = require('ejs');
const glob = require('glob');

async function processSvgFile(file) {
  const content = fs.readFileSync(file).toString('utf8');
  const $ = cheerio.load(content, {
    decodeEntities: false,
  });

  const key = path.basename(file, '.svg');

  $('style,title,defs').remove();
  $('[id]:not(symbol)').removeAttr('id');
  $('[class^="st"],[class^="cls"]').removeAttr('class');
  $('[style]:not(svg)').removeAttr('style');
  $('[data-name]').removeAttr('data-name');
  $('svg[id]').removeAttr('id');
  $('[fill]').removeAttr('fill');
  $('[stroke]').removeAttr('stroke');
  $('[width]').removeAttr('width');
  $('[height]').removeAttr('height');

  // Handle accent class specially
  $('[class="accent"]').attr('className', '{accentClassName}').removeAttr('class');

  // Create a dummy element to safely escape the text
  const escapedKey = $('<div>').text(key).html();
  $('svg').attr('role', 'img').attr('aria-label', escapedKey);

  const value = $.xml('svg')
    .replaceAll('"{', '{')
    .replaceAll('}"', '}')
    .replaceAll(/\bclass=/g, 'className=')
    .replaceAll(/(?<!aria)[-]([a-z])/g, (_, x) => x.toUpperCase());

  return { key, value, isLucide: false };
}

// lucide 由来（stroke 系）: 描画に必須の fill="none" / stroke / stroke-width / stroke-linecap /
// stroke-linejoin / viewBox を保持したまま変換する
async function processLucideSvgFile(file) {
  const content = fs.readFileSync(file).toString('utf8');
  const $ = cheerio.load(content, {
    decodeEntities: false,
  });

  const key = path.basename(file, '.svg');

  $('style,title,defs').remove();
  $('[id]:not(symbol)').removeAttr('id');
  $('[style]:not(svg)').removeAttr('style');
  $('[data-name]').removeAttr('data-name');
  $('svg[id]').removeAttr('id');
  $('svg').removeAttr('class');
  $('[width]').removeAttr('width');
  $('[height]').removeAttr('height');

  // Handle accent class specially
  $('[class="accent"]').attr('className', '{accentClassName}').removeAttr('class');

  // Create a dummy element to safely escape the text
  const escapedKey = $('<div>').text(key).html();
  $('svg').attr('role', 'img').attr('aria-label', escapedKey);

  // class 値にハイフンを含めると camelCase 変換 regex が値ごと変換してしまうため、
  // zen-stroke-icon / zen-stroke-accent は変換チェーンの後に文字列注入する
  const value = $.xml('svg')
    .replaceAll('"{', '{')
    .replaceAll('}"', '}')
    .replaceAll(/\bclass=/g, 'className=')
    .replaceAll(/(?<!aria)[-]([a-z])/g, (_, x) => x.toUpperCase())
    .replace('<svg ', '<svg className="zen-stroke-icon" ')
    .replaceAll(
      'className={accentClassName}',
      "className={accentClassName == null ? 'zen-stroke-accent' : `zen-stroke-accent ${accentClassName}`}",
    );

  return { key, value, isLucide: true };
}

function generateIconFile(key, value, isLucide) {
  const componentName = `${key.replace(/[-\s]/g, '')}Icon`;
  const lucideNote = isLucide ? '\n* Based on lucide (https://lucide.dev) — ISC License. See LICENSE-lucide.' : '';

  return `/*
* NOTE: This file is auto generated
* Do not edit manually.${lucideNote}
*/
import React from 'react';

export interface ${componentName}Props {
  accentClassName?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ accentClassName }) => (
  ${value}
);
`;
}

async function processInBatches(files, processor, result) {
  const batchSize = 10;

  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(files.length / batchSize)}`);

    const batchResults = await Promise.all(batch.map(processor));

    // Generate individual icon files
    batchResults.forEach(({ key, value, isLucide }) => {
      const iconContent = generateIconFile(key, value, isLucide);
      fs.writeFileSync(path.join('./src/icons', `${key}.tsx`), iconContent, 'utf8');
    });

    result.push(...batchResults);

    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
  }
}

async function exec() {
  // glob の `*` はサブディレクトリに降りないため、fill 系と lucide 系は確実に分離される
  const fillFiles = glob.sync('./src/svg/*.svg');
  const lucideFiles = glob.sync('./src/svg/lucide/*.svg');

  const fillKeys = new Set(fillFiles.map((file) => path.basename(file, '.svg')));
  const duplicatedKeys = lucideFiles.map((file) => path.basename(file, '.svg')).filter((key) => fillKeys.has(key));
  if (duplicatedKeys.length > 0) {
    throw new Error(`Duplicated icon names in src/svg/ and src/svg/lucide/: ${duplicatedKeys.join(', ')}`);
  }

  console.log(`Processing ${fillFiles.length + lucideFiles.length} SVG files...`);

  // Ensure icons directory exists
  const iconsDir = './src/icons';
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  const result = [];
  await processInBatches(fillFiles, processSvgFile, result);
  await processInBatches(lucideFiles, processLucideSvgFile, result);

  // 決定的な生成順にする: 拡張子込みファイル名（`${key}.svg`）の降順。
  // template.ejs が reverse するため、出力は「.svg 込みファイル名の昇順」（例: ai-agent が ai より先）になる
  result.sort((a, b) => {
    const aFile = `${a.key}.svg`;
    const bFile = `${b.key}.svg`;

    if (aFile < bFile) return 1;
    if (aFile > bFile) return -1;

    return 0;
  });

  console.log('Generating main icon.tsx...');
  const output = await ejs.renderFile('./template.ejs', { result });
  fs.writeFileSync('./src/icon.tsx', output, 'utf8');
  console.log('Icon generation completed!');
}

exec().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
