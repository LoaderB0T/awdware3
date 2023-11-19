import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  signal,
} from '@angular/core';
import { timelime } from './timeline';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, TimelineComponent],
  templateUrl: './timeline-base.component.html',
  styleUrls: ['./timeline-base.component.scss'],
})
export class TimelineBaseComponent implements AfterViewInit {
  protected readonly timeline = timelime;
  private readonly _observer: IntersectionObserver;
  protected readonly selectedId = signal<string | undefined>(undefined);

  private readonly _intersectingIds = new Set<string>();

  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef<HTMLDivElement>>;

  constructor() {
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
      { threshold: 0.5 }
    );
  }

  public ngAfterViewInit(): void {
    this.timelineItems.forEach(item => {
      this._observer.observe(item.nativeElement);
    });
  }

  private selectTimelineItemById(id: string | undefined) {
    if (!id) {
      return;
    }
    this.selectedId.set(id);
  }
}
