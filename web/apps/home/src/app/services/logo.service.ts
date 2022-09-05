import { Injectable } from '@angular/core';
import { ThemeService } from '@awdware/shared';
import { BehaviorSubject, map, Observable } from 'rxjs';

type IconMetadata = {
  image: string;
  darkLightIcon?: boolean;
};

@Injectable({ providedIn: 'root' })
export class LogoService {
  private readonly _isLightTheme = new BehaviorSubject<boolean>(false);

  constructor(themeService: ThemeService) {
    themeService.selectedTheme$.subscribe(theme => {
      this._isLightTheme.next(theme.name === 'light');
    });
  }

  public getIconName$(icon: IconMetadata): Observable<string> {
    return this._isLightTheme.pipe(
      map(isLightTheme => {
        return icon.darkLightIcon && isLightTheme ? `logo_${icon.image}_light` : `logo_${icon.image}`;
      })
    );
  }
}
