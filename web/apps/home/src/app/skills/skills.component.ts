import { ChangeDetectionStrategy, Component } from '@angular/core';
import { skills } from './skills';
import { Knowledge, knowledge } from './knowledge';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'awd-skills',
  templateUrl: 'skills.component.html',
  styleUrls: ['skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  public skills = skills;
  public readonly knowledge$ = new BehaviorSubject<Knowledge[]>([]);

  constructor() {
    this.getNextRandomKnowledge();
  }

  public getNextRandomKnowledge() {
    knowledge.sort(() => 0.5 - Math.random());
    this.knowledge$.next(knowledge.slice(0, 5));
  }
}
