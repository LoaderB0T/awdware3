import { Component } from '@angular/core';
import { timelime } from './timeline';

@Component({
  templateUrl: './timeline-base.component.html',
  styleUrls: ['./timeline-base.component.scss'],
})
export class TimelineBaseComponent {
  public readonly timeline = timelime;
}
