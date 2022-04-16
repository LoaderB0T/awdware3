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
  private readonly _intervals: Readonly<number[]> = [20, 40, 60, 80, 100, 110, 120, 130, 140, 150] as const;
  private _currentInterval: number = 0;

  constructor() {
    this.setRandomKnowledge();
  }

  public startRandomKnowledgeInterval() {
    this.setRandomKnowledge();
    this._currentInterval = 0;
    this.nextRandomKnowledgeInterval();
  }

  private setRandomKnowledge() {
    knowledge.sort(() => 0.5 - Math.random());
    this.knowledge$.next(knowledge.slice(0, 5));
  }

  private nextRandomKnowledgeInterval() {
    setTimeout(() => {
      this.setRandomKnowledge();
      if (this._currentInterval < this._intervals.length - 1) {
        this._currentInterval++;
        this.nextRandomKnowledgeInterval();
      }
    }, this._intervals[this._currentInterval]);
  }
}
