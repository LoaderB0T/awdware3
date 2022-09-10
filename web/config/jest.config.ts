/* eslint-disable */

export interface ConfigOptions {
  pathToRoot: string;
  roots: string[];
}

const defaultOptions: ConfigOptions = {
  pathToRoot: '../../',
  roots: ['src/lib']
};

export const getConfig = (moduleName: string, options?: Partial<ConfigOptions>) => {
  if (options) {
    options = { ...defaultOptions, ...options };
  } else {
    options = defaultOptions;
  }

  return {
    displayName: `${moduleName}`,
    preset: `${options.pathToRoot}jest.preset.js`,
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    },
    coverageDirectory: `${options.pathToRoot}coverage/libs/${moduleName}`,
    transform: {
      '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular'
    },
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      'jest-preset-angular/build/serializers/html-comment'
    ],
    moduleNameMapper: {
      '#(.*)': `${options.pathToRoot}node_modules/$1`
    },
    roots: options.roots,
    maxWorkers: '75%'
  };
};
