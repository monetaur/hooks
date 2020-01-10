module.exports = function babelConfig(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-env',
  ];

  return {
    env: {
      es6: {
        presets: [
          ['@babel/preset-env', {
            modules: false,
          }],
        ],
      },
    },
    presets,
  };
};
