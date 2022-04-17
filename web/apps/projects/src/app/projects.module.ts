import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, TranslationResolver } from '@awdware/shared';
import { ResourceMapModule } from 'ng-dynamic-mf';
import { ProjectsBaseComponent } from './projects-base/projects-base.component';
import { ProjectComponent } from './projects-base/project/project.component';

const routes: Routes = [
  {
    path: '',
    data: {
      module: 'projects'
    },
    resolve: {
      translations: TranslationResolver
    },
    children: [
      {
        path: '',
        component: ProjectsBaseComponent,
        data: {
          activePage: 'projects'
        }
      }
    ]
  }
];

@NgModule({
  declarations: [ProjectsBaseComponent, ProjectComponent],
  imports: [CommonModule, SharedModule, ResourceMapModule, RouterModule.forChild(routes)]
})
export class ProjectsModule {}
