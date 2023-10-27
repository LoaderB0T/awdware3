import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@awdware/shared';
import { AboutComponent } from './about/about.component';
import { DynamicTranslationService, HtmlHeadService, ResourceMapModule } from 'ng-dynamic-mf';
import { SkillsComponent } from './skills/skills.component';
import { analytics, fontawesome, font_montserrat } from '@awdware/externals';
import { disableAnalytics } from '@awdware/analytics';
import { de } from './i18n/de';
import { en } from './i18n/en';

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
      de: () => de,
      en: () => en,
    });
  }
}
