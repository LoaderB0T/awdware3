import { Component } from '@angular/core';
import { MenuItem, MenuService } from '@awdware/shared';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'awd-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent {
  private readonly _menuService: MenuService;
  public menuItems$: Observable<MenuItem[]>;
  public activeMenuItemY$ = new BehaviorSubject<number>(-100);

  constructor(menuService: MenuService) {
    this._menuService = menuService;
    this.menuItems$ = this._menuService.menuItems$;
    this._menuService.activeMenuItem$.subscribe(x => {
      const el = document.getElementById(`menu-item-${x}`);
      if (el) {
        this.activeMenuItemY$.next(el.offsetTop - 8); // 16px is the additional height of the line
      }
    });
  }

  public clickedItem(menuItem: MenuItem) {
    menuItem.action();
  }
}
