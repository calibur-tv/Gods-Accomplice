module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint'
  },

  env: {
    browser: true,
    node: true,
    mocha: true
  },

  plugins: ['vue', 'prettier'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': 'error',
    'no-unused-vars': 'warn',
    'no-else-return': 'warn',
    'vue/no-v-html': 'off'
  },

  globals: {
    M: true // custom namespace
  },

  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/essential',
    '@vue/prettier'
  ]
}
