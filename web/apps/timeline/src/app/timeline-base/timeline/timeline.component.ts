import { Component, Input, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { timelime, TimelineEntryViewModel, TimelineViewModel } from '../timeline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'awd-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  public refinedTimeline$ = new BehaviorSubject<TimelineViewModel | null>(null);
  public selectedSectionIndex = signal(0);

  @Input() public set selectedId(id: string | undefined) {
    const index = timelime.findIndex(entry => entry.id === id);
    this.selectedSectionIndex.set(index);
  }

  constructor() {
    const refinedEntries: TimelineEntryViewModel[] = timelime.map(entry => {
      const from = entry.from;
      const to = entry.to === 'today' ? new Date().getFullYear() : entry.to;
      const res: TimelineEntryViewModel = {
        ...entry,
        from,
        to,
      };
      return res;
    });

    this.refinedTimeline$.next({
      sections: refinedEntries,
    });
  }

  public selectSection(index: number) {
    const timelineId = timelime[index].id;
    const el = document.querySelector(`[data-id="${timelineId}"]`);
    if (!el) {
      throw new Error(`Could not find element with data-id ${timelineId}`);
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
}
