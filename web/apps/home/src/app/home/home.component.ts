import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService, wait } from '@awdware/shared';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
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
  private readonly _langChanged = new BehaviorSubject(false);
  public readonly langChanged$ = this._langChanged.asObservable();

  public readonly typing1 = new Typed();
  public readonly typing2 = new Typed();
  public readonly typing3 = new Typed();
  public skip = false;
  public done$ = new BehaviorSubject(false);

  constructor(translateService: TranslateService, translationService: TranslationService, router: Router) {
    this._translateService = translateService;
    this._translationService = translationService;
    this._router = router;
  }

  public ngOnInit(): void {
    this.typeIntro();
    this._translationService.languageChanged$.subscribe(() => {
      this._langChanged.next(true);
    });
  }

  private async typeIntro(): Promise<void> {
    this.done$.next(false);
    const hi = this._translateService.instant('home.typing.hi');
    const iam = this._translateService.instant('home.typing.iam');
    const ilike = this._translateService.instant('home.typing.ilike');
    const click = this._translateService.instant('home.typing.click');
    const here = this._translateService.instant('home.typing.here');
    const toLearnMore = this._translateService.instant('home.typing.toLearnMore');
    await wait(this.skip ? 0 : 1500);
    await this.typing1.start(hi);
    await wait(this.skip ? 0 : 100);
    await this.typing1.start('\n');
    await wait(this.skip ? 0 : 600);
    await this.typing1.start(iam);
    await this.typing1.start(' Janik', { minDelay: 20, maxDelay: 40 }, 'highlight');
    await this.typing1.start('.');
    await wait(this.skip ? 0 : 100);
    await this.typing1.start('\n');
    await wait(this.skip ? 0 : 600);
    if (!this.skip) {
      await this.typing1.start(`${ilike} `);
      const likes = ['Web Development', 'TypeScript', 'Angular', 'C# & .NET', 'Automation (CI/CD)'];
      for (const like of likes) {
        if (this.skip) {
          break;
        }
        await wait(this.skip ? 0 : 100);
        await this.typing1.start(like);
        await wait(this.skip ? 0 : 500);
        await this.typing1.backspace(like.length, { minEraseDelay: 30, maxEraseDelay: 60 });
      }
      await this.typing1.backspace(ilike.length + 1, { minEraseDelay: 30, maxEraseDelay: 60 });
    }
    await this.typing1.start(`${click} `);
    await this.typing2.start(here);
    await this.typing3.start(` ${toLearnMore}`);
    this.done$.next(true);
  }

  public restart() {
    this.skip = false;
    this.typing1.reset();
    this.typing2.reset();
    this.typing3.reset();
    this._langChanged.next(false);
    this.typeIntro();
  }

  public fastForward() {
    this.skip = true;
    this.typing1.fastForward();
    this.typing2.fastForward();
    this.typing3.fastForward();
  }

  public learnMore() {
    this._router.navigate(['home', 'about']);
  }
}
