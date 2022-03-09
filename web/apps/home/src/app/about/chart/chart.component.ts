import { Component } from '@angular/core';

type Skill = {
  name: string;
  level: number;
};

@Component({
  selector: 'awd-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.scss']
})
export class ChartComponent {
  public skills: Skill[] = [
    {
      name: 'Angular',
      level: 80
    },
    {
      name: 'TypeScript',
      level: 90
    },
    {
      name: 'SCSS',
      level: 70
    }
  ];
}
