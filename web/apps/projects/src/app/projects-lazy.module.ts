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
        icon: 'block-question',
        iconActive: 'block',
        title: 'Projects',
        action: target => {
          router.navigate(['projects'], { preserveFragment: true });
          if (target) {
            const pos = target.getClientRects()[0];
            if (target.classList.contains('animate-bounce1')) {
              target.classList.remove('animate-bounce1');
              target.classList.add('animate-bounce2');
            } else {
              target.classList.remove('animate-bounce2');
              target.classList.add('animate-bounce1');
            }
            const x = pos.x + 0.5 * pos.width;
            const y = pos.y;
            canvasService.startDraw(x, y);
          }
        },
        order: 4
      }
    ];
    menuService.addMenuItems(...menuItems);
  }
}
