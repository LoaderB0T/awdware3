import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { analytics } from '@awdware/analytics';
import { PreloadService, TranslationService } from '@awdware/shared';
import { TranslateService } from '@ngx-translate/core';
import { Typed } from 'typed.ts';

@Component({
  selector: 'awd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly _typedFac = Typed.factory({
    setUp: () => signal(''),
    update: (sig, text) => sig.set(text),
  });

  private readonly _translateService = inject(TranslateService);
  private readonly _translationService = inject(TranslationService);
  private readonly _router = inject(Router);
  protected readonly langChanged = signal(false);

  protected readonly _typing1 = this._typedFac({ noSpecialCharErrors: true });
  protected readonly _typing2 = this._typedFac({ noSpecialCharErrors: true });
  protected readonly _typing3 = this._typedFac({ noSpecialCharErrors: true });

  protected readonly typing1 = this._typing1.text;
  protected readonly typing2 = this._typing2.text;
  protected readonly typing3 = this._typing3.text;

  protected readonly skip = signal(false);
  protected readonly done = signal(false);
  protected readonly fillerLines = computed(() =>
    // Return an array with the number of missing lines to fill the typing area
    // needs to have unique values, to track in the template
    [...new Array(3 - this.typing1().split('\n').length)].map((_, i) => i)
  );

  constructor(preloadService: PreloadService) {
    preloadService.addIcons(['forward', 'rotate-right']);
  }

  private async prepareTyping() {
    await Promise.all([
      this._typing1.reset(true),
      this._typing2.reset(true),
      this._typing3.reset(true),
    ]);
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
    this.prepareTyping().then(() => {
      this.typeIntro();
    });
    this._translationService.languageChanged$.subscribe(() => {
      this.langChanged.set(true);
      if (!this.skip()) {
        this.fastForward();
      }
    });
  }

  private async typeIntro(): Promise<void> {
    this.done.set(false);
    await this._typing1.run();
    await this._typing2.run();
    await this._typing3.run();
    this.done.set(true);
  }

  private async typeLikes() {
    const ilike = this._translateService.instant('home.typing.ilike');

    if (!this.skip()) {
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
    this.skip.set(false);
    await Promise.all([
      this._typing1.reset(true),
      this._typing2.reset(true),
      this._typing3.reset(true),
    ]);
    await this.prepareTyping();
    this.langChanged.set(false);
    this.typeIntro();
  }

  public fastForward() {
    analytics.track('home.fastForward');
    this.skip.set(true);
    this._typing1.fastForward();
    this._typing2.fastForward();
    this._typing3.fastForward();
  }

  public learnMore() {
    analytics.track('home.learnMore');
    this._router.navigate(['home', 'about'], { preserveFragment: true });
  }
}
