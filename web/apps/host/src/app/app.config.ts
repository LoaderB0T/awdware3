import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MissingTranslationHandler, provideTranslateService } from '@ngx-translate/core';
import { ɵinitializeEnvironment } from 'ng-dynamic-mf/environment';

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
      const env = await fetch('environment.json').then(r => r.json());
      ɵinitializeEnvironment(env);
    }),
    provideHttpClient(),
  ],
};
