import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HomeLazyModule } from '@awdware/home';
import { ProjectsLazyModule } from '@awdware/projects';
import { TimelineLazyModule } from '@awdware/timeline';

import { BaseComponent } from './base/base.component';

const modules = [HomeLazyModule, ProjectsLazyModule, TimelineLazyModule];

@Component({
  standalone: true,
  imports: [BaseComponent, ...modules],
  selector: 'awd-root',
  template: `<awd-base />`,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
