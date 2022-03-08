import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'awd-about',
  templateUrl: 'about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}
