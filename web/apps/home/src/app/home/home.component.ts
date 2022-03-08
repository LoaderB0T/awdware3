import { Component, OnInit } from '@angular/core';
import { wait } from '@awdware/shared';
import { TranslateService } from '@ngx-translate/core';
import { Typing } from './typing';

@Component({
  selector: 'awd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public readonly typing = new Typing();
  public readonly typing2 = new Typing();
  public readonly typing3 = new Typing();
  private _skip = false;
  private readonly _translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this._translateService = translateService;
  }

  public ngOnInit(): void {
    this.typeIntro();
  }

  private async typeIntro(): Promise<void> {
    const hi = this._translateService.instant('home.typing.hi');
    const iam = this._translateService.instant('home.typing.iam');
    const ilike = this._translateService.instant('home.typing.ilike');
    const click = this._translateService.instant('home.typing.click');
    const here = this._translateService.instant('home.typing.here');
    const toLearnMore = this._translateService.instant('home.typing.toLearnMore');
    await this.typing.start(hi);
    await wait(this._skip ? 0 : 100);
    await this.typing.start('\n');
    await wait(this._skip ? 0 : 600);
    await this.typing.start(iam);
    await this.typing.start(' Janik', { minDelay: 20, maxDelay: 40 }, 'highlight');
    await this.typing.start('.');
    await wait(this._skip ? 0 : 100);
    await this.typing.start('\n');
    await wait(this._skip ? 0 : 600);
    if (!this._skip) {
      await this.typing.start(ilike + ' ');
      // const likes = ['Web Development', 'TypeScript', 'Angular', 'C# & .NET', 'Automation (CI/CD)'];
      const likes = ['stuff'];
      for (const like of likes) {
        if (this._skip) {
          break;
        }
        await wait(this._skip ? 0 : 100);
        await this.typing.start(like);
        await wait(this._skip ? 0 : 500);
        await this.typing.backspace(like.length, { minEraseDelay: 30, maxEraseDelay: 60 });
      }
      await this.typing.backspace(ilike.length + 1, { minEraseDelay: 30, maxEraseDelay: 60 });
    }
    await this.typing.start(`${click} `);
    await this.typing2.start(here);
    await this.typing3.start(` ${toLearnMore}`);
  }

  public skip() {
    this._skip = true;
    this.typing.fastForward();
    this.typing2.fastForward();
    this.typing3.fastForward();
  }
}
