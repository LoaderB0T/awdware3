import { ChangeDetectionStrategy, Component } from '@angular/core';
import { skills } from './skills';
import { knowledge } from './knowledge';
import { LogoService } from '../services/logo.service';

@Component({
  selector: 'awd-skills',
  templateUrl: 'skills.component.html',
  styleUrls: ['skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  public readonly logoService: LogoService;
  public skills = skills;
  public knowledge = knowledge.sort(() => Math.random() - 0.5);

  constructor(logoService: LogoService) {
    this.logoService = logoService;
  }
}
