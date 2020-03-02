module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    browser: true,
    jest: true,
  },
  plugins: ['react', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:json/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
  },
};
