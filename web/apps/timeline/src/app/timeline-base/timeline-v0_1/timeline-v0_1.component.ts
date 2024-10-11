import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationService } from '@awdware/shared';

import { ImageComponent } from '../../image/image.component';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, ImageComponent],
  templateUrl: './timeline-v0_1.component.html',
  styleUrls: ['./timeline-v0_1.component.scss'],
})
export class TimelineItemV0_1Component {
  protected readonly lang = inject(TranslationService).currentLang;
}
