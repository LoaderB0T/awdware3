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
  public readonly menuItems$: Observable<MenuItem[]>;
  public readonly menuOpen$: BehaviorSubject<boolean>;
  public activeMenuItemY$ = new BehaviorSubject<number>(-100);
  public activeMenuItemId$ = new BehaviorSubject<string>('');

  constructor(menuService: MenuService, translationService: TranslationService) {
    this._menuService = menuService;
    this._translationService = translationService;
    this.menuItems$ = this._menuService.menuItems$;
    this.menuOpen$ = this._menuService.menuOpen$;
    this._menuService.activeMenuItem$.subscribe(x => {
      const el = document.getElementById(`menu-item-${x}`);
      if (el) {
        this.activeMenuItemY$.next(el.offsetTop - 8); // 16px is the additional height of the line
        this.activeMenuItemId$.next(x);
      }
    });
  }

  public clickedItem(event: MouseEvent | null, menuItem: MenuItem) {
    menuItem.action(event ? (event.target as HTMLElement) : null);
    if (this._menuService.menuOpen$.value) {
      this.closeMenu();
    }
  }

  public openMenu() {
    this._menuService.menuOpen$.next(true);
  }

  public closeMenu() {
    this._menuService.menuOpen$.next(false);
  }

  // @todo change to interactive ui
  public switchLanguage() {
    const lid = this._translationService.lenID;
    this._translationService.setLanguage(lid === 'en' ? 'de' : 'en');
  }
}
