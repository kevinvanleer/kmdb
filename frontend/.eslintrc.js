module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:json/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
