const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'home',
  exposes: {
    './Module': 'apps/home/src/app/home-remote.module.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
  sharedMappings: ['@awdware/analytics', '@awdware/externals', '@awdware/shared'],
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    '@awdware/styles',
    // Add further packages you don't need at runtime
  ],
});
