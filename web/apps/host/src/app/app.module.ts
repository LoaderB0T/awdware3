import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ThemeService } from '@awdware/shared';
import { BaseComponent } from './base/base.component';
import { BgComponent } from './bg/bg.component';

@NgModule({
  declarations: [AppComponent, BaseComponent, BgComponent],
  imports: [BrowserModule, RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(themeService: ThemeService) {
    themeService.init();
  }
}
