import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  public menuItems$ = new BehaviorSubject<MenuItem[]>([]);
  public activeMenuItem$ = new BehaviorSubject<string>('');

  public addMenuItem(menuItem: MenuItem) {
    const menuItems = this.menuItems$.getValue();
    menuItems.push(menuItem);
    this.menuItems$.next(menuItems);
  }

  public setActiveMenuItem(id: string) {
    const menuItems = this.menuItems$.getValue();
    if (!menuItems.some(x => x.id === id)) {
      throw new Error(`Menu item with id ${id} does not exist`);
    }
    this.activeMenuItem$.next(id);
  }
}
