import { ChangeDetectionStrategy, Component } from '@angular/core';
import { skills } from './skills';
import { knowledge } from './knowledge';

@Component({
  selector: 'awd-skills',
  templateUrl: 'skills.component.html',
  styleUrls: ['skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  public skills = skills;
  public knowledge = knowledge.sort(() => Math.random() - 0.5);
}
