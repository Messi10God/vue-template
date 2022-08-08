module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020
  },
  rules: {
    'vue/multi-word-component-names': 0,
    "@typescript-eslint/no-explicit-any": [0],
    "@typescript-eslint/no-empty-function": [0],
  }
}