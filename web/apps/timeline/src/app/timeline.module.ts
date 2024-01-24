import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { devicons, fontawesome, font_montserrat } from '@awdware/externals';
import { DynamicTranslationService, HtmlHeadService } from 'ng-dynamic-mf';

import { TimelineBaseComponent } from './timeline-base/timeline-base.component';

const routes: Routes = [
  {
    path: '',
    data: {
      module: 'timeline',
    },
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
