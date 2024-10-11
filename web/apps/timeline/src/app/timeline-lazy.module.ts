import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { RouterEntryService } from 'ng-dynamic-mf';

import { MenuItem, MenuService } from '@awdware/shared';

const routes: Routes = [
  {
    path: 'timeline',
    loadChildren: () => import('./timeline.module').then(m => m.TimelineModule),
    data: { activePage: 'timeline' },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
})
export class TimelineLazyModule {
  constructor(routerEntryService: RouterEntryService, menuService: MenuService, router: Router) {
    routerEntryService.registerRoutes(routes);
    const menuItems: MenuItem[] = [
      {
        id: 'timeline',
        icon: 'timeline',
        iconActive: 'timeline-arrow',
        title: 'Timeline',
        action: () => {
          router.navigate(['timeline'], { preserveFragment: true });
        },
        order: 5,
      },
    ];
    menuService.addMenuItems(...menuItems);
  }
}
