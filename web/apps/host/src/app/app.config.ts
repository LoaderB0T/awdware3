import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
  DOCUMENT,
  importProvidersFrom,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withViewTransitions } from '@angular/router';
import { MissingTranslationHandler, provideTranslateService } from '@ngx-translate/core';
import { ɵinitializeEnvironment, setWindow } from 'ng-dynamic-mf/environment';

import { HomeLazyModule } from '@awdware/home';
import { ProjectsLazyModule } from '@awdware/projects';
import { ThemeService, TranslationService } from '@awdware/shared';
import { TimelineLazyModule } from '@awdware/timeline';

import { routes } from './routes';
import { MyMissingTranslationHandler } from './services/my-missing-translation-handler';

const appModules = [HomeLazyModule, ProjectsLazyModule, TimelineLazyModule];

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(...appModules),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
      })
    ),
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
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
  ],
};
