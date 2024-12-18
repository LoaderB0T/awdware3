import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { DynamicTranslationService } from 'ng-dynamic-mf/translate';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';

export const routes: Routes = [
  {
    path: '',
    resolve: {
      translation: () => inject(DynamicTranslationService).ensureTranslationSetIsLoaded('home'),
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        data: {
          activePage: 'home',
        },
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          activePage: 'about',
        },
      },
      {
        path: 'skills',
        component: SkillsComponent,
        data: {
          activePage: 'skills',
        },
      },
    ],
  },
];
