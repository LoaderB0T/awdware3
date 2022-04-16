const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const { sharedPackages, sharedLibs } = require('../../config/webpack.awdware');
const share = mf.share;

const tsConfigPath = process.env.NX_TSCONFIG_PATH ?? path.join(__dirname, '../../tsconfig.base.json');
const workspaceRootPath = path.join(__dirname, '../../');
const sharedMappings = new mf.SharedMappings();
sharedMappings.register(tsConfigPath, sharedLibs, workspaceRootPath);

module.exports = {
  output: {
    uniqueName: 'projects',
    publicPath: 'auto'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases()
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: 'module' },
      name: 'projects',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': 'apps/projects/src/app/projects-remote.module.ts'
      },
      shared: share({
        ...sharedPackages,
        ...sharedMappings.getDescriptors()
      })
    }),
    sharedMappings.getPlugin()
  ]
};
