import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PreloadService, MenuItem, MenuService, randomInt } from '@awdware/shared';
import { resourceMapper, RouterEntryService } from 'ng-dynamic-mf';

import { contacts } from './about/contacts';
import { knowledge } from './skills/knowledge';
import { skills } from './skills/skills';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home.module').then(m => m.HomeModule),
    data: { activePage: 'home' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

const userIcons = [
  'user-bounty-hunter',
  'user-astronaut',
  'user-ninja',
  'user-alien',
  'user-secret',
  'user-robot',
  'user-cowboy',
  'user-tie',
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
})
export class HomeLazyModule {
  private _currentUserIcon = '';

  constructor(
    routerEntryService: RouterEntryService,
    menuService: MenuService,
    router: Router,
    preloadService: PreloadService
  ) {
    routerEntryService.registerRoutes(routes);
    preloadService.addIcons([
      ...userIcons,
      'house-blank',
      'house-user',
      'user',
      'list',
      'list-check',
    ]);
    preloadService.addImages(
      contacts.map(c => resourceMapper('home', `assets/img/logo_${c.image}.svg`))
    );
    preloadService.addImages(
      skills.map(s =>
        resourceMapper(
          'home',
          'assets/img/' + (s.imageFilename ? s.imageFilename : `logo_${s.image}.svg`)
        )
      )
    );
    preloadService.addImages(
      knowledge.map(s => resourceMapper('home', `assets/img/logo_${s.image}.svg`))
    );
    preloadService.addImages([resourceMapper('home', `assets/img/me.png`)]);

    const menuItems: MenuItem[] = [
      {
        id: 'home',
        icon: 'house-blank',
        iconActive: 'house-user',
        title: 'Home',
        action: () => router.navigate(['home'], { preserveFragment: true }),
        order: 1,
      },
      {
        id: 'about',
        icon: 'user',
        title: 'About',
        action: () => {
          router.navigate(['home/about'], { preserveFragment: true });
          menuService.editMenuItem('about', { icon: this.randomuserIcon() });
        },
        order: 2,
      },
      {
        id: 'skills',
        icon: 'list',
        iconActive: 'list-check',
        title: 'Skills',
        action: () => router.navigate(['home/skills'], { preserveFragment: true }),
        order: 3,
      },
    ];
    menuService.addMenuItems(...menuItems);
  }

  private randomuserIcon(): string {
    let newIcon = this._currentUserIcon;
    while (newIcon === this._currentUserIcon) {
      newIcon = userIcons[randomInt(0, userIcons.length - 1)];
    }
    this._currentUserIcon = newIcon;
    return newIcon;
  }
}
