import { Component } from '@angular/core';
import { timelime } from './timeline';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, TimelineComponent],
  templateUrl: './timeline-base.component.html',
  styleUrls: ['./timeline-base.component.scss'],
})
export class TimelineBaseComponent {
  public readonly timeline = timelime;
}
