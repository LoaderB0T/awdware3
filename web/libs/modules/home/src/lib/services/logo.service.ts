import { Injectable, Signal, computed, inject } from '@angular/core';

import { ThemeService } from '@awdware/shared';

type IconMetadata = {
  image: string;
  darkLightIcon?: boolean;
};

@Injectable({ providedIn: 'root' })
export class LogoService {
  private readonly _isLightTheme: Signal<boolean>;

  constructor() {
    this._isLightTheme = computed(() => inject(ThemeService).selectedTheme().name === 'light');
  }

  public getIconName(icon: IconMetadata): Signal<string> {
    return computed(() =>
      icon.darkLightIcon && this._isLightTheme() ? `logo_${icon.image}_light` : `logo_${icon.image}`
    );
  }
}
