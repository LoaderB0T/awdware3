import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationService } from '@awdware/shared';

import { ImageComponent } from '../../image/image.component';

@Component({
  imports: [CommonModule, TranslateModule, ImageComponent],
  templateUrl: './timeline-v0_1.component.html',
  styleUrls: ['./timeline-v0_1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemV0_1Component {
  protected readonly lang = inject(TranslationService).currentLang;
}
