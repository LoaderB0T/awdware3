import { Type } from '@angular/core';
import { TimelineItemIdeaComponent } from './timeline-item-idea/timeline-item-idea.component';

export type TimelineEntry = {
  id: string;
  image?: string;
  from: number;
  to: number | 'today';
  name: string;
  component: Type<unknown>;
};

export type TimelineViewModel = {
  sections: TimelineEntryViewModel[];
};

export type TimelineEntryViewModel = {
  id: string;
  image?: string;
  from: number;
  to: number;
  name: string;
};

export const timelime: TimelineEntry[] = [
  {
    id: 'idea',
    name: '?',
    from: 2014,
    to: 'today',
    component: TimelineItemIdeaComponent,
  },
  {
    id: 'awdware0',
    name: '1.0',
    from: 2014,
    to: 2016,
    component: TimelineItemIdeaComponent,
  },
  {
    id: 'awdware1',
    name: '1.1',
    from: 2016,
    to: 2019,
    component: TimelineItemIdeaComponent,
  },
  {
    id: 'awdware2',
    name: '2.0',
    from: 2019,
    to: 2022,
    component: TimelineItemIdeaComponent,
  },
  {
    id: 'awdware3',
    name: '3.0',
    from: 2022,
    to: 'today',
    component: TimelineItemIdeaComponent,
  },
];
