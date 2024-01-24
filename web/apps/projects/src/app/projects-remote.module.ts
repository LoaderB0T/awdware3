import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProjectsLazyModule } from './projects-lazy.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProjectsLazyModule]
})
export class RemoteEntryModule {}
