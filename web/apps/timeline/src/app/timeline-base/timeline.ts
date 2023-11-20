import { Type } from '@angular/core';
import { TimelineItemIdeaComponent } from './timeline-item-idea/timeline-item-idea.component';
import { TimelineItemV0_1Component } from './timeline-v0_1/timeline-v0_1.component';
import { TimelineItemV0_2Component } from './timeline-v0_2/timeline-v0_2.component';
import { TimelineItemV1_0Component } from './timeline-v1_0/timeline-v1_0.component';

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
    id: 'awdware0_1',
    name: '0.1',
    from: 2014,
    to: 2015,
    component: TimelineItemV0_1Component,
  },
  {
    id: 'awdware0_2',
    name: '0.2',
    from: 2015,
    to: 2016,
    component: TimelineItemV0_2Component,
  },
  {
    id: 'awdware1_0',
    name: '1.0',
    from: 2016,
    to: 2019,
    component: TimelineItemV1_0Component,
  },
];
