import { Component } from '@angular/core';
import { projects } from './projects';

@Component({
  templateUrl: './projects-base.component.html',
  styleUrls: ['./projects-base.component.scss']
})
export class ProjectsBaseComponent {
  public projects = projects;
}
