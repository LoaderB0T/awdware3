import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, TranslationResolver } from '@awdware/shared';
import { HtmlHeadService, ResourceMapModule } from 'ng-dynamic-mf';
import { devicons, fontawesome, font_montserrat } from '@awdware/externals';
import { TimelineBaseComponent } from './timeline-base/timeline-base.component';

const routes: Routes = [
  {
    path: '',
    data: {
      module: 'timeline'
    },
    resolve: {
      translations: TranslationResolver
    },
    children: [
      {
        path: '',
        component: TimelineBaseComponent,
        data: {
          activePage: 'timeline'
        }
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, ResourceMapModule, RouterModule.forChild(routes)]
})
export class TimelineModule {
  constructor(htmlHeadService: HtmlHeadService) {
    htmlHeadService.addElement(font_montserrat);
    htmlHeadService.addElement(fontawesome);
    htmlHeadService.addElement(devicons);
  }
}
