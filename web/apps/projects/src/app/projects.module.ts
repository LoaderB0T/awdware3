import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@awdware/shared';
import { DynamicTranslationService, HtmlHeadService, ResourceMapModule } from 'ng-dynamic-mf';
import { ProjectsBaseComponent } from './projects-base/projects-base.component';
import { ProjectComponent } from './projects-base/project/project.component';
import { devicons, fontawesome, font_montserrat } from '@awdware/externals';
import { de } from './i18n/de';
import { en } from './i18n/en';

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
      de: () => de,
      en: () => en,
    });
  }
}
