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

  // Create a dummy element to safely escape the text
  const escapedKey = $('<div>').text(key).html();
  $('svg').attr('role', 'img').attr('aria-label', escapedKey);

  const value = $.xml('svg')
    .replaceAll('"{', '{')
    .replaceAll('}"', '}')
    .replaceAll(/(?<!aria)[-]([a-z])/g, (_, x) => x.toUpperCase());

  return { key, value };
}

function generateIconFile(key, value) {
  const componentName = `${key.replace(/[-\s]/g, '')}Icon`;

  return `/*
* NOTE: This file is auto generated
* Do not edit manually.
*/
import React from 'react';

export const ${componentName}: React.ReactElement = (
  ${value}
);
`;
}

async function exec() {
  const files = glob.sync('./src/svg/*.svg');
  console.log(`Processing ${files.length} SVG files...`);

  // Ensure icons directory exists
  const iconsDir = './src/icons';
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Process files in batches to reduce memory usage
  const batchSize = 10;
  const result = [];

  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(files.length / batchSize)}`);

    const batchResults = await Promise.all(batch.map(processSvgFile));

    // Generate individual icon files
    batchResults.forEach(({ key, value }) => {
      const iconContent = generateIconFile(key, value);
      fs.writeFileSync(path.join(iconsDir, `${key}.tsx`), iconContent, 'utf8');
    });

    result.push(...batchResults);

    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
  }

  console.log('Generating main icon.tsx...');
  const output = await ejs.renderFile('./template.ejs', { result });
  fs.writeFileSync('./src/icon.tsx', output, 'utf8');
  console.log('Icon generation completed!');
}

exec().catch(console.error);
