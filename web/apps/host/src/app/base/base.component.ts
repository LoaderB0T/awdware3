import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'awd-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent {}
