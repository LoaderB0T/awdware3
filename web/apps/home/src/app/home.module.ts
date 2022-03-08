import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@awdware/shared';
import { TranslationResolver } from './services/translation.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      translations: TranslationResolver
    },
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class HomeModule {}
