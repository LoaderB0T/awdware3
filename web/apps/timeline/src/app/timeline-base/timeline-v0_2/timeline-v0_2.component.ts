import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationService } from '@awdware/shared';

import { ImageComponent } from '../../image/image.component';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, ImageComponent],
  templateUrl: './timeline-v0_2.component.html',
  styleUrls: ['./timeline-v0_2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemV0_2Component {
  protected readonly lang = inject(TranslationService).currentLang;
}
