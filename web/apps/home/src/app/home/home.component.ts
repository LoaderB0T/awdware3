import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Router } from '@angular/router';
import { PreloadService, TranslationService } from '@awdware/shared';
import { analytics } from '@awdware/analytics';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, map } from 'rxjs';
import { Typed } from 'rxjs-typed.ts';

@Component({
  selector: 'awd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private readonly _translateService: TranslateService;
  private readonly _translationService: TranslationService;
  private readonly _router: Router;
  public readonly langChanged = signal(false);

  private readonly _typing1 = new Typed({ noSpecialCharErrors: true });
  private readonly _typing2 = new Typed({ noSpecialCharErrors: true });
  private readonly _typing3 = new Typed({ noSpecialCharErrors: true });

  public readonly typing1 = toSignal(this._typing1.text$);
  public readonly typing2 = toSignal(this._typing2.text$);
  public readonly typing3 = toSignal(this._typing3.text$);

  public skip = false;
  public done$ = new BehaviorSubject(false);
  public readonly fillerLines$ = this._typing1.text$.pipe(
    map(t => {
      return new Array(3 - t.split('\n').length);
    })
  );

  constructor(
    translateService: TranslateService,
    translationService: TranslationService,
    router: Router,
    preloadService: PreloadService
  ) {
    this._translateService = translateService;
    this._translationService = translationService;
    this._router = router;
    preloadService.addIcons(['forward', 'rotate-right']);

    const hi = this._translateService.instant('home.typing.hi');
    const iam = this._translateService.instant('home.typing.iam');
    const click = this._translateService.instant('home.typing.click');
    const here = this._translateService.instant('home.typing.here');
    const toLearnMore = this._translateService.instant('home.typing.toLearnMore');
    this._typing1
      .wait(1500)
      .type(hi)
      .wait(100)
      .type('\n')
      .wait(600)
      .type(iam)
      .type(' Janik', { perLetterDelay: { min: 20, max: 40 }, className: 'highlight' })
      .type('.')
      .wait(100)
      .type('\n')
      .wait(600);
    this.typeLikes();
    this._typing1.type(`${click} `);
    this._typing2.type(here);
    this._typing3.type(` ${toLearnMore}`);
  }

  public ngOnInit(): void {
    this.typeIntro();
    this._translationService.languageChanged$.subscribe(() => {
      this.langChanged.set(true);
      if (!this.skip) {
        this.fastForward();
      }
    });
  }

  private async typeIntro(): Promise<void> {
    this.done$.next(false);
    await this._typing1.run();
    await this._typing2.run();
    await this._typing3.run();
    this.done$.next(true);
  }

  private async typeLikes() {
    const ilike = this._translateService.instant('home.typing.ilike');

    if (!this.skip) {
      this._typing1.type(`${ilike} `);
      const likes = ['Web Development', 'TypeScript', 'Angular', 'C# & .NET', 'Automation (CI/CD)'];
      for (const like of likes) {
        this._typing1
          .wait(100)
          .type(like)
          .wait(500)
          .backspace(like.length, { eraseDelay: { min: 30, max: 60 } });
      }
      this._typing1.backspace(ilike.length + 1, { eraseDelay: { min: 30, max: 60 } });
    }
  }

  public async restart() {
    analytics.track('home.restart');
    this.skip = false;
    await Promise.all([this._typing1.reset(), this._typing2.reset(), this._typing3.reset()]);
    this.langChanged.set(false);
    this.typeIntro();
  }

  public fastForward() {
    analytics.track('home.fastForward');
    this.skip = true;
    this._typing1.fastForward();
    this._typing2.fastForward();
    this._typing3.fastForward();
  }

  public learnMore() {
    analytics.track('home.learnMore');
    this._router.navigate(['home', 'about'], { preserveFragment: true });
  }
}
