import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { RouterEntryService } from 'ng-dynamic-mf';
import { CanvasService, MenuItem, MenuService } from '@awdware/shared';

const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./projects.module').then(m => m.ProjectsModule),
    data: { activePage: 'projects' }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule]
})
export class ProjectsLazyModule {
  constructor(routerEntryService: RouterEntryService, menuService: MenuService, router: Router, canvasService: CanvasService) {
    routerEntryService.registerRoutes(routes);
    const menuItems: MenuItem[] = [
      {
        id: 'projects',
        icon: 'block',
        iconActive: 'block-question',
        title: 'Projects',
        action: target => {
          router.navigate(['projects'], { preserveFragment: true });
          if (target) {
            const pos = target.getClientRects()[0];
            const x = pos.x + 0.5 * pos.width;
            const y = pos.y + 0.5 * pos.height;
            canvasService.startDraw(x, y);
          }
        },
        order: 4
      }
    ];
    menuService.addMenuItems(...menuItems);
  }
}
