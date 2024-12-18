import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  Type,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { timelime, TimelineEntry } from './timeline';
import { TimelineComponent } from './timeline/timeline.component';

@Component({
  imports: [CommonModule, TranslateModule, TimelineComponent],
  templateUrl: './timeline-base.component.html',
  styleUrls: ['./timeline-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBaseComponent implements AfterViewInit {
  protected readonly timeline = timelime;
  private readonly _observer?: IntersectionObserver;
  protected readonly selectedId = signal<string | undefined>(undefined);

  private readonly _intersectingIds = new Set<string>();

  protected readonly timelineItems = viewChildren<ElementRef<HTMLDivElement>>('timelineItem');

  protected readonly timelineComponentCache: Record<string, Promise<Type<unknown>>> = {};

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }
    this._observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this._intersectingIds.add(entry.target.getAttribute('data-id') ?? '');
          } else {
            this._intersectingIds.delete(entry.target.getAttribute('data-id') ?? '');
          }
        });

        const arr = Array.from(this._intersectingIds.values());

        const firstItemBasedOnTimeline = this.timeline.find(entry =>
          arr.some(id => id === entry.id)
        );
        this.selectTimelineItemById(firstItemBasedOnTimeline?.id);
      },
      { threshold: 0.2 }
    );
  }

  public ngAfterViewInit(): void {
    this.timelineItems().forEach(item => {
      this._observer?.observe(item.nativeElement);
    });
  }

  private selectTimelineItemById(id: string | undefined) {
    if (!id) {
      return;
    }
    this.selectedId.set(id);
  }

  protected async getComponent(timelineEntry: TimelineEntry): Promise<Type<unknown>> {
    this.timelineComponentCache[timelineEntry.id] ??= timelineEntry.component();
    const res = await this.timelineComponentCache[timelineEntry.id];
    return res;
  }
}
