const getFederationConfig = require('../../config/getFederationConfig');

module.exports = getFederationConfig('home', [
  '@awdware/analytics',
  '@awdware/externals',
  '@awdware/shared',
]);
