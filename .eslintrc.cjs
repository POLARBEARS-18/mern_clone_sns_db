module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    // 'airbnb-typescript', //追加
    'airbnb/hooks', //追加
    'plugin:@typescript-eslint/recommended', //型を必要としないプラグインの推奨ルールをすべて有効
    'plugin:@typescript-eslint/recommended-requiring-type-checking', //型を必要とするプラグインの推奨ルールをすべて有効
    'prettier', //追加 ESLintの情報に沿ってフォーマット  ],
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname, //追加 tsconfig.jsonがある相対パスを指定
    project: ['./tsconfig.json'], //追加  tsconfig.jsonを指定
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'unused-imports', //追加 使っていないimportを自動で削除用
    'import',
  ],
  ignorePatterns: ['build'], //追加 .eslintignoreに対象外にしているが無いとコンパイルに時間がかかる
  rules: {
    'no-use-before-define': 'off', //関数や変数が定義される前に使われているとエラーになるデフォルトの機能をoff
    '@typescript-eslint/no-use-before-define': ['error', { functions: true, classes: true, variables: false }], //typescript側のno-use-before-defineを使うようにする
    'import/prefer-default-export': 'off', //named exportがエラーになるので使えるようにoff
    '@typescript-eslint/no-unused-vars': 'off', //unused-importsを使うため削除
    'unused-imports/no-unused-imports': 'error', //不要なimportの削除
    'unused-imports/no-unused-vars': [
      //unused-importsでno-unused-varsのルールを再定義
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // "import/order": [
    //   "error",
    //   {
    //     // グループごとの並び順
    //     "groups": [
    //       "builtin",  // 1. fsや path などの node "builtin" のモジュール
    //       "external",  // 2. npm install したパッケージ
    //       "internal", // 3. webpack などでパス設定したモジュール
    //       ["parent", "sibling"], // 4. 親階層と小階層のファイル
    //       "object",  // object"-imports
    //       "type",  // 型だけをインポートする type imports
    //       "index" // 同階層のファイル
    //     ],
    //     // グループごとに改行を入れる
    //     "newlines-between": "never", // "never" を指定すると改行なし
    //     // FIXME: ちょっとよく分かってない
    //     // This defines import types that are not handled by configured pathGroups. This is mostly needed when you want to handle path groups that look like external imports.
    //     "pathGroupsExcludedImportTypes": ["builtin"],
    //     // アルファベット順・大文字小文字を区別しない
    //     "alphabetize": { "order": "asc", "caseInsensitive": true },
    //     // パターンマッチしたものをグループにする
    //     // "newlines-between": "always" の場合は pathGroups  ごとに空行が入る
    //     "pathGroups": [
    //       // react 関連を external より前にする
    //       // "pathGroupsExcludedImportTypes": ["react"], にしてみたが `react`, `react-dom` などが別グループになってしまったので pattern で無理やり同じグループにした
    //       {
    //         "pattern": "react**",
    //         "group": "external",
    //         "position": "before"
    //       },
    //       // `@/app`, `@/features/`, `@/libs` の import をひとグループにして internal の前に
    //       {
    //         "pattern": "{@/app/**,@/features/**,@/libs/**}",
    //         "group": "internal",
    //         "position": "before"
    //       },
    //       // `@/components`, `@/pages` の import をグルーピング
    //       {
    //         "pattern": "{@/components/**,@/pages/**}",
    //         "group": "internal",
    //         "position": "before"
    //       },
    //       // CSS module を一番最後に
    //       {
    //         "pattern": "./**.module.css",
    //         "group": "index",
    //         "position": "after"
    //       }
    //     ]
    //   }
    // ],
    'import/no-unresolved': 'off',
    'react/function-component-definition': [
      //アロー関数以外受け付けない設定
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-param-reassign': ['error', { props: true }], //パラメーターのプロパティ変更を許可
    'import/extensions': [
      //importのときに以下の拡張子を記述しなくてもエラーにしない
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      //jsx形式のファイル拡張子をjsxもしくはtsxに限定
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/react-in-jsx-scope': 'off', //import React from 'react'が無くてもエラーを無くす
    'react/prop-types': 'off', //TypeScriptでチェックしているから不要。offにする
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'no-void': [
      //void演算子の許可
      'error',
      {
        allowAsStatement: true,
      },
    ],
    'react/jsx-curly-brace-presence': 'error',
    // 'react/self-closing-comp': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    // radix: ['error', 'as-needed'],
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': ['off'],

    // HTMLのrole属性
    'jsx-a11y/no-autofocus': 'off',
    // 'jsx-a11y/click-events-have-key-events': 'off',

    'react/require-default-props': 'off',
  },
  settings: {
    'import/resolver': {
      //importするファイルをjsだけではなく、tsを含むファイルを許可する
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  /*-- ↑追加ここまで --*/
};
