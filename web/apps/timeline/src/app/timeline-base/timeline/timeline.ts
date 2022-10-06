export type TimelineEntry = {
  id: string;
  image?: string;
  from: number;
  to: number | 'today';
  name: string;
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
    id: 'awdware0',
    name: '1.0',
    from: 2014,
    to: 2016
  },
  {
    id: 'awdware1',
    name: '1.1',
    from: 2016,
    to: 2019
  },
  {
    id: 'awdware2',
    name: '2.0',
    from: 2019,
    to: 2022
  },
  {
    id: 'awdware3',
    name: '3.0',
    from: 2022,
    to: 'today'
  }
];
