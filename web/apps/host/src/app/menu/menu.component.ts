import { Component, Signal, effect, signal } from '@angular/core';

import { analytics } from '@awdware/analytics';
import { MenuItem, MenuService, ThemeService, TranslationService } from '@awdware/shared';

@Component({
  standalone: true,
  selector: 'awd-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent {
  private readonly _menuService: MenuService;
  private readonly _translationService: TranslationService;
  private readonly _themeService: ThemeService;

  public readonly menuItems: Signal<MenuItem[]>;
  public readonly menuOpen: Signal<boolean>;
  public activeMenuItemY = signal(-100);
  public activeMenuItemId = signal('');

  constructor(
    menuService: MenuService,
    translationService: TranslationService,
    themeService: ThemeService
  ) {
    this._menuService = menuService;
    this._translationService = translationService;
    this._themeService = themeService;

    this.menuItems = this._menuService.menuItems;
    this.menuOpen = this._menuService.menuOpen;
    effect(() => {
      const activeItem = this._menuService.activeMenuItem();
      const el = document.getElementById(`menu-item-${activeItem}`);
      if (el) {
        this.activeMenuItemY.set(el.offsetTop - 8); // 16px is the additional height of the line
        this.activeMenuItemId.set(activeItem);
      }
    });
  }

  public clickedItem(event: MouseEvent | null, menuItem: MenuItem) {
    analytics.track(`menu.itemClicked.${menuItem.id}`, {
      from: window.location.pathname,
    });
    menuItem.action(event ? (event.target as HTMLElement) : null);
    if (this._menuService.menuOpen()) {
      this.closeMenu();
    }
  }

  public openMenu() {
    this._menuService.menuOpen.set(true);
  }

  public closeMenu() {
    this._menuService.menuOpen.set(false);
  }

  // @todo change to interactive ui
  public switchLanguage() {
    const lid = this._translationService.langId;
    this._translationService.setLanguage(lid === 'en' ? 'de' : 'en');
    analytics.track('menu.switchLanguage', { from: lid, to: this._translationService.langId });
  }

  public switchTheme() {
    const theme = this._themeService.selectedTheme().name;
    this._themeService.changeTheme(theme === 'light' ? 'dark' : 'light');
    analytics.track('menu.switchTheme', {
      from: theme,
      to: this._themeService.selectedTheme().name,
    });
  }
}
