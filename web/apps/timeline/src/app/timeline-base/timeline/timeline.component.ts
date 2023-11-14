import { Component, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { timelime, TimelineEntryViewModel, TimelineViewModel } from '../timeline';

@Component({
  selector: 'awd-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  public refinedTimeline$ = new BehaviorSubject<TimelineViewModel | null>(null);
  public selectedSectionIndex = signal(0);

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
    this.selectedSectionIndex.set(index);
  }
}
