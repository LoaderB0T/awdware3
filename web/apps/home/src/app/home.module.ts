import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlHeadService, ResourceMapModule } from 'ng-dynamic-mf';
import { DynamicTranslationService } from 'ng-dynamic-mf/translate';

import { disableAnalytics } from '@awdware/analytics';
import { analytics, fontawesome, font_montserrat } from '@awdware/externals';
import { SharedModule } from '@awdware/shared';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {
    path: '',
    data: {
      module: 'home',
    },
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

@NgModule({
  declarations: [HomeComponent, AboutComponent, SkillsComponent],
  imports: [CommonModule, SharedModule, ResourceMapModule, RouterModule.forChild(routes)],
})
export class HomeModule {
  constructor(
    htmlHeadService: HtmlHeadService,
    dynamicTranslationService: DynamicTranslationService
  ) {
    htmlHeadService.addElement(font_montserrat);
    htmlHeadService.addElement(fontawesome);
    if (!disableAnalytics) {
      htmlHeadService.addElement(analytics);
    }
    dynamicTranslationService.registerTranslationSet('home', {
      de: () => import('./i18n/de').then(m => m.de),
      en: () => import('./i18n/en').then(m => m.en),
    });
  }
}
