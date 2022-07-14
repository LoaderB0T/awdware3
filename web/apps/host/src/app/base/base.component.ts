import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { PreloadService, MenuService, randomInt } from '@awdware/shared';
import { CircleParticle } from 'confetti.ts';
import { Observable } from 'rxjs';
import { slideInAnimation } from './router-animation';

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
  'a'
];

@Component({
  selector: 'awd-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  animations: [slideInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements AfterViewInit {
  private readonly _menuService: MenuService;
  private readonly _preloadService: PreloadService;
  private _prevActiveRoute = '';
  private _loaded = false;
  public readonly menuOpen$: Observable<boolean>;
  private _currrentCode: string[] = [...konamiCode];
  private _confettiInterval: any = null;
  private _mouseX: number = 0;
  private _mouseY: number = 0;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const focusedElem = document.activeElement;
    if (focusedElem) {
      if ((focusedElem as HTMLInputElement).type === 'password') {
        return;
      }
    }
    const key = event.key;
    this.globalKeyPressed(key);
  }

  constructor(title: Title, menuService: MenuService, preloadService: PreloadService) {
    this._menuService = menuService;
    this._preloadService = preloadService;
    this.menuOpen$ = menuService.menuOpen$;
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
      '(╯°□°）╯︵ ┻━┻'
    ];

    const rndmTitleEmoji = rndmTitleEmojis[randomInt(0, rndmTitleEmojis.length - 1)];
    // eslint-disable-next-line no-irregular-whitespace
    title.setTitle(`awdware     ${rndmTitleEmoji}`);
  }

  public ngAfterViewInit(): void {
    this._loaded = true;
  }

  public get preloadIcons$() {
    return this._preloadService.icons$;
  }
  public get preloadImgs$() {
    return this._preloadService.imgs$;
  }

  public prepareRoute(outlet: RouterOutlet) {
    const activePage = outlet?.activatedRouteData?.['activePage'] as string | undefined;
    if (activePage) {
      this._menuService.setActiveMenuItem(activePage);
    }
    let dir = -1;
    if (activePage !== this._prevActiveRoute) {
      const prevIndex = this._menuService.menuItems$.value.find(x => x.id === this._prevActiveRoute)?.order ?? 0;
      const activeIndex = this._menuService.menuItems$.value.find(x => x.id === activePage)?.order ?? 0;
      if (prevIndex < activeIndex) {
        dir = 1;
      }
      this._prevActiveRoute = activePage ?? '';
    }
    if (!this._loaded) {
      return { value: 'initial' };
    }
    if (activePage) {
      return { value: activePage, params: { dir } };
    }
    return undefined;
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

  public setMouseCoords(event: MouseEvent) {
    this._mouseX = event.clientX;
    this._mouseY = event.clientY;
  }

  private konami() {
    const rndmColors = ['#eb4034', '#65eb34', '#34ebcd', '#1c61d9', '#7a1cd9', '#ed09d3', '#ed093e'];
    if (this._confettiInterval) {
      clearInterval(this._confettiInterval);
      this._confettiInterval = null;
    } else {
      this._confettiInterval = setInterval(() => {
        for (let i = 0; i < 10; i++) {
          CircleParticle.draw({
            x: this._mouseX,
            y: this._mouseY,
            movement: 'angle',
            angle: randomInt(0, 360),
            color: rndmColors[randomInt(0, rndmColors.length - 1)],
            radius: randomInt(3, 10),
            velocity: randomInt(4, 8),
            acceleration: -0.2,
            minVelocity: 0,
            lifeTime: randomInt(3000, 6000)
          });
        }
      }, 300);
    }
  }
}
