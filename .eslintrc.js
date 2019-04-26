module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb'],
  globals: {
    GLOBALS: true,
    NODE_ENV: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            modules: ['node_modules', './'],
            extensions: ['.js', '.jsx', '.styl'],
          },
        },
      },
      node: {
        moduleDirectory: ['node_modules', './'],
      },
    },
  },
  plugins: [
    'react',
  ],
  rules: {
    'consistent-return': ['off'],
  },
};
