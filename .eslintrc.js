module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/tslint'],
  rules: {
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'off',
      {
        accessibility: 'explicit'
      }
    ],
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        FunctionDeclaration: {
          parameters: 'first'
        },
        FunctionExpression: {
          parameters: 'first'
        }
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/unified-signatures': 'error',
    'arrow-body-style': 'error',
    'arrow-parens': ['off', 'as-needed'],
    camelcase: 'error',
    'comma-dangle': 'error',
    complexity: 'off',
    'constructor-super': 'error',
    curly: 'error',
    'dot-notation': 'off',
    'eol-last': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': [
      'error',
      'any',
      //   'Number',
      'number',
      //   'String',
      'string',
      //   'Boolean',
      'boolean',
      //   'Undefined',
      'undefined'
    ],
    'id-match': 'error',
    'import/order': 'off',
    'max-classes-per-file': ['error', 1],
    'max-len': [
      'error',
      {
        code: 140
      }
    ],
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-multiple-empty-lines': 'error',
    'no-new-wrappers': 'error',
    'no-shadow': [
      'error',
      {
        hoist: 'all'
      }
    ],
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    // 'prefer-arrow/prefer-arrow-functions': [
    //   'warn',
    //   {
    //     disallowPrototype: true,
    //     singleReturnOnly: false,
    //     classPropertiesAllowed: false
    //   }
    // ],
    'quote-props': ['error', 'consistent-as-needed'],
    radix: 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never'
      }
    ],
    'spaced-comment': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'off',
    '@typescript-eslint/tslint/config': [
      'error',
      {
        rules: {
          'import-spacing': true,
          'jsdoc-format': true,
          'no-reference-import': true,
          'one-line': [
            true,
            'check-catch',
            'check-else',
            'check-finally',
            'check-open-brace',
            'check-whitespace'
          ],
          whitespace: [
            true,
            'check-branch',
            'check-decl',
            'check-operator',
            'check-separator',
            'check-type',
            'check-typecast'
          ]
        }
      }
    ]
  }
}
