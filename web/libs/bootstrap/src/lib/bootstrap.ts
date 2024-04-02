import { Type, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { environment } from 'ng-dynamic-mf/environment';
import { initializeApp } from 'ng-dynamic-mf/nf';

export async function doBootstrap<T>(ngModule: () => Promise<Type<T>>, isHost = false) {
  (async () => {
    await (isHost
      ? initializeApp({
          type: 'host',
          loadRemoteModule,
        })
      : initializeApp({
          type: 'remote',
        }));

    if (environment.production) {
      enableProdMode();
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await import('zone.js');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await import('zone.js/plugins/zone-error');
    }
    const module = await ngModule();
    platformBrowserDynamic()
      .bootstrapModule(module)
      .catch(err => console.error(err));
  })();
}
