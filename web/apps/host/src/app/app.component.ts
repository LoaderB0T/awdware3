import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'awd-root',
  template: `<awd-base />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
