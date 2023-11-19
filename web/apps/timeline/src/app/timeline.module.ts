import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DynamicTranslationService, HtmlHeadService } from 'ng-dynamic-mf';
import { devicons, fontawesome, font_montserrat } from '@awdware/externals';
import { TimelineBaseComponent } from './timeline-base/timeline-base.component';
import { de } from './i18n/de';
import { en } from './i18n/en';

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
      de: () => de,
      en: () => en,
    });
  }
}
