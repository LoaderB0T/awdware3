const nxPreset = require('@nrwl/jest/preset').default;
const esModules = ['@angular', 'tslib', 'rxjs', '@angular-architects', 'ng-dynamic-mf'];

module.exports = {
  ...nxPreset,
  transformIgnorePatterns: [`node_modules/(?!(?:(?:.pnpm/)?(${esModules.join('|')}))|.*\\.mjs$)`]
};
