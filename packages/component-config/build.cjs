/* eslint-disable no-console */
(async () => {
  const { default: StyleDictionary } = await import('style-dictionary');

  StyleDictionary.registerFormat({
    name: 'customTSFormat',
    format: ({ dictionary }) => {
      const pathKeyedJsonObj = {};

      dictionary.allTokens.forEach((jsonObj) => {
        const path = jsonObj.path;

        if (path !== null) {
          let obj = pathKeyedJsonObj;
          path.forEach((key, i) => {
            key = key.charAt(0).toLowerCase() + key.slice(1);

            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
              obj[key] = {};
            }
            if (i === path.length - 1) {
              obj[key] = jsonObj.value;
            } else {
              obj = obj[key];
            }
          });
        }
      });

      const tokenArray = JSON.stringify(pathKeyedJsonObj, null, 2);

      return `export const tokens = ${tokenArray} as const;`;
    },
  });

  const styleDictionary = new StyleDictionary();
  await styleDictionary.extend('style-dictionary.json', { mutateOriginal: true });
  await styleDictionary.buildAllPlatforms();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
