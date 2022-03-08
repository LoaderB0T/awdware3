import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TranslateService } from '@ngx-translate/core';
import { DynamicTranslationService } from 'ng-dynamic-mf';
import { SharedModule } from '@awdware/shared';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class HomeModule {
  constructor(translateService: TranslateService, dynamicTranslationService: DynamicTranslationService) {
    dynamicTranslationService.setTranslateService(translateService);
    dynamicTranslationService.registerTranslations(['de', 'en'], l => `assets/locales/${l}.json`, 'home');
  }
}
