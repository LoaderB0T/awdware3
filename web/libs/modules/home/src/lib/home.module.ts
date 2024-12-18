import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HtmlHeadService } from 'ng-dynamic-mf';
import { DynamicTranslationService } from 'ng-dynamic-mf/translate';

import { disableAnalytics } from '@awdware/analytics';
import { analytics, fontawesome, font_montserrat } from '@awdware/externals';
import { routes } from './routes';

@NgModule({
  imports: [],
  providers: [provideRouter(routes)],
})
export class HomeModule {
  constructor(
    htmlHeadService: HtmlHeadService,
    dynamicTranslationService: DynamicTranslationService
  ) {
    htmlHeadService.addElement(font_montserrat);
    htmlHeadService.addElement(fontawesome);
    if (!disableAnalytics) {
      htmlHeadService.addElement(analytics);
    }
    dynamicTranslationService.registerTranslationSet('home', {
      de: () => import('./i18n/de').then(m => m.de),
      en: () => import('./i18n/en').then(m => m.en),
    });
  }
}
