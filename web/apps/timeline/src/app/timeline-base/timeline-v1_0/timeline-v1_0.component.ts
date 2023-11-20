import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ImageComponent } from '../../image/image.component';
import { TranslationService } from '@awdware/shared';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, ImageComponent],
  templateUrl: './timeline-v1_0.component.html',
  styleUrls: ['./timeline-v1_0.component.scss'],
})
export class TimelineItemV1_0Component {
  protected readonly lang = inject(TranslationService).currentLang;
}
