const fs = require('fs');

const cheerio = require('cheerio');
const ejs = require('ejs');
const glob = require('glob');

async function exec() {
  const data = await glob.sync('./src/svg/*.svg');

  const result = await Promise.all(
    data.map(async (file) => {
      const content = fs.readFileSync(file).toString('utf8');
      const $ = cheerio.load(content.toString('utf8'), {
        decodeEntities: false,
      });

      const key = file.split('/').pop().split('.').shift();

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

      $('svg').attr('role', 'img').prepend(`\n<title>${key}</title>`);

      const value = $.xml('svg')
        .replaceAll('"{', '{')
        .replaceAll('}"', '}')
        .replaceAll(/[-]([a-z])/g, (_, x) => x.toUpperCase());

      return { key, value };
    }),
  );

  ejs.renderFile('./template.ejs', { result }, (_, output) => {
    fs.writeFileSync('./src/icon.tsx', output, 'utf8');
  });
}

exec();
