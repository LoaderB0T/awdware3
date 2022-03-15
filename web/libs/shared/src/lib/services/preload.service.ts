import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  private readonly _icons = new BehaviorSubject<string[]>([]);
  public readonly icons$ = this._icons.pipe(debounceTime(1000));
  private readonly _imgs = new BehaviorSubject<string[]>([]);
  public readonly imgs$ = this._imgs.pipe(debounceTime(1000));

  public addIcons(icons: string[]) {
    const newIcons: string[] = [];
    newIcons.push(...this._icons.getValue());
    newIcons.push(...icons);
    this._icons.next(newIcons);
  }

  public addImages(images: string[]) {
    const newImgs: string[] = [];
    newImgs.push(...this._imgs.getValue());
    newImgs.push(...images);
    this._imgs.next(newImgs);
  }
}
