module.exports = {
  sharedLibs: ['@awdware/shared', '@awdware/session-lib', '@awdware/controls'],
  sharedPackages: {
    '@angular/forms': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: true
    },
    '@angular/core': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: true
    },
    '@angular/common': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: true
    },
    '@angular/common/http': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: true
    },
    '@angular/router': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: true
    },
    rxjs: {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: true
    },
    '@ngx-translate/core': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: true
    },
    'ng-dynamic-mf': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: true
    }
  }
};
