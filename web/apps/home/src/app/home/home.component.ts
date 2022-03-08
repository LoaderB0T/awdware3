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
    await this.typing.start(hi);
    await wait(100);
    await this.typing.start('\n');
    await wait(600);
    await this.typing.start(iam);
    await this.typing.start(' Janik', { minDelay: 20, maxDelay: 40 }, 'highlight');
    await this.typing.start('.');
    await wait(100);
    await this.typing.start('\n');
    await wait(600);
    await this.typing.start(ilike);
  }
}
