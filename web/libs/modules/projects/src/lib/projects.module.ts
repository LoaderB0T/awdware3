import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { HtmlHeadService, ResourceMapPipe } from 'ng-dynamic-mf';
import { DynamicTranslationService } from 'ng-dynamic-mf/translate';

import { devicons, fontawesome, font_montserrat } from '@awdware/externals';
import { routes } from './routes';
import { provideTranslateService } from '@ngx-translate/core';

@NgModule({
  providers: [provideRouter(routes)],
})
export class ProjectsModule {
  constructor(
    htmlHeadService: HtmlHeadService,
    dynamicTranslationService: DynamicTranslationService
  ) {
    htmlHeadService.addElement(font_montserrat);
    htmlHeadService.addElement(fontawesome);
    htmlHeadService.addElement(devicons);

    dynamicTranslationService.registerTranslationSet('projects', {
      de: () => import('./i18n/de').then(m => m.de),
      en: () => import('./i18n/en').then(m => m.en),
    });
  }
}
