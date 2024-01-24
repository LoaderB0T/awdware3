import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule, ThemeService, TranslationService } from '@awdware/shared';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
// Required for TS to compile the "unused" RemoteEntryModule
// eslint-disable-next-line unused-imports/no-unused-imports
import { RemoteEntryModule } from './timeline-remote.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'timeline',
        loadChildren: () => import('./timeline.module').then(m => m.TimelineModule),
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
