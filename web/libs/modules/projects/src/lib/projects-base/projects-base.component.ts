import { ChangeDetectionStrategy, Component } from '@angular/core';

import { projects } from './projects';
import { ProjectComponent } from './project/project.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [ProjectComponent, TranslatePipe],
  templateUrl: './projects-base.component.html',
  styleUrls: ['./projects-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsBaseComponent {
  public projects = projects;
}
