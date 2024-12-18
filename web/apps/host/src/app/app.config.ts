import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MissingTranslationHandler, provideTranslateService } from '@ngx-translate/core';
import { ɵinitializeEnvironment, setWindow } from 'ng-dynamic-mf/environment';

import { ThemeService, TranslationService } from '@awdware/shared';

import { routes } from './routes';
import { MyMissingTranslationHandler } from './services/my-missing-translation-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    provideTranslateService({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler,
      },
    }),
    provideAppInitializer(async () => {
      inject(ThemeService).init();
      inject(TranslationService).init();
      const win = inject(DOCUMENT).defaultView;
      const env = await fetch(`${win?.location.origin}/environment.json`).then(r => r.json());
      if (win) {
        setWindow(win);
      }
      ɵinitializeEnvironment(env);
    }),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
  ],
};
