import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { RouterEntryService } from 'ng-dynamic-mf';
import { MenuItem, MenuService } from '@awdware/shared';
import { CircleParticle } from 'confetti.ts';

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
  private readonly _rndmColors = ['#eb4034', '#65eb34', '#34ebcd', '#1c61d9', '#7a1cd9', '#ed09d3', '#ed093e'];
  constructor(routerEntryService: RouterEntryService, menuService: MenuService, router: Router) {
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
              this._iconBoost += 4 - timeDelta / 500;
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
                  this.drawParticle(x, y, this._iconBoost, true);
                }, i * 20);
              }
            }
            this.drawParticle(x, y, this._iconBoost, false);
          }
        },
        order: 4
      }
    ];
    menuService.addMenuItems(...menuItems);
  }

  private drawParticle(x: number, y: number, power: number, colorful: boolean) {
    const color = colorful ? this._rndmColors[Math.floor(Math.random() * this._rndmColors.length)] : '#ffd500';
    CircleParticle.draw({
      x,
      y,
      movementXY: {
        velocityY: -5 - (power / 75) * 6,
        velocityX: Math.random() - 0.5,
        gravity: 0.2
      },
      color,
      rotation: {
        velocity: {
          y: 4 + Math.random() * 2
        }
      },
      radius: 8,
      borderColor: color === '#ffd500' ? '#d99400' : color
    });
  }
}
