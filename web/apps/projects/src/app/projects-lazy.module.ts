import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { RouterEntryService } from 'ng-dynamic-mf';
import { MenuItem, MenuService } from '@awdware/shared';
import { create } from 'canvas-confetti';

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
  constructor(routerEntryService: RouterEntryService, menuService: MenuService, router: Router) {
    routerEntryService.registerRoutes(routes);
    const menuItems: MenuItem[] = [
      {
        id: 'projects',
        icon: 'block',
        iconActive: 'block-question',
        title: 'Projects',
        action: target => {
          router.navigate(['projects']);
          if (target) {
            const confetti = create(undefined as any, { useWorker: true, resize: true });
            const pos = target.getClientRects()[0];
            const x = (pos.x + 0.5 * pos.width) / window.innerWidth;
            const y = (pos.y + 0.5 * pos.height) / window.innerHeight;
            confetti({
              particleCount: 1,
              spread: 20,
              origin: { x, y },
              shapes: ['circle'],
              colors: ['#fcd303'],
              startVelocity: 50,
              gravity: 6,
              scalar: 2
            });
          }
        },
        order: 4
      }
    ];
    menuService.addMenuItems(...menuItems);
  }
}
