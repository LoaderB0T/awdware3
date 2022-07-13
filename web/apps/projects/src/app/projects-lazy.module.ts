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
  private _lastIconTime: number = Date.now();
  private _iconBoost: number = 0;
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
            const timeDelta = Date.now() - this._lastIconTime;
            if (timeDelta < 500) {
              this._iconBoost += 1 - timeDelta / 500;
              if (this._iconBoost > 75) {
                this._iconBoost = 75;
              }
            } else {
              this._iconBoost -= timeDelta / 50;
              if (this._iconBoost < 0) {
                this._iconBoost = 0;
              }
            }
            this._lastIconTime = Date.now();
            if (this._iconBoost === 75) {
              for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                  canvasService.startDraw(x, y, this._iconBoost, true);
                }, i * 20);
              }
            }
            canvasService.startDraw(x, y, this._iconBoost, false);
          }
        },
        order: 4
      }
    ];
    menuService.addMenuItems(...menuItems);
  }
}
