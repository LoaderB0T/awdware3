import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule, ThemeService, TranslationService } from '@awdware/shared';

import { AppComponent } from './app.component';
// Required for TS to compile the "unused" RemoteEntryModule
// eslint-disable-next-line unused-imports/no-unused-imports
import { RemoteEntryModule } from './projects-remote.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'projects',
        loadChildren: () => import('./projects.module').then(m => m.ProjectsModule),
      },
    ]),
    SharedModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({}),
  ],
  providers: [provideExperimentalZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(themeService: ThemeService, translationService: TranslationService) {
    themeService.init();
    translationService.init();
  }
}
