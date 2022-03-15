import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { RouterEntryService } from 'ng-dynamic-mf';
import { MenuItem, MenuService, randomInt } from '@awdware/shared';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home.module').then(m => m.HomeModule),
    data: { activePage: 'home' }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule]
})
export class HomeLazyModule {
  private _currentUserIcon = '';

  constructor(routerEntryService: RouterEntryService, menuService: MenuService, router: Router) {
    routerEntryService.registerRoutes(routes);

    const menuItems: MenuItem[] = [
      {
        id: 'home',
        icon: 'house-blank',
        iconActive: 'house-user',
        title: 'Home',
        action: () => router.navigate(['home']),
        order: 1
      },
      {
        id: 'about',
        icon: 'user',
        title: 'About',
        action: () => {
          router.navigate(['home/about']);
          menuService.editMenuItem('about', { icon: this.randomuserIcon() });
        },
        order: 2
      },
      {
        id: 'skills',
        icon: 'list',
        iconActive: 'list-check',
        title: 'Skills',
        action: () => router.navigate(['home/skills']),
        order: 3
      }
    ];
    menuService.addMenuItems(...menuItems);
  }

  private randomuserIcon(): string {
    const userIcons = [
      'user-bounty-hunter',
      'user-astronaut',
      'user-ninja',
      'user-alien',
      'user-secret',
      'user-robot',
      'user-cowboy',
      'user-tie'
    ];
    let newIcon = this._currentUserIcon;
    while (newIcon === this._currentUserIcon) {
      newIcon = userIcons[randomInt(0, userIcons.length - 1)];
    }
    this._currentUserIcon = newIcon;
    return newIcon;
  }
}
