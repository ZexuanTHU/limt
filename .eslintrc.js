module.exports = {
  root: true,
  parserOptions: {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'google'
  ],
  globals: {
    __static: true
  },
  plugins: [
    'vue'
  ],
  'rules': {
    'global-require': 0,
    // 'import/no-unresolved': 0,
    // 'no-param-reassign': 0,
    // 'no-shadow': 0,
    // 'import/extesions': 0,
    // 'import/newline-after-import': 0,
    // 'no-multi-assign': 0,
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
