import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { TooltipDirective } from '@awdware/shared';

import { knowledge } from './knowledge';
import { skills } from './skills';
import { LogoService } from '../services/logo.service';

@Component({
  imports: [TranslatePipe, TooltipDirective],
  selector: 'awd-skills',
  templateUrl: 'skills.component.html',
  styleUrls: ['skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  public readonly logoService = inject(LogoService);
  public skills = skills;
  public knowledge = knowledge;

  constructor() {
    this.knowledge.sort(() => Math.random() - 0.5);
  }
}
