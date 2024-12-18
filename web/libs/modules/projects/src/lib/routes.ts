import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { DynamicTranslationService } from 'ng-dynamic-mf/translate';
import { ProjectsBaseComponent } from './projects-base/projects-base.component';

export const routes: Routes = [
  {
    path: '',
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
