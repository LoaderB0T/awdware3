
import { computed, inject, Injectable, signal, DOCUMENT } from '@angular/core';

import { StorageService } from './storage.service';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _document = inject(DOCUMENT);
  private _globalStyleSheet?: HTMLStyleElement;
  private readonly _storage = inject(StorageService).init('theme', 'dark');
  private readonly themes: Theme[] = [this.darkTheme, this.lightTheme];
  public readonly selectedTheme = signal<Theme>(this.themes[0]);
  public readonly isLightTheme = computed(() => this.selectedTheme().name === 'light');

  public init() {
    if (this._globalStyleSheet) {
      return;
    }
    const styleSheet = this._document.createElement('style');
    styleSheet.id = 'global-stylesheet';
    this._document.head.appendChild(styleSheet);

    this._globalStyleSheet = styleSheet;

    const savedThemeName = this._storage.value;
    if (savedThemeName) {
      const savedTheme = this.themes.find(x => x.name === savedThemeName);
      if (savedTheme) {
        this.setTheme(savedTheme);
        return;
      }
    }
    this.setTheme(this.darkTheme);
  }

  public changeTheme(themeName: 'dark' | 'light') {
    const theme = this.themes.find(x => x.name === themeName);
    if (theme) {
      this.setTheme(theme);
    }
  }

  private getRuleString(theme: Theme): string {
    return `:root {
      ${Object.entries(theme.props)
        .map(([key, value]) => `--${key}: ${value};`)
        .join('\n')}
    }`;
  }

  private setTheme(theme: Theme) {
    if (!this._globalStyleSheet) {
      throw new Error(
        "Theme service has not been initialized. Call 'init' method before setting the theme"
      );
    }

    const styleElement = this._document.createElement('style');
    styleElement.textContent = this.getRuleString(theme);
    this._globalStyleSheet.replaceWith(styleElement);
    this._globalStyleSheet = styleElement;

    this._document.body.classList.remove('theme-dark', 'theme-light');
    this._document.body.classList.add(`theme-${theme.name}`);
    this._storage.value = theme.name;
    this.selectedTheme.set(theme);
  }

  private get darkTheme(): Theme {
    return {
      name: 'dark',
      props: {
        colorBg1: 'rgb(18, 18, 18)',
        colorBg2: 'rgb(25, 25, 25)',
        colorBg3: 'rgb(35, 35, 35)',
        colorBgHighlight: 'rgb(0, 1, 20)',
        colorBgHighlight_001: 'rgba(255, 255, 255, 0.03)',
        colorBgHighlight_03: 'rgba(0, 0, 0, 0.2)',
        colorBgHighlight_05: 'rgba(0, 0, 0, 0.4)',
        colorContent1: 'rgb(242, 239, 234)',
        colorContent2: 'rgb(190, 190, 200)',
        colorContent3: 'rgb(120, 120, 130)',
        colorAccent1: 'rgb(255, 0, 82)',
        colorAccent2: 'rgb(255, 190, 48)',
        colorError: 'rgb(238, 31, 16)',
        lightnessContrastFactor: '1.1',
      },
    };
  }

  private get lightTheme(): Theme {
    return {
      name: 'light',
      props: {
        colorBg1: 'rgb(230, 232, 240)',
        colorBg2: 'rgb(215, 218, 222)',
        colorBg3: 'rgb(200, 205, 210)',
        colorBgHighlight: 'rgb(255 255 255)',
        colorBgHighlight_001: 'rgba(0, 0, 0, 0.01)',
        colorBgHighlight_03: 'rgba(255, 255, 255, 0.35)',
        colorBgHighlight_05: 'rgba(255, 255, 255, 0.6)',
        colorContent1: 'rgb(13, 13, 18)',
        colorContent2: 'rgb(34, 34, 48)',
        colorContent3: 'rgb(67, 67, 108)',
        colorAccent1: 'rgb(255, 0, 82)',
        colorAccent2: 'rgb(255, 160, 30)',
        colorError: 'rgb(238, 31, 16)',
        lightnessContrastFactor: '0.9',
      },
    };
  }
}
