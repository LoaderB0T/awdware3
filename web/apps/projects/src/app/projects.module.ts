import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlHeadService, ResourceMapModule } from 'ng-dynamic-mf';
import { DynamicTranslationService } from 'ng-dynamic-mf/translate';

import { devicons, fontawesome, font_montserrat } from '@awdware/externals';
import { SharedModule } from '@awdware/shared';

import { ProjectComponent } from './projects-base/project/project.component';
import { ProjectsBaseComponent } from './projects-base/projects-base.component';

const routes: Routes = [
  {
    path: '',
    data: {
      module: 'projects',
    },
    resolve: {
      translation: () => inject(DynamicTranslationService).ensureTranslationSetIsLoaded('projects'),
    },
    children: [
      {
        path: '',
        component: ProjectsBaseComponent,
        data: {
          activePage: 'projects',
        },
      },
    ],
  },
];

@NgModule({
  declarations: [ProjectsBaseComponent, ProjectComponent],
  imports: [CommonModule, SharedModule, ResourceMapModule, RouterModule.forChild(routes)],
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
