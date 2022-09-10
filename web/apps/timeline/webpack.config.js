const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'timeline',
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })
  },
  exposes: {
    './Module': 'apps/timeline/src/app/timeline-remote.module.ts'
  }
});
