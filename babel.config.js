module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    // Transpile node_modules with ES module syntax to CommonJS
    // This includes specific modules like d3-format
    plugins: [
      '@babel/plugin-transform-modules-commonjs',
    ],
    overrides: [
      {
        exclude: /node_modules/,
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      },
      {
        include: /node_modules/,
        presets: [['@babel/preset-env', { modules: 'commonjs' }]],
      },
    ],
  };