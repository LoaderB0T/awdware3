import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ProjectComponent } from './project/project.component';
import { projects } from './projects';

@Component({
  imports: [ProjectComponent, TranslatePipe],
  templateUrl: './projects-base.component.html',
  styleUrls: ['./projects-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsBaseComponent {
  public projects = projects;
}
