import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';

import { AnalyticsService } from '@awdware/analytics';
import { MenuItem, MenuService, ThemeService, TranslationService } from '@awdware/shared';

@Component({
  standalone: true,
  selector: 'awd-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent {
  private readonly _menuService = inject(MenuService);
  private readonly _translationService = inject(TranslationService);
  private readonly _themeService = inject(ThemeService);
  private readonly _analyticsService = inject(AnalyticsService);
  private readonly _document = inject(DOCUMENT);
  private readonly _window = this._document.defaultView;

  public readonly menuItems = this._menuService.menuItems;
  public readonly menuOpen = this._menuService.menuOpen;
  public activeMenuItemY = signal(-100);
  public activeMenuItemId = signal('');

  constructor() {
    effect(() => {
      const activeItem = this._menuService.activeMenuItem();
      const el = this._document.getElementById(`menu-item-${activeItem}`);
      if (el) {
        this.activeMenuItemY.set(el.offsetTop - 8); // 16px is the additional height of the line
        this.activeMenuItemId.set(activeItem);
      }
    });
  }

  public clickedItem(event: MouseEvent | null, menuItem: MenuItem) {
    this._analyticsService.analytics.track(`menu.itemClicked.${menuItem.id}`, {
      from: this._window?.location.pathname ?? '',
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
    this._analyticsService.analytics.track('menu.switchLanguage', {
      from: lid,
      to: this._translationService.langId,
    });
  }

  public switchTheme() {
    const theme = this._themeService.selectedTheme().name;
    this._themeService.changeTheme(theme === 'light' ? 'dark' : 'light');
    this._analyticsService.analytics.track('menu.switchTheme', {
      from: theme,
      to: this._themeService.selectedTheme().name,
    });
  }
}
