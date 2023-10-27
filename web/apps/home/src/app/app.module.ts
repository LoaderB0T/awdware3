import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

// Required for TS to compile the "unused" RemoteEntryModule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RemoteEntryModule } from './home-remote.module';
import { SharedModule, ThemeService, TranslationService } from '@awdware/shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'home',
        loadChildren: () => import('./home.module').then(m => m.HomeModule),
      },
    ]),
    SharedModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({}),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(themeService: ThemeService, translationService: TranslationService) {
    themeService.init();
    translationService.init();
  }
}
