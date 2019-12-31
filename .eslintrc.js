module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'eslint:recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'import-helpers'],
  rules: {
    'prettier/prettier': ['error'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': 'warn',
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: ['/^react/', 'module', '/^//', ['sibling', '/^style/']],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
}
