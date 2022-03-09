import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@awdware/shared';
import { TranslationResolver } from './services/translation.resolver';
import { AboutComponent } from './about/about.component';
import { ResourceMapModule } from 'ng-dynamic-mf';

const routes: Routes = [
  {
    path: '',
    resolve: {
      translations: TranslationResolver
    },
    children: [
      {
        path: '',
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
      }
    ]
  }
];

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [CommonModule, SharedModule, ResourceMapModule, RouterModule.forChild(routes)]
})
export class HomeModule {}
