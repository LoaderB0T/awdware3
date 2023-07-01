import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SharedModule, translationResolver } from '@awdware/shared';
import { AboutComponent } from './about/about.component';
import { HtmlHeadService, ResourceMapModule } from 'ng-dynamic-mf';
import { SkillsComponent } from './skills/skills.component';
import { analytics, fontawesome, font_montserrat } from '@awdware/externals';
import { disableAnalytics } from '@awdware/analytics';

const routes: Routes = [
  {
    path: '',
    data: {
      module: 'home'
    },
    resolve: {
      translations: translationResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        data: {
          activePage: 'home'
        }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          activePage: 'about'
        }
      },
      {
        path: 'skills',
        component: SkillsComponent,
        data: {
          activePage: 'skills'
        }
      }
    ]
  }
];

@NgModule({
  declarations: [HomeComponent, AboutComponent, SkillsComponent],
  imports: [CommonModule, SharedModule, ResourceMapModule, RouterModule.forChild(routes)]
})
export class HomeModule {
  constructor(htmlHeadService: HtmlHeadService) {
    htmlHeadService.addElement(font_montserrat);
    htmlHeadService.addElement(fontawesome);
    if (!disableAnalytics) {
      htmlHeadService.addElement(analytics);
    }
  }
}
