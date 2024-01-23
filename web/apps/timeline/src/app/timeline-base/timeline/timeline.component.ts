import { Component, computed, input } from '@angular/core';
import { timelime, TimelineEntryViewModel } from '../timeline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'awd-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  public selectedId = input<string | undefined>();

  protected readonly refinedTimeline = timelime.map(entry => {
    const from = entry.from;
    const to = entry.to === 'today' ? new Date().getFullYear() : entry.to;
    const res: TimelineEntryViewModel = {
      ...entry,
      from,
      to,
    };
    return res;
  });

  protected readonly selectedSectionIndex = computed(() => {
    const index = timelime.findIndex(entry => entry.id === this.selectedId());
    return index;
  });

  public selectSection(index: number) {
    const timelineId = timelime[index].id;
    const el = document.querySelector(`[data-id="${timelineId}"]`);
    if (!el) {
      throw new Error(`Could not find element with data-id ${timelineId}`);
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
}
