import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@awdware/shared';
import { DynamicTranslationService, HtmlHeadService, ResourceMapModule } from 'ng-dynamic-mf';
import { devicons, fontawesome, font_montserrat } from '@awdware/externals';
import { TimelineBaseComponent } from './timeline-base/timeline-base.component';
import { TimelineComponent } from './timeline-base/timeline/timeline.component';
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
  declarations: [TimelineBaseComponent, TimelineComponent],
  imports: [CommonModule, SharedModule, ResourceMapModule, RouterModule.forChild(routes)],
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
