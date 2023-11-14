import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'awd-timeline-item-idea',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './timeline-item-idea.component.html',
  styleUrls: ['./timeline-item-idea.component.scss'],
})
export class TimelineItemIdeaComponent {}
