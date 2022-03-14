import { Component } from '@angular/core';
import { MenuItem, MenuService, TranslationService } from '@awdware/shared';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'awd-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent {
  private readonly _menuService: MenuService;
  private readonly _translationService: TranslationService;
  public menuItems$: Observable<MenuItem[]>;
  public activeMenuItemY$ = new BehaviorSubject<number>(-100);
  public activeMenuItemId$ = new BehaviorSubject<string>('');

  constructor(menuService: MenuService, translationService: TranslationService) {
    this._menuService = menuService;
    this._translationService = translationService;
    this.menuItems$ = this._menuService.menuItems$;
    this._menuService.activeMenuItem$.subscribe(x => {
      const el = document.getElementById(`menu-item-${x}`);
      if (el) {
        this.activeMenuItemY$.next(el.offsetTop - 8); // 16px is the additional height of the line
        this.activeMenuItemId$.next(x);
      }
    });
  }

  public clickedItem(menuItem: MenuItem) {
    menuItem.action();
  }

  // @todo change to interactive ui
  public switchLanguage() {
    const lid = this._translationService.lenID;
    this._translationService.setLanguage(lid === 'en' ? 'de' : 'en');
  }
}
