import { ChangeDetectionStrategy, Component } from '@angular/core';

import { knowledge } from './knowledge';
import { skills } from './skills';
import { LogoService } from '../services/logo.service';

@Component({
  standalone: false,
  selector: 'awd-skills',
  templateUrl: 'skills.component.html',
  styleUrls: ['skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  public readonly logoService: LogoService;
  public skills = skills;
  public knowledge = knowledge;

  constructor(logoService: LogoService) {
    this.logoService = logoService;
    this.knowledge.sort(() => Math.random() - 0.5);
  }
}
