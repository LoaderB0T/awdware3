import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule, ThemeService, TranslationService } from '@awdware/shared';
import { BaseComponent } from './base/base.component';
import { BgComponent } from './bg/bg.component';
import { routes } from './routes';
import { loadedModules } from 'ng-dynamic-mf';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [AppComponent, BaseComponent, BgComponent, MenuComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    SharedModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({}),
    loadedModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(themeService: ThemeService, translationService: TranslationService) {
    themeService.init();
    translationService.init();
  }
}
