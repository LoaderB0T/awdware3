export type TimelineEntry = {
  id: string;
  image?: string;
  from: number;
  to: number | 'today';
};

export type TimelineViewModel = {
  sections: TimelineEntryViewModel[];
};

export type TimelineEntryViewModel = {
  id: string;
  image?: string;
  from: number;
  to: number;
};

export const timelime: TimelineEntry[] = [
  {
    id: 'awdware0',
    from: 2014,
    to: 2016
  },
  {
    id: 'awdware1',
    from: 2016,
    to: 2019
  },
  {
    id: 'awdware2',
    from: 2019,
    to: 2022
  },
  {
    id: 'awdware3',
    from: 2022,
    to: 'today'
  }
];
