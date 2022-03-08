import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouterEntryService } from 'ng-dynamic-mf';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home.module').then(m => m.HomeModule),
    data: { activePage: 'home' }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule]
})
export class HomeLazyModule {
  constructor(routerEntryService: RouterEntryService) {
    routerEntryService.registerRoutes(routes);
  }
}
