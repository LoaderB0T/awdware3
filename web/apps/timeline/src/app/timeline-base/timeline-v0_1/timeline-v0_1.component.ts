import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ImageComponent } from '../../image/image.component';
import { TranslationService } from '@awdware/shared';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, ImageComponent],
  templateUrl: './timeline-v0_1.component.html',
  styleUrls: ['./timeline-v0_1.component.scss'],
})
export class TimelineItemV0_1Component {
  protected readonly lang = inject(TranslationService).currentLang;
}
