import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

type Skill = {
  name: string;
  image: string;
  link: string;
  size: number;
};

@Component({
  selector: 'awd-skills',
  templateUrl: 'skills.component.html',
  styleUrls: ['skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit {
  public skills: Skill[] = [
    {
      image: 'angular',
      name: 'Angular',
      link: 'https://angular.io/',
      size: 40
    },
    {
      image: 'ts',
      name: 'TypeScript',
      link: 'https://www.typescriptlang.org/',
      size: 40
    },
    {
      image: 'node',
      name: 'Node.js',
      link: 'https://nodejs.org/',
      size: 40
    }
  ];

  constructor() {}

  ngOnInit() {}
}
