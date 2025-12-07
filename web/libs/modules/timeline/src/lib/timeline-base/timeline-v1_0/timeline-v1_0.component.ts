import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationService } from '@awdware/shared';

import { ImageComponent } from '../../image/image.component';

@Component({
  imports: [TranslateModule, ImageComponent],
  templateUrl: './timeline-v1_0.component.html',
  styleUrls: ['./timeline-v1_0.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemV1_0Component {
  protected readonly lang = inject(TranslationService).currentLang;
}
