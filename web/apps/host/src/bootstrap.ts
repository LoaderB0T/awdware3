import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp, environment } from 'ng-dynamic-mf';

initializeApp()
  .then(() => {
    if (environment.production) {
      enableProdMode();
    }
    return import('./app/app.module');
  })
  .then(x => x.AppModule)
  .then(x => {
    platformBrowserDynamic()
      .bootstrapModule(x)
      .catch(err => console.error(err));
  });
