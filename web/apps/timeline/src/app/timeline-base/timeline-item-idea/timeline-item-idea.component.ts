import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationService } from '@awdware/shared';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './timeline-item-idea.component.html',
  styleUrls: ['./timeline-item-idea.component.scss'],
})
export class TimelineItemIdeaComponent {
  protected readonly lang = inject(TranslationService).currentLang;
}
