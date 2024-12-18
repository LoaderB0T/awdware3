import { bootstrapApplication } from '@angular/platform-browser';
import { ɵinitializeEnvironment } from 'ng-dynamic-mf/environment';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

fetch('environment.json').then(async response => {
  const env = await response.json();
  ɵinitializeEnvironment(env);
  bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
});
