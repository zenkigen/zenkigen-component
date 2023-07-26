const StyleDictionary = require('style-dictionary');

StyleDictionary.registerFormat({
  name: 'customTSFormat',
  formatter: ({ dictionary }) => {
    const pathKeyedJsonObj = {};

    dictionary.allTokens.forEach((jsonObj) => {
      const path = jsonObj.path;

      if (path !== null) {
        let obj = pathKeyedJsonObj;
        path.forEach((key, i) => {
          key = key.charAt(0).toLowerCase() + key.slice(1);

          if (!obj.hasOwnProperty(key)) {
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

StyleDictionary.extend('style-dictionary.json').buildAllPlatforms();
