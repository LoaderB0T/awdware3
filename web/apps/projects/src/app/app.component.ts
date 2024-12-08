import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'awd-root',
  template: '<router-outlet />',
  changeDetection: 
  standalone: false,
})
export class AppComponent {}
