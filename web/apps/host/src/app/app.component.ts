import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'awd-root',
  template: `<awd-base />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
