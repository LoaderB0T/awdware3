import { Injectable, signal } from '@angular/core';

import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  public menuItems = signal<MenuItem[]>([]);
  public activeMenuItem = signal<string>('');
  public menuOpen = signal<boolean>(false);

  public addMenuItems(...menuItems: MenuItem[]) {
    this.menuItems.update(items => {
      const copy = [...items];
      copy.push(...menuItems);
      copy.sort((a, b) => a.order - b.order);
      return copy;
    });
  }

  public editMenuItem(id: string, changes: Partial<MenuItem>) {
    const menuItems = this.menuItems();
    const menuItem = menuItems.find(x => x.id === id);
    if (!menuItem) {
      throw new Error(`Menu item with id ${id} does not exist`);
    }
    const newMenuItem = { ...menuItem, ...changes };
    this.menuItems.set(menuItems.map(x => (x.id === id ? newMenuItem : x)));
  }

  public setActiveMenuItem(id: string) {
    const menuItems = this.menuItems();
    if (!menuItems.some(x => x.id === id)) {
      throw new Error(`Menu item with id ${id} does not exist`);
    }
    // Workaround for ERROR Error: NG0600: Writing to signals is not allowed in a `computed` or an `effect` by default.
    setTimeout(() => {
      this.activeMenuItem.set(id);
    });
  }
}
