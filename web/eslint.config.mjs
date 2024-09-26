import nx from '@nx/eslint-plugin';
import awdwareAngular from '@awdware/eslint-config-angular';

export default [
  {
    ignores: ['**/node_modules', '**/assets/modules'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.name,
        allowDefaultProject: true,
      },
    },
  },
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  ...awdwareAngular,
  {
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
      'import/internal-regex': '@swpe/',
    },
    rules: {
      'no-extra-semi': 'error',
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
