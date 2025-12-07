
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationService } from '@awdware/shared';

@Component({
  imports: [TranslateModule],
  templateUrl: './timeline-item-idea.component.html',
  styleUrls: ['./timeline-item-idea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemIdeaComponent {
  protected readonly lang = inject(TranslationService).currentLang;
}
