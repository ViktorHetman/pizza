const path = require('path')

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:import/recommended',
  ],
  // overrides: [{
  //     files: ['resources/js/newMyBusiness/store/**'],
  //     rules: { 'no-param-reassign': ['error', { props: false }] },
  // },],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'max-len': ['error', { code: 140, ignoreUrls: true }],
    'react/prop-types': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-no-bind': 'off',
    'no-shadow': 'off',
  },
  // settings: {
  //     "import/resolver": {
  //         webpack: {
  //             config: path.join(__dirname, "node_modules/laravel-mix/setup/webpack.config.js"),
  //         },
  //     },
  // },
}
