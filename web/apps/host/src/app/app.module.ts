import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule, ThemeService } from '@awdware/shared';
import { BaseComponent } from './base/base.component';
import { BgComponent } from './bg/bg.component';
import { routes } from './routes';
import { DynamicTranslationService, loadedModules } from 'ng-dynamic-mf';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent, BaseComponent, BgComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    SharedModule,
    TranslateModule.forRoot({}),
    loadedModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    themeService: ThemeService,
    translateService: TranslateService,
    dynamicTranslationService: DynamicTranslationService
  ) {
    themeService.init();
    dynamicTranslationService.setTranslateService(translateService);
  }
}
