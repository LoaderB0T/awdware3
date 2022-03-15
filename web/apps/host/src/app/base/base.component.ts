import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { PreloadService, MenuService, randomInt } from '@awdware/shared';
import { Observable } from 'rxjs';
import { slideInAnimation } from './router-animation';

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

  constructor(title: Title, menuService: MenuService, preloadService: PreloadService) {
    this._menuService = menuService;
    this._preloadService = preloadService;
    this.menuOpen$ = menuService.menuOpen$;
    const rndmTitleEmojis = [
      '*^____^*',
      'O(∩_∩)O',
      '(～￣▽￣)～',
      '（*＾-＾*）',
      '(*^_^*)',
      '(❁´◡`❁)',
      '(´▽`ʃ♡ƪ)',
      '♪(^∇^*)',
      '(oﾟvﾟ)ノ',
      '(☆▽☆)',
      '(o゜▽゜)o',
      '☆ヾ(•ω•`)o',
      '\\(￣︶￣*\\)',
      ')(￣o￣) . z Z',
      '\\(@^0^@)/',
      'ヾ(^▽^*)))',
      '✪ ω ✪',
      '♪(´▽｀)',
      'ヽ(✿ﾟ▽ﾟ)ノ',
      '（。＾▽＾）',
      '(☞ﾟヮﾟ)☞',
      '☜(ﾟヮﾟ☜)',
      '(⌐■_■)',
      '(•_•)',
      '¯\\_(ツ)_/¯',
      '( ͡• ͜ʖ ͡• )'
    ];

    const rndmTitleEmoji = rndmTitleEmojis[randomInt(0, rndmTitleEmojis.length - 1)];
    // eslint-disable-next-line no-irregular-whitespace
    title.setTitle(`awdware   ${rndmTitleEmoji}`);
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
}
