import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlHeadService } from 'ng-dynamic-mf';
import { DynamicTranslationService } from 'ng-dynamic-mf/translate';

import { devicons, fontawesome, font_montserrat } from '@awdware/externals';

import { TimelineBaseComponent } from './timeline-base/timeline-base.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      translation: () => inject(DynamicTranslationService).ensureTranslationSetIsLoaded('timeline'),
    },
    children: [
      {
        path: '',
        component: TimelineBaseComponent,
        data: {
          activePage: 'timeline',
        },
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), TimelineBaseComponent],
})
export class TimelineModule {
  constructor(
    htmlHeadService: HtmlHeadService,
    dynamicTranslationService: DynamicTranslationService
  ) {
    htmlHeadService.addElement(font_montserrat);
    htmlHeadService.addElement(fontawesome);
    htmlHeadService.addElement(devicons);

    dynamicTranslationService.registerTranslationSet('timeline', {
      de: () => import('./i18n/de').then(m => m.de),
      en: () => import('./i18n/en').then(m => m.en),
    });
  }
}
