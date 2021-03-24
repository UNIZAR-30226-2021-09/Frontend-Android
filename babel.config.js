const plugins = [
    [
        require.resolve('babel-plugin-module-resolver'),
        {
            root: ["./android/app/src"],
            extensions: [".js", ".ios.js", ".android.js"],
            alias: {
                "_assets": "./android/app/srcassets",
                "_components": "./android/app/src/components",
                "_atoms": "./android/app/src/components/atoms",
                "_molecules": "./android/app/src/components/molecules",
                "_organisms": "./android/app/src/components/organisms",
                "_navigations": "./android/app/src/navigations",
                "_scenes": "./android/app/src/scenes",
                "_api": "./android/app/src/api",
                "_styles": "./android/app/src/styles",
                "_utilities": "./android/app/src/utilities"
            }
        }

    ]

];
module.exports = function (api) {
  api.cache(true);
  return {
      presets: ['babel-preset-expo'],
      plugins,
  };
};
