import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@awdware/shared';
import { ResourceMapModule } from 'ng-dynamic-mf';
import { ProjectsBaseComponent } from './projects-base/projects-base.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsBaseComponent,
    data: {
      activePage: 'projects'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, ResourceMapModule, RouterModule.forChild(routes)]
})
export class ProjectsModule {}
