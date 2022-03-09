import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { wait } from '@awdware/shared';
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
  private readonly _router: Router;

  public readonly typing = new Typed();
  public readonly typing2 = new Typed();
  public readonly typing3 = new Typed();
  public skip = false;
  public done$ = new BehaviorSubject(false);

  constructor(translateService: TranslateService, router: Router) {
    this._translateService = translateService;
    this._router = router;
  }

  public ngOnInit(): void {
    this.typeIntro();
  }

  private async typeIntro(): Promise<void> {
    this.done$.next(false);
    const hi = this._translateService.instant('home.typing.hi');
    const iam = this._translateService.instant('home.typing.iam');
    const ilike = this._translateService.instant('home.typing.ilike');
    const click = this._translateService.instant('home.typing.click');
    const here = this._translateService.instant('home.typing.here');
    const toLearnMore = this._translateService.instant('home.typing.toLearnMore');
    await this.typing.start(hi);
    await wait(this.skip ? 0 : 100);
    await this.typing.start('\n');
    await wait(this.skip ? 0 : 600);
    await this.typing.start(iam);
    await this.typing.start(' Janik', { minDelay: 20, maxDelay: 40 }, 'highlight');
    await this.typing.start('.');
    await wait(this.skip ? 0 : 100);
    await this.typing.start('\n');
    await wait(this.skip ? 0 : 600);
    if (!this.skip) {
      await this.typing.start(ilike + ' ');
      const likes = ['Web Development', 'TypeScript', 'Angular', 'C# & .NET', 'Automation (CI/CD)'];
      for (const like of likes) {
        if (this.skip) {
          break;
        }
        await wait(this.skip ? 0 : 100);
        await this.typing.start(like);
        await wait(this.skip ? 0 : 500);
        await this.typing.backspace(like.length, { minEraseDelay: 30, maxEraseDelay: 60 });
      }
      await this.typing.backspace(ilike.length + 1, { minEraseDelay: 30, maxEraseDelay: 60 });
    }
    await this.typing.start(`${click} `);
    await this.typing2.start(here);
    await this.typing3.start(` ${toLearnMore}`);
    this.done$.next(true);
  }

  public restart() {
    this.skip = false;
    this.typing.reset();
    this.typing2.reset();
    this.typing3.reset();
    this.typeIntro();
  }

  public fastForward() {
    this.skip = true;
    this.typing.fastForward();
    this.typing2.fastForward();
    this.typing3.fastForward();
  }

  public learnMore() {
    this._router.navigate(['home', 'about']);
  }
}
