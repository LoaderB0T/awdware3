const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');
const fs = require('fs');

function getFederationConfig(projectName, sharedMappings, isHost = false) {
  const tsconfigContent = fs.readFileSync('tsconfig.base.json', 'utf8');
  const tsconfig = JSON.parse(tsconfigContent);
  const paths = tsconfig.compilerOptions.paths;
  const pathNames = Object.keys(paths);
  const unusedMappings = pathNames.filter(pathName => !sharedMappings.includes(pathName));

  return withNativeFederation({
    name: 'home',
    exposes: isHost
      ? undefined
      : {
          './Module': 'apps/' + projectName + '/src/app/' + projectName + '-remote.module.ts',
        },

    shared: {
      ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },
    skip: [
      'rxjs/ajax',
      'rxjs/fetch',
      'rxjs/testing',
      'rxjs/webSocket',
      ...unusedMappings,
      // Add further packages you don't need at runtime
    ],
    name: projectName,
    sharedMappings,
  });
}

module.exports = getFederationConfig;
