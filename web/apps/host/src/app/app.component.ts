import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BaseComponent } from './base/base.component';

@Component({
  standalone: true,
  imports: [BaseComponent],
  selector: 'awd-root',
  template: `<awd-base />`,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
