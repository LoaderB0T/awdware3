import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// Required for TS to compile the "unused" RemoteEntryModule
import { RemoteEntryModule } from './home-remote.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([])],
  bootstrap: [AppComponent]
})
export class AppModule {}
