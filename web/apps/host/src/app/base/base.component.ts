import { AsyncPipe, isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
  Signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RectParticle } from 'confetti.ts';

import { PreloadService, MenuService, randomInt, ThemeService } from '@awdware/shared';

import { BgComponent } from '../bg/bg.component';
import { MenuComponent } from '../menu/menu.component';

const konamiCode = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

@Component({
  standalone: true,
  imports: [BgComponent, MenuComponent, RouterOutlet, AsyncPipe],
  selector: 'awd-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements AfterViewInit {
  private readonly _menuService = inject(MenuService);
  private readonly _preloadService = inject(PreloadService);
  private _prevActiveRoute = '';
  private _loaded = false;
  protected readonly menuOpen: Signal<boolean>;
  protected readonly scrollInfo = signal({ top: '0px', bot: '0px' });
  protected readonly isLightTheme = inject(ThemeService).isLightTheme;
  protected readonly themeChanged = signal(false);
  private _currrentCode: string[] = [...konamiCode];
  private _confettiInterval: any = null;
  private _mouseX: number = 0;
  private _mouseY: number = 0;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const focusedElem = document.activeElement;
    if (focusedElem && focusedElem instanceof HTMLInputElement && focusedElem.type === 'password') {
      return;
    }
    const key = event.key;
    this.globalKeyPressed(key);
  }

  constructor() {
    this.menuOpen = this._menuService.menuOpen;
    const rndmTitleEmojis = [
      '*^____^*',
      '（*＾-＾*）',
      '(*^_^*)',
      '(⌐■_■)',
      '(•_•)',
      '¯\\_(ツ)_/¯',
      '( ͡• ͜ʖ ͡• )',
      'ಠ_ಠ',
      '＼(ﾟｰﾟ＼)',
      '( ͡• ͜ʖ ͡• )',
      '¯\\_( ͡° ͜ʖ ͡°)_/¯',
      '(╯°□°）╯︵ ┻━┻',
    ];

    const rndmTitleEmoji = rndmTitleEmojis[randomInt(0, rndmTitleEmojis.length - 1)];

    if (isPlatformServer(inject(PLATFORM_ID))) {
      // eslint-disable-next-line no-irregular-whitespace
      inject(Title).setTitle(`awdware     ${rndmTitleEmoji}`);
    } else {
      function getScrollBarWidth() {
        const el = document.createElement('div');
        el.style.cssText = 'overflow:scroll; visibility:hidden; position:absolute;';
        document.body.appendChild(el);
        const width = el.offsetWidth - el.clientWidth;
        el.remove();
        return width;
      }
      document.body.parentElement?.style.setProperty(
        '--scrollbar-width',
        `${getScrollBarWidth()}px`
      );
    }

    effect(() => {
      // Required to retrigger the css filter property to load the new filter styles
      this.isLightTheme(); // trigger
      this.themeChanged.set(true);
      setTimeout(() => {
        this.themeChanged.set(false);
      });
    });
  }

  public ngAfterViewInit(): void {
    this._loaded = true;
  }

  protected get preloadIcons$() {
    return this._preloadService.icons$;
  }
  protected get preloadImgs$() {
    return this._preloadService.imgs$;
  }

  protected onRouteActivate(outlet: RouterOutlet, content: HTMLElement): void {
    this.contentScrolled(content);
    this.updateAnimationDirection(outlet);
  }

  private updateAnimationDirection(outlet: RouterOutlet): void {
    const activePage = outlet?.activatedRouteData?.['activePage'] as string | undefined;
    if (activePage) {
      this._menuService.setActiveMenuItem(activePage);
    }
    
    let dir = -1;
    if (!this._loaded) {
      dir = 0; // No animation on initial load
    } else if (activePage !== this._prevActiveRoute) {
      const prevIndex =
        this._menuService.menuItems().find(x => x.id === this._prevActiveRoute)?.order ?? 0;
      const activeIndex = this._menuService.menuItems().find(x => x.id === activePage)?.order ?? 0;
      if (prevIndex < activeIndex) {
        dir = 1;
      }
      this._prevActiveRoute = activePage ?? '';
    }
    
    // Set CSS variable on document root for View Transitions API (skip during SSR)
    if (!isPlatformServer(inject(PLATFORM_ID))) {
      document.documentElement.style.setProperty('--anim-dir', dir.toString());
    }
  }

  private globalKeyPressed(key: string) {
    if (this._currrentCode[0] === key) {
      this._currrentCode.shift();
      if (this._currrentCode.length === 0) {
        this._currrentCode = [...konamiCode];
        this.konami();
      }
    } else {
      this._currrentCode = [...konamiCode];
    }
  }

  protected setMouseCoords(event: MouseEvent) {
    this._mouseX = event.clientX;
    this._mouseY = event.clientY;
  }

  protected contentScrolled(el: HTMLElement) {
    const MOVE_AMOUNT = 60;

    const scroll = el.scrollTop;
    const maxScroll = el.scrollHeight - el.clientHeight;

    const scrolledDownAmoun = Math.min(scroll, MOVE_AMOUNT);
    const scrolledUpAmount = Math.min(maxScroll - scroll, MOVE_AMOUNT);
    this.scrollInfo.set({
      top: `${scrolledDownAmoun}px`,
      bot: `${scrolledUpAmount}px`,
    });
  }

  private konami() {
    const rndmColors = [
      '#eb4034',
      '#65eb34',
      '#34ebcd',
      '#1c61d9',
      '#7a1cd9',
      '#ed09d3',
      '#ed093e',
    ];
    if (this._confettiInterval) {
      clearInterval(this._confettiInterval);
      this._confettiInterval = null;
    } else {
      this._confettiInterval = setInterval(() => {
        for (let i = 0; i < 10; i++) {
          RectParticle.draw({
            position: {
              x: this._mouseX,
              y: this._mouseY,
            },
            movementAngle: {
              angle: Math.random() * 360,
              velocity: {
                min: 0,
                x: 5 + Math.random() * 5,
              },
              acceleration: -0.2,
            },
            rotation: {
              value: { x: Math.random() * 360, z: Math.random() * 360 },
              velocity: { x: Math.random() * 4, z: Math.random() * 4, min: 0 },
              acceleration: { x: -0.05 - Math.random() * 0.05, z: -0.05 - Math.random() * 0.05 },
              switchDirection: Math.random() > 0.5,
            },
            color: rndmColors[randomInt(0, rndmColors.length - 1)],
            width: 10 + Math.random() * 4,
            height: 5 + Math.random() * 2,
            lifeTime: randomInt(3000, 6000),
          });
        }
      }, 300);
    }
  }
}
