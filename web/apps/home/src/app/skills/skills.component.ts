import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { skills } from './skills';

@Component({
  selector: 'awd-skills',
  templateUrl: 'skills.component.html',
  styleUrls: ['skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit {
  public skills = skills;

  constructor() {}

  ngOnInit() {}
}
