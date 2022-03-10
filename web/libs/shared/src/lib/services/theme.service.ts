import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _globalStyleSheet?: CSSStyleSheet;

  private readonly themes: Theme[] = [this.darkTheme, this.lightTheme];
  public selectedTheme: Theme = this.themes[0];

  public init() {
    if (this._globalStyleSheet) {
      return;
    }
    const styleSheet = document.createElement('style');
    styleSheet.id = 'global-stylesheet';
    document.head.appendChild(styleSheet);
    this._globalStyleSheet = styleSheet.sheet as CSSStyleSheet;

    const savedThemeName = localStorage.getItem('theme');
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
      throw new Error("Theme service has not been initialized. Call 'init' method before setting the theme");
    }

    if (this._globalStyleSheet.cssRules.length > 0) {
      this._globalStyleSheet.deleteRule(0);
    }
    this._globalStyleSheet.insertRule(this.getRuleString(theme), 0);
    this.selectedTheme = theme;
    localStorage.setItem('theme', theme.name);
  }

  private get darkTheme(): Theme {
    return {
      name: 'dark',
      props: {
        colorBg1: 'rgb(18, 18, 18)',
        colorBg2: 'rgb(25, 25, 25)',
        colorBg3: 'rgb(35, 35, 35)',
        colorBgHighlight: '(0, 1, 20)',
        colorBgHighlight_03: 'rgba(0, 0, 0, 0.35)',
        colorBgHighlight_05: 'rgba(0, 0, 0, 0.5)',
        colorContent1: 'rgb(242, 239, 234)',
        colorContent2: 'rgb(120, 120, 130)',
        colorAccent1: 'rgb(255, 0, 82)',
        colorAccent2: 'rgb(255, 190, 48)',
        colorError: 'rgb(238, 31, 16)'
      }
    };
  }

  private get lightTheme(): Theme {
    return {
      name: 'light',
      props: {
        colorBg1: 'rgb(28, 28, 33)',
        colorBg2: 'rgb(44, 44, 48)',
        colorBg3: 'rgb(57, 57, 64)',
        colorBgHighlight: '(0, 1, 20)',
        colorBgHighlight_03: 'rgba(255, 255, 255, 0.6)',
        colorBgHighlight_05: 'rgba(255, 255, 255, 0.9)',
        colorContent1: 'rgb(213, 214, 224)',
        colorContent2: 'rgb(#b2b3bf)',
        colorAccent1: 'rgb(204, 0, 78)',
        colorAccent2: 'rgb(255, 190, 48)',
        colorError: 'rgb(238, 31, 16)'
      }
    };
  }
}
