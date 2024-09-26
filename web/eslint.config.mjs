import nx from '@nx/eslint-plugin';
import awdwareAngular from '@awdware/eslint-config-angular';

export default [
  {
    ignores: ['**/node_modules', '**/assets/modules'],
  },
  nx.configs['flat/base'],
  nx.configs['flat/typescript'],
  nx.configs['flat/javascript'],
  nx.configs['flat/angular'],
  nx.configs['flat/angular-template'],
  ...awdwareAngular,
  {
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
      'import/internal-regex': '@swpe/',
    },
    rules: {
      '@typescript-eslint/no-extra-semi': 'error',
      'no-extra-semi': 'off',
      // "rxjs/no-sharereplay": "error",
      // "rxjs/no-ignored-replay-buffer": "error",
      // "rxjs/no-ignored-takewhile-value": "error",
      // "rxjs/no-index": "error",
      // "rxjs/no-internal": "error",
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'import/no-unresolved': 'off',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },

          warnOnUnassignedImports: true,
        },
      ],

      'import/no-duplicates': 'error',
      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/lib/generated/**/*.ts'],

    rules: {
      'unused-imports/no-unused-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
