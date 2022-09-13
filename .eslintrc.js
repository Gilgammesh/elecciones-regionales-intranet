module.exports = {
  env: {
    es2021: true,
    browser: true,
    node: true
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ],
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'no-use-before-define': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'import/no-unresolved': 'off',
    'no-constant-condition': 'off',
    'global-require': 'off',
    'react/no-array-index-key': 'off',
    'react/no-unescaped-entities': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/no-danger': 'off',
    'react/prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/no-unused-prop-types': 'off'
  }
}
