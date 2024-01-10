import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp, environment } from 'ng-dynamic-mf';
import { loadRemoteModule } from '@angular-architects/native-federation';

(async () => {
  await initializeApp(undefined, {
    loadRemoteModule,
  });
  if (environment.production) {
    enableProdMode();
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await import('zone.js/plugins/zone-error');
  }
  const { AppModule } = await import('./app/app.module');
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
})();
