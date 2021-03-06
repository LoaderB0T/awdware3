import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  public menuItems$ = new BehaviorSubject<MenuItem[]>([]);
  public activeMenuItem$ = new BehaviorSubject<string>('');
  public menuOpen$ = new BehaviorSubject<boolean>(false);

  public addMenuItems(...menuItems: MenuItem[]) {
    const items = [...this.menuItems$.getValue()];
    items.push(...menuItems);
    items.sort((a, b) => a.order - b.order);
    this.menuItems$.next(items);
  }

  public editMenuItem(id: string, changes: Partial<MenuItem>) {
    const menuItems = this.menuItems$.getValue();
    const menuItem = menuItems.find(x => x.id === id);
    if (!menuItem) {
      throw new Error(`Menu item with id ${id} does not exist`);
    }
    const newMenuItem = { ...menuItem, ...changes };
    this.menuItems$.next(menuItems.map(x => (x.id === id ? newMenuItem : x)));
  }

  public setActiveMenuItem(id: string) {
    const menuItems = this.menuItems$.getValue();
    if (!menuItems.some(x => x.id === id)) {
      throw new Error(`Menu item with id ${id} does not exist`);
    }
    this.activeMenuItem$.next(id);
  }
}
