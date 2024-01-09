const {
  withModuleFederationPlugin,
  shareAll,
} = require('@angular-architects/module-federation/webpack');

function getWebpackConfig(projectName, isHost = false) {
  return {
    ...withModuleFederationPlugin({
      name: projectName,
      shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
      },
      sharedMappings: ['@awdware/shared', '@awdware/controls'],
      exposes: isHost
        ? undefined
        : {
            './Module': 'apps/' + projectName + '/src/app/' + projectName + '-remote.module.ts',
          },
    }),
    devServer: {
      client: {
        progress: true,
      },
    },
  };
}

module.exports = getWebpackConfig;
