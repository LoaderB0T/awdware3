import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, translationResolver } from '@awdware/shared';
import { HtmlHeadService, ResourceMapModule } from 'ng-dynamic-mf';
import { ProjectsBaseComponent } from './projects-base/projects-base.component';
import { ProjectComponent } from './projects-base/project/project.component';
import { devicons, fontawesome, font_montserrat } from '@awdware/externals';

const routes: Routes = [
  {
    path: '',
    data: {
      module: 'projects'
    },
    resolve: {
      translations: translationResolver
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
export class ProjectsModule {
  constructor(htmlHeadService: HtmlHeadService) {
    htmlHeadService.addElement(font_montserrat);
    htmlHeadService.addElement(fontawesome);
    htmlHeadService.addElement(devicons);
  }
}
