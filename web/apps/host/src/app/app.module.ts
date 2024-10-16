import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MissingTranslationHandler, TranslateModule } from '@ngx-translate/core';
import { HtmlHeadService, loadedModules } from 'ng-dynamic-mf';

import { SharedModule, ThemeService, TranslationService } from '@awdware/shared';

import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { BgComponent } from './bg/bg.component';
import { MenuComponent } from './menu/menu.component';
import { routes } from './routes';
import { MyMissingTranslationHandler } from './services/my-missing-translation-handler';

@NgModule({
  declarations: [AppComponent, BaseComponent, BgComponent, MenuComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    SharedModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler,
      },
    }),
    loadedModules,
  ],
  providers: [provideExperimentalZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    themeService: ThemeService,
    translationService: TranslationService,
    htmlHeadService: HtmlHeadService
  ) {
    themeService.init();
    translationService.init();

    htmlHeadService.addElement({
      type: 'link',
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
    });
    htmlHeadService.addElement({
      type: 'script',
      src: 'https://kit.fontawesome.com/8552b95824.js',
      crossorigin: 'anonymous',
    });
  }
}
