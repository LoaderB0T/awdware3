import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from '@awdware/shared';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Typed } from 'rxjs-typed.ts';
import { contacts } from './contacts';

@Component({
  selector: 'awd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  private readonly _translateService: TranslateService;
  private readonly _translationService: TranslationService;

  private readonly _headingDone = new BehaviorSubject(false);
  public readonly headingDone$ = this._headingDone.asObservable();
  private readonly _langChanged = new BehaviorSubject(false);
  public readonly langChanged$ = this._langChanged.asObservable();

  public typingHeading = new Typed({ minDelay: 30, maxDelay: 70 });
  public typingDetails = new Typed({ minDelay: 5, maxDelay: 20, minEraseDelay: 40, maxEraseDelay: 80 });
  public readonly age: number;

  public contacts = contacts;

  constructor(translateService: TranslateService, translationService: TranslationService) {
    this._translateService = translateService;
    this._translationService = translationService;

    const today = new Date();
    const birthday = new Date('1999-06-09');
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    this.age = age;
  }

  public ngOnInit() {
    this.typeIntro();
    this._translationService.languageChanged$.subscribe(() => {
      this._langChanged.next(true);
      this._headingDone.next(true);
    });
  }

  private async typeIntro(): Promise<void> {
    const thisIsMe = this._translateService.instant('about.thisIsMe');
    const overview = this._translateService.instant('about.overview', { age: this.age });
    await this.typingHeading.start('<-- ', { initialDelay: 750 }, 'arrow');
    await this.typingHeading.start(thisIsMe);
    this._headingDone.next(true);
    await this.typingDetails.start('tl;dr:\n', {}, 'comment');
    await this.typingDetails.start(`\n${overview}`);
  }
}
