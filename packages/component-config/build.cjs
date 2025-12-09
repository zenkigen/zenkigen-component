/* eslint-disable no-console */
(async () => {
  const { default: StyleDictionary } = await import('style-dictionary');

  StyleDictionary.registerFormat({
    name: 'customTSFormat',
    format: ({ dictionary }) => {
      const valueTree = {};
      const metaTree = {};

      const setPath = (target, path, value) => {
        if (path === null) return;

        let obj = target;
        path.forEach((key, i) => {
          const camelKey = key.charAt(0).toLowerCase() + key.slice(1);

          if (!Object.prototype.hasOwnProperty.call(obj, camelKey)) {
            obj[camelKey] = {};
          }
          if (i === path.length - 1) {
            obj[camelKey] = value;
          } else {
            obj = obj[camelKey];
          }
        });
      };

      dictionary.allTokens.forEach((token) => {
        const { path, value, description, type: tokenType } = token;

        setPath(valueTree, path, value);

        const meta = { value };
        if (typeof description !== 'undefined') {
          meta.description = description;
        }
        if (typeof tokenType !== 'undefined') {
          meta.type = tokenType;
        }

        setPath(metaTree, path, meta);
      });

      const toConst = (name, obj) => `export const ${name} = ${JSON.stringify(obj, null, 2)} as const;`;

      return `${toConst('tokens', valueTree)}\n\n${toConst('tokensWithMeta', metaTree)}\n`;
    },
  });

  const styleDictionary = new StyleDictionary();
  await styleDictionary.extend('style-dictionary.json', { mutateOriginal: true });
  await styleDictionary.buildAllPlatforms();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
